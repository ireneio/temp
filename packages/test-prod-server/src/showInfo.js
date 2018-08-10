import chalk from 'chalk';

export default (isSuccess, message) =>
  console.log(
    isSuccess
      ? chalk`{bgGreen  test-prod-server } ${message}`
      : chalk`{bgRed  test-prod-server } ${message}`,
  );
