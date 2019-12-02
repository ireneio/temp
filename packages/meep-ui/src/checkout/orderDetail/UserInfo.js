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

import * as LOCALE from './locale';
import { CHECK_USER_EMAIL } from './constants';

import {
  block as blockStyle,
  title as titleStyle,
  formItem as formItemStyle,
} from './styles';

const { Item: FormItem } = Form;

@withTranslation('validate-mobile')
@enhancer
@radium
export default class UserInfo extends React.PureComponent {
  static propTypes = {
    /** context */
    isLogin: ISLOGIN_TYPE.isRequired,
    getData: PropTypes.func.isRequired,
    transformLocale: PropTypes.func.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    form: PropTypes.shape({}).isRequired,
  };

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  checkUserEmail = async ({ target }) => {
    const { transformLocale, getData, form } = this.props;
    const { getFieldError, setFields } = form;

    if (getFieldError('userEmail')) return;

    const { value: email } = target;
    const result = await getData(CHECK_USER_EMAIL, { email });

    if (this.isUnmounted) return;

    if (result?.data?.checkUserInfo.exists) {
      setFields({
        userEmail: {
          value: email,
          errors: [new Error(transformLocale(LOCALE.IS_REGISTER))],
        },
      });
    }
  };

  render() {
    const {
      // context
      isLogin,
      transformLocale,

      // props
      t,
      form,
    } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div style={blockStyle}>
        <h3 style={titleStyle}>{transformLocale(LOCALE.USER_INFO)}</h3>

        {isLogin !== NOTLOGIN ? null : (
          <>
            <FormItem style={formItemStyle}>
              {getFieldDecorator('userEmail', {
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message: transformLocale(LOCALE.IS_REQUIRED),
                  },
                  {
                    validator: (rule, value, callback) => {
                      if (value && (isFullWidth(value) || !isEmail(value)))
                        callback(transformLocale(LOCALE.NOT_EMAIL));
                      else callback();
                    },
                  },
                ],
              })(
                <Input
                  placeholder={transformLocale(LOCALE.EMAIL)}
                  onBlur={this.checkUserEmail}
                />,
              )}
            </FormItem>

            <FormItem style={formItemStyle}>
              {getFieldDecorator('userPassword', {
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message: transformLocale(LOCALE.IS_REQUIRED),
                  },
                ],
              })(
                <Input
                  type="password"
                  placeholder={transformLocale(LOCALE.PASSWORD)}
                />,
              )}
            </FormItem>
          </>
        )}

        <FormItem style={formItemStyle}>
          {getFieldDecorator('userName', {
            validateTrigger: 'onBlur',
            rules: [
              {
                required: true,
                message: transformLocale(LOCALE.IS_REQUIRED),
              },
            ],
          })(<Input placeholder={transformLocale(LOCALE.NAME)} />)}
        </FormItem>

        <FormItem style={formItemStyle}>
          {getFieldDecorator('userMobile', {
            validateTrigger: 'onBlur',
            rules: [
              {
                required: true,
                message: transformLocale(LOCALE.IS_REQUIRED),
              },
              {
                validator: validateMobile(t),
              },
            ],
          })(<Input placeholder={transformLocale(LOCALE.MOBILE)} />)}
        </FormItem>
      </div>
    );
  }
}
