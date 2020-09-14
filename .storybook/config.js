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
    const addLink = href => {
      const link = document.createElement('link');

      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = href;

      document.getElementsByTagName('head')[0].appendChild(link);
    };

    addLink('https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.15/antd.min.css');
    addLink('combined.css');
  }

  require('./stories/images');
  require('./stories/icons');
  require('./stories/locales');
}, module);
