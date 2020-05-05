import React from 'react';
import PropTypes from 'prop-types';

import Placeholder from './Placeholder';
import Img from './Img';

/* ImageSwitch */
const Image = ({ files, ...props }) =>
  !files || (files instanceof Array && files.length === 0) ? (
    <Placeholder {...props} />
  ) : (
    <Img {...props} {...(files instanceof Array ? files[0] : files)} />
  );

/**
 * If just using Image module, `files` must be a array.
 * Howerver, other module use `Image`, `files` can be an object.
 */
Image.propTypes = {
  files: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({}).isRequired),
    PropTypes.shape({}).isRequired,
  ]),
};

Image.defaultProps = {
  files: null,
};

export default Image;
