import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import { isFullWidth, isEmail } from 'validator';

import { withTranslation } from '@store/utils/lib/i18n';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

const FormItem = Form.Item;

@Form.create()
@withTranslation('login')
@enhancer
export default class SignupForm extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    dispatchAction: PropTypes.func.isRequired,
    hasStoreAppPlugin: PropTypes.func.isRequired,

    /** props */
    form: PropTypes.objectOf(PropTypes.func).isRequired,
    t: PropTypes.func.isRequired,
    handleTypeChange: PropTypes.func.isRequired,
  };

  state = {
    confirmDirty: false,
  };

  handleConfirmBlur = e => {
    const { confirmDirty } = this.state;

    this.setState({
      confirmDirty: confirmDirty || !!e.target.value,
    });
  };

  compareToFirstPassword = (_, value, callback) => {
    const { form, t } = this.props;

    if (value && value !== form.getFieldValue('newPassword'))
      callback(t('password-is-no-match'));
    else callback();
  };

  validateToNextPassword = (_, value, callback) => {
    const { form } = this.props;
    const { confirmDirty } = this.state;

    if (value && confirmDirty)
      form.validateFields(['confirmPassword'], { force: true });

    callback();
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFields },
      dispatchAction,
      handleTypeChange,
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        const { email, newPassword: password, code: registeredCode } = values;

        dispatchAction('signup', {
          email,
          password,
          registeredCode,
          callback: handleTypeChange({ options: 'LOGIN' }),
        });
      }
    });
  };

  render() {
    const {
      /** context */
      hasStoreAppPlugin,
      colors,

      /** props */
      form: { getFieldDecorator, setFields },
      t,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <h3>{t('signup')}</h3>

        <FormItem>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: t('email-is-required'),
              },
              {
                validator: (rule, value, callback) => {
                  if (value && (isFullWidth(value) || !isEmail(value)))
                    callback(t('is-invalid-email'));
                  else callback();
                },
              },
            ],
            validateTrigger: false,
            normalize: value => value.replace(/\s/g, ''),
          })(
            <Input
              placeholder={t('email-placeholder')}
              size="large"
              onChange={({ target: { value } }) => {
                setFields({
                  email: {
                    value,
                  },
                });
              }}
            />,
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('newPassword', {
            rules: [
              {
                required: true,
                message: t('password-is-required'),
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(
            <Input
              type="password"
              placeholder={t('password')}
              size="large"
              onBlur={this.handleConfirmBlur}
            />,
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('confirmPassword', {
            rules: [
              {
                required: true,
                message: t('password-is-required'),
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(
            <Input
              type="password"
              placeholder={t('confirm-password')}
              size="large"
            />,
          )}
        </FormItem>

        {!hasStoreAppPlugin('memberGroupCode') ? null : (
          <FormItem>
            {getFieldDecorator('code', {
              rules: [],
            })(
              <Input
                type="text"
                placeholder={t('promotion-code')}
                size="large"
              />,
            )}
          </FormItem>
        )}

        <div className="button-group">
          <Button
            style={{ borderColor: colors[5] }}
            htmlType="submit"
            size="large"
          >
            {t('join')}
          </Button>
        </div>
      </Form>
    );
  }
}
