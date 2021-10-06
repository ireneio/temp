// typescript import
import { NextApiRequest, NextApiResponse } from 'next';

import { loggerType } from './index';

// import
import uuid from 'uuid/v4';

import initialLogger from './index';

// definition
export default (req: NextApiRequest, res: NextApiResponse): void => {
  const logger = initialLogger({
    id: uuid(),
    host: req.headers.host as string,
    userAgent: req.headers['user-agent'] as string,
    url: req.url as string,
  });
  const { type, ...data } = req.body;

  logger[(type || 'info') as keyof loggerType]({
    ...data,
    isClient: true,
  });
  res.end();
};
