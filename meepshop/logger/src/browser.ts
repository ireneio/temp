// import
import getConfig from 'next/config';

import { LOG_TYPES } from './constants';

// typescript definition
type loggerType = Record<
  typeof LOG_TYPES[number],
  (data: { id: string }) => void
>;

// definition
// FIXME: remove after removing express
const LOG_LEVEL =
  getConfig()?.publicRuntimeConfig.LOG_LEVEL || process.env.LOG_LEVEL || 'info';

export default LOG_TYPES.reduce(
  (result, type) => ({
    ...result,
    [type]: (data: Parameters<loggerType['info']>[0]) => {
      if (LOG_TYPES.indexOf(type) < LOG_TYPES.indexOf(LOG_LEVEL))
        return undefined;

      return process.env.NODE_ENV !== 'production'
        ? // eslint-disable-next-line no-console
          console[type === 'fatal' ? 'log' : type](data)
        : fetch('/api/log', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              ...data,
              url: `${window.location.pathname}${window.location.search}`,
              type,
            }),
          });
    },
  }),
  {} as loggerType,
);
