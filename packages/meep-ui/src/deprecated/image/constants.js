import buildPropTypes from 'utils/buildPropTypes';

export const HASH_TYPE = buildPropTypes('hash', value => /^#/.test(value));

export const IMAGE_SUITABLE_WIDTHS = [
  120,
  240,
  320,
  640,
  720,
  1024,
  1280,
  1366,
  1600,
  1680,
  1920,
];
