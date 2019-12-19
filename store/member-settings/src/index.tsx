// typescript import
import { QueryResult } from '@apollo/react-common';
import { FormComponentProps } from 'antd/lib/form';

import { I18nPropsType } from '@store/utils/lib/i18n';

// import
import React from 'react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
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
import { areEqual } from 'fbjs';
import moment from 'moment';

import AddressCascader from '@store/address-cascader';
import { withTranslation } from '@store/utils/lib/i18n';

import RemoveCreditCardInfo from './RemoveCreditCardInfo';
import styles from './styles/index.less';

// graphql typescript
import {
  getUserInfo,
  getUserInfo_viewer as getUserInfoViewer,
  getUserInfo_getColorList as getUserInfoGetColorList,
} from './__generated__/getUserInfo';

// graphql import
import { colorListFragment } from '@store/apollo-client-resolvers/lib/ColorList';

import { removeCreditCardInfoFragment } from './RemoveCreditCardInfo';

// typescript definition
interface PropsType
  extends I18nPropsType,
    FormComponentProps,
    // TODO: remove after removing redux
    Pick<QueryResult<getUserInfo>, 'refetch'> {
  // TODO: remove after removing redux
  dispatchAction: (dispatchName: string, data: unknown) => void;
  // TODO: remove after removing redux
  member?: unknown;
  viewer: getUserInfoViewer;
  colors: getUserInfoGetColorList['colors'];
}

// definition
const { Item: FormItem } = Form;
const { Option } = Select;

class MemberSettings extends React.PureComponent<PropsType> {
  public componentDidUpdate(prevProps: PropsType): void {
    const { refetch, member } = this.props;

    if (!areEqual(member, prevProps.member)) refetch();
  }

  private onSubmit = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();

    const {
      // HOC
      form: { validateFieldsAndScroll },

      // props
      dispatchAction,
      viewer: { id },
    } = this.props;

    validateFieldsAndScroll((err, values) => {
      if (err) return;

      const {
        name = null,
        gender = null,
        tel = null,
        mobile = null,
        birthday = null,
        street = null,
        isNotCancelEmail = false,
        addressAndZipCode: { address, zipCode } = {
          address: [],
          zipCode: null,
        },
      } = values;

      // TODO: update apollo cache after removing redux
      dispatchAction('updateUser', {
        user: {
          id,
          name,
          gender,
          birthday: !birthday
            ? null
            : {
                year: birthday.format('YYYY'),
                month: birthday.format('M'),
                day: birthday.format('D'),
              },
          additionalInfo: {
            tel,
            mobile,
          },
          address: {
            countryId: address[0],
            cityId: address[1],
            areaId: address[2],
            street,
            zipCode,
          },
          notification: {
            newsletters: {
              cancelEmail: !isNotCancelEmail,
            },
          },
        },
      });
    });
  };

  public render(): React.ReactNode {
    const {
      /** HOC */
      form: { getFieldDecorator },
      t,
      i18n,

      /** props */
      viewer,
      colors,
      refetch,
    } = this.props;
    const {
      group,
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

    // TODO: should not be null
    const {
      name: groupName = '',
      type = 'normal',
      startDate = moment().unix(),
      expireDate = moment().unix(),
      unlimitedDate = false,
    } = group || {};
    const { lockedCountry = null, lockedBirthday = null } =
      store?.setting || {};
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

        <Form className={styles.form} onSubmit={this.onSubmit}>
          <div className={styles.nameAndGender}>
            <FormItem>
              {getFieldDecorator('name', {
                initialValue: name || undefined,
              })(<Input size="large" placeholder={t('name')} />)}
            </FormItem>

            <FormItem>
              {getFieldDecorator('gender', {
                initialValue: gender === null ? undefined : gender,
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
              })(<Input size="large" placeholder={t('tel')} />)}
            </FormItem>

            <FormItem>
              {getFieldDecorator('mobile', {
                initialValue: mobile || undefined,
              })(<Input size="large" placeholder={t('mobile')} />)}
            </FormItem>
          </div>

          <FormItem>
            {getFieldDecorator('birthday', {
              initialValue: !birthday
                ? undefined
                : moment({
                    // TODO should not be null
                    year: birthday.year || undefined,
                    month: !birthday.month ? undefined : birthday.month - 1,
                    day: birthday.day || undefined,
                  }),
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
            })(
              <AddressCascader
                className={styles.addressCascader}
                size="large"
                placeholder={[t('address'), t('zip-code')]}
                i18n={i18n}
                lockedCountry={
                  !lockedCountry
                    ? undefined
                    : /** TODO: should not be null in array */ (lockedCountry.filter(
                        text => text,
                      ) as string[])
                }
              />,
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('street', {
              initialValue: street || undefined,
            })(<Input size="large" placeholder={t('street')} />)}
          </FormItem>

          <FormItem>
            {getFieldDecorator('isNotCancelEmail', {
              // TODO: should not be null
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
            <RemoveCreditCardInfo
              viewer={filter(removeCreditCardInfoFragment, viewer)}
              colors={colors}
              /** FIXME: should update hasGmoCreditCard in cache after creating order */
              refetch={refetch}
            />
          )}
        </Form>
      </div>
    );
  }
}

const EnhancedMemberSettings = withTranslation('member-settings')(
  Form.create<PropsType>()(MemberSettings),
);

export default React.memo(
  ({
    dispatchAction,
    member,
  }: Pick<PropsType, 'dispatchAction' | 'member'>) => (
    <Query<getUserInfo>
      query={gql`
        query getUserInfo {
          viewer {
            ...removeCreditCardInfoFragment
            id
            groupId
            groupServer: group {
              startDate
              expireDate
              unlimitedDate
            }
            group: groupClient @client {
              id
              type
              name
              startDate
              expireDate
              unlimitedDate
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
              setting {
                lockedCountry
                lockedBirthday
              }

              experiment {
                gmoRememberCardEnabled
              }
            }

            hasGmoCreditCard
          }

          getColorList {
            ...colorListFragment
          }
        }

        ${colorListFragment}
        ${removeCreditCardInfoFragment}
      `}
      /** FIXME: should update hasGmoCreditCard in cache after creating order */
      fetchPolicy="no-cache"
    >
      {({ loading, error, data, refetch }) => {
        if (loading || error || !data)
          return <Spin indicator={<Icon type="loading" spin />} />;

        const { viewer, getColorList } = data;

        if (!viewer || !getColorList)
          return <Spin indicator={<Icon type="loading" spin />} />;

        return (
          <EnhancedMemberSettings
            viewer={viewer}
            colors={getColorList.colors}
            refetch={refetch}
            dispatchAction={dispatchAction}
            member={member}
          />
        );
      }}
    </Query>
  ),
);
