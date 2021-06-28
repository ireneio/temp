// import
import { NextApiRequest, NextApiResponse } from 'next';

// definition
// TODO: remove after rewrite page-manager with dnd, meep-nginx also need to remove
export default (req: NextApiRequest, res: NextApiResponse): void => {
  res.redirect(
    `https://${req.query.domain}/admin/${req.query.pageId}/${
      req.cookies['x-meepshop-authorization-token']
    }${!req.query.pId ? '' : `?pId=${req.query.pId}`}`,
  );
};
