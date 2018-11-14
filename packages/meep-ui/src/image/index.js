import React from 'react';
import PropTypes from 'prop-types';

import Placeholder from './Placeholder';
import Img from './Img';

/* ImageSwitch */
const Image = ({ files, customTracking, /* 廣告追蹤用 */ ...props }) => {
  let handleClickTracking;
  if (customTracking?.status) {
    const { eventLabel, eventCategory } = customTracking;
    handleClickTracking = () => {
      if (window.fbq) window.fbq('track', eventLabel);
      if (window.gtag) {
        window.gtag('event', 'meepShop_click', {
          event_category:
            (eventCategory?.status && eventCategory?.value) || eventLabel,
          event_label: eventLabel,
        });
      }
    };
  }

  return !files || (files instanceof Array && files.length === 0) ? (
    <Placeholder {...props} />
  ) : (
    <Img
      {...props}
      {...(files instanceof Array ? files[0] : files)}
      handleClickTracking={handleClickTracking}
    />
  );
};

/**
 * If just using Image module, `files` must be a array.
 * Howerver, other module use `Image`, `files` can be an object.
 */
Image.propTypes = {
  files: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({}).isRequired),
    PropTypes.shape({}).isRequired,
  ]),
  customTracking: PropTypes.objectOf({
    eventLabel: PropTypes.string.isRequired,
    eventCategory: PropTypes.objectOf({
      status: PropTypes.bool.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

Image.defaultProps = {
  files: null,
  customTracking: null,
};

export default Image;
