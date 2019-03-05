export { IS_REQUIRED } from 'locale/form';

export const COUPON = {
  zh_TW: '請輸入優惠碼',
  en_US: 'Coupon Code',
  ja_JP: 'クーポンコード',
  vi_VN: 'Nhập mã khuyến mãi',
  TODO_LOCALE: true,
};

export const COUPON_BUTTON = {
  zh_TW: '確認折抵',
  en_US: 'Apply',
  ja_JP: '割引額確認',
  vi_VN: 'Xác nhận giảm giá',
  TODO_LOCALE: true,
};

export const ASK_CONFIRM_COUPON = {
  zh_TW: '請確認折抵',
  en_US: 'Please click "Apply"',
  ja_JP: '割引額をご確認ください',
  vi_VN: 'Xác nhận giảm giá',
  TODO_LOCALE: true,
};

export const ACTIVITY_PERIOD_IS = {
  zh_TW: '活動期間為',
  en_US: 'The campaign runs from',
  ja_JP: 'イベント期間は',
  vi_VN: 'Thời gian đợt khuyến mãi là',
  TODO_LOCALE: true,
};

export const COMMA = {
  zh_TW: '，',
  en_US: ', ',
  ja_JP: '、',
  vi_VN: ', ',
  TODO_LOCALE: true,
};

/** coupon success */
export const THIS_CODE_CAN_DISCOUNT = discount => ({
  zh_TW: `此優惠代碼可折扣 ${discount}`,
  en_US: `This coupon code can be redeemed for ${discount}`,
  ja_JP: `このクーポンコードは${discount}分としてご利用いただけます`,
  vi_VN: `Mã khuyến mãi này có thể giảm ${discount}`,
  TODO_LOCALE: true,
});

/** coupon error */
export const THIS_CODE_NOT_EXIST = {
  zh_TW: '此優惠碼不存在',
  en_US: 'This coupon code is invalid',
  ja_JP: '入力されたクーポンが存在しません',
  vi_VN: 'Mã khuyến mãi này không tồn tại',
  TODO_LOCALE: true,
};

export const YOUR_MEMBER_GROUP_CAN_NOT_USE_THIS_CODE = {
  zh_TW: '會員資格不符！無法使用此優惠碼',
  en_US: 'Membership is not qualified! This coupon code cannot apply.',
  ja_JP: '会員資格が適合していません！このサービスコードはご使用になれません',
  vi_VN: 'Không phù hợp điều kiện hội viên! Không thể sử dụng mã ưu đãi',
  TODO_LOCALE: true,
};

export const THIS_CODE_ACTIVITY_PERIOD = {
  zh_TW: '此優惠碼活動期間為：',
  en_US: 'The campaign runs from ',
  ja_JP: 'このクーポンコードの使用期間は',
  vi_VN: 'Thời gian sử dụng mã khuyến mãi này là',
  TODO_LOCALE: true,
};

export const THIS_CODE_USETIMES_FULL = {
  zh_TW: '此優惠代碼使用次數已達上限',
  en_US: 'This coupon code has reached the limit of number of uses.',
  ja_JP: 'このサービスコードの使用回数が上限に達しています',
  vi_VN: 'Mã ưu đãi này đã đạt giới hạn số lần sử dụng cao nhất',
  TODO_LOCALE: true,
};

export const THIS_CODE_HAS_TO_BUY_SPECIFIC_PRODUCTS = {
  zh_TW: '此優惠碼須購買指定商品才可使用',
  en_US: 'Specific products must be purchased to use this coupon code',
  ja_JP: 'このクーポンコードは特定商品のご購入にのみご使用いただけます',
  vi_VN: 'Mã khuyến mãi này phải mua sản phẩm chỉ định mới sử dụng được',
  TODO_LOCALE: true,
};

export const THIS_CODE_HAS_TO_SATISFY = value => ({
  zh_TW: `此優惠碼需滿 ${value} 才可使用`,
  en_US: `To use this coupon code, the total amount must reach ${value}`,
  ja_JP: `このクーポンコードは購入金額が${value}以上のときご使用いただけます`,
  vi_VN: `Mã khuyến mãi này phải đủ ${value} mới sử dụng được`,
  TODO_LOCALE: true,
});

export const AMOUNT_OF_PRODUCTS = {
  zh_TW: '件商品',
  en_US: 'item(s)',
  ja_JP: '点の商品',
  vi_VN: 'Mục sản phẩm',
  TODO_LOCALE: true,
};

export const THIS_CODE_IS_THE_SAME = {
  zh_TW: '此優惠碼與他人重複',
  en_US: 'This coupon code cannot be used due to duplication',
  ja_JP: 'クーポンコードが重複しています',
  vi_VN: 'Mã khuyến mãi này trùng lặp với người khác',
  TODO_LOCALE: true,
};

export const PLZ_ASK_SERVICE_OR_DELETE = {
  zh_TW: '，請洽商店客服人員協助處理，或清空優惠碼再結帳',
  en_US:
    ', please contact our Customer Service for assistance, or clear the coupon code then proceed to checkout.',
  ja_JP:
    '、ショップカスタマーサービスまでご連絡いただくか、クーポンコードを削除してお支払いください',
  vi_VN:
    ', xin liên hệ với nhân viên dịch vụ khách hàng của cửa hàng để giải quyết，hoặc xóa mã khuyến mãi rồi mới thanh toán',
  TODO_LOCALE: true,
};

export const PLZ_DELETE_THEN_CHECKOUT = {
  zh_TW: '，請清空優惠碼再結帳',
  en_US: ', please clear the coupon code then proceed to checkout.',
  ja_JP: '、クーポンコードを削除してお支払いください',
  vi_VN: ', xin hãy xóa mã khuyến mãi rồi mới thanh toán',
  TODO_LOCALE: true,
};
