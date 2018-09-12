import invariant from 'invariant';

export const TITLE = {
  zh_TW: '訂單明細',
  en_US: 'Order Details',
  ja_JP: '注文明細',
  vi_VN: 'chi tiết đơn hàng',
  TODO_LOCALE: true,
};

export const ORDER_NO = {
  zh_TW: '訂單編號：',
  en_US: 'Order Number: ',
  ja_JP: '注文番号：',
  vi_VN: 'số đơn hàng: ',
  TODO_LOCALE: true,
};

export const CREATED_ON = {
  zh_TW: '訂購日：',
  en_US: 'Order Date:',
  ja_JP: '注文日：',
  vi_VN: 'ngày đặt hàng: ',
  TODO_LOCALE: true,
};

/** Product Table */

export const PRODUCT_TITLE = {
  zh_TW: '商品名稱',
  en_US: 'Item',
  ja_JP: '商品番号/品名',
  vi_VN: 'Mã số/ Tên sản phẩm',
  TODO_LOCALE: true,
};

export const PRODUCT_SPEC = {
  zh_TW: '規格',
  en_US: 'Spec',
  ja_JP: '仕様',
  vi_VN: 'thông số',
  TODO_LOCALE: true,
};

export const PRODUCT_QUANTITY = {
  zh_TW: '數量',
  en_US: 'QTY',
  ja_JP: '数量',
  vi_VN: 'số lượng',
  TODO_LOCALE: true,
};

export const PRODUCT_PRICE = {
  zh_TW: '價格',
  en_US: 'Price',
  ja_JP: '価格',
  vi_VN: 'đơn giá',
  TODO_LOCALE: true,
};

export const PRODUCT_SUBTOTAL = {
  zh_TW: '小計',
  en_US: 'Price',
  ja_JP: '価格',
  vi_VN: 'đơn giá',
  TODO_LOCALE: true,
};

export const GIFT = {
  zh_TW: '贈品',
  en_US: 'Free Gift',
  ja_JP: 'プレゼント',
  vi_VN: 'tặng phẩm',
  TODO_LOCALE: true,
};

export const NO_GIFT = {
  zh_TW: '贈送完畢',
  en_US: 'Out of Stock',
  ja_JP: 'プレゼント配布終了',
  vi_VN: 'Đã hoàn thành tặng quà',
  TODO_LOCALE: true,
};

/** Total Sheet */

export const PRODUCTS_PRICE = {
  zh_TW: '商品總計',
  en_US: 'Subtotal',
  ja_JP: '商品合計',
  vi_VN: 'tổng mua',
  TODO_LOCALE: true,
};

export const REWARD = {
  zh_TW: '購物金',
  en_US: 'Reward Points',
  ja_JP: 'ポイント',
  vi_VN: 'tiền mua hàng',
  TODO_LOCALE: true,
};

export const COUPON = {
  zh_TW: '優惠碼',
  en_US: 'Coupon Code',
  ja_JP: 'クーポンコード',
  vi_VN: 'mã khuyến mãi',
  TODO_LOCALE: true,
};

export const SHIPMENT_FEE = {
  zh_TW: '運費',
  en_US: 'Shipping Fee',
  ja_JP: '送料',
  vi_VN: 'phí giao hàng',
  TODO_LOCALE: true,
};

export const PAYMENT_FEE = {
  zh_TW: '金流手續費',
  en_US: 'Processing Fee',
  ja_JP: '決済手数料',
  vi_VN: 'Phí giao dịch',
  TODO_LOCALE: true,
};

export const TOTAL = {
  zh_TW: '訂單總金額',
  en_US: 'Total',
  ja_JP: '注文合計金額',
  vi_VN: 'tổng số đơn hàng',
  TODO_LOCALE: true,
};

/** Info */

export const BUYER = {
  zh_TW: '會員資訊',
  en_US: 'Member Info',
  ja_JP: '会員情報',
  vi_VN: 'Thông tin hội viên',
  TODO_LOCALE: true,
};

export const RECIPIENT = {
  zh_TW: '收件人資訊',
  en_US: 'Recipient Info',
  ja_JP: '送付先情報',
  vi_VN: 'thông tin người nhận',
  TODO_LOCALE: true,
};

export const PAYMENT_STATUS = {
  zh_TW: '付款狀態',
  en_US: 'Payment Status',
  ja_JP: '決済状況',
  vi_VN: 'trạng thái thanh toán',
  TODO_LOCALE: true,
};

export const SHIPMENT_STATUS = {
  zh_TW: '運送狀態',
  en_US: 'Delivery Status',
  ja_JP: '配送状況',
  vi_VN: 'trạng thái giao nhận',
  TODO_LOCALE: true,
};

export const PAYMENT_TYPE = {
  zh_TW: '付款方式',
  en_US: 'Payment',
  ja_JP: '決済方法',
  vi_VN: 'phương pháp chi trả',
  TODO_LOCALE: true,
};

export const SHIPMENT_TYPE = {
  zh_TW: '運送方式',
  en_US: 'Delivery',
  ja_JP: '配送方法',
  vi_VN: 'phương pháp giao hàng',
  TODO_LOCALE: true,
};

export const INVOICE_INFO = {
  zh_TW: '發票資訊',
  en_US: 'Invoice',
  ja_JP: '発票情報',
  vi_VN: 'thông tin hóa đơn',
  TODO_LOCALE: true,
};

export const ORDER_STATUS = {
  zh_TW: '訂單狀態與備註',
  en_US: 'Order Status & Notes',
  ja_JP: '注文状況及び備考',
  vi_VN: 'Trạng thái đơn hàng và ghi chú',
  TODO_LOCALE: true,
};

export const PAYMENT = value => {
  switch (value) {
    case 0:
      return {
        zh_TW: '等待確認',
        en_US: 'To be Confirmed',
        ja_JP: '確認待ち',
        vi_VN: 'đang chờ xác nhận',
        TODO_LOCALE: true,
      };
    case 1:
      return {
        zh_TW: '匯款通知',
        en_US: 'Payment Notification',
        ja_JP: '振込通知',
        vi_VN: 'thông báo chuyển tiền',
        TODO_LOCALE: true,
      };
    case 2:
      return {
        zh_TW: '對帳完成',
        en_US: 'Paid',
        ja_JP: '入金確認完了',
        vi_VN: 'Hoàn thành đối chiếu sổ sách',
        TODO_LOCALE: true,
      };
    case 3:
      return {
        zh_TW: '資料有誤',
        en_US: 'Mismatch',
        ja_JP: '入力エラー',
        vi_VN: 'thông tin không đúng',
        TODO_LOCALE: true,
      };
    case 4:
      return {
        zh_TW: '付款失敗',
        en_US: 'Failed',
        ja_JP: '決済エラー',
        vi_VN: 'chi trả không đúng',
        TODO_LOCALE: true,
      };
    case 5:
      return {
        zh_TW: '退款處理',
        en_US: 'Refund',
        ja_JP: '返金処理',
        vi_VN: 'đang hoàn tiền',
        TODO_LOCALE: true,
      };
    default:
      invariant(
        process.env.NODE_ENV === 'production',
        `No corresponding [paymentInfo.status] ${value}!`,
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
        vi_VN: 'chưa giao',
        TODO_LOCALE: true,
      };
    case 1:
      return {
        zh_TW: '備貨中',
        en_US: 'Preparing',
        ja_JP: '出荷準備中',
        vi_VN: 'đang chuẩn bị hàng',
        TODO_LOCALE: true,
      };
    case 2:
      return {
        zh_TW: '缺貨中',
        en_US: 'Out of Stock',
        ja_JP: '品切れ中',
        vi_VN: 'hết hàng',
        TODO_LOCALE: true,
      };
    case 3:
      return {
        zh_TW: '已出貨',
        en_US: 'Dispatched',
        ja_JP: '出荷済み',
        vi_VN: 'đã giao',
        TODO_LOCALE: true,
      };
    case 4:
      return {
        zh_TW: '預購',
        en_US: 'Pre-order',
        ja_JP: '予約注文',
        vi_VN: 'dự tính mua',
        TODO_LOCALE: true,
      };
    case 5:
      return {
        zh_TW: '換貨處理',
        en_US: 'Replacement',
        ja_JP: '交換処理',
        vi_VN: 'đang thay thế',
        TODO_LOCALE: true,
      };
    case 6:
      return {
        zh_TW: '退貨處理',
        en_US: 'Return',
        ja_JP: '返品処理',
        vi_VN: 'đang quay lại',
        TODO_LOCALE: true,
      };
    default:
      invariant(
        process.env.NODE_ENV === 'production',
        `No corresponding [shipmentInfo.status] ${value}!`,
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
        vi_VN: 'đang xử lý',
        TODO_LOCALE: true,
      };
    case 1:
      return {
        zh_TW: '訂單結案',
        en_US: 'Completed',
        ja_JP: '配送完了',
        vi_VN: 'đơn hàng đã đóng',
        TODO_LOCALE: true,
      };
    case 2:
      return {
        zh_TW: '訂單取消',
        en_US: 'Canceled',
        ja_JP: '注文キャンセル',
        vi_VN: 'hủy đơn hàng',
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
      invariant(
        process.env.NODE_ENV === 'production',
        `No corresponding [order.status] ${value}!`,
      );
      return {};
  }
};

export const INVOICE = value => {
  switch (value) {
    case 1:
      return {
        zh_TW: '二聯式發票',
        en_US: 'Duplicate Uniform Invoice',
        ja_JP: '二連式発票',
        vi_VN: 'hóa đơn liên 2',
        TODO_LOCALE: true,
      };
    case 2:
      return {
        zh_TW: '三聯式發票',
        en_US: 'Triplicate Uniform Invoice',
        ja_JP: '三連式発票',
        vi_VN: 'hóa đơn liên 3',
        TODO_LOCALE: true,
      };
    case 3:
      return {
        zh_TW: '電子發票',
        en_US: 'e-Invoice',
        ja_JP: '電子発票',
        vi_VN: 'hóa đơn điện tử',
        TODO_LOCALE: true,
      };
    case 4:
      return {
        zh_TW: '捐贈',
        en_US: 'Donate',
        ja_JP: '寄贈',
        vi_VN: 'tặng',
        TODO_LOCALE: true,
      };
    default:
      invariant(
        process.env.NODE_ENV === 'production',
        `No corresponding [order.invoiceInfo.invoiceType] ${value}!`,
      );
      return {};
  }
};

export const VEHICLE = value => {
  switch (value) {
    case 1:
      return {
        zh_TW: '會員載具',
        en_US: 'Membership Carrier',
        ja_JP: '会員キャリア',
        vi_VN: 'Phương tiện hội viên',
        TODO_LOCALE: true,
      };
    case 2:
      return {
        zh_TW: '手機條碼載具',
        en_US: 'Mobile Barcode',
        ja_JP: '携帯電話バーコードキャリア',
        vi_VN: 'Phương tiện mã vạch di động',
        TODO_LOCALE: true,
      };
    case 3:
      return {
        zh_TW: '自然人憑證載具',
        en_US: 'NPC Barcode',
        ja_JP: '自然人証憑キャリア',
        vi_VN: 'Phương tiện chứng nhận kỹ thuật số công dân',
        TODO_LOCALE: true,
      };
    default:
      invariant(
        process.env.NODE_ENV === 'production',
        `No corresponding [order.invoiceInfo.invoiceType] ${value}!`,
      );
      return {};
  }
};

export const SHIPMENT_NUMBER = {
  zh_TW: '物流編號：',
  en_US: 'Tracking Number',
  ja_JP: '送り状番号',
  vi_VN: 'Mã số Vận Chuyển',
  TODO_LOCALE: true,
};

export const RECEIVER_STORE_NAME = {
  zh_TW: '門市名稱：',
  en_US: 'Store Name',
  ja_JP: 'ショップ名',
  vi_VN: 'Tên cửa hàng',
  TODO_LOCALE: true,
};

export const RECEIVER_STORE_ADDRESS = {
  zh_TW: '門市地址：',
  en_US: 'Store Address',
  ja_JP: 'ショップ住所',
  vi_VN: 'Địa chỉ cửa hàng',
  TODO_LOCALE: true,
};

export const SHIPMENT_LINK = {
  zh_TW: '查詢物流狀態',
  en_US: 'Track Order',
  ja_JP: '荷物の追跡',
  vi_VN: 'Truy vấn tình trạng vận chuyển',
  TODO_LOCALE: true,
};

export const BANK_CODE = {
  zh_TW: '繳費銀行代碼：',
  en_US: 'Bank Code',
  ja_JP: '支払金融機関コード',
  vi_VN: 'Mã ngân hàng để thanh toán',
  TODO_LOCALE: true,
};

export const VIRTUAL_ACCOUNT = {
  zh_TW: '繳費虛擬帳號：',
  en_US: 'Virtual Account Number',
  ja_JP: '支払バーチャル口座',
  vi_VN: 'Tài khoản ảo để thanh toán',
  TODO_LOCALE: true,
};

export const EXPIRE_DATE = {
  zh_TW: '繳費截止日期：',
  en_US: 'Due Date',
  ja_JP: '支払期限',
  vi_VN: 'Hạn chót thanh toán',
  TODO_LOCALE: true,
};

export const CVS_PAYMENT_NO = {
  zh_TW: '超商繳費代碼：',
  en_US: 'Convenient Store Payment Number',
  ja_JP: 'コンビニ支払コード',
  vi_VN: 'Mã số thanh toán tại cửa hàng tiện lợi',
  TODO_LOCALE: true,
};

export const BARCODE = {
  zh_TW: '超商繳費條碼：',
  en_US: 'Convenient Store Payment Barcode',
  ja_JP: 'コンビニ支払バーコード',
  vi_VN: 'Mã vạch thanh toán tại cửa hàng tiện lợi',
  TODO_LOCALE: true,
};

export const GMO_STORE_CODE = {
  zh_TW: 'GMO 商店代碼：',
  en_US: 'GMO Store Code',
  ja_JP: 'GMOショップコード',
  vi_VN: 'Mã cửa hàng GMO',
  TODO_LOCALE: true,
};

export const FREE_SHIPMENT_FEE = {
  zh_TW: '免運費',
  en_US: 'Free',
  ja_JP: '送料無料',
  vi_VN: 'Miễn phí vận chuyển',
  TODO_LOCALE: true,
};

export const DONATE_CODE = {
  zh_TW: '捐贈愛心碼：',
  en_US: 'NPO Donation Code',
  ja_JP: '寄付コード',
  vi_VN: 'Đóng góp mã tình yêu',
  TODO_LOCALE: true,
};
