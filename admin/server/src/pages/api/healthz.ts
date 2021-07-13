// typescript import
import { NextApiRequest, NextApiResponse } from 'next';

// definition
export default (_: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).end();
};
