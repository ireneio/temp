// import
import uuid from 'uuid/v4';

import browser from './browser';
import server from './server';
import { LOG_TYPES } from './constants';

// typescript definition
type loggerType = Record<
  typeof LOG_TYPES[number],
  (data: string | Error | object) => void
>;

// definition
const logger = typeof window !== 'undefined' ? browser : server;

export default (): loggerType => {
  const id = uuid();

  return LOG_TYPES.reduce(
    (result, type) => ({
      ...result,
      [type]: (data: Parameters<loggerType['info']>[0]) => {
        if (typeof data === 'string') logger[type]({ id, message: data });
        else if (data instanceof Error)
          logger[type]({ id, message: data.message, stack: data.stack });
        else logger[type]({ id, ...data });
      },
    }),
    {} as loggerType,
  );
};
