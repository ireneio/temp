/* eslint-disable */
module.exports =
  process.env.NODE_ENV === 'test'
    ? require('./src/index.ts')
    : require('./lib/index.js');
