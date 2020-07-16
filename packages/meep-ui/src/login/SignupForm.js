import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import { isFullWidth, isEmail } from 'validator';
import { ApolloConsumer } from '@apollo/react-components';
import gql from 'graphql-tag';

import { adTrack as adTrackContext } from '@meepshop/context';
import { withTranslation } from '@meepshop/utils/lib/i18n';
import withContext from '@store/utils/lib/withContext';
import AddressCascader from '@store/address-cascader';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

const FormItem = Form.Item;
const { Password } = Input;

@Form.create()
@withTranslation('login')
@withContext(adTrackContext, adTrack => ({ adTrack }))
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
          store: { shippableCountries, memberGroupCodes },
        },
      },
    } = await client.query({
      query: gql`
        query getMemberGroupCodes(
          $memberGroupCodeFilterInput: MemberGroupCodeFilterInput
        ) {
          viewer {
            id
            store {
              id
              shippableCountries {
                id
              }
              memberGroupCodes(filter: $memberGroupCodeFilterInput) {
                id
              }
            }
          }
        }
      `,
      variables: { memberGroupCodeFilterInput: { status: 'EXISTED' } },
    });

    this.setState({
      shippableCountries,
      hasMemberGroupCode: !!memberGroupCodes.length,
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
      form: { getFieldDecorator, setFields },
      t,
      i18n,
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
                validator: (rule, value, callback) => {
                  if (value && (isFullWidth(value) || !isEmail(value)))
                    callback(t('is-invalid-email'));
                  else callback();
                },
              },
            ],
            validateTrigger: false,
            normalize: value => value?.replace(/\s/g, ''),
          })(
            <Input
              placeholder={t('email')}
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
              i18n={i18n}
              shippableCountries={shippableCountries || []}
            />,
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('street')(
            <Input size="large" placeholder={t('street')} />,
          )}
        </FormItem>

        {!(
          hasStoreAppPlugin('memberGroupCode') && hasMemberGroupCode
        ) ? null : (
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
