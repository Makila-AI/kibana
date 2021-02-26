/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { i18n } from '@kbn/i18n';
import { AppCategory } from '../types';

/** @internal */
export const DEFAULT_APP_CATEGORIES: Record<string, AppCategory> = Object.freeze({
  kibana: {
    id: 'kibana',
    label: 'Makila',
    // euiIconType: '../ui/favicons/favicon-32x32.png',
    euiIconType:
      'data:image/png;base64,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',
    order: 1000,
  },
  enterpriseSearch: {
    id: 'enterpriseSearch',
    label: i18n.translate('core.ui.enterpriseSearchNavList.label', {
      defaultMessage: 'Enterprise Search',
    }),
    order: 2000,
    euiIconType: 'logoEnterpriseSearch',
  },
  observability: {
    id: 'observability',
    label: i18n.translate('core.ui.observabilityNavList.label', {
      defaultMessage: 'Observability',
    }),
    euiIconType: 'logoObservability',
    order: 3000,
  },
  security: {
    id: 'securitySolution',
    label: i18n.translate('core.ui.securityNavList.label', {
      defaultMessage: 'Security',
    }),
    order: 4000,
    euiIconType: 'logoSecurity',
  },
  management: {
    id: 'management',
    label: i18n.translate('core.ui.managementNavList.label', {
      defaultMessage: 'Management',
    }),
    order: 5000,
    euiIconType: 'managementApp',
  },
});
