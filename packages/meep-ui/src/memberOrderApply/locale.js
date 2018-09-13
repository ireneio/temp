import { warning } from 'fbjs';

export const TITLE = (type, step) => {
  switch (type) {
    case 'return':
      return {
        zh_TW: `退貨申請${step ? '確認' : ''}`,
        en_US: 'Return',
        ja_JP: '返品申込',
        vi_VN: 'Đăng ký hoàn trả',
        TODO_LOCALE: true,
      };
    case 'replace':
      return {
        zh_TW: `換貨申請${step ? '確認' : ''}`,
        en_US: 'Replacement',
        ja_JP: '交換申込',
        vi_VN: 'Đăng ký thay thế',
        TODO_LOCALE: true,
      };
    default:
      warning(process.env.NODE_ENV === 'production', `Uknown [type] ${type}`);
      return null;
  }
};

export const ORDER_NO = {
  zh_TW: '訂單編號：',
  en_US: 'Order Number: ',
  ja_JP: '注文番号：',
  vi_VN: 'Số hiệu đơn hàng: ',
  TODO_LOCALE: true,
};

export const CREATED_ON = {
  zh_TW: '訂購日：',
  en_US: 'Order Date: ',
  ja_JP: '注文日：',
  vi_VN: 'Ngày đặt hàng: ',
  TODO_LOCALE: true,
};

export const PRODUCT_TITLE = {
  zh_TW: '商品名稱',
  en_US: 'Item',
  ja_JP: '商品名',
  vi_VN: 'Tên sản phẩm',
  TODO_LOCALE: true,
};

export const PRODUCT_SPEC = {
  zh_TW: '規格',
  en_US: 'Spec',
  ja_JP: '仕様',
  vi_VN: 'Quy cách',
  TODO_LOCALE: true,
};

export const PRODUCT_QUANTITY = {
  zh_TW: '數量',
  en_US: 'QTY',
  ja_JP: '数量',
  vi_VN: 'Số lượng',
  TODO_LOCALE: true,
};

export const PRODUCT_PRICE = {
  zh_TW: '價格',
  en_US: 'Price',
  ja_JP: '価格',
  vi_VN: 'Dơn giá',
  TODO_LOCALE: true,
};

export const PRODUCT_SUBTOTAL = {
  zh_TW: '小計',
  en_US: 'Subtotal',
  ja_JP: '小計',
  vi_VN: 'Tổng',
  TODO_LOCALE: true,
};

export const REASON = (type, input) => ({
  zh_TW: `${input ? '輸入' : ''}${type === 'replace' ? '換貨' : '退貨'}原因`,
  en_US: 'Description',
  ja_JP: '理由',
  vi_VN: 'Nguyên nhân',
  TODO_LOCALE: true,
});

export const RECIPIENT = {
  zh_TW: '換貨收件人資訊',
  en_US: 'Recipient Info',
  ja_JP: '交換品受取人情報',
  vi_VN: 'Thông tin người nhận',
  TODO_LOCALE: true,
};

export const RECIPIENT_NAME = {
  zh_TW: '姓名',
  en_US: 'Full Name',
  ja_JP: '氏名',
  vi_VN: 'Tên',
  TODO_LOCALE: true,
};

export const RECIPIENT_MOBILE = {
  zh_TW: '手機',
  en_US: 'Mobile',
  ja_JP: '携帯電話',
  vi_VN: 'Điện Thoại',
  TODO_LOCALE: true,
};

export const RECIPIENT_ADDRESS = {
  zh_TW: '地址',
  en_US: 'Address',
  ja_JP: '住所',
  vi_VN: 'Địa Chỉ',
  TODO_LOCALE: true,
};

export const RECEDE = {
  zh_TW: '返回',
  en_US: 'Back',
  ja_JP: '戻る',
  vi_VN: 'Phản Hồi',
  TODO_LOCALE: true,
};

export const PROCEED = step => ({
  zh_TW: step ? '確認' : '下一步',
  en_US: 'Next',
  ja_JP: '次へ',
  vi_VN: 'Bước sau',
  TODO_LOCALE: true,
});

export const WARNING = type => ({
  zh_TW: `請選取至少一項商品${
    type === 'replace' ? '並填寫完整收件人資訊' : '。'
  }`,
  en_US: `Please select item${
    type === 'replace' ? ' and enter recipient info' : '.'
  }`,
  ja_JP: `商品を一つ以上お選びください${
    type === 'replace' ? '、受取人情報をすべてご記入ください' : '。'
  }`,
  vi_VN: `Xin chọn ít nhất một mục sản phẩm${
    type === 'replace' ? ' Và điền đầy đủ thông tin người nhận' : '.'
  }`,
  TODO_LOCALE: true,
});
