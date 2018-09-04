export { IS_REQUIRED } from 'locale/form';

export const MOBILE = {
  zh_TW: '手機',
  en_US: 'Mobile',
  ja_JP: '携帯電話',
  vi_VN: 'Điện Thoại',
  TODO_LOCALE: true,
};

export const NOT_MOBILE = {
  zh_TW: '手機格式有誤',
  en_US: 'Invalid mobile number',
  ja_JP: '携帯電話番号が正しくありません',
  vi_VN: 'Định dạng điện thoại không hợp lệ',
  TODO_LOCALE: true,
};

export const ID_NUMBER = {
  zh_TW: '身分證字號',
  en_US: 'ID Number',
  ja_JP: '身分証明書番号',
  vi_VN: 'Số CMND',
  TODO_LOCALE: true,
};

export const NOT_ID_NUMBER = {
  zh_TW: '身分證字號格式有誤',
  en_US: 'Invalid ID number',
  ja_JP: '身分証明書番号に誤りがあります',
  vi_VN: 'Định dạng số CMND không hợp lệ',
  TODO_LOCALE: true,
};

export const AREA = {
  zh_TW: '地區',
  en_US: 'Country',
  ja_JP: '国',
  vi_VN: 'quốc gia',
  TODO_LOCALE: true,
};

export const POSTAL_CODE = {
  zh_TW: '郵遞區號',
  en_US: 'Postal Code',
  ja_JP: '郵便番号',
  vi_VN: 'Mã bưu điện',
  TODO_LOCALE: true,
};

export const ADDRESS = {
  zh_TW: '地址',
  en_US: 'Address',
  ja_JP: '住所',
  vi_VN: 'Địa Chỉ',
  TODO_LOCALE: true,
};

export const CHOOSE_STORE = {
  zh_TW: '選擇門市',
  en_US: 'Select Store',
  ja_JP: 'ショップを選択',
  vi_VN: 'chọn 1 cửa hàng',
  TODO_LOCALE: true,
};

export const STORE_NAME = {
  zh_TW: '門市名稱',
  en_US: 'Store Name',
  ja_JP: 'ショップ名',
  vi_VN: 'Tên cửa hàng',
  TODO_LOCALE: true,
};

export const STORE_ADDRESS = {
  zh_TW: '門市地址',
  en_US: 'Store Address',
  ja_JP: 'ショップ住所',
  vi_VN: 'Địa chỉ cửa hàng',
  TODO_LOCALE: true,
};

export const STORE_ID = {
  zh_TW: '門市代號',
  en_US: 'Store ID',
  ja_JP: 'ショップコード',
  vi_VN: 'Mã số cửa hàng',
  TODO_LOCALE: true,
};

export const NOT_CHOOSE_STORE = {
  zh_TW: '尚未選擇門市',
  en_US: 'Please select a store',
  ja_JP: 'ショップをお選びください',
  vi_VN: 'chọn 1 cửa hàng',
  TODO_LOCALE: true,
};

export const RECHOOSE_STORE = {
  zh_TW: '重新選擇',
  en_US: 'Change',
  ja_JP: '再選択',
  vi_VN: 'Chọn lại',
  TODO_LOCALE: true,
};

export const INVOICE = {
  zh_TW: '發票',
  en_US: 'Invoice',
  ja_JP: '発票',
  vi_VN: 'loại hóa đơn',
  TODO_LOCALE: true,
};

export const INVOICE_TYPE = {
  duplicate: {
    zh_TW: '二聯式發票',
    en_US: 'Duplicate Uniform Invoice',
    ja_JP: '二連式発票',
    vi_VN: 'hóa đơn liên 2',
    TODO_LOCALE: true,
  },
  triplicate: {
    zh_TW: '三聯式發票',
    en_US: 'Triplicate Uniform Invoice',
    ja_JP: '三連式発票',
    vi_VN: 'hóa đơn liên 3',
    TODO_LOCALE: true,
  },
  eInvoice: {
    zh_TW: '電子發票',
    en_US: 'e-Invoice',
    ja_JP: '電子発票',
    vi_VN: 'hóa đơn điện tử',
    TODO_LOCALE: true,
  },
  donate: {
    zh_TW: '捐贈',
    en_US: 'Donate',
    ja_JP: '寄贈',
    vi_VN: 'tặng',
    TODO_LOCALE: true,
  },
};

export const NOTES = {
  zh_TW: '訂單備註',
  en_US: 'Order Notes',
  ja_JP: '注文備考',
  vi_VN: 'ghi chú đặt hàng',
  TODO_LOCALE: true,
};

/** [invoice] triplicate */
export const INVOICE_TITLE = {
  zh_TW: '發票抬頭',
  en_US: 'Bill to: ',
  ja_JP: '発票の宛名',
  vi_VN: 'hóa đơn',
  TODO_LOCALE: true,
};

export const INVOICE_NUMBER = {
  zh_TW: '統一編號',
  en_US: 'VAT No.',
  ja_JP: '統一編号（法人番号）',
  vi_VN: 'Mã số thuế',
  TODO_LOCALE: true,
};

export const INVOICE_ADDRESS = {
  zh_TW: '發票地址',
  en_US: 'Invoice Mailing Address',
  ja_JP: '発票住所',
  vi_VN: 'địa chỉ hóa đơn',
  TODO_LOCALE: true,
};

/** [invoice] eInvoice */
export const INVOICE_E_INVOICE = {
  zh_TW: '電子發票',
  en_US: 'e-Invoice',
  ja_JP: '電子発票',
  vi_VN: 'hóa đơn điện tử',
  TODO_LOCALE: true,
};

export const INVOICE_E_INVOICE_TYPE = {
  memberVehicle: {
    zh_TW: '會員載具',
    en_US: 'Membership Carrier',
    ja_JP: '会員キャリア',
    vi_VN: 'Phương tiện hội viên',
    TODO_LOCALE: true,
  },
  mobileBarcodeVehicle: {
    zh_TW: '手機條碼載具',
    en_US: 'Mobile Barcode',
    ja_JP: '携帯電話バーコードキャリア',
    vi_VN: 'Phương tiện mã vạch di động',
    TODO_LOCALE: true,
  },
  citizenDigitalCertificateVehicle: {
    zh_TW: '自然人憑證載具',
    en_US: 'NPC Barcode',
    ja_JP: '自然人証憑キャリア',
    vi_VN: 'Phương tiện chứng nhận kỹ thuật số công dân',
    TODO_LOCALE: true,
  },
};

export const INVOICE_E_INVOICE_NUMBER = {
  mobileBarcodeVehicle: {
    zh_TW: '請輸入手機條碼',
    en_US: 'Enter barcode',
    ja_JP: '携帯電話バーコードを読み込んでください',
    vi_VN: 'Xin nhập mã vạch di động',
    TODO_LOCALE: true,
  },
  citizenDigitalCertificateVehicle: {
    zh_TW: '請輸入自然人憑證條碼',
    en_US: 'Enter barcode',
    ja_JP: '自然人証憑バーコードを読み込んでください',
    vi_VN: 'Xin nhập mã vạch chứng nhận kỹ thuật số công dân',
    TODO_LOCALE: true,
  },
};

/** [invoice] donate */
export const INVOICE_DONATE = {
  zh_TW: '社福團體愛心碼',
  en_US: 'Enter NPO Donation Code',
  ja_JP: '社会福祉団体コード',
  vi_VN: 'nhập mã an sinh xã hội',
  TODO_LOCALE: true,
};

export const INVOICE_SEARCH = {
  zh_TW: '查詢',
  en_US: 'Enquire',
  ja_JP: '検索',
  vi_VN: 'yêu cầu',
  TODO_LOCALE: true,
};
