// import
import { NextApiRequest, NextApiResponse } from 'next';

// typescript definition
interface CustomRes extends NextApiResponse {
  redirect: (url: string) => void;
}

// definition
// TODO: remove after rewrite page-manager with dnd, meep-nginx also need to remove
export default (req: NextApiRequest, res: CustomRes): void => {
  res.redirect(
    `https://${req.query.domain}/admin/${req.query.pageId}/${req.cookies['x-meepshop-authorization-token']}`,
  );
};
