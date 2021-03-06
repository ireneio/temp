// import
import React, { useContext } from 'react';
import { Form, InputNumber } from 'antd';
import transformColor from 'color';

import { useTranslation } from '@meepshop/locales';
import {
  Apps as AppsContext,
  Colors as ColorsContext,
} from '@meepshop/context';
import filter from '@meepshop/utils/lib/filter';

import Coupon from './Coupon';
import styles from './styles/discount.less';

// graphql typescript
import { discountFragment as discountFragmentType } from '@meepshop/types/gqls/store';

// graphql import
import { couponFragment } from './gqls/coupon';

// typescript definition
interface PropsType {
  computeOrderList: discountFragmentType | null;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ computeOrderList }: PropsType) => {
  const { t } = useTranslation('checkout');
  const colors = useContext(ColorsContext);
  const app = useContext(AppsContext);

  const userPoints = computeOrderList?.priceInfo?.userPoints;
  const canUsePointsLimit = computeOrderList?.priceInfo?.canUsePointsLimit;

  const isCouponInstalled = app.coupon.isInstalled;
  const isPointsInstalled = app.points.isInstalled && (userPoints || 0) > 0;

  if (!isCouponInstalled && !isPointsInstalled) return null;

  return (
    <div className={styles.root}>
      <div className={styles.title}>{t('discount')}</div>

      {!isCouponInstalled ? null : (
        <FormItem dependencies={['coupon']} noStyle>
          {({ validateFields }) => (
            <Coupon
              validateFields={validateFields}
              computeOrderList={filter(
                couponFragment,
                computeOrderList || null,
              )}
            />
          )}
        </FormItem>
      )}

      {!isPointsInstalled ? null : (
        <>
          <FormItem name={['points']} normalize={Number} trigger="onBlur">
            <InputNumber
              min={0}
              max={canUsePointsLimit || 0}
              placeholder={t('points.placeholder')}
              size="large"
            />
          </FormItem>

          <div className={styles.points}>
            {t('points.have')}
            <b>{` $${userPoints}`}</b>
            {t('points.limit')}
            <b>{` $${canUsePointsLimit}`}</b>
          </div>
        </>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.points} {
              background: ${transformColor(colors[3]).alpha(0.03)};
              color: ${colors[3]};
            }
            .${styles.root} .ant-input::placeholder,
            .${styles.root} .ant-input-number-input::placeholder{
              color: ${transformColor(colors[3]).alpha(0.4)};
            }
          `,
        }}
      />
    </div>
  );
});
