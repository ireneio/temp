import { warning } from 'fbjs';

export const TITLE = {
  zh_TW: '訂單管理',
  en_US: 'My Orders',
  ja_JP: '注文管理',
  vi_VN: 'Quản lý đơn hàng',
  TODO_LOCALE: true,
};

export const DATE = {
  zh_TW: '訂購日',
  en_US: 'Order Date',
  ja_JP: '購入日',
  vi_VN: 'Ngày đặt hàng',
  TODO_LOCALE: true,
};

export const ORDER_NO = {
  zh_TW: '訂單編號',
  en_US: 'Order Number',
  ja_JP: '注文番号',
  vi_VN: 'Số đơn hàng',
  TODO_LOCALE: true,
};

export const PAYMENT_TITLE = {
  zh_TW: '付款狀態',
  en_US: 'Payment',
  ja_JP: '決済状況',
  vi_VN: 'Trạng thái thanh toán',
  TODO_LOCALE: true,
};

export const SHIPMENT_TITLE = {
  zh_TW: '運送狀態',
  en_US: 'Delivery',
  ja_JP: '配送状況',
  vi_VN: 'Trạng thái giao nhận',
  TODO_LOCALE: true,
};

export const STATUS_TITLE = {
  zh_TW: '訂單狀態',
  en_US: 'Order Status',
  ja_JP: '注文状況',
  vi_VN: 'Trạng Thái Đặt Hàng',
  TODO_LOCALE: true,
};

export const ACTION = {
  zh_TW: '',
  en_US: '',
  ja_JP: '',
  vi_VN: '',
  TODO_LOCALE: true,
};

export const PAYMENT = value => {
  switch (value) {
    case 0:
      return {
        zh_TW: '等待確認',
        en_US: 'To be Confirmed',
        ja_JP: '確認待ち',
        vi_VN: 'Chờ xác nhận',
        TODO_LOCALE: true,
      };
    case 1:
      return {
        zh_TW: '匯款通知',
        en_US: 'Payment Notification',
        ja_JP: '振込通知',
        vi_VN: 'Thông báo chuyển tiền',
        TODO_LOCALE: true,
      };
    case 2:
      return {
        zh_TW: '對帳完成',
        en_US: 'Paid',
        ja_JP: '入金確認完了',
        vi_VN: 'Hoàn thành đối chiếu tài khoản',
        TODO_LOCALE: true,
      };
    case 3:
      return {
        zh_TW: '資料有誤',
        en_US: 'Mismatch',
        ja_JP: '入力エラー',
        vi_VN: 'Thông tin không đúng',
        TODO_LOCALE: true,
      };
    case 4:
      return {
        zh_TW: '付款失敗',
        en_US: 'Failed',
        ja_JP: '決済エラー',
        vi_VN: 'Thanh toán thất bại',
        TODO_LOCALE: true,
      };
    case 5:
      return {
        zh_TW: '退款處理',
        en_US: 'Refund',
        ja_JP: '返金処理',
        vi_VN: 'Xử lý hoàn tiền',
        TODO_LOCALE: true,
      };
    default:
      warning(
        process.env.NODE_ENV === 'production',
        `Unknown [paymentInfo.status] ${value}!`,
      );
      return {};
  }
};

export const SHIPMENT = value => {
  switch (value) {
    case 0:
      return {
        zh_TW: '未出貨',
        en_US: 'Pending',
        ja_JP: '未出荷',
        vi_VN: 'Chưa xuất hàng',
        TODO_LOCALE: true,
      };
    case 1:
      return {
        zh_TW: '備貨中',
        en_US: 'Preparing',
        ja_JP: '出荷準備中',
        vi_VN: 'Đang chuẩn bị hàng',
        TODO_LOCALE: true,
      };
    case 2:
      return {
        zh_TW: '缺貨中',
        en_US: 'Out of Stock',
        ja_JP: '品切れ中',
        vi_VN: 'Hết hàng',
        TODO_LOCALE: true,
      };
    case 3:
      return {
        zh_TW: '已出貨',
        en_US: 'Dispatched',
        ja_JP: '出荷済み',
        vi_VN: 'Đã xuất hàng',
        TODO_LOCALE: true,
      };
    case 4:
      return {
        zh_TW: '預購',
        en_US: 'Pre-order',
        ja_JP: '予約注文',
        vi_VN: 'Đặt hàng',
        TODO_LOCALE: true,
      };
    case 5:
      return {
        zh_TW: '換貨處理',
        en_US: 'Replacement',
        ja_JP: '交換処理',
        vi_VN: 'Xử lý đổi hàng',
        TODO_LOCALE: true,
      };
    case 6:
      return {
        zh_TW: '退貨處理',
        en_US: 'Return',
        ja_JP: '返品処理',
        vi_VN: 'Xử lý hoàn trả hàng',
        TODO_LOCALE: true,
      };
    default:
      warning(
        process.env.NODE_ENV === 'production',
        `Unknown [shipmentInfo.status] ${value}!`,
      );
      return {};
  }
};

export const STATUS = value => {
  switch (value) {
    case 0:
      return {
        zh_TW: '處理中',
        en_US: 'Processing',
        ja_JP: '処理中',
        vi_VN: 'Đang xử lý',
        TODO_LOCALE: true,
      };
    case 1:
      return {
        zh_TW: '訂單結案',
        en_US: 'Completed',
        ja_JP: '配送完了',
        vi_VN: 'Đơn hàng kết thúc',
        TODO_LOCALE: true,
      };
    case 2:
      return {
        zh_TW: '訂單取消',
        en_US: 'Canceled',
        ja_JP: '注文キャンセル',
        vi_VN: 'Hủy đơn hàng',
        TODO_LOCALE: true,
      };
    case 3:
      return {
        zh_TW: '退換貨處理',
        en_US: 'Return / Replacement',
        ja_JP: '返品交換処理',
        vi_VN: 'Xử lý đổi trả hàng',
        TODO_LOCALE: true,
      };
    default:
      warning(
        process.env.NODE_ENV === 'production',
        `Unknown [order.status] ${value}!`,
      );
      return {};
  }
};

/** actions */
export const REPAY = {
  zh_TW: '重新付款',
  en_US: 'Retry Payment',
  ja_JP: '再度支払う',
  vi_VN: 'Thanh toán lại',
  TODO_LOCALE: true,
};

export const ONPAY = {
  zh_TW: '立即付款',
  en_US: 'Pay Now',
  ja_JP: '今すぐ支払う',
  vi_VN: 'Lập tức thanh toán',
  TODO_LOCALE: true,
};

export const PAY_FAILED = {
  zh_TW: '發生錯誤',
  en_US: 'Errors occurred',
  ja_JP: 'エラーが発生しました',
  vi_VN: 'Bị lỗi',
  TODO_LOCALE: true,
};

export const PAY_SUCCESS = {
  zh_TW: '即將跳轉付款頁面',
  en_US: 'This page will be redirected to the payment page',
  ja_JP: 'もうすぐ支払いページに切り替わります',
  vi_VN: 'Lập tức qua trang thanh toán',
  TODO_LOCALE: true,
};

export const PAY_NOTI = {
  zh_TW: '匯款通知',
  en_US: 'Payment Notification',
  ja_JP: '振込通知',
  vi_VN: 'Thông báo chuyển tiền',
  TODO_LOCALE: true,
};

export const APPLY_INFO = {
  zh_TW: '退換貨查詢',
  en_US: 'Return / Replacement',
  ja_JP: '返品交換確認',
  vi_VN: 'Tư vấn đổi trả',
  TODO_LOCALE: true,
};

export const ORDER_RETURN = {
  zh_TW: '退貨申請',
  en_US: 'Return',
  ja_JP: '返品申込',
  vi_VN: 'Đăng ký hoàn trả',
  TODO_LOCALE: true,
};

export const ORDER_REPLACE = {
  zh_TW: '換貨申請',
  en_US: 'Replacement',
  ja_JP: '交換申込',
  vi_VN: 'Đăng ký thay thế',
  TODO_LOCALE: true,
};

export const SERVICE = {
  zh_TW: '詢問客服',
  en_US: 'Contact Us',
  ja_JP: 'お問合せ',
  vi_VN: 'Tư vấn khách hàng',
  TODO_LOCALE: true,
};

export const DETAILS = {
  zh_TW: '訂單明細',
  en_US: 'View Details',
  ja_JP: '注文明細',
  vi_VN: 'Chi tiết đơn hàng',
  TODO_LOCALE: true,
};
