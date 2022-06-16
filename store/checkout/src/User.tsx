// import
import React, { useContext } from 'react';
import { Form, Input } from 'antd';
import transformColor from 'color';

import { Colors as ColorsContext } from '@meepshop/context';
import { useTranslation } from '@meepshop/locales';
import AddressCascader from '@meepshop/form-address-cascader';
import Email from '@meepshop/form-email';

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
  const colors = useContext(ColorsContext);
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
          <Email
            name={['viewerEmail']}
            checkShopperEmail
            errorMessage={t('please-login')}
          />

          <FormItem
            name={['viewerPassword']}
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
              name={['viewerName']}
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
              name={['viewerMobile']}
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
          <AddressCascader
            size="large"
            name={['viewerAddressAndZipCode']}
            placeholder={[t('area'), t('postal-code')]}
            shippableCountries={store?.shippableCountries || []}
            enableValidator={address === 'REQUIRED'}
            validateTrigger="onBlur"
          />

          <FormItem
            name={['viewerStreet']}
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

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} .ant-input::placeholder{
              color: ${transformColor(colors[3]).alpha(0.4)};
            }
          `,
        }}
      />
    </div>
  );
});
