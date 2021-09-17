// import
import pino from 'pino';
import getConfig from 'next/config';

import { LOG_TYPES } from './constants';

// definition
// FIXME: remove after removing express
const LOG_LEVEL =
  getConfig()?.publicRuntimeConfig.LOG_LEVEL || process.env.LOG_LEVEL || 'info';

export default pino({
  level: LOG_LEVEL,
  formatters: {
    level: (label: typeof LOG_TYPES[number]) => ({
      severity: {
        trace: 'DEBUG',
        debug: 'DEBUG',
        info: 'INFO',
        warn: 'WARNING',
        error: 'ERROR',
        fatal: 'CRITICAL',
      }[label],
    }),
  },
  serializers: {
    err: pino.stdSerializers.err,
    error: pino.stdSerializers.err,
  },
});
