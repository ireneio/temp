// import
import React, { useMemo } from 'react';
import { Row, Col } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { format } from 'date-fns';

import Link from '@meepshop/link';
import { useTranslation, useGetLanguage } from '@meepshop/locales';
import setTimezone from '@admin/utils/lib/setTimezone';

import { formatMonth, formatMoney } from '../utils/format';
import styles from '../styles/useItems.less';

// graphql typescript
import { useItemsStoreBillFragment } from '@meepshop/types/gqls/admin';

// definition
export default (
  bill: useItemsStoreBillFragment | null,
  timezone: number,
): {
  name: string;
  description: string | React.ReactNode;
  month: string;
  fee: string;
}[] => {
  const { t } = useTranslation('bill');
  const getLanguage = useGetLanguage();

  return useMemo(
    () => [
      {
        name: t('header.name'),
        description: t('header.description'),
        month: t('header.month'),
        fee: t('header.fee'),
      },
      ...(!bill?.planItem
        ? []
        : [
            {
              name: t('plan-item.name'),
              description: getLanguage(bill.planItem.name),
              month: formatMonth(bill.planItem.month),
              fee:
                bill.planItem.feeType === 'MONTHLY'
                  ? formatMoney(bill.planItem.fee)
                  : t('plan-item.paid'),
            },
          ]),
      {
        name: t('data-item.name'),
        description: (
          <div className={styles.root}>
            <Row>
              <Col>{t('data-item.used')}</Col>
              <Col>{`${bill?.dataItem?.usedAmount} G`}</Col>
              <Col>
                <Link
                  href={bill?.dataItem?.dailyUsageFileUrl || ''}
                  target="_blank"
                >
                  <span className={styles.download}>
                    <DownloadOutlined />
                    <div>{t('data-item.daily-usage')}</div>
                  </span>
                </Link>
              </Col>
            </Row>

            {(bill?.dataItem?.freeAmount || -1) < 0 ? (
              <div className={styles.rate}>{t('data-item.no-data-fee')}</div>
            ) : (
              <>
                <Row>
                  <Col>{t('data-item.free')}</Col>
                  <Col>{`${bill?.dataItem?.freeAmount} G`}</Col>
                </Row>
                <Row>
                  <Col>{t('data-item.over')}</Col>
                  <Col>{`${bill?.dataItem?.overAmount} G`}</Col>
                </Row>

                <div className={styles.rate}>
                  {`${t('data-item.fee')} USD ${
                    bill?.dataItem?.feeRatePerOverAmount
                  }/G`}
                </div>
              </>
            )}
          </div>
        ),
        month: formatMonth(bill?.dataItem?.month),
        fee: formatMoney(bill?.dataItem?.fee),
      },
      {
        name: t('order-item.name'),
        description: (
          <div className={styles.root}>
            <Row>
              <Col>{t('order-item.count')}</Col>
              <Col>{bill?.orderItem?.count || 0}</Col>
              <Col>
                <Link href={bill?.orderItem?.listFileUrl || ''} target="_blank">
                  <span className={styles.download}>
                    <DownloadOutlined />
                    <div>{t('order-item.details')}</div>
                  </span>
                </Link>
              </Col>
            </Row>

            <Row>
              <Col>{t('order-item.sum')}</Col>
              <Col>{`USD ${bill?.orderItem?.sum}`}</Col>
            </Row>

            <div className={styles.rate}>
              {`${t('order-item.fee')} ${(
                bill?.orderItem?.feeRate || 0 * 100
              ).toFixed(1)}%`}
            </div>
          </div>
        ),
        month: formatMonth(bill?.orderItem?.month),
        fee: formatMoney(bill?.orderItem?.fee),
      },
      {
        name: t('extension-item.name'),
        description: t('extension-item.free'),
        month: formatMonth(bill?.extensionItem?.month),
        fee: formatMoney(bill?.extensionItem?.fee),
      },
      ...(!bill?.affiliateItem
        ? []
        : [
            {
              name: t('affiliate-tem.name'),
              description: `${t('affiliate-tem.used')} ${format(
                setTimezone(
                  bill?.affiliateItem?.billingStartDate || new Date(),
                  timezone,
                ),
                'yyyy.MM.dd',
              )} ~ ${format(
                setTimezone(
                  bill?.affiliateItem?.billingEndDate || new Date(),
                  timezone,
                ),
                'yyyy.MM.dd',
              )}`,
              month: formatMonth(bill?.affiliateItem?.month),
              fee: formatMoney(bill?.affiliateItem?.fee),
            },
          ]),
      {
        name: t('edm-item.name'),
        description: (
          <div className={styles.root}>
            <Row>
              <Col>{t('edm-item.count')}</Col>
              <Col>{bill?.edmItem?.count || 0}</Col>
            </Row>

            <div className={styles.rate}>
              {`${t('edm-item.fee')} USD ${bill?.edmItem?.feeRatePerCount ||
                0}`}
            </div>
          </div>
        ),
        month: formatMonth(bill?.edmItem?.month),
        fee: formatMoney(bill?.edmItem?.fee),
      },
      ...(!bill?.pointReminderItem
        ? []
        : [
            {
              name: t('point-reminder-item.name'),
              description: (
                <div className={styles.root}>
                  <Row>
                    <Col>{t('point-reminder-item.count')}</Col>
                    <Col>{bill?.pointReminderItem?.count || 0}</Col>
                  </Row>

                  <div className={styles.rate}>
                    {`${t('point-reminder-item.fee')} USD ${bill
                      ?.pointReminderItem?.feeRatePerCount || 0}`}
                  </div>
                </div>
              ),
              month: formatMonth(bill?.pointReminderItem?.month),
              fee: formatMoney(bill?.pointReminderItem?.fee),
            },
          ]),
      ...(bill?.customItem || []).map(item => ({
        name: item?.name || '',
        description: item?.description || '',
        month: formatMonth(item?.month),
        fee: formatMoney(item?.fee),
      })),
    ],
    [bill, t, timezone, getLanguage],
  );
};
