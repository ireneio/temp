// import
import browser from './browser';
import server from './server';
import { LOG_TYPES } from './constants';

// typescript definition
export interface LoggerInfoType {
  id: string;
  host: string;
  userAgent: string;
  url: string;
}

export type loggerType = Record<
  typeof LOG_TYPES[number],
  (data: string | Error | { id?: string; [key: string]: unknown }) => void
>;

// definition
const logger = typeof window !== 'undefined' ? browser : server;
const BROWSER_INIT_INFO = {
  id: 'can`t be used',
  host: 'can`t be used',
  userAgent: 'can`t be used',
  url: 'can`t be used',
};

export default ({
  id,
  ...rest
}: LoggerInfoType = BROWSER_INIT_INFO): loggerType => {
  const info = typeof window !== 'undefined' ? { id } : { ...rest, id };

  return LOG_TYPES.reduce(
    (result, type) => ({
      ...result,
      [type]: (data: Parameters<loggerType['info']>[0]) => {
        if (typeof data === 'string') logger[type]({ ...info, message: data });
        else if (data instanceof Error)
          logger[type]({ ...info, message: data.message, stack: data.stack });
        else logger[type]({ ...info, ...data });
      },
    }),
    {} as loggerType,
  );
};
