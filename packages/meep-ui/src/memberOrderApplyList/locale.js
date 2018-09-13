export const ORDER_APPLY_LIST = {
  zh_TW: '退換貨查詢',
  en_US: 'Return / Replacement',
  ja_JP: '返品交換確認',
  vi_VN: 'Tư vấn đổi trả',
  TODO_LOCALE: true,
};

export const ORDER_NO = {
  zh_TW: '訂單編號：',
  en_US: 'Order Number: ',
  ja_JP: '注文番号：',
  vi_VN: 'Số đơn hàng: ',
  TODO_LOCALE: true,
};

export const ORDER_DATE = {
  zh_TW: '訂購日：',
  en_US: 'Order Date: ',
  ja_JP: '注文日：',
  vi_VN: 'Ngày đặt hàng: ',
  TODO_LOCALE: true,
};

export const APPLY = {
  zh_TW: '申請：',
  en_US: 'Apply for: ',
  ja_JP: '申込：',
  vi_VN: 'Dăng ký: ',
  TODO_LOCALE: true,
};

export const ORDER_APPLY_DATE = {
  zh_TW: '申請日：',
  en_US: 'Date: ',
  ja_JP: '申込日：',
  vi_VN: 'Ngày đăng ký: ',
  TODO_LOCALE: true,
};

export const RECIPIENT = {
  zh_TW: '換貨收件人：',
  en_US: 'Recipient: ',
  ja_JP: '交換品受取人：',
  vi_VN: 'Thông tin người nhận: ',
  TODO_LOCALE: true,
};

export const PHONE = {
  zh_TW: '電話：',
  en_US: 'Phone No.: ',
  ja_JP: '電話：',
  vi_VN: 'Diện thoại: ',
  TODO_LOCALE: true,
};

export const ADDRESS = {
  zh_TW: '地址：',
  en_US: 'Address: ',
  ja_JP: '住所：',
  vi_VN: 'Địa Chỉ: ',
  TODO_LOCALE: true,
};

export const APPLICATION_TYPE = type => {
  switch (type) {
    case 'return':
      return {
        zh_TW: '退貨',
        en_US: 'Return',
        ja_JP: '返品',
        vi_VN: 'Hoàn trả',
        TODO_LOCALE: true,
      };
    default:
      return {
        zh_TW: '換貨',
        en_US: 'Replacement',
        ja_JP: '交換',
        vi_VN: 'Đổi hàng',
        TODO_LOCALE: true,
      };
  }
};

export const PRODUCT_NAME = {
  zh_TW: '商品名稱',
  en_US: 'Item',
  ja_JP: '商品名',
  vi_VN: 'Tên sản phẩm',
  TODO_LOCALE: true,
};

export const REASON = {
  zh_TW: '原因',
  en_US: 'Description',
  ja_JP: '理由',
  vi_VN: 'Nguyên nhân',
  TODO_LOCALE: true,
};

export const QUANTITY = {
  zh_TW: '數量',
  en_US: 'QTY',
  ja_JP: '数量',
  vi_VN: 'Số lượng',
  TODO_LOCALE: true,
};

export const STATUS = {
  zh_TW: '狀態',
  en_US: 'Status',
  ja_JP: '状態',
  vi_VN: 'Trạng thái',
  TODO_LOCALE: true,
};

export const ORDER_APPLY_STATUS = (type, status) => {
  switch (type) {
    case 'return':
      if (status === 1) {
        return {
          zh_TW: '退貨結案',
          en_US: 'Completed',
          ja_JP: '返品完了',
          vi_VN: 'Kết thúc hoàn trả',
          TODO_LOCALE: true,
        };
      }
      return {
        zh_TW: '此商品退貨失敗，如有任何疑問請詢問客服',
        en_US:
          'The return for this product is impossible, please contact our customer service if you have any questions.',
        ja_JP:
          '返品手続きが完了できませんでした。カスタマーサービスまでお問合せください。',
        vi_VN:
          'Sản phẩm này hoàn trả thất bại, nếu có thăc mắc xin liên hệ bên tư vấn khách hàng',
        TODO_LOCALE: true,
      };
    default:
      if (status === 1) {
        return {
          zh_TW: '換貨結案',
          en_US: 'Completed',
          ja_JP: '交換完了',
          vi_VN: 'Kết thúc hoàn trả',
          TODO_LOCALE: true,
        };
      }
      return {
        zh_TW: '此商品換貨失敗，如有任何疑問請詢問客服',
        en_US:
          'The replacement for this product is impossible, please contact our customer service if you have any questions.',
        ja_JP:
          '交換手続きが完了できませんでした。カスタマーサービスまでお問合せください。',
        vi_VN:
          'Sản phẩm này đổi hàng thất bại, nếu có thăc mắc xin liên hệ bên tư vấn khách hàng',
        TODO_LOCALE: true,
      };
  }
};

export const APPLICATIN_STATUS = status => {
  switch (status) {
    case 10:
      return {
        zh_TW: '運送',
        en_US: 'Dispatched',
        ja_JP: '配送',
        vi_VN: 'Vận chuyển',
        TODO_LOCALE: true,
      };
    case 11:
      return {
        zh_TW: '取件',
        en_US: 'Pick-up',
        ja_JP: '集荷',
        vi_VN: 'Nhận hàng',
        TODO_LOCALE: true,
      };
    case 12:
      return {
        zh_TW: '確認',
        en_US: 'Confirmed',
        ja_JP: '確認',
        vi_VN: 'Xác nhận',
        TODO_LOCALE: true,
      };
    case 13:
      return {
        zh_TW: '異常',
        en_US: 'Error Occurred',
        ja_JP: 'エラー',
        vi_VN: 'Bất thường',
        TODO_LOCALE: true,
      };
    case 20:
      return {
        zh_TW: '退款處理',
        en_US: 'Refund',
        ja_JP: '返金処理',
        vi_VN: 'Xử lý hoàn tiền',
        TODO_LOCALE: true,
      };
    case 21:
      return {
        zh_TW: '退款完成',
        en_US: 'Refunded',
        ja_JP: '返金完了',
        vi_VN: 'Hoàn thành hoàn tiền',
        TODO_LOCALE: true,
      };
    case 22:
      return {
        zh_TW: '退款異常',
        en_US: 'Error Occurred',
        ja_JP: '返金エラー',
        vi_VN: 'Sự cố hoàn tiền',
        TODO_LOCALE: true,
      };
    default:
      return {
        zh_TW: '等待確認',
        en_US: 'To be Confirmed',
        ja_JP: '確認待ち',
        vi_VN: 'Đang chờ xác nhận',
        TODO_LOCALE: true,
      };
  }
};
