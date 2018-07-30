export default (testing, message) => (rule, value, callback) => {
  if (!testing(value)) return callback(message);

  return callback();
};
