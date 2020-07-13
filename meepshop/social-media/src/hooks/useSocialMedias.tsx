// import
import React, { useMemo } from 'react';

import FacebookIcon from '../images/FacebookIcon';
import FacebookCircleIcon from '../images/FacebookCircleIcon';
import FacebookCircleFilledIcon from '../images/FacebookCircleFilledIcon';
import FacebookOriginIcon from '../images/FacebookOriginIcon';

import LineIcon from '../images/LineIcon';
import LineCircleIcon from '../images/LineCircleIcon';
import LineCircleFilledIcon from '../images/LineCircleFilledIcon';
import LineOriginIcon from '../images/LineOriginIcon';

import TwitterIcon from '../images/TwitterIcon';
import TwitterCircleIcon from '../images/TwitterCircleIcon';
import TwitterCircleFilledIcon from '../images/TwitterCircleFilledIcon';
import TwitterOriginIcon from '../images/TwitterOriginIcon';

import WechatIcon from '../images/WechatIcon';
import WechatCircleIcon from '../images/WechatCircleIcon';
import WechatCircleFilledIcon from '../images/WechatCircleFilledIcon';
import WechatOriginIcon from '../images/WechatOriginIcon';

// graphql typescript
import { socialMediaFragment } from '../__generated__/socialMediaFragment';

// definition
export default (
  socialMediaType: 'NONE' | 'CIRCLE' | 'CIRCLE_FILLED' | 'ORIGIN',
  color: socialMediaFragment['color'],
  showFacebook: boolean,
  showLine: boolean,
  showTwitter: boolean,
  showWechat: boolean,
  url: string,
): ({ key: string; url: string; icon: React.ReactElement } | null)[] =>
  useMemo(
    () =>
      [
        showFacebook && {
          key: 'facebook',
          url: `//www.facebook.com/share.php?u=${url}`,
          icon: {
            NONE: <FacebookIcon color={color} />,
            CIRCLE: <FacebookCircleIcon color={color} />,
            CIRCLE_FILLED: <FacebookCircleFilledIcon color={color} />,
            ORIGIN: <FacebookOriginIcon />,
          }[socialMediaType],
        },
        showLine && {
          key: 'line',
          url: `//line.naver.jp/R/msg/text/?${url}%0D%0A`,
          icon: {
            NONE: <LineIcon color={color} />,
            CIRCLE: <LineCircleIcon color={color} />,
            CIRCLE_FILLED: <LineCircleFilledIcon color={color} />,
            ORIGIN: <LineOriginIcon />,
          }[socialMediaType],
        },
        showTwitter && {
          key: 'twitter',
          url: `https://twitter.com/intent/tweet?text=${url}`,
          icon: {
            NONE: <TwitterIcon color={color} />,
            CIRCLE: <TwitterCircleIcon color={color} />,
            CIRCLE_FILLED: <TwitterCircleFilledIcon color={color} />,
            ORIGIN: <TwitterOriginIcon />,
          }[socialMediaType],
        },
        showWechat && {
          key: 'wechat',
          url: `//api.addthis.com/oexchange/0.8/forward/wechat/offer?url=${url}`,
          icon: {
            NONE: <WechatIcon color={color} />,
            CIRCLE: <WechatCircleIcon color={color} />,
            CIRCLE_FILLED: <WechatCircleFilledIcon color={color} />,
            ORIGIN: <WechatOriginIcon />,
          }[socialMediaType],
        },
      ].filter(Boolean) as ({
        key: string;
        url: string;
        icon: React.ReactElement;
      } | null)[],
    [
      socialMediaType,
      color,
      showFacebook,
      showLine,
      showTwitter,
      showWechat,
      url,
    ],
  );
