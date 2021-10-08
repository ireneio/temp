// typescript import
import { NextApiRequest, NextApiResponse } from 'next';

import { loggerType } from './index';

// import
import initialLogger from './index';

// definition
export default (req: NextApiRequest, res: NextApiResponse): void => {
  const logger = initialLogger({
    id: 'will be overridden',
    host: req.headers.host as string,
    userAgent: req.headers['user-agent'] as string,
    url: 'will be overridden',
  });
  const { type, ...data } = req.body;

  logger[(type || 'info') as keyof loggerType]({
    ...data,
    isClient: true,
  });
  res.end();
};
