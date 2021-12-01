// typescript import
import { NextApiRequest, NextApiResponse } from 'next';

// import
import initialLogger from './index';
import { LOG_TYPES } from './constants';

// definition
export default (req: NextApiRequest, res: NextApiResponse): void => {
  const logger = initialLogger({
    id: 'will be overridden',
    host: req.headers.host as string,
    userAgent: req.headers['user-agent'] as string,
    url: 'will be overridden',
    identity: 'will be overridden',
  });
  const { type, ...data } = req.body;
  const isTypeError = !type || !LOG_TYPES.includes(type);

  if (isTypeError)
    logger.warn({
      ...data,
      isTypeError,
    });
  else
    logger[type as typeof LOG_TYPES[number]]({
      ...data,
      isClient: true,
    });

  res.end();
};
