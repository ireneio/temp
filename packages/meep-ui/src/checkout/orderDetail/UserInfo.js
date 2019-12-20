import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input } from 'antd';
import { isFullWidth, isEmail } from 'validator';

import { withTranslation } from '@store/utils/lib/i18n';

import { enhancer } from 'layout/DecoratorsRoot';
import { ISLOGIN_TYPE } from 'constants/propTypes';
import { NOTLOGIN } from 'constants/isLogin';

import validateMobile from 'utils/validateMobile';

import { CHECK_USER_EMAIL } from './constants';

import {
  block as blockStyle,
  title as titleStyle,
  formItem as formItemStyle,
} from './styles';

const { Item: FormItem } = Form;

@withTranslation(['checkout', 'validate-mobile'])
@enhancer
@radium
export default class UserInfo extends React.PureComponent {
  static propTypes = {
    /** context */
    isLogin: ISLOGIN_TYPE.isRequired,
    getData: PropTypes.func.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    form: PropTypes.shape({}).isRequired,
  };

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  checkUserEmail = async (rule, value, callback) => {
    const {
      /** context */
      getData,

      /** props */
      t,
    } = this.props;

    const result = await getData(CHECK_USER_EMAIL, { email: value });

    if (this.isUnmounted) return;

    if (result?.data?.checkUserInfo.exists) callback(t('is-register'));
    else callback();
  };

  render() {
    const {
      // context
      isLogin,

      // props
      t,
      form,
    } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div style={blockStyle}>
        <h3 style={titleStyle}>{t('user-info')}</h3>

        {isLogin !== NOTLOGIN ? null : (
          <>
            <FormItem style={formItemStyle}>
              {getFieldDecorator('userEmail', {
                validateTrigger: 'onBlur',
                validateFirst: true,
                rules: [
                  {
                    required: true,
                    message: t('is-required'),
                  },
                  {
                    validator: (rule, value, callback) => {
                      if (value && (isFullWidth(value) || !isEmail(value)))
                        callback(t('not-email'));
                      else callback();
                    },
                  },
                  {
                    validator: this.checkUserEmail,
                  },
                ],
              })(<Input placeholder={t('email')} />)}
            </FormItem>

            <FormItem style={formItemStyle}>
              {getFieldDecorator('userPassword', {
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message: t('is-required'),
                  },
                ],
              })(<Input type="password" placeholder={t('password')} />)}
            </FormItem>
          </>
        )}

        <FormItem style={formItemStyle}>
          {getFieldDecorator('userName', {
            validateTrigger: 'onBlur',
            rules: [
              {
                required: true,
                message: t('is-required'),
              },
            ],
          })(<Input placeholder={t('name')} />)}
        </FormItem>

        <FormItem style={formItemStyle}>
          {getFieldDecorator('userMobile', {
            validateTrigger: 'onBlur',
            rules: [
              {
                required: true,
                message: t('is-required'),
              },
              {
                validator: validateMobile(t),
              },
            ],
          })(<Input placeholder={t('mobile')} />)}
        </FormItem>
      </div>
    );
  }
}
