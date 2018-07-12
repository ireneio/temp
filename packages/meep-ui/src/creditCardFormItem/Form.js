import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, DatePicker, Cascader } from 'antd';
import moment from 'moment';
import isInt from 'validator/lib/isInt';
import isCreditCard from 'validator/lib/isCreditCard';

import { enhancer } from 'layout/DecoratorsRoot';
import { ONE_OF_LOCALE_TYPE } from 'constants/propTypes';

import CreditCardInput from './CreditCardInput';
import { BANKS_INSTALLMENT } from './constants';
import * as LOCALE from './locale';
import * as styles from './styles/form';

const { Item: FormItem } = Form;
const { MonthPicker } = DatePicker;

const getBanksInstallmentOptions = transformLocale =>
  BANKS_INSTALLMENT.map(({ code, name, installments }) => ({
    label: `${`000${code}`.slice(-3)} - ${transformLocale(name)}`,
    value: code,
    children: installments.map(installment => ({
      label: `${installment} 期`,
      value: installment,
    })),
  }));

@enhancer
@radium
export default class From extends React.PureComponent {
  static propTypes = {
    /** context */
    locale: ONE_OF_LOCALE_TYPE.isRequired, // eslint-disable-line react/no-unused-prop-types
    transformLocale: PropTypes.func.isRequired,

    /** props */
    style: PropTypes.shape({}),
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func.isRequired,
    }).isRequired,
    isInstallment: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    style: {},
  };

  state = {
    locale: null, // eslint-disable-line react/no-unused-state
    banksInstallmentOptions: [],
  };

  static getDerivedStateFromProps(nextProps, preState) {
    const { locale, transformLocale } = nextProps;

    if (locale !== preState.locale) {
      return {
        locale,
        banksInstallmentOptions: getBanksInstallmentOptions(transformLocale),
      };
    }

    return null;
  }

  render() {
    const { transformLocale, style, form, isInstallment } = this.props;
    const { banksInstallmentOptions } = this.state;
    const { getFieldDecorator } = form;

    return (
      <React.Fragment>
        <div style={styles.itemsRoot}>
          <FormItem style={style}>
            {getFieldDecorator('creditCardOwnerName', {
              rules: [
                {
                  required: true,
                  message: transformLocale(LOCALE.IS_REQUIRED),
                },
              ],
            })(<Input placeholder={transformLocale(LOCALE.OWNER_NAME)} />)}
          </FormItem>

          <FormItem style={{ ...style, ...styles.securityCode }}>
            {getFieldDecorator('creditCardSecurityCode', {
              rules: [
                {
                  required: true,
                  message: transformLocale(LOCALE.IS_REQUIRED),
                },
                {
                  validator: (rule, value, callback) => {
                    if (!isInt(value || '', { min: 0, max: 999 }))
                      return callback(
                        transformLocale(LOCALE.NOT_SECURITY_CODE),
                      );
                    return callback();
                  },
                },
              ],
            })(
              <Input
                maxLength={3}
                placeholder={transformLocale(LOCALE.SECURITY_CODE)}
              />,
            )}
          </FormItem>
        </div>

        <FormItem style={style}>
          {getFieldDecorator('creditCardNumber', {
            rules: [
              {
                type: 'array',
                required: true,
                message: transformLocale(LOCALE.IS_REQUIRED),
              },
              {
                validator: (rule, value, callback) => {
                  if (!isCreditCard((value || []).join('-')))
                    return callback(transformLocale(LOCALE.NOT_CREDIT_NUMBER));

                  return callback();
                },
              },
            ],
          })(<CreditCardInput />)}
        </FormItem>

        <FormItem style={style}>
          {getFieldDecorator('creditCardExpiration', {
            rules: [
              {
                required: true,
                message: transformLocale(LOCALE.IS_REQUIRED),
              },
            ],
          })(
            <MonthPicker
              style={styles.expiration}
              placeholder={transformLocale(LOCALE.EXPIRATION)}
              disabledDate={current =>
                current && current < moment().endOf('day')
              }
            />,
          )}
        </FormItem>

        {!isInstallment ? null : (
          <FormItem style={style}>
            {getFieldDecorator('creditCardInstallment', {
              rules: [
                {
                  type: 'array',
                  required: true,
                  message: transformLocale(LOCALE.IS_REQUIRED),
                },
              ],
            })(
              <Cascader
                placeholder={transformLocale(LOCALE.INSTALLMENT)}
                options={banksInstallmentOptions}
                allowClear={false}
              />,
            )}
          </FormItem>
        )}
      </React.Fragment>
    );
  }
}
