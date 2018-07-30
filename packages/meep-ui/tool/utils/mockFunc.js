import checkArguTypes from './checkArguTypes';

export default (funcName, arguTypes) =>
  jest.fn((...argus) => {
    checkArguTypes(funcName, arguTypes, argus);

    return argus;
  });
