// import
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { FormOutlined, LoadingOutlined } from '@ant-design/icons';
import { Form as AntdForm, Spin, Checkbox } from 'antd';

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
export interface PropsType extends getGMOUserVariablesType {
  isInstallment: boolean;
  rememberCardNumber: boolean;
}

// definition
const { Item: FormItem } = AntdForm;

export { formatGmo };

export default React.memo(
  ({ storePaymentId, isInstallment, rememberCardNumber }: PropsType) => {
    const router = useRouter();
    const { t } = useTranslation('gmo-credit-card-form');
    const { data } = useQuery<getGMOUserType, getGMOUserVariablesType>(
      getGMOUser,
      {
        variables: { storePaymentId },
        /** FIXME: should remove cache in @store/member-settings, fix this after getGMOUser is rewritten */
        fetchPolicy: 'no-cache',
      },
    );

    const exist = Boolean(data?.gmoUser?.exist);
    const [isModified, setIsModified] = useState(false);

    if (!data) return <Spin indicator={<LoadingOutlined spin />} />;

    const { gmoUser } = data;
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
              {isModified ? null : <FormOutlined />}

              {t(isModified ? 'cancel' : 'modify')}
            </div>
          )}
        </h3>

        {exist && !isModified && !isInstallment ? (
          <div className={styles.cardNumber}>
            {cardNumberFront}
            ********
            {cardNumberLater}
          </div>
        ) : (
          <Form isInstallment={isInstallment} storePaymentId={storePaymentId} />
        )}

        {isInstallment ? null : (
          <FormItem
            name={['isRememberCard']}
            initialValue={
              !rememberCardNumber ||
              /** FIXME: should not need to check pathname after landingPage is rewritten by the new spec */
              router.pathname !== '/checkout' ||
              Boolean(exist && !isModified)
            }
            valuePropName="checked"
          >
            <Checkbox
              className={
                /** FIXME: should not need to check pathname after landingPage is rewritten by the new spec */
                !rememberCardNumber || router.pathname !== '/checkout'
                  ? styles.hidden
                  : ''
              }
            >
              {t('remember-card')}
            </Checkbox>
          </FormItem>
        )}
      </>
    );
  },
);
