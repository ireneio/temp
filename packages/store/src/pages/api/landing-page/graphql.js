// import
import graphql from '../graphql';

export default (req, res) => {
  req.cookies['x-meepshop-authorization-token'] =
    req.cookies['x-meepshop-authorization-landing-page-token'] || null;

  return graphql(req, res);
};
