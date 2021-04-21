/* eslint-disable */
module.exports =
  process.env.NODE_ENV === 'test'
    ? require('./src/index.tsx')
    : require('./lib/index.js');
