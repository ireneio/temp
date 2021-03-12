import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import { ApolloConsumer } from '@apollo/react-components';
import gql from 'graphql-tag';
import { emptyFunction } from 'fbjs';

import { withTranslation } from '@meepshop/locales';
import { AdTrack as AdTrackContext } from '@meepshop/context';
import AddressCascader from '@meepshop/address-cascader';
import { useValidateEmail } from '@meepshop/validator';
import withContext from '@store/utils/lib/withContext';
import withHook from '@store/utils/lib/withHook';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

const FormItem = Form.Item;
const { Password } = Input;

@Form.create()
@withTranslation('login')
@withContext(AdTrackContext, adTrack => ({ adTrack }))
@withHook(() => ({
  validateEmail: useValidateEmail(emptyFunction.thatReturnsArgument),
}))
@enhancer
class SignupForm extends React.PureComponent {
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
    shippableCountries: [],
    hasMemberGroupCode: false,
  };

  componentDidMount() {
    this.getMemberGroupCodes();
  }

  getMemberGroupCodes = async () => {
    const { client } = this.props;

    const {
      data: {
        viewer: {
          store: { shippableCountries, memberGroupPromoRules },
        },
      },
    } = await client.query({
      query: gql`
        query getMemberGroupCodes {
          viewer {
            id
            store {
              id
              shippableCountries {
                id
              }
              memberGroupPromoRules {
                id
              }
            }
          }
        }
      `,
    });

    this.setState({
      shippableCountries,
      hasMemberGroupCode: !!memberGroupPromoRules.length,
    });
  };

  handleConfirmBlur = e => {
    const { confirmDirty } = this.state;

    this.setState({
      confirmDirty: confirmDirty || !!e.target.value,
    });
  };

  compareToFirstPassword = (_, value, callback) => {
    const { form, t } = this.props;

    if (value && value !== form.getFieldValue('password'))
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
      adTrack,
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        const {
          email,
          password,
          registeredCode,
          mobile,
          addressAndZipCode,
          street,
        } = values;

        dispatchAction('signup', {
          values: {
            email,
            password,
            registeredCode,
            additionalInfo: {
              mobile,
            },
            address: {
              countryId: addressAndZipCode?.address[0],
              cityId: addressAndZipCode?.address[1],
              areaId: addressAndZipCode?.address[2],
              zipCode: addressAndZipCode?.zipCode,
              street,
            },
          },
          callback: () => {
            handleTypeChange({ options: 'LOGIN' });
            adTrack.completeRegistration();
          },
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
      form: { getFieldDecorator },
      t,
      validateEmail,
    } = this.props;
    const { shippableCountries, hasMemberGroupCode } = this.state;

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
                validator: validateEmail.validator,
              },
            ],
            validateTrigger: 'onBlur',
            normalize: validateEmail.normalize,
          })(<Input placeholder={t('email')} size="large" />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', {
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
            <Password
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
          })(<Password placeholder={t('confirm-password')} size="large" />)}
        </FormItem>

        <FormItem>
          {getFieldDecorator('mobile')(
            <Input size="large" placeholder={t('mobile')} />,
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('addressAndZipCode')(
            <AddressCascader
              size="large"
              placeholder={[t('address'), t('zip-code')]}
              shippableCountries={shippableCountries || []}
            />,
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('street')(
            <Input size="large" placeholder={t('street')} />,
          )}
        </FormItem>

        {!hasStoreAppPlugin('memberGroupCode') || !hasMemberGroupCode ? null : (
          <FormItem>
            {getFieldDecorator('registeredCode', {
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

export default React.memo(({ handleTypeChange }) => (
  <ApolloConsumer>
    {client => (
      <SignupForm client={client} handleTypeChange={handleTypeChange} />
    )}
  </ApolloConsumer>
));
