import React from 'react';
import PropTypes from 'prop-types';
import ShareLink from './ShareLink';
import FacebookIcons from './FacebookIcons';

const FacebookBtn = ({ url, iconStyle, color }) => {
  let Icon;
  switch (iconStyle) {
    case 0: {
      Icon = FacebookIcons.Grey;
      break;
    }
    case 1: {
      Icon = FacebookIcons.Outline;
      break;
    }
    case 2: {
      Icon = FacebookIcons.Solid;
      break;
    }
    case 3: {
      Icon = FacebookIcons.Color;
      break;
    }
    default: {
      Icon = FacebookIcons.Grey;
      break;
    }
  }
  return (
    <ShareLink href={`//www.facebook.com/share.php?u=${url}`}>
      <Icon color={color} />
    </ShareLink>
  );
};

FacebookBtn.propTypes = {
  url: PropTypes.string.isRequired,
  iconStyle: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default FacebookBtn;
