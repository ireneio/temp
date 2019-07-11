// typescript import
import { QueryResult } from 'react-apollo';
import { FormComponentProps } from 'antd/lib/form';

import { I18nPropsType } from '@store/utils/lib/i18n';

// import
import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
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
import idx from 'idx';
import moment from 'moment';

import AddressCascader from '@store/address-cascader';
import { withNamespaces } from '@store/utils/lib/i18n';

import styles from './styles/index.less';

// graphql typescript
import {
  getUserInfo,
  getUserInfo_viewer as getUserInfoViewer,
} from './__generated__/getUserInfo';

// graphql import
import colorsFragment from '@store/utils/lib/fragments/colors';

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
  colors: string[];
}

// definition
const { Item: FormItem } = Form;
const { Option } = Select;

class MemberSettings extends React.PureComponent<PropsType> {
  public componentDidUpdate(prevProps: PropsType): void {
    const { refetch, member } = this.props;

    if (!areEqual(member, prevProps.member)) refetch();
  }

  private onSubmit = (e: React.FormEvent<HTMLElement>) => {
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
        address = null,
        street = null,
        isNotCancelEmail = false,
      } = values;

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
            address: {
              yahooCode: {
                country: !address ? null : address[0] || null,
                city: !address ? null : address[1] || null,
                county: !address ? null : address[2] || null,
                street,
              },
            },
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

      /** props */
      viewer: {
        group,
        name,
        email,
        gender,
        birthday,
        notification,
        tel,
        mobile,
        country,
        city,
        county,
        street,
        store,
      },
      colors,
    } = this.props;

    // TODO: should not be null
    const {
      name: groupName = '',
      type = 'normal',
      startDate = moment().unix(),
      expireDate = moment().unix(),
      unlimitedDate = false,
    } = group || {};
    const { lockedCountry = null, lockedBirthday = null } =
      idx(store, _ => _.setting) || {};

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
            {getFieldDecorator('address', {
              initialValue: [country, city, county].filter(text => text),
            })(
              <AddressCascader
                size="large"
                placeholder={t('address')}
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
              initialValue: !idx(notification, _ => _.newsletters.cancelEmail),
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
        </Form>
      </div>
    );
  }
}

const EnhancedMemberSettings = withNamespaces('member-settings')(
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
            country @client
            city @client
            county @client
            street @client
            additionalInfo {
              # for client
              tel
              mobile
              address {
                yahooCode {
                  country
                  city
                  county
                  street
                }
              }
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
              setting {
                lockedCountry
                lockedBirthday
              }
            }
          }

          getMemberGroupList(
            search: {
              size: 50
              from: 0
              filter: { and: [{ type: "exact", field: "status", query: "1" }] }
            }
          ) {
            data {
              id
              type
              name
            }
          }

          getColorList {
            ...colorsFragment
          }
        }

        ${colorsFragment}
      `}
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
