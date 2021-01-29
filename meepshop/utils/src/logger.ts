// import
import pino from 'pino';

// typescript definition
export type labelType = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

// definition
export const logger = pino({
  level: 'info',
  formatters: {
    level: label => ({
      severity: {
        trace: 'DEBUG',
        debug: 'DEBUG',
        info: 'INFO',
        warn: 'WARNING',
        error: 'ERROR',
        fatal: 'CRITICAL',
      }[label as labelType],
    }),
  },
  serializers: {
    err: pino.stdSerializers.err,
    error: pino.stdSerializers.err,
  },
});
