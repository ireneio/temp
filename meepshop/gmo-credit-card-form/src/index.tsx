// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Spin, Icon, Input, Checkbox } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';

import Form from './Form';
import formatGmo from './utils/formatGmo';
import styles from './styles/index.less';

// graphql typescript
import {
  getGMOUser as getGMOUserType,
  getGMOUserVariables as getGMOUserVariablesType,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { getGMOUser } from './gqls';

// typescript definition
export interface PropsType extends getGMOUserVariablesType, FormComponentProps {
  isInstallment: boolean;
}

// definition
export { formatGmo };
export default React.memo(
  ({ storePaymentId, isInstallment, form }: PropsType) => {
    const router = useRouter();
    const { t } = useTranslation('gmo-credit-card-form');
    const { getFieldDecorator } = form;

    const { data } = useQuery<getGMOUserType, getGMOUserVariablesType>(
      getGMOUser,
      {
        variables: { storePaymentId },
        /** FIXME: should remove cache in @store/member-settings, fix this after getGMOUser is rewritten */
        fetchPolicy: 'no-cache',
      },
    );

    const exist = Boolean(data?.gmoUser?.exist);

    const [isModified, setIsModified] = useState(
      exist && form.getFieldValue('changeCardNumber'),
    );

    if (!data) return <Spin indicator={<Icon type="loading" spin />} />;

    const { gmoUser, viewer } = data;
    const gmoRememberCardEnabled =
      viewer?.store?.experiment?.gmoRememberCardEnabled || false;
    const cardNumberFront = gmoUser?.cardNumberFront || null;
    const cardNumberLater = gmoUser?.cardNumberLater || null;

    return (
      <>
        <h3 className={styles.title}>
          {t('title')}
          {!exist || isInstallment ? null : (
            <div
              className={styles.edit}
              onClick={() => setIsModified(!isModified)}
            >
              {isModified ? null : <Icon type="form" />}

              {t(isModified ? 'cancel' : 'modify')}
            </div>
          )}
        </h3>

        {getFieldDecorator('changeCardNumber', {
          // just use to record card changed, do not use in creating order.
          initialValue: Boolean(exist && isModified),
        })(<Input type="hidden" />)}

        {exist && !isModified && !isInstallment ? (
          <div className={styles.cardNumber}>
            {cardNumberFront}
            ********
            {cardNumberLater}
          </div>
        ) : (
          <Form
            isInstallment={isInstallment}
            storePaymentId={storePaymentId}
            form={form}
          />
        )}

        {isInstallment
          ? null
          : getFieldDecorator('isRememberCard', {
              valuePropName: 'checked',
              initialValue:
                !gmoRememberCardEnabled ||
                /** FIXME: should not need to check pathname after landingPage is rewritten by the new spec */
                router.pathname !== '/checkout' ||
                Boolean(exist && !isModified),
            })(
              <Checkbox
                className={
                  /** FIXME: should not need to check pathname after landingPage is rewritten by the new spec */
                  !gmoRememberCardEnabled || router.pathname !== '/checkout'
                    ? styles.hidden
                    : ''
                }
              >
                {t('remember-card')}
              </Checkbox>,
            )}
      </>
    );
  },
);
