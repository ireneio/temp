export default {
  storeSetting: {
    colors: ['#FFFFFF', '#FFFFFF', '#5F5F5F', '#323232', '#E6E6E6', '#CCCCCC'],
    cname: '',
  },
  location: {
    // eslint-disable-next-line no-restricted-globals
    host: process.env.NODE_ENV === 'test' ? 'localhost' : location.host,
    pathname: '/',
    search: '',
  },
  locale: 'zh_TW',
};
