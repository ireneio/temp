// import
import pino from 'pino';

import { LOG_TYPES } from './constants';

// definition
export default pino({
  level: process.env.LOG_LEVEL || 'info',
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
