import React from 'react';
import PropTypes from 'prop-types';
import ShareLink from './ShareLink';
import LineIcons from './LineIcons';

const LineBtn = ({ url, iconStyle, color }) => {
  let Icon;
  switch (iconStyle) {
    case 0: {
      Icon = LineIcons.Grey;
      break;
    }
    case 1: {
      Icon = LineIcons.Outline;
      break;
    }
    case 2: {
      Icon = LineIcons.Solid;
      break;
    }
    case 3: {
      Icon = LineIcons.Color;
      break;
    }
    default: {
      Icon = LineIcons.Grey;
      break;
    }
  }
  return (
    <ShareLink href={`//line.naver.jp/R/msg/text/?${url}%0D%0A`}>
      <Icon color={color} />
    </ShareLink>
  );
};

LineBtn.propTypes = {
  url: PropTypes.string.isRequired,
  iconStyle: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default LineBtn;
