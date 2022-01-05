// import
import proxy from 'utils/proxy';

// definition
export default proxy(
  `${process.env.MEEPSHOP_API}/graphql`,
  (req, res, response) => {
    const token = response.headers.get('x-meepshop-authorization-token') || '';

    if (token)
      res.cookie('x-meepshop-authorization-token', token, {
        maxAge: 86400 * 1000 * 7,
        httpOnly: true,
      });
  },
);
