// definition
export default (req, res) => {
  res.redirect(req.url.replace(/\/api\/redirect/, '/'));
};
