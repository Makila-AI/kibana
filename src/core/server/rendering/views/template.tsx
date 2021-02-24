/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, createElement } from 'react';

import { RenderingMetadata } from '../types';
import { Fonts } from './fonts';
import { Styles } from './styles';

interface Props {
  metadata: RenderingMetadata;
}

export const Template: FunctionComponent<Props> = ({
  metadata: {
    uiPublicUrl,
    locale,
    darkMode,
    injectedMetadata,
    i18n,
    bootstrapScriptUrl,
    strictCsp,
  },
}) => {
  const logo = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <image
        id="image0"
        width="32"
        height="32"
        x="0"
        y="0"
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALUAAAC1CAMAAAAujU6bAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAaVBMVEX///////////////8WI0BeZ3u2usNQWW/w8fNtdYeZnqsyPlfT1ttBTGMkMEunrLfi4+d7g5OKkZ/FyM///O//7I//3j//+d//8a//1g//0wD/7p//5m//6X//9L//41//2B//98//2y+zZymSAAAAA3RSTlNAgCCKAfGdAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB+MFCQYIGtjaDLYAAAOsSURBVHja7dvteppAEAXgtKJRk4iC0Uqar97/RTaJj2EOzMK2jbsnzZl/Bja8yM7uAOvF5BPGxUVugdTcIbXUUrOE1FJLzRJSSy01S0gttdQsIbXUUrOE1FJLzRJSSy01S0gttdQs8WXUhRPT6NYzp/VlJnUxj229YFIvIxvPCyb1VWTjJZW6uI5rfMOlXkS1vS641KuofFyQqYsyoul8xaa+iWhaFmzqYj3e9JJPvRltuS741KvRlhtCdTEba3lFogbHWAk1C7VMrcYJeiQfp7Y7VRnVNYwKwyUUFE6brGoYgYdLKLgu66zqyQo/DoTtydNJXjWMZkMlFBROs8xqmDmGSihbOL10pbxqnKXDJRQUTlV2NeRjuISC3dbZ1ZiPwSHbXpLX6Si3GvIxVEKtu61yqzEfA43sqb0N67nVMFOHSig7WC8p1FAV+SUU7DKnUGMF6uajvRzHqSi/2grcEmo93CaPGlBeCbXsb8+vxnys+01sFypp1JBs/RKqNltPpQqBGvOxV0ItnHNiUEPF3y2hoHA6PcVkUMPdVbeEKr1tDGp87Nh5Kmyf/r5fBwq1TbhOCWXHxbZMoVBDPmIJtXHPh0Mdzkebi+10z6GGfLQl1MzncagxH00JZedNcw1I1JCP1fuf/VykUcMA15ZQS/dceNSlu8GOLbb0ZlHDxH0qN2y/gdscFjXm47z/N7ilpFHDk7yy9/3j7QKNGvLxWCbZvl7BvjxqyMfr7nngbXBqdTggH19LDttn4l60Z1BDobTqfK5p1XCzXkLhFLuAJIManpxeQj+PXayTQ41PqW3hFL0wKoMaimnv1pxTHXpVXlOrA8sSYhaPnFu9vd29xO3e2+YvAYlZqHNm9Y9D8xaHW2eju9zGeaN3t2vjZwL1XfMe3uG85RROLt63/6XZnV+9P5jjPfS3V47aWeyXWP3YDB/PyUcvFxOr7VfdNE5GTntqLxfTqveA9rpIb62y+zYvrfphVN3LR/fNaVr1dlzdzUf3rVjifv0E6q2zRycf/TuVxGp7uObR3WUxmovJ1VvzZR/cSR0fngXerCdWT57bse8usIvNx8rfJbV6st8dD/brObRHXbURWDHycN9G6OQ/VP3ydb8e6/lvWn5MfJlf+RCE1FJLzRJfRV1WHx/12dWB37z8U1R/aJBaaqmllvp/VX/OuZEhpJZaapaQWmqpWUJqqaVmCamllpolpJZaapaQWmqpWUJqqaVmCamllpolpJZ6TP3tE8b335MYwq0mkRtVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTA1LTA5VDEzOjA4OjI2LTA3OjAwboq6xAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wNS0wOVQxMzowODoyNi0wNzowMB/XAngAAAAASUVORK5CYII="
      />
    </svg>
  );
  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width" />
        <title>Makila</title>
        <Fonts url={uiPublicUrl} />
        {/* Favicons (generated from http://realfavicongenerator.net/) */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${uiPublicUrl}/favicons/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${uiPublicUrl}/favicons/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${uiPublicUrl}/favicons/favicon-16x16.png`}
        />
        <link rel="manifest" href={`${uiPublicUrl}/favicons/manifest.json`} />
        <link
          rel="mask-icon"
          color="#e8488b"
          href={`${uiPublicUrl}/favicons/safari-pinned-tab.svg`}
        />
        <link rel="shortcut icon" href={`${uiPublicUrl}/favicons/favicon.ico`} />
        <meta name="msapplication-config" content={`${uiPublicUrl}/favicons/browserconfig.xml`} />
        <meta name="theme-color" content="#ffffff" />
        <Styles darkMode={darkMode} />

        {/* Inject stylesheets into the <head> before scripts so that KP plugins with bundled styles will override them */}
        <meta name="add-styles-here" />
        <meta name="add-scripts-here" />
        <link
          rel="stylesheet"
          type="text/css"
          href={`${uiPublicUrl}/makila/main.${darkMode ? 'dark' : 'light'}.css`}
        />
      </head>
      <body>
        {createElement('kbn-csp', {
          data: JSON.stringify({ strictCsp }),
        })}
        {createElement('kbn-injected-metadata', { data: JSON.stringify(injectedMetadata) })}
        <div
          className="kbnWelcomeView"
          id="kbn_loading_message"
          style={{ display: 'none' }}
          data-test-subj="kbnLoadingMessage"
        >
          <div className="kbnLoaderWrap">
            {logo}
            <div
              className="kbnWelcomeText"
              data-error-message={i18n('core.ui.welcomeErrorMessage', {
                defaultMessage:
                  'Elastic did not load properly. Check the server output for more information.',
              })}
            >
              {i18n('core.ui.welcomeMessage', { defaultMessage: 'Loading Elastic' })}
            </div>
            <div className="kbnProgress" />
          </div>
        </div>

        <div className="kbnWelcomeView" id="kbn_legacy_browser_error" style={{ display: 'none' }}>
          {logo}

          <h2 className="kbnWelcomeTitle">
            {i18n('core.ui.legacyBrowserTitle', {
              defaultMessage: 'Please upgrade your browser',
            })}
          </h2>
          <div className="kbnWelcomeText">
            {i18n('core.ui.legacyBrowserMessage', {
              defaultMessage:
                'This Elastic installation has strict security requirements enabled that your current browser does not meet.',
            })}
          </div>
        </div>

        <script>
          {`
            // Since this is an unsafe inline script, this code will not run
            // in browsers that support content security policy(CSP). This is
            // intentional as we check for the existence of __kbnCspNotEnforced__ in
            // bootstrap.
            window.__kbnCspNotEnforced__ = true;
          `}
        </script>
        <script src={bootstrapScriptUrl} />
      </body>
    </html>
  );
};
