export { IS_REQUIRED } from 'locale/form';

export const CONFIRM_GO_TO = {
  zh_TW: '確認',
  en_US: 'OK',
  ja_JP: '確認',
  vi_VN: 'Xác nhận',
  TODO_LOCALE: true,
};

export const CART_IS_EMPTY = {
  zh_TW: '購物車內沒有商品，請返回商店繼續購物',
  en_US:
    'Your cart is empty, please return to the store and continue shopping.',
  ja_JP:
    '買い物かごに商品が入っていません、ショップに戻ってショッピングを継続して下さい',
  vi_VN:
    'Xe hàng không có sản phẩm, xin vui lòng trở về cửa hàng để tiếp tục mua hàng',
  TODO_LOCALE: true,
};

export const CONTINUE_SHOPPING = {
  zh_TW: '繼續購物',
  en_US: 'Continue Shopping',
  ja_JP: 'ショッピングを続ける',
  vi_VN: 'Tiếp tục mua hàng',
  TODO_LOCALE: true,
};

export const TOTAL_PRICE = {
  zh_TW: '訂單總金額',
  en_US: 'Total',
  ja_JP: '注文合計金額',
  vi_VN: 'Tổng số đơn hàng',
  TODO_LOCALE: true,
};

export const CHECK_DETAIL = {
  zh_TW: '查看明細',
  en_US: 'Details',
  ja_JP: '明細を確認',
  vi_VN: 'Xem chi tiết',
  TODO_LOCALE: true,
};

/** userInfo */
export const USER_INFO = {
  zh_TW: '會員資料',
  en_US: 'Member Info',
  ja_JP: '会員情報',
  vi_VN: 'thông tin hội viên',
  TODO_LOCALE: true,
};

export const EMAIL = {
  zh_TW: '請輸入註冊信箱',
  en_US: 'Sign up with your email address',
  ja_JP: 'ご登録のメールアドレスを入力してください',
  vi_VN: 'Xin nhập hộp thư đăng ký',
  TODO_LOCALE: true,
};

export const NOT_EMAIL = {
  zh_TW: '信箱格式錯誤',
  en_US: 'Please enter a valid email address.',
  ja_JP: 'メールアドレスに誤りがあります',
  vi_VN: 'hộp thư sai',
  TODO_LOCALE: true,
};

export const IS_REGISTER = {
  zh_TW: '此信箱已註冊',
  en_US: 'This email address is already registered',
  ja_JP: 'このメールアドレスはすでに使われています',
  vi_VN: 'Hộp thư này đã được đăng ký',
  TODO_LOCALE: true,
};

export const PASSWORD = {
  zh_TW: '請設定會員密碼',
  en_US: 'Password',
  ja_JP: '会員パスワードを設定してください',
  vi_VN: 'Xin cài đặt mật khẩu hội viên',
  TODO_LOCALE: true,
};

export const NAME = {
  zh_TW: '姓名',
  en_US: 'Full Name',
  ja_JP: '氏名',
  vi_VN: 'tên',
  TODO_LOCALE: true,
};

export const NAME_TOO_LONG = {
  zh_TW: '姓名欄位不得超過10個字',
  en_US: '',
  TODO_LOCALE: true,
};

export const MOBILE = {
  zh_TW: '手機',
  en_US: 'Mobile',
  ja_JP: '携帯電話',
  vi_VN: 'Điện Thoại',
  TODO_LOCALE: true,
};

/** payment */
export const PAYMENT_INFO = {
  zh_TW: '購物方式',
  en_US: 'Payment / Delivery Type',
  ja_JP: '支払方法',
  vi_VN: 'Cách thức mua hàng',
  TODO_LOCALE: true,
};

export const REWARD_POINTS = {
  zh_TW: '購物金',
  en_US: 'Reward Points',
  ja_JP: 'ポイント',
  vi_VN: 'tiền mua hàng',
  TODO_LOCALE: true,
};

export const POINTS_LIMIT = canUsePoints => ({
  zh_TW: `折抵金額上限為 ${canUsePoints} 元`,
  en_US: `The maximum amount you can redeem is ${canUsePoints}. `,
  ja_JP: `最大で${canUsePoints}元をご利用いただけます`,
  vi_VN: `Số tiền chiết khấu tối đa là  ${canUsePoints} tệ`,
  TODO_LOCALE: true,
});

export const REWARD_POINTS_CAN_USE = points => ({
  zh_TW: `您目前的購物金為 ${points} 元，`,
  en_US: `You have ${points} reward points. `,
  ja_JP: `お客様の保有ポイントは${points}元分です。`,
  vi_VN: `Số tiền hiện tại của bạn là ${points} tệ，`,
  TODO_LOCALE: true,
});

/** receiver */
export const RECEIVER_INFO = {
  zh_TW: '收件人資料',
  en_US: 'Recipient Info',
  ja_JP: '受取人情報',
  vi_VN: 'thông tin người nhận',
  TODO_LOCALE: true,
};

export const SAME_AS_USER_INFO = {
  zh_TW: '同會員資料',
  en_US: 'Same as member info',
  ja_JP: '会員情報と同じ',
  vi_VN: 'Giống thông tin hội viên',
  TODO_LOCALE: true,
};

export const RECEIVER_TEMPLATE = {
  zh_TW: '收件人範本',
  en_US: 'Choose from Address Book',
  ja_JP: '受取人テンプレート',
  vi_VN: 'Mẫu người nhận',
  TODO_LOCALE: true,
};

export const NOTES = {
  zh_TW: '訂單備註',
  en_US: 'Order Notes',
  ja_JP: '注文備考',
  vi_VN: 'Ghi chú đặt hàng',
  TODO_LOCALE: true,
};

export const SAVE_AS_RECEIVER_TEMPLATE = {
  zh_TW: '儲存為收件人範本',
  en_US: 'Add this Recipient to Address Book',
  ja_JP: '受取人テンプレートとして保存',
  vi_VN: 'Lưu mẫu người nhận',

  TODO_LOCALE: true,
};

export const CONFIRM = {
  zh_TW: '確認送出',
  en_US: 'Place Order',
  ja_JP: '確認して送信',
  vi_VN: 'xác nhận giao hàng',
  TODO_LOCALE: true,
};

export const PAY_LATER = {
  zh_TW: '稍後付款',
  en_US: 'Pay Later',
  ja_JP: '後で支払う',
  vi_VN: 'trả sau',
  TODO_LOCALE: true,
};

export const PAY_NOW = {
  zh_TW: '立即付款',
  en_US: 'Pay Now',
  ja_JP: '今すぐ支払う',
  vi_VN: 'trả tiền ngay',
  TODO_LOCALE: true,
};
