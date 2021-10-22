// definition
export default (req, res) => {
  res.cookie('x-meepshop-authorization-token', '', {
    maxAge: 0,
    httpOnly: true,
  });
  res.status(200).end();
};
