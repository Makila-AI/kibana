/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  Plugin,
  CoreSetup,
  CoreStart,
  PluginInitializerContext,
  StartServicesAccessor,
} from 'src/core/public';
import { BehaviorSubject } from 'rxjs';
import { BfetchPublicSetup } from 'src/plugins/bfetch/public';
import { ISearchSetup, ISearchStart } from './types';

import { handleResponse } from './fetch';
import {
  kibana,
  kibanaContext,
  ISearchGeneric,
  SearchSourceDependencies,
  SearchSourceService,
  extendedBoundsFunction,
  ipRangeFunction,
  kibanaTimerangeFunction,
  luceneFunction,
  kqlFunction,
  fieldFunction,
  numericalRangeFunction,
  rangeFunction,
  cidrFunction,
  dateRangeFunction,
  existsFilterFunction,
  geoBoundingBoxFunction,
  geoPointFunction,
  queryFilterFunction,
  rangeFilterFunction,
  kibanaFilterFunction,
  phraseFilterFunction,
  esRawResponse,
} from '../../common/search';
import { AggsService, AggsStartDependencies } from './aggs';
import { IndexPatternsContract } from '..';
import { ISearchInterceptor, SearchInterceptor } from './search_interceptor';
import { SearchUsageCollector, createUsageCollector } from './collectors';
import { UsageCollectionSetup } from '../../../usage_collection/public';
import { getEsaggs, getEsdsl } from './expressions';
import { ExpressionsSetup } from '../../../expressions/public';
import { ISessionsClient, ISessionService, SessionsClient, SessionService } from './session';
import { ConfigSchema } from '../../config';
import {
  SHARD_DELAY_AGG_NAME,
  getShardDelayBucketAgg,
} from '../../common/search/aggs/buckets/shard_delay';
import { aggShardDelay } from '../../common/search/aggs/buckets/shard_delay_fn';
import { DataPublicPluginStart, DataStartDependencies } from '../types';
import { NowProviderInternalContract } from '../now_provider';
import { getKibanaContext } from './expressions/kibana_context';

/** @internal */
export interface SearchServiceSetupDependencies {
  bfetch: BfetchPublicSetup;
  expressions: ExpressionsSetup;
  usageCollection?: UsageCollectionSetup;
  nowProvider: NowProviderInternalContract;
}

/** @internal */
export interface SearchServiceStartDependencies {
  fieldFormats: AggsStartDependencies['fieldFormats'];
  indexPatterns: IndexPatternsContract;
}

export class SearchService implements Plugin<ISearchSetup, ISearchStart> {
  private readonly aggsService = new AggsService();
  private readonly searchSourceService = new SearchSourceService();
  private searchInterceptor!: ISearchInterceptor;
  private usageCollector?: SearchUsageCollector;
  private sessionService!: ISessionService;
  private sessionsClient!: ISessionsClient;

  constructor(private initializerContext: PluginInitializerContext<ConfigSchema>) {}

  public setup(
    { http, getStartServices, notifications, uiSettings }: CoreSetup,
    { bfetch, expressions, usageCollection, nowProvider }: SearchServiceSetupDependencies
  ): ISearchSetup {
    this.usageCollector = createUsageCollector(getStartServices, usageCollection);

    this.sessionsClient = new SessionsClient({ http });
    this.sessionService = new SessionService(
      this.initializerContext,
      getStartServices,
      this.sessionsClient,
      nowProvider
    );
    /**
     * A global object that intercepts all searches and provides convenience methods for cancelling
     * all pending search requests, as well as getting the number of pending search requests.
     */
    this.searchInterceptor = new SearchInterceptor({
      bfetch,
      toasts: notifications.toasts,
      http,
      uiSettings,
      startServices: getStartServices(),
      usageCollector: this.usageCollector!,
      session: this.sessionService,
    });

    expressions.registerFunction(
      getEsaggs({ getStartServices } as {
        getStartServices: StartServicesAccessor<DataStartDependencies, DataPublicPluginStart>;
      })
    );
    expressions.registerFunction(kibana);
    expressions.registerFunction(
      getKibanaContext({ getStartServices } as {
        getStartServices: StartServicesAccessor<DataStartDependencies, DataPublicPluginStart>;
      })
    );
    expressions.registerFunction(cidrFunction);
    expressions.registerFunction(dateRangeFunction);
    expressions.registerFunction(extendedBoundsFunction);
    expressions.registerFunction(ipRangeFunction);
    expressions.registerFunction(luceneFunction);
    expressions.registerFunction(kqlFunction);
    expressions.registerFunction(kibanaTimerangeFunction);
    expressions.registerFunction(fieldFunction);
    expressions.registerFunction(numericalRangeFunction);
    expressions.registerFunction(geoBoundingBoxFunction);
    expressions.registerFunction(geoPointFunction);
    expressions.registerFunction(rangeFunction);
    expressions.registerFunction(kibanaFilterFunction);
    expressions.registerFunction(existsFilterFunction);
    expressions.registerFunction(queryFilterFunction);
    expressions.registerFunction(rangeFilterFunction);
    expressions.registerFunction(phraseFilterFunction);
    expressions.registerType(kibanaContext);

    expressions.registerFunction(
      getEsdsl({ getStartServices } as {
        getStartServices: StartServicesAccessor<DataStartDependencies, DataPublicPluginStart>;
      })
    );
    expressions.registerType(esRawResponse);

    const aggs = this.aggsService.setup({
      registerFunction: expressions.registerFunction,
      uiSettings,
      nowProvider,
    });

    if (this.initializerContext.config.get().search.aggs.shardDelay.enabled) {
      aggs.types.registerBucket(SHARD_DELAY_AGG_NAME, getShardDelayBucketAgg);
      expressions.registerFunction(aggShardDelay);
    }

    return {
      aggs,
      usageCollector: this.usageCollector!,
      session: this.sessionService,
      sessionsClient: this.sessionsClient,
    };
  }

  public start(
    { http, uiSettings, i18n }: CoreStart,
    { fieldFormats, indexPatterns }: SearchServiceStartDependencies
  ): ISearchStart {
    const search = ((request, options = {}) => {
      return this.searchInterceptor.search(request, options);
    }) as ISearchGeneric;

    const loadingCount$ = new BehaviorSubject(0);
    http.addLoadingCountSource(loadingCount$);

    const searchSourceDependencies: SearchSourceDependencies = {
      getConfig: uiSettings.get.bind(uiSettings),
      search,
      onResponse: handleResponse,
    };

    return {
      aggs: this.aggsService.start({ fieldFormats, uiSettings, indexPatterns, i18n }),
      search,
      showError: (e: Error) => {
        this.searchInterceptor.showError(e);
      },
      session: this.sessionService,
      sessionsClient: this.sessionsClient,
      searchSource: this.searchSourceService.start(indexPatterns, searchSourceDependencies),
    };
  }

  public stop() {
    this.aggsService.stop();
    this.searchSourceService.stop();
    this.searchInterceptor.stop();
  }
}
