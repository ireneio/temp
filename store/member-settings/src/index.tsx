// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  Spin,
  Icon,
  Form,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Button,
} from 'antd';
import moment from 'moment';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { Colors as ColorsContext } from '@meepshop/context';
import AddressCascader, {
  validateAddressCascader,
} from '@meepshop/address-cascader';

import RemoveCreditCardInfo from './RemoveCreditCardInfo';
import useValidator from './hooks/useValidator';
import useSubmit from './hooks/useSubmit';
import styles from './styles/index.less';

// graphql typescript
import { getUserInfo } from './__generated__/getUserInfo';

// definition
const { Item: FormItem } = Form;
const { Option } = Select;
const query = gql`
  query getUserInfo {
    viewer {
      id
      group {
        startDate
        expireDate
        unlimitedDate
      }
      memberGroup {
        id
        type
        name
      }
      name
      email
      gender
      tel @client
      mobile @client
      additionalInfo {
        # for client
        tel
        mobile
      }
      address {
        country {
          id
        }
        city {
          id
        }
        area {
          id
        }
        street
        zipCode
      }
      birthday {
        year
        month
        day
      }
      notification {
        newsletters {
          cancelEmail
        }
      }
      store {
        id
        shippableCountries {
          id
        }
        setting {
          lockedBirthday
        }
        experiment {
          gmoRememberCardEnabled
        }
      }
      hasGmoCreditCard
    }
  }
`;

export default Form.create<FormComponentProps>()(
  React.memo(({ form }: FormComponentProps) => {
    const { t } = useTranslation('member-settings');
    const colors = useContext(ColorsContext);
    const validator = useValidator();
    const submit = useSubmit(form);
    const { data } = useQuery<getUserInfo>(query);
    const viewer = data?.viewer;

    if (!viewer) return <Spin indicator={<Icon type="loading" spin />} />;

    const { getFieldDecorator } = form;
    const {
      group,
      memberGroup,
      name,
      email,
      gender,
      birthday,
      notification,
      tel,
      mobile,
      address,
      store,
      hasGmoCreditCard,
    } = viewer;
    const {
      country = null,
      city = null,
      area = null,
      street = null,
      zipCode = null,
    } = address || {};
    const {
      startDate = moment().unix(),
      expireDate = moment().unix(),
      unlimitedDate = false,
    } = group?.slice(-1)[0] || {};
    const { name: groupName = '', type = 'normal' } = memberGroup || {};
    const { lockedBirthday = null } = store?.setting || {};
    const gmoRememberCardEnabled =
      store?.experiment?.gmoRememberCardEnabled || false;

    return (
      <div className={styles.root}>
        <div className={styles.groupName} style={{ color: colors[3] }}>
          {groupName}
        </div>

        {type === 'normal' ? null : (
          <div className={styles.groupExpireDate} style={{ color: colors[3] }}>
            {t('group-expire-date.info')}{' '}
            {moment.unix(startDate).format('YYYY/MM/DD')} ~{' '}
            {unlimitedDate
              ? t('group-expire-date.forever')
              : moment.unix(expireDate).format('YYYY/MM/DD')}
          </div>
        )}

        <Form className={styles.form} onSubmit={submit}>
          <div className={styles.nameAndGender}>
            <FormItem>
              {getFieldDecorator('name', {
                initialValue: name || undefined,
                ...validator(name),
              })(<Input size="large" placeholder={t('name')} />)}
            </FormItem>

            <FormItem>
              {getFieldDecorator('gender', {
                initialValue: gender === null ? undefined : gender,
                ...validator(gender),
              })(
                <Select
                  size="large"
                  placeholder={t('gender.placeholder')}
                  allowClear
                >
                  <Option value={0}>{t('gender.male')}</Option>
                  <Option value={1}>{t('gender.female')}</Option>
                </Select>,
              )}
            </FormItem>
          </div>

          <FormItem>
            {getFieldDecorator('email', {
              initialValue: email || undefined,
            })(<Input size="large" placeholder={t('email')} disabled />)}
          </FormItem>

          <div className={styles.telAndMobile}>
            <FormItem>
              {getFieldDecorator('tel', {
                initialValue: tel || undefined,
                ...validator(tel),
              })(<Input size="large" placeholder={t('tel')} />)}
            </FormItem>

            <FormItem>
              {getFieldDecorator('mobile', {
                initialValue: mobile || undefined,
                ...validator(mobile),
              })(<Input size="large" placeholder={t('mobile')} />)}
            </FormItem>
          </div>

          <FormItem>
            {getFieldDecorator('birthday', {
              initialValue: !birthday
                ? undefined
                : moment({
                    // SHOULD_NOT_BE_NULL
                    year: birthday.year || undefined,
                    month: !birthday.month ? undefined : birthday.month - 1,
                    day: birthday.day || undefined,
                  }),
              ...validator(birthday),
            })(
              <DatePicker
                size="large"
                placeholder={t('birthday')}
                disabled={Boolean(birthday && lockedBirthday)}
              />,
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('addressAndZipCode', {
              initialValue: {
                address: ([country, city, area].filter(Boolean) as NonNullable<
                  typeof country | typeof city | typeof area
                >[]).map(({ id }) => id),
                zipCode,
              },
              ...(country || city || area
                ? {
                    rules: [
                      {
                        validator: validateAddressCascader(t('form.required')),
                      },
                    ],
                  }
                : {}),
            })(
              <AddressCascader
                className={styles.addressCascader}
                size="large"
                placeholder={[t('address'), t('zip-code')]}
                shippableCountries={store?.shippableCountries || []}
              />,
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('street', {
              initialValue: street || undefined,
              ...validator(street),
            })(<Input size="large" placeholder={t('street')} />)}
          </FormItem>

          <FormItem>
            {getFieldDecorator('isNotCancelEmail', {
              // SHOULD_NOT_BE_NULL
              initialValue: !notification?.newsletters?.cancelEmail,
              valuePropName: 'checked',
            })(<Checkbox>{t('isNotCancelEmail')}</Checkbox>)}
          </FormItem>

          <Button
            className={styles.submit}
            style={{ color: colors[3], borderColor: colors[3] }}
            size="large"
            type="primary"
            htmlType="submit"
          >
            {t('submit')}
          </Button>

          {!gmoRememberCardEnabled || !hasGmoCreditCard ? null : (
            <RemoveCreditCardInfo />
          )}
        </Form>
      </div>
    );
  }),
);
