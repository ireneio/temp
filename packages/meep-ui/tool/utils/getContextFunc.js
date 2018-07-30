import { action } from '@storybook/addon-actions';

import checkArguTypes from './checkArguTypes';

export default (funcName, ...arguTypes) => {
  if (process.env.NODE_ENV === 'test') {
    return require('./mockFunc').default(funcName, arguTypes); // eslint-disable-line global-require
  }

  return (...argus) => {
    checkArguTypes(funcName, arguTypes, argus);

    return action(funcName)(...argus);
  };
};
