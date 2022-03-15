// import
import { serialize } from 'cookie';

// definition
export default (req, res) => {
  res.setHeader(
    'Set-Cookie',
    serialize('x-meepshop-authorization-token', '', {
      maxAge: 0,
      expires: new Date(),
      path: '/',
      httpOnly: true,
    }),
  );
  res.status(200).end();
};
