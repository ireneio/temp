// typescript import
import { FormInstance } from 'antd/lib/form';

// import
import React, { useContext, useEffect } from 'react';
import { filter } from 'graphql-anywhere';
import { usePrevious } from 'react-use';
import { Form, Input } from 'antd';
import transformColor from 'color';

import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';

import useCouponValidator from './hooks/useCouponValidator';
import useCouponInfo from './hooks/useCouponInfo';
import styles from './styles/coupon.less';

// graphql typescript
import { couponFragment as couponFragmentType } from '@meepshop/types/gqls/store';

// graphql import
import { useCouponValidatorFragment } from './gqls/useCouponValidator';
import { useCouponInfoFragment } from './gqls/useCouponInfo';

// typescript definition
interface PropsType extends Pick<FormInstance, 'validateFields'> {
  computeOrderList: couponFragmentType | null;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ validateFields, computeOrderList }: PropsType) => {
  const { t } = useTranslation('checkout');
  const colors = useContext(ColorsContext);
  const validator = useCouponValidator(
    filter(useCouponValidatorFragment, computeOrderList?.errorObj || null),
  );
  const couponInfo = useCouponInfo(
    filter(useCouponInfoFragment, computeOrderList?.activityInfo || null),
  );
  const prevErrorCode = usePrevious(computeOrderList?.errorObj?.code);
  const errorCode = computeOrderList?.errorObj?.code;

  useEffect(() => {
    if (errorCode !== prevErrorCode) validateFields(['coupon']);
  }, [errorCode, prevErrorCode, validator, validateFields]);

  return (
    <>
      <FormItem
        name={['coupon']}
        rules={[{ validator }]}
        trigger="onBlur"
        valuePropName="defaultValue"
      >
        <Input placeholder={t('coupon.placeholder')} />
      </FormItem>

      {!couponInfo ? null : (
        <div className={styles.info}>
          <div>{couponInfo.discount}</div>
          <div>{couponInfo.period}</div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
              .${styles.info} {
                background: ${transformColor(colors[5]).alpha(0.15)};
                color: ${colors[2]};
              }
            `,
        }}
      />
    </>
  );
});
