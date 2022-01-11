// import
import React from 'react';
import { Table } from 'antd';
import { format } from 'date-fns';

import setTimezone from '@admin/utils/lib/setTimezone';
import { useTranslation } from '@meepshop/locales';

import usePackingColumns from './hooks/usePackingColumns';
import styles from './styles/packingList.less';

// graphql typescript
import {
  packingListFragment as packingListFragmentType,
  usePackingColumnsFragment as usePackingColumnsFragmentType,
} from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  viewer: packingListFragmentType | null;
}

// definition
export default React.memo(({ viewer }: PropsType) => {
  const { t } = useTranslation('order-print');
  const columns = usePackingColumns();
  const timezone = viewer?.store?.timezone;
  const order = viewer?.order || null;
  const createdAt = order?.createdAt;
  const invoiceNumber = order?.invoices?.[0]?.code;
  const invoiceType = order?.invoices?.[0]?.type || null;
  const invoiceMethod = order?.invoices?.[0]?.method || null;
  const invoiceCarrierType = order?.invoices?.[0]?.carrier?.type;
  const issuedAt = order?.invoices?.[0]?.issuedAt;
  const invoiceDate =
    issuedAt && timezone
      ? format(
          setTimezone(issuedAt, parseInt(timezone, 10)),
          'yyyy/MM/dd HH:mm',
        )
      : '';
  const products = order?.categories?.[0]?.products || [];
  const priceInfo = order?.priceInfo;

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <p>{viewer?.store?.description?.name}</p>
        <p>{t('packing-list')}</p>
      </div>
      <table className={styles.orderInfoTable}>
        <tbody>
          <tr>
            <td>
              {t('order-no')}：{order?.orderNo}
            </td>
            <td>
              {t('order-date')}：
              {!createdAt
                ? null
                : format(new Date(createdAt), 'yyyy/MM/dd HH:mm:ss')}
            </td>
            <td>
              {t('order-status')}： {t(`status.${order?.status}`)}
            </td>
          </tr>
          <tr>
            <td>
              {t('order-shipment')}：{order?.shipmentInfo?.list?.[0]?.name}
            </td>
            <td>
              {t('order-payment')}：{order?.paymentInfo?.list?.[0]?.name}
            </td>
            <td>
              {!order?.shipmentInfo?.list?.[0]?.number
                ? null
                : `
                ${t('order-detail-ship-no')}：
                ${order?.shipmentInfo.list?.[0]?.number}`}
            </td>
          </tr>
          <tr>
            <td>
              {t('order-person')}：{order?.userInfo?.name}
            </td>
            <td>
              {t('order-receiver')}：
              {order?.shipmentInfo?.list?.[0]?.recipient?.name}
            </td>
            <td>
              {t('order-receiver-tel')}：
              {order?.shipmentInfo?.list?.[0]?.recipient?.mobile}
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              {t('order-detail-recipient-comment')}：
              {order?.shipmentInfo?.list?.[0]?.recipient?.comment}
            </td>
          </tr>
          <tr className={styles.space}>
            <td />
          </tr>
          <tr className={styles.invoice}>
            <td>
              {!invoiceType && !invoiceMethod ? null : (
                <>
                  {t('order-detail-invoice-type')}：
                  {t(`invoice.type.${invoiceType}`)}/
                  {t(`invoice.${invoiceType}.${invoiceMethod}`) ||
                    t(`invoice.carrier.${invoiceCarrierType}`)}
                </>
              )}
            </td>
            <td>
              {!invoiceNumber
                ? null
                : `
                  ${t('order-detail-invoice-number')}：${invoiceNumber}
                `}
            </td>
            <td>
              {!invoiceDate
                ? null
                : `
                  ${t('order-detail-invoice-date')}：${invoiceDate}
                `}
            </td>
          </tr>
        </tbody>
      </table>

      <Table<usePackingColumnsFragmentType>
        className={styles.table}
        columns={columns}
        dataSource={products.filter(Boolean) as usePackingColumnsFragmentType[]}
        rowKey="id"
        pagination={false}
      />
      <div className={styles.total}>
        {t('total-count')} {priceInfo?.productPrice}
        {!priceInfo?.productDiscount
          ? ''
          : `- ${t('product-discount')} ${priceInfo.productDiscount}`}
        {!priceInfo?.orderDiscount
          ? ''
          : `- ${t('order-discount')} ${priceInfo.orderDiscount}`}
        + {t('shipping')}
        {(priceInfo?.shipmentFee || 0) - (priceInfo?.shipmentDiscount || 0)}
        {!priceInfo?.paymentFee
          ? ''
          : `${priceInfo.paymentFee > 0 ? '+' : '-'} ${t(
              'order-detail-payment-fee',
            )} ${Math.abs(priceInfo.paymentFee)}`}
        {!priceInfo?.adjust
          ? ''
          : `${priceInfo.adjust > 0 ? '+' : '-'} ${t('adjust')} ${Math.abs(
              priceInfo.adjust,
            )} `}
        = {t('order-money')} {priceInfo?.total} {t('yuan')}
      </div>
    </div>
  );
});
