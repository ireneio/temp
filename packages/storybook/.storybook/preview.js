if (process.env.STORYBOOK_ENV === 'dev') {
  // eslint-disable-next-line global-require
  require('@meepshop/utils/lib/styles');
  // eslint-disable-next-line global-require, import/no-unresolved
  require('./combined.less');
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
