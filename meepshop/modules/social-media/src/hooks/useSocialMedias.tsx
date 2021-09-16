// import
import React, { useMemo } from 'react';

import {
  socialMediaFacebookIcon_react as SocialMediaFacebookIcon,
  socialMediaFacebookCircleIcon_react as SocialMediaFacebookCircleIcon,
  socialMediaFacebookCircleFilledIcon_react as SocialMediaFacebookCircleFilledIcon,
  socialMediaFacebookOriginIcon_react as SocialMediaFacebookOriginIcon,
  socialMediaLineIcon_react as SocialMediaLineIcon,
  socialMediaLineCircleIcon_react as SocialMediaLineCircleIcon,
  socialMediaLineCircleFilledIcon_react as SocialMediaLineCircleFilledIcon,
  socialMediaLineOriginIcon_react as SocialMediaLineOriginIcon,
  socialMediaTwitterIcon_react as SocialMediaTwitterIcon,
  socialMediaTwitterCircleIcon_react as SocialMediaTwitterCircleIcon,
  socialMediaTwitterCircleFilledIcon_react as SocialMediaTwitterCircleFilledIcon,
  socialMediaTwitterOriginIcon_react as SocialMediaTwitterOriginIcon,
  socialMediaWechatIcon_react as SocialMediaWechatIcon,
  socialMediaWechatCircleIcon_react as SocialMediaWechatCircleIcon,
  socialMediaWechatCircleFilledIcon_react as SocialMediaWechatCircleFilledIcon,
  socialMediaWechatOriginIcon_react as SocialMediaWechatOriginIcon,
} from '@meepshop/images';
import { useRouter } from '@meepshop/link';

// graphql typescript
import { SocialMediaModuleType } from '@meepshop/types/gqls/meepshop';

// typescript definition
type SocialMediasType = {
  key: string;
  url: string;
  Icon: React.ElementType<{ className?: string }>;
}[];

// definition
export default (
  socialMediaType: SocialMediaModuleType,
  showFacebook: boolean,
  showLine: boolean,
  showTwitter: boolean,
  showWechat: boolean,
): SocialMediasType => {
  const { domain, asPath } = useRouter();
  const url = `https://${domain}${asPath}`;

  return useMemo(
    () =>
      [
        showFacebook && {
          key: 'facebook',
          url: `//www.facebook.com/share.php?u=${url}`,
          Icon: {
            NONE: SocialMediaFacebookIcon,
            CIRCLE: SocialMediaFacebookCircleIcon,
            CIRCLE_FILLED: SocialMediaFacebookCircleFilledIcon,
            ORIGIN: SocialMediaFacebookOriginIcon,
          }[socialMediaType],
        },
        showLine && {
          key: 'line',
          url: `//line.naver.jp/R/msg/text/?${url}%0D%0A`,
          Icon: {
            NONE: SocialMediaLineIcon,
            CIRCLE: SocialMediaLineCircleIcon,
            CIRCLE_FILLED: SocialMediaLineCircleFilledIcon,
            ORIGIN: SocialMediaLineOriginIcon,
          }[socialMediaType],
        },
        showWechat && {
          key: 'wechat',
          url: `//api.addthis.com/oexchange/0.8/forward/wechat/offer?url=${url}`,
          Icon: {
            NONE: SocialMediaWechatIcon,
            CIRCLE: SocialMediaWechatCircleIcon,
            CIRCLE_FILLED: SocialMediaWechatCircleFilledIcon,
            ORIGIN: SocialMediaWechatOriginIcon,
          }[socialMediaType],
        },
        showTwitter && {
          key: 'twitter',
          url: `https://twitter.com/intent/tweet?text=${url}`,
          Icon: {
            NONE: SocialMediaTwitterIcon,
            CIRCLE: SocialMediaTwitterCircleIcon,
            CIRCLE_FILLED: SocialMediaTwitterCircleFilledIcon,
            ORIGIN: SocialMediaTwitterOriginIcon,
          }[socialMediaType],
        },
      ].filter(Boolean) as SocialMediasType,
    [socialMediaType, showFacebook, showLine, showTwitter, showWechat, url],
  );
};
