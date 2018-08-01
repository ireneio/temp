import {
  facebook as FacebookIcon,
  twitter as TwitterIcon,
  wechat as WeChatIcon,
  whatsapp as WhatsAppIcon,
} from 'react-icons/fa';

import LineIcon from './LineIcon';

export const DEFAULT_URL = 'http://www.google.com.tw';

export const BRANDS = {
  facebook: {
    url: 'http://www.facebook.com/share.php?u=',
    Icon: FacebookIcon,
  },
  line: {
    url: 'http://line.naver.jp/R/msg/text/?',
    Icon: LineIcon,
  },
  twitter: {
    url: 'https://twitter.com/intent/tweet?text=',
    Icon: TwitterIcon,
  },
  weChat: {
    url: 'http://api.addthis.com/oexchange/0.8/forward/wechat/offer?url=',
    Icon: WeChatIcon,
  },
  whatsApp: {
    url: 'whatsapp://send?text=',
    Icon: WhatsAppIcon,
  },
};
