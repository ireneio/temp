import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input } from 'antd';
import transformColor from 'color';

import AddressCascader, {
  validateAddressCascader,
} from '@meepshop/form-address-cascader';
import { Colors as ColorsContext, Fb as FbContext } from '@meepshop/context';
import Line from '@meepshop/line';
import { withTranslation } from '@meepshop/locales';
import LoginModal from '@meepshop/login-modal';
import { FbLoginIcon } from '@meepshop/icons';
import { useValidateEmail } from '@meepshop/validator';
import filter from '@meepshop/utils/lib/filter';
import withHook from '@store/utils/lib/withHook';
import withContext from '@store/utils/lib/withContext';

import { enhancer } from 'layout/DecoratorsRoot';
import { ISLOGIN_TYPE } from 'constants/propTypes';
import { NOTLOGIN } from 'constants/isLogin';

import validateMobile from 'utils/validateMobile';

import styles from './styles/userInfo.less';

// eslint-disable-next-line import/order
import { lineFragment } from '@meepshop/line/gqls';

const { Item: FormItem } = Form;
const { Password } = Input;

@withTranslation(['checkout', 'validate-mobile'])
@withHook(({ t }) => ({
  validateEmail: useValidateEmail(false, true, t('please-login')),
}))
@withContext(FbContext, ({ fb, isLoginEnabled }) => ({
  fb,
  isFbLoginEnabled: isLoginEnabled,
}))
@withContext(ColorsContext, colors => ({ colors }))
@enhancer
@radium
export default class UserInfo extends React.PureComponent {
  state = {
    isVisible: false,
    fbLoginLoading: false,
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
      fb,
      isFbLoginEnabled,
      lineLoginSetting,
      colors,
    } = this.props;
    const { isVisible, fbLoginLoading } = this.state;

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
            <div className={styles.login}>
              <div className={styles.text}>{t('login-tip')}</div>

              <Line
                className={styles.line}
                redirectUrl="/checkout"
                lineLoginSetting={filter(lineFragment, lineLoginSetting)}
              />

              {!isFbLoginEnabled ? null : (
                <div
                  className={styles.fb}
                  onClick={async () => {
                    if (!fb || fbLoginLoading) return;

                    this.setState({ fbLoginLoading: true });
                    await fb.login();
                    this.setState({ fbLoginLoading: false });
                  }}
                >
                  <FbLoginIcon />
                  {t('fb-login')}
                </div>
              )}

              <div
                className={styles.member}
                onClick={() => this.setState({ isVisible: true })}
              >
                {t('login')}
              </div>
            </div>

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

            {!isVisible ? null : (
              <FormItem noStyle dependencies={[['userEmail']]}>
                {({ getFieldValue }) => (
                  <LoginModal
                    onClose={() => this.setState({ isVisible: false })}
                    initialEmail={getFieldValue(['userEmail'])}
                    disableThirdPartyLogin
                  />
                )}
              </FormItem>
            )}

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

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .${styles.login} {
                background-color: ${transformColor(colors[1]).alpha(0.3)};
                color: ${colors[3]};
              }

              .${styles.member} {
                background-color: ${colors[4]};
                color: ${colors[2]};
              }
            `,
          }}
        />
      </div>
    );
  }
}
