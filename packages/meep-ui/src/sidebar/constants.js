import buildPropTypes from 'utils/buildPropTypes';
import isInt from 'validator/lib/isInt';

export const WIDTH_TYPE = buildPropTypes('width', value =>
  isInt(value, { min: 0, max: 500 }),
);
export const PADDING_TOP_TYPE = buildPropTypes('paddingTop', value =>
  isInt(value, { min: 0, max: 300 }),
);
