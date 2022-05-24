// definition
export default (req, res) => {
  res.redirect(302, req.url.replace(/\/api\/redirect/, ''));
};
