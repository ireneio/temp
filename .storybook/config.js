/* eslint-disable global-require */

import { configure } from '@storybook/react';
import { action } from '@storybook/addon-actions';

window.fbq = action('fbq');
window.gtag = action('gtag');

configure(() => {
  if (process.env.STORYBOOK_ENV === 'dev') {
    // eslint-disable-next-line import/no-unresolved
    require('./stories');
    require('./stories/readme');
  } else {
    const link = document.createElement('link');

    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'combined.css';

    document.getElementsByTagName('head')[0].appendChild(link);
  }

  require('./stories/images');
  require('./stories/icons');
  require('./stories/locales');
}, module);
