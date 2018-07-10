export default [
  {
    id: 'order-manager',
    title: {
      en_US: 'Order manager',
      zh_TW: '訂單管理',
      ja_JP: 'ご注文管理',
      vi_VN: 'Order manager',
    },
    action: 2,
    params: { url: '/orders' },
  },
  {
    id: 'member-info',
    title: {
      en_US: 'Member info',
      zh_TW: '會員資料',
      ja_JP: '会員データ',
      vi_VN: 'Member info',
    },
    action: 2,
    params: { url: '/settings' },
  },
  {
    id: 'recipienta',
    title: {
      en_US: 'Recipients',
      zh_TW: '收件人範本',
      ja_JP: '受信者テンプレート',
      vi_VN: 'Recipients',
    },
    action: 2,
    params: { url: '/recipients' },
  },
  {
    id: 'change-password',
    title: {
      en_US: 'Change password',
      zh_TW: '更改密碼',
      ja_JP: 'パスワードを変更する',
      vi_VN: 'Change password',
    },
    action: 2,
    params: { url: '/passwordChange' },
  },
  {
    id: 'favorites',
    title: {
      en_US: 'Wish list',
      zh_TW: '我的收藏',
      ja_JP: 'お気に入り',
      vi_VN: 'Wish list',
    },
    action: 2,
    params: { url: '/wishlist' },
  },
  {
    id: 'points',
    title: {
      en_US: 'Reward Points',
      zh_TW: '購物金',
      ja_JP: 'ポイント',
      vi_VN: 'Reward Points',
    },
    action: 2,
    params: { url: '/rewardPoints' },
  },
  {
    id: 'logout',
    title: {
      en_US: 'logout',
      zh_TW: '登出',
      ja_JP: 'ログアウト',
      vi_VN: 'logout',
    },
    action: 'logout',
  },
];
