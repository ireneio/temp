// typescript import
import { NextApiRequest, NextApiResponse } from 'next';

import { loggerType } from './index';

// import
import initialLogger from './index';

// definition
export default (req: NextApiRequest, res: NextApiResponse): void => {
  const logger = initialLogger();
  const { type, ...data } = req.body;

  logger[(type || 'info') as keyof loggerType]({
    ...data,
    type: 'client error',
  });
  res.end();
};
