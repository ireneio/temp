// import
import React from 'react';
import { Form, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { useValidateEmail } from '@meepshop/validator';
import AddressCascader, {
  validateAddressCascader,
} from '@meepshop/form-address-cascader';

import useValidateMobile from './hooks/useValidateMobile';
import styles from './styles/user.less';

// graphql typescript
import { userFragment as userFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  isLogin: boolean;
  store: userFragmentType | null;
}

// definition
const { Item: FormItem } = Form;
const { Password } = Input;

export default React.memo(({ isLogin, store }: PropsType) => {
  const { t } = useTranslation('checkout');
  const validateEmail = useValidateEmail(false, true, t('please-login'));
  const { validateMobile } = useValidateMobile();

  const name = store?.setting?.checkoutFields.name || '';
  const mobile = store?.setting?.checkoutFields.mobile || '';
  const address = store?.setting?.checkoutFields.address || '';

  if (isLogin && [name, mobile, address].every(field => field === 'HIDDEN'))
    return null;

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <div>{t('user-info')}</div>

        {isLogin ? null : (
          <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {t('go-to-login')}
          </div>
        )}
      </div>

      {isLogin ? null : (
        <>
          <FormItem
            name={['userEmail']}
            rules={[
              {
                required: true,
                message: t('is-required'),
              },
              {
                validator: validateEmail.validator,
              },
            ]}
            normalize={validateEmail.normalize}
            validateTrigger="onBlur"
            validateFirst
          >
            <Input size="large" placeholder={t('email')} />
          </FormItem>

          <FormItem
            name={['userPassword']}
            rules={[
              {
                required: true,
                message: t('is-required'),
              },
            ]}
            validateTrigger="onBlur"
          >
            <Password size="large" placeholder={t('password')} />
          </FormItem>
        </>
      )}

      {name === 'HIDDEN' ? null : (
        <FormItem dependencies={['payment']} noStyle>
          {({ getFieldValue }) => (
            <FormItem
              className={styles.formItem}
              name={['userName']}
              rules={[
                ...(getFieldValue(['payment'])?.template !== 'ecpay2'
                  ? []
                  : [
                      {
                        pattern: /^[a-zA-Z\u4E00-\u9FFF,.()/-]+$/,
                        message: t('validate-ecpay-name'),
                      },
                    ]),
                ...(name === 'OPTIONAL'
                  ? []
                  : [
                      {
                        required: true,
                        message: t('is-required'),
                      },
                    ]),
              ]}
              validateTrigger="onBlur"
            >
              <Input size="large" placeholder={t('name')} />
            </FormItem>
          )}
        </FormItem>
      )}

      {mobile === 'HIDDEN' ? null : (
        <FormItem dependencies={['shipment']} noStyle>
          {({ getFieldValue }) => (
            <FormItem
              name={['userMobile']}
              rules={[
                ...(mobile === 'OPTIONAL'
                  ? []
                  : [
                      {
                        required: true,
                        message: t('is-required'),
                      },
                    ]),
                {
                  validator: (_, value) =>
                    validateMobile(
                      value,
                      getFieldValue(['shipment'])?.template,
                    ),
                },
              ]}
              validateTrigger="onBlur"
            >
              <Input size="large" placeholder={t('mobile')} />
            </FormItem>
          )}
        </FormItem>
      )}

      {address === 'HIDDEN' ? null : (
        <>
          <FormItem
            name={['userAddressAndZipCode']}
            rules={
              address === 'OPTIONAL'
                ? []
                : [
                    {
                      validator: validateAddressCascader(t('is-required')),
                    },
                  ]
            }
            validateTrigger="onBlur"
          >
            <AddressCascader
              size="large"
              placeholder={[t('area'), t('postal-code')]}
              shippableCountries={store?.shippableCountries || []}
            />
          </FormItem>

          <FormItem
            name={['userStreet']}
            rules={
              address === 'OPTIONAL'
                ? []
                : [
                    {
                      required: true,
                      message: t('is-required'),
                    },
                  ]
            }
            validateTrigger="onBlur"
          >
            <Input size="large" placeholder={t('address')} />
          </FormItem>
        </>
      )}
    </div>
  );
});
