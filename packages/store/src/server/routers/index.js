const api = require('./api');
const signin = require('./signin');
const fbAuth = require('./fbAuth');
const fbAuthForLine = require('./fbAuthForLine');
const paymentOfHitrust = require('./paymentOfHitrust');
const paymentOfAllpay = require('./paymentOfAllpay');
const log = require('./log');

module.exports = {
  api,
  signin,
  fbAuth,
  fbAuthForLine,
  paymentOfHitrust,
  paymentOfAllpay,
  log,
};
