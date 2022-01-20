// import
import React, { useRef, useEffect } from 'react';
import QRCode from 'qrcode.react';
import JsBarcode from 'jsbarcode';

import { useTranslation } from '@meepshop/locales';
import { adminOrderPrintHilifeMark } from '@meepshop/images';

import { BARCODE_OPTION } from './constants';
import styles from './styles/storeShipmentDetail.less';

// graphql typescript
import { storeShipmentDetailFragment as storeShipmentDetailFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  viewer: storeShipmentDetailFragmentType | null;
}

// definition
export default React.memo(({ viewer }: PropsType) => {
  const { t } = useTranslation('order-print');
  const barcode1Ref = useRef(null);
  const barcode2Ref = useRef(null);
  const barcode3Ref = useRef(null);
  const ecpayC2c = viewer?.order?.shipmentInfo?.list?.[0]?.ecpayC2c || null;
  const type = ecpayC2c?.type;
  const qrCode = ecpayC2c?.__typename === 'EcpayC2cUni' ? ecpayC2c?.qrCode : '';
  const barCode1 = ecpayC2c?.barCode1;
  const barCode2 = ecpayC2c?.barCode2;
  const barCode3 = ecpayC2c?.barCode3;

  useEffect(() => {
    if (barCode1 && barcode1Ref.current)
      JsBarcode(barcode1Ref.current, barCode1, BARCODE_OPTION);
    if (barCode2 && barcode2Ref.current)
      JsBarcode(barcode2Ref.current, barCode2, BARCODE_OPTION);
    if (barCode3 && barcode3Ref.current) {
      JsBarcode(barcode3Ref.current, barCode3, BARCODE_OPTION);
    }
  }, [barCode1, barCode2, barCode3, viewer]);

  switch (type) {
    case 'UNI':
      return (
        <div className={styles.root}>
          <p className={styles.orderNo}>
            {t('order-no')}：{viewer?.order?.orderNo}
          </p>
          <div className={styles.wrap}>
            <p className={styles.title}>{t(`store-shipment.${type}.title`)}</p>
            <div className={styles.barcode}>
              <p className={styles.barcodeTitle}>
                {t(`store-shipment.${type}.barcodeTitle`)}
              </p>
              <img
                className={styles.barcodeLength1}
                ref={barcode1Ref}
                alt="Barcode 1"
              />
              <p>{barCode1}</p>
              <img
                className={styles.barcodeLength2}
                ref={barcode2Ref}
                alt="Barcode 2"
              />
              <p>{barCode2}</p>
              <img
                className={styles.barcodeLength2}
                ref={barcode3Ref}
                alt="Barcode 3"
              />
              <p>{barCode3}</p>
            </div>
            <div className={styles.details}>
              <div className={styles.minor}>
                <div className={styles.left}>
                  <p>
                    {t(`store-shipment.${type}.cvs-payment-no`)}：
                    {ecpayC2c?.cvsPaymentNo}
                  </p>
                  <p>
                    {t('due-date')}：
                    {ecpayC2c?.__typename === 'EcpayC2cUni'
                      ? ecpayC2c?.dueDate
                      : null}
                  </p>
                  <p>
                    {t(`store-shipment.${type}.company-name`)}：
                    {ecpayC2c?.__typename === 'EcpayC2cUni'
                      ? ecpayC2c?.companyName
                      : null}
                  </p>
                </div>
                <div className={styles.uniRight}>
                  <p>
                    {t('store-shipment.sender-name')}：{ecpayC2c?.senderName}
                  </p>
                  <p>
                    {t(`store-shipment.${type}.fee`)}：
                    {ecpayC2c?.__typename === 'EcpayC2cUni'
                      ? ecpayC2c?.fee
                      : null}
                    {t('yuan')}
                  </p>
                </div>
              </div>
              <div className={styles.main}>
                <p>
                  {t('store-shipment.receiver-name')}：{ecpayC2c?.receiverName}
                </p>
                <p>
                  {t('store-shipment.csv-store-name')}：{ecpayC2c?.cvsStoreName}
                </p>
              </div>
            </div>
            <div className={styles.notice}>
              <p>{t('store-shipment.notice')}：</p>
              <ol>
                {[1, 2, 3, 4].map(info => (
                  <li key={info}>
                    {t(`store-shipment.${type}.notice.${info}`)}
                  </li>
                ))}
              </ol>
            </div>
            <div className={styles.qrcode}>
              <div className={styles.qrcodeLeft}>
                <QRCode renderAs="svg" value={qrCode || ''} size={44} />
              </div>
              <div className={styles.qrcodeRight}>
                <p>{t('store-shipment.qr-code')}</p>
                <p>{qrCode}</p>
              </div>
            </div>
          </div>
        </div>
      );
    case 'HILIFE':
      return (
        <div className={styles.root}>
          <p className={styles.orderNo}>
            {t('order-no')}：{viewer?.order?.orderNo}
          </p>
          <div className={styles.wrap}>
            <p className={styles.title}>{t(`store-shipment.${type}.title`)}</p>
            <div className={styles.barcode}>
              <p className={styles.barcodeTitle}>
                {t(`store-shipment.${type}.barcodeTitle`)}
              </p>
              <img
                className={styles.barcodeLength3}
                ref={barcode1Ref}
                alt="Barcode 1"
              />
              <p>{barCode1}</p>
              <img
                className={styles.barcodeLength4}
                ref={barcode2Ref}
                alt="Barcode 2"
              />
              <p>{barCode2}</p>
            </div>
            <div className={styles.details}>
              <div className={styles.minor}>
                <div className={styles.left}>
                  <p>
                    {t(`store-shipment.${type}.shipment-no`)}：
                    {ecpayC2c?.__typename === 'EcpayC2cHilife'
                      ? ecpayC2c?.shipmentNo
                      : null}
                  </p>
                  <p>
                    {t('store-shipment.sender-name')}：{ecpayC2c?.senderName}
                  </p>
                  <p>
                    {t(`store-shipment.${type}.payment-no`)}：
                    {ecpayC2c?.cvsPaymentNo}
                  </p>
                </div>
                <div className={styles.hilifeRight}>
                  <p>
                    {t(`store-shipment.${type}.ecpay-id`)}：
                    {ecpayC2c?.__typename === 'EcpayC2cHilife'
                      ? ecpayC2c?.ecpayId
                      : null}
                  </p>
                  <p>
                    {t('store-shipment.due-date')}：
                    {ecpayC2c?.__typename === 'EcpayC2cHilife'
                      ? ecpayC2c?.dueDate
                      : null}
                  </p>
                </div>
              </div>
              <div className={styles.main}>
                <p>
                  {t('store-shipment.receiver-name')}：{ecpayC2c?.receiverName}
                </p>
                <p>
                  {t('store-shipment.csv-store-name')}：{ecpayC2c?.cvsStoreName}
                </p>
              </div>
            </div>
            <div className={styles.notice}>
              <p>{t('store-shipment.notice')}：</p>
              <ol>
                {[1, 2, 3, 4, 5].map(info => (
                  <li key={info}>
                    {t(`store-shipment.${type}.notice.${info}`)}
                  </li>
                ))}
              </ol>
            </div>
            <div className={styles.markWrap}>
              <div className={styles.mark}>
                <img src={adminOrderPrintHilifeMark} alt="Hilife Mark" />
              </div>
              <div className={styles.code}>
                <p>{t('store-shipment.qr-code')}</p>
                <img
                  className={styles.barcodeLength5}
                  ref={barcode3Ref}
                  alt="Hilife Barcode"
                />
                <p>{barCode3}</p>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
});
