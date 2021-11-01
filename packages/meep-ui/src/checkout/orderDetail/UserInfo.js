import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Button } from 'antd';

import AddressCascader, {
  validateAddressCascader,
} from '@meepshop/address-cascader';
import { withTranslation } from '@meepshop/locales';
import LoginModal from '@meepshop/login-modal';
import { useValidateEmail } from '@meepshop/validator';
import withHook from '@store/utils/lib/withHook';

import { enhancer } from 'layout/DecoratorsRoot';
import { ISLOGIN_TYPE } from 'constants/propTypes';
import { NOTLOGIN } from 'constants/isLogin';

import validateMobile from 'utils/validateMobile';

import styles from './styles/userInfo.less';

const { Item: FormItem } = Form;
const { Password } = Input;

@withTranslation(['checkout', 'validate-mobile'])
@withHook(({ t }) => ({
  validateEmail: useValidateEmail(false, true, t('please-login')),
}))
@enhancer
@radium
export default class UserInfo extends React.PureComponent {
  state = {
    isVisible: false,
  };

  static propTypes = {
    /** context */
    isLogin: ISLOGIN_TYPE.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
  };

  render() {
    const {
      // context
      isLogin,
      storeSetting: { shippableCountries },

      // props
      t,
      checkoutFields,
      choosePaymentTemplate,
      validateEmail,
    } = this.props;
    const { isVisible } = this.state;

    if (
      isLogin !== NOTLOGIN &&
      Object.keys(checkoutFields).every(
        key => key === '__typename' || checkoutFields[key] === 'HIDDEN',
      )
    )
      return null;

    return (
      <div className={styles.block}>
        <h3 className={styles.title}>{t('user-info')}</h3>

        {isLogin !== NOTLOGIN ? null : (
          <>
            <div className={styles.email}>
              <FormItem
                className={styles.formItem}
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
                <Input placeholder={t('email')} />
              </FormItem>

              {/** FIXME: https://github.com/ant-design/ant-design/issues/26888 */}
              <FormItem noStyle shouldUpdate>
                {({ getFieldError }) =>
                  !getFieldError(['userEmail']).includes(
                    t('please-login'),
                  ) ? null : (
                    <Button
                      type="primary"
                      onClick={() => this.setState({ isVisible: true })}
                    >
                      {t('login')}
                    </Button>
                  )
                }
              </FormItem>

              {!isVisible ? null : (
                <FormItem noStyle dependencies={[['userEmail']]}>
                  {({ getFieldValue }) => (
                    <LoginModal
                      onClose={() => this.setState({ isVisible: false })}
                      initialEmail={getFieldValue(['userEmail'])}
                    />
                  )}
                </FormItem>
              )}
            </div>

            <FormItem
              className={styles.formItem}
              name={['userPassword']}
              rules={[
                {
                  required: true,
                  message: t('is-required'),
                },
              ]}
              validateTrigger="onBlur"
            >
              <Password placeholder={t('password')} />
            </FormItem>
          </>
        )}

        {checkoutFields.name === 'HIDDEN' ? null : (
          <FormItem
            className={styles.formItem}
            name={['userName']}
            rules={[
              ...(choosePaymentTemplate !== 'ecpay2'
                ? []
                : [
                    {
                      pattern: /^[a-zA-Z\u4E00-\u9FFF,.()/-]+$/,
                      message: t('validate-ecpay-name'),
                    },
                  ]),
              ...(checkoutFields.name === 'OPTIONAL'
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
            <Input placeholder={t('name')} />
          </FormItem>
        )}

        {checkoutFields.mobile === 'HIDDEN' ? null : (
          <FormItem
            className={styles.formItem}
            name={['userMobile']}
            rules={[
              ...(checkoutFields.mobile === 'OPTIONAL'
                ? []
                : [
                    {
                      required: true,
                      message: t('is-required'),
                    },
                  ]),
              {
                validator: validateMobile(t),
              },
            ]}
            validateTrigger="onBlur"
          >
            <Input placeholder={t('mobile')} />
          </FormItem>
        )}

        {checkoutFields.address === 'HIDDEN' ? null : (
          <>
            <FormItem
              className={styles.formItem}
              name={['userAddressAndZipCode']}
              rules={
                checkoutFields.address === 'OPTIONAL'
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
                placeholder={[t('area'), t('postal-code')]}
                shippableCountries={shippableCountries || []}
              />
            </FormItem>

            <FormItem
              className={styles.formItem}
              name={['userStreet']}
              rules={
                checkoutFields.address === 'OPTIONAL'
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
              <Input placeholder={t('address')} />
            </FormItem>
          </>
        )}
      </div>
    );
  }
}
