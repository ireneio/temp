import React from 'react';
import PropTypes from 'prop-types';
import ShareLink from './ShareLink';
import TwitterIcons from './TwitterIcons';

const TwitterBtn = ({ url, iconStyle, color }) => {
  let Icon;
  switch (iconStyle) {
    case 0: {
      Icon = TwitterIcons.Grey;
      break;
    }
    case 1: {
      Icon = TwitterIcons.Outline;
      break;
    }
    case 2: {
      Icon = TwitterIcons.Solid;
      break;
    }
    case 3: {
      Icon = TwitterIcons.Color;
      break;
    }
    default: {
      Icon = TwitterIcons.Grey;
      break;
    }
  }
  return (
    <ShareLink href={`https://twitter.com/intent/tweet?text=${url}`}>
      <Icon color={color} />
    </ShareLink>
  );
};

TwitterBtn.propTypes = {
  url: PropTypes.string.isRequired,
  iconStyle: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default TwitterBtn;
