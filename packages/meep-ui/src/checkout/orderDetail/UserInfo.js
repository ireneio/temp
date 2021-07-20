import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input } from 'antd';

import { withTranslation } from '@meepshop/locales';
import AddressCascader, {
  validateAddressCascader,
} from '@meepshop/address-cascader';
import { useValidateEmail } from '@meepshop/validator';
import withHook from '@store/utils/lib/withHook';

import { enhancer } from 'layout/DecoratorsRoot';
import { ISLOGIN_TYPE } from 'constants/propTypes';
import { NOTLOGIN } from 'constants/isLogin';

import validateMobile from 'utils/validateMobile';

import {
  block as blockStyle,
  title as titleStyle,
  formItem as formItemStyle,
} from './styles';

const { Item: FormItem } = Form;
const { Password } = Input;

@withTranslation(['checkout', 'validate-mobile'])
@withHook(() => ({
  validateEmail: useValidateEmail(false, true),
}))
@enhancer
@radium
export default class UserInfo extends React.PureComponent {
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

      // props
      t,
      shippableCountries,
      checkoutFields,
      validateEmail,
    } = this.props;

    if (
      isLogin !== NOTLOGIN &&
      Object.keys(checkoutFields).every(
        key => key === '__typename' || checkoutFields[key] === 'HIDDEN',
      )
    )
      return null;

    return (
      <div style={blockStyle}>
        <h3 style={titleStyle}>{t('user-info')}</h3>

        {isLogin !== NOTLOGIN ? null : (
          <>
            <FormItem
              style={formItemStyle}
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

            <FormItem
              style={formItemStyle}
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
            style={formItemStyle}
            name={['userName']}
            rules={
              checkoutFields.name === 'OPTIONAL'
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
            <Input placeholder={t('name')} />
          </FormItem>
        )}

        {checkoutFields.mobile === 'HIDDEN' ? null : (
          <FormItem
            style={formItemStyle}
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
              style={formItemStyle}
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
              style={formItemStyle}
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
