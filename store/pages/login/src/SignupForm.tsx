// typescript import
import { OptionsType } from './constants';

// import
import React, { useContext } from 'react';
import { Form, Button, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';
import {
  Colors as ColorsContext,
  Apps as AppsContext,
} from '@meepshop/context';
import AddressCascader from '@meepshop/form-address-cascader';
import Email from '@meepshop/form-email';

import useSignup from './hooks/useSignup';
import useValidateConfirmPassword from './hooks/useValidateConfirmPassword';
import styles from './styles/signupFrom.less';

// graphql typescript
import { signupFormFragment as signupFormFragmentType } from '@meepshop/types/gqls/store';

// definition
const { Item: FormItem } = Form;
const { Password } = Input;

export default React.memo(
  ({
    store,
    setOptions,
  }: {
    store: signupFormFragmentType | null;
    setOptions: (options: OptionsType) => void;
  }) => {
    const { t } = useTranslation('login');
    const colors = useContext(ColorsContext);
    const app = useContext(AppsContext);
    const { save, loading } = useSignup(setOptions);
    const validateConfirmPassword = useValidateConfirmPassword();
    const hasMemberGroupCode = (
      store?.memberGroupPromoRules.filter(Boolean) || []
    ).length;

    return (
      <Form className={styles.root} onFinish={save}>
        <Email name={['email']} checkShopperEmail />

        <FormItem
          name={['password']}
          rules={[
            {
              required: true,
              message: t('password-is-required'),
            },
          ]}
        >
          <Password placeholder={t('password')} size="large" />
        </FormItem>

        <FormItem
          name={['confirmPassword']}
          rules={[
            {
              required: true,
              message: t('password-is-required'),
            },
            validateConfirmPassword,
          ]}
          dependencies={['password']}
        >
          <Password placeholder={t('confirm-password')} size="large" />
        </FormItem>

        <FormItem name={['mobile']}>
          <Input size="large" placeholder={t('mobile')} />
        </FormItem>

        <AddressCascader
          size="large"
          name={['addressAndZipCode']}
          placeholder={[t('address'), t('zip-code')]}
          shippableCountries={store?.shippableCountries || []}
        />

        <FormItem name={['street']}>
          <Input size="large" placeholder={t('street')} />
        </FormItem>

        {!app.memberGroupCode.isInstalled || !hasMemberGroupCode ? null : (
          <FormItem name={['registeredCode']}>
            <Input placeholder={t('promotion-code')} size="large" />
          </FormItem>
        )}

        <div className={styles.buttonGroup}>
          <Button
            style={{
              borderColor: colors[4],
              backgroundColor: colors[4],
              color: colors[2],
            }}
            loading={loading}
            htmlType="submit"
            size="large"
          >
            {t('join')}
          </Button>
        </div>
      </Form>
    );
  },
);
