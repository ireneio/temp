import PropTypes from 'prop-types';

export const RATIOS = {
  '16:9': 9 / 16,
  '4:3': 3 / 4,
  '16:10': 10 / 16,
};

export const ASPECT_TYPE = PropTypes.oneOf(Object.keys(RATIOS));

export const DEFAULT_VIDEO_URL =
  'https://www.youtube.com/watch?v=L8FK64bLJKE&feature=youtu.be';
