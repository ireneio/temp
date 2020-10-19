// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Form, Button, Input, Divider } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import Block from '@admin/block';

import ChangePassword from './ChangePassword';

import styles from './styles/account.less';

// graphql typescript
import { getMerchantAccount_viewer as getMerchantAccountViewer } from './__generated__/getMerchantAccount';

// typescript definition
interface PropsType extends FormComponentProps {
  viewer: getMerchantAccountViewer | null;
}

// definition
const { Item: FormItem } = Form;

export const accountFragment = gql`
  fragment accountFragment on User {
    id
    email
    name
    additionalInfo {
      mobile
      tel
    }
  }
`;

export default React.memo(
  ({ form: { getFieldDecorator }, viewer }: PropsType) => {
    const { t } = useTranslation('account-setting');
    const [openModal, setOpenModal] = useState(false);

    return (
      <Block title={t('account.title')} description={t('account.description')}>
        <div className={styles.root}>
          <div>{t('account.account')}</div>
          <div>{viewer?.email}</div>

          <Button onClick={() => setOpenModal(true)}>
            {t('account.change-password')}
          </Button>

          <ChangePassword openModal={openModal} setOpenModal={setOpenModal} />

          <Divider />

          {['name', 'mobile', 'tel'].map((key: 'name' | 'mobile' | 'tel') => (
            <React.Fragment key={key}>
              <div className={styles.title}>{t(`account.${key}.label`)}</div>

              <FormItem>
                {getFieldDecorator(key, {
                  initialValue: {
                    name: viewer?.name,
                    mobile: viewer?.additionalInfo?.mobile,
                    tel: viewer?.additionalInfo?.tel,
                  }[key],
                })(<Input placeholder={t(`account.${key}.placeholder`)} />)}
              </FormItem>
            </React.Fragment>
          ))}
        </div>
      </Block>
    );
  },
);
