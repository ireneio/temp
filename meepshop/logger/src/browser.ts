// import
import { LOG_TYPES } from './constants';

// typescript definition
type loggerType = Record<
  typeof LOG_TYPES[number],
  (data: { id: string }) => void
>;

// definition
export default LOG_TYPES.reduce(
  (result, type) => ({
    ...result,
    [type]: (data: Parameters<loggerType['info']>[0]) =>
      process.env.NODE_ENV !== 'production'
        ? // eslint-disable-next-line no-console
          console[type === 'fatal' ? 'log' : type](data)
        : fetch('/log', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              ...data,
              type,
            }),
          }),
  }),
  {} as loggerType,
);
