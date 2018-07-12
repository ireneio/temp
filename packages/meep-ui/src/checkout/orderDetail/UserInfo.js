import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input } from 'antd';

import { enhancer } from 'layout/DecoratorsRoot';
import { ISLOGIN_TYPE } from 'constants/propTypes';
import { NOTLOGIN } from 'constants/isLogin';

import validateMobile from 'utils/validateMobile';

import * as LOCALE from './locale';

import {
  block as blockStyle,
  title as titleStyle,
  formItem as formItemStyle,
} from './styles';

const { Item: FormItem } = Form;

@enhancer
@radium
export default class UserInfo extends React.PureComponent {
  static propTypes = {
    /** context */
    isLogin: ISLOGIN_TYPE.isRequired,
    getData: PropTypes.func.isRequired,
    transformLocale: PropTypes.func.isRequired,

    /** props */
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
    const { data: result } = await getData(`
      query {
        checkUserInfo(search: {
          filter: {
            and: [{
              type: "exact"
              field: "email"
              query: "${email}"
            }, {
              type: "exact"
              field: "type"
              query: "shopper"
            }]
          }
        }) {
          exists
        }
      }
    `);

    if (this.isUnmounted) return;

    const { checkUserInfo } = result;
    const { exists } = checkUserInfo;

    if (exists) {
      setFields({
        userEmail: {
          value: email,
          errors: [new Error(transformLocale(LOCALE.IS_REGISTER))],
        },
      });
    }
  };

  render() {
    const { isLogin, transformLocale, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div style={blockStyle}>
        <h3 style={titleStyle}>{transformLocale(LOCALE.USER_INFO)}</h3>

        {isLogin !== NOTLOGIN ? null : (
          <React.Fragment>
            <FormItem style={formItemStyle}>
              {getFieldDecorator('userEmail', {
                rules: [
                  {
                    required: true,
                    message: transformLocale(LOCALE.IS_REQUIRED),
                  },
                  {
                    type: 'email',
                    message: transformLocale(LOCALE.NOT_EMAIL),
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
          </React.Fragment>
        )}

        <FormItem style={formItemStyle}>
          {getFieldDecorator('userName', {
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
            rules: [
              {
                required: true,
                message: transformLocale(LOCALE.IS_REQUIRED),
              },
              {
                validator: validateMobile(transformLocale),
              },
            ],
          })(<Input placeholder={transformLocale(LOCALE.MOBILE)} />)}
        </FormItem>
      </div>
    );
  }
}
