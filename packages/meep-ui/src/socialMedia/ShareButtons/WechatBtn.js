import React from 'react';
import PropTypes from 'prop-types';
import ShareLink from './ShareLink';
import WechatIcons from './WechatIcons';

const WechatBtn = ({ url, iconStyle, color }) => {
  let Icon;
  switch (iconStyle) {
    case 0: {
      Icon = WechatIcons.Grey;
      break;
    }
    case 1: {
      Icon = WechatIcons.Outline;
      break;
    }
    case 2: {
      Icon = WechatIcons.Solid;
      break;
    }
    case 3: {
      Icon = WechatIcons.Color;
      break;
    }
    default: {
      Icon = WechatIcons.Grey;
      break;
    }
  }
  return (
    <ShareLink
      href={`//api.addthis.com/oexchange/0.8/forward/wechat/offer?url=${url}`}
    >
      <Icon color={color} />
    </ShareLink>
  );
};

WechatBtn.propTypes = {
  url: PropTypes.string.isRequired,
  iconStyle: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default WechatBtn;
