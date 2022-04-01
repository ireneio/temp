// import
import React, { useContext } from 'react';
import { Form, Collapse } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import transformColor from 'color';

import { useTranslation, useGetLanguage } from '@meepshop/locales';
import {
  Currency as CurrencyContext,
  Colors as ColorsContext,
} from '@meepshop/context';
import filter from '@meepshop/utils/lib/filter';

import useActivities from './hooks/useActivities';
import styles from './styles/total.less';

// graphql typescript
import { totalOrderFragment as totalOrderFragmentType } from '@meepshop/types/gqls/store';

// graphql import
import { useActivitiesFragment } from './gqls/useActivities';

// typescript definition
interface PropsType {
  computeOrderList: totalOrderFragmentType | null;
}

// definition
const { Item: FormItem } = Form;
const { Panel } = Collapse;

export default React.memo(({ computeOrderList }: PropsType) => {
  const { t } = useTranslation('checkout');
  const getLanguage = useGetLanguage();
  const { c } = useContext(CurrencyContext);
  const colors = useContext(ColorsContext);
  const activities = useActivities(
    filter(useActivitiesFragment, computeOrderList || null),
  );

  const { productPrice, paymentFee, shipmentFee, total } =
    computeOrderList?.priceInfo || {};

  return (
    <div className={styles.root}>
      <Collapse
        expandIcon={({ isActive }) =>
          isActive ? <DownOutlined /> : <UpOutlined />
        }
        bordered={false}
        defaultActiveKey="amount-details"
      >
        <Panel key="amount-details" header={<div>{t('amount-details')}</div>}>
          <div>
            <div>{t('total')}</div>
            <div>{c(productPrice || 0)}</div>
          </div>

          {activities.map(({ id, plugin, title, discountPrice }) =>
            !discountPrice || discountPrice <= 0 ? null : (
              <div key={id}>
                <div>
                  {plugin === 'usePoints'
                    ? t('reward-points')
                    : getLanguage(title)}
                </div>
                <div>- {c(discountPrice)}</div>
              </div>
            ),
          )}

          {!paymentFee ? null : (
            <div>
              <div>{t('payment-free')}</div>
              <div>
                {paymentFee < 0 ? '-' : ''} {c(Math.abs(paymentFee))}
              </div>
            </div>
          )}

          <FormItem dependencies={['shipment']} noStyle>
            {({ getFieldValue }) => (
              <div>
                <div>{t('shipment-price')}</div>
                <div>
                  {(() => {
                    if (
                      computeOrderList?.activityInfo?.find(
                        activity => activity?.plugin === 'freeShipping',
                      )
                    )
                      return t('free-shipment');

                    if (getFieldValue(['shipment'])?.shipmentId)
                      return c(shipmentFee || 0);

                    return t('not-choose-shipment');
                  })()}
                </div>
              </div>
            )}
          </FormItem>
        </Panel>
      </Collapse>

      <div className={styles.total}>
        <div>{t('total-payment-amount')}</div>
        <div>{c(total || 0)}</div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} {
              color: ${colors[3]};
              background-color: ${transformColor(colors[3]).alpha(0.05)};
              box-shadow: 0px 0px 15px ${transformColor(colors[3]).alpha(0.15)};
            }

            .${styles.root} .ant-collapse-content-active {
              border-bottom: 1px solid ${colors[5]};
            }
          `,
        }}
      />
    </div>
  );
});
