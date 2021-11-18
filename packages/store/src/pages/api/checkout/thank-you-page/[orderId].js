// FIXME: remove
// definition
export default (req, res) => {
  res.redirect(req.url.replace(/\/api/, ''));
};
