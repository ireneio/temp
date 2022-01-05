// import
import proxy from 'utils/proxy';

// definition
export default proxy(
  `${process.env.MEEPSHOP_API}/auth/landing_page/access_token`,
  async (req, res, response) => {
    const { token, ...data } = await response.json();

    res.cookie('x-meepshop-authorization-landing-page-token', token, {
      maxAge: 86400 * 1 * 1000,
      httpOnly: true,
    });

    return JSON.stringify(data);
  },
);
