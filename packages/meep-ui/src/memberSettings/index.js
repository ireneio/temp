import React from 'react';
import PropTypes from 'prop-types';
import { enhancer } from 'layout/DecoratorsRoot';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Popconfirm,
  Checkbox,
} from 'antd';
import moment from 'moment';

import AddressCascader from 'addressCascader';
import * as LOCALE from './locale';
import styles from './styles/index.less';

const { Option } = Select;

@enhancer
@Form.create()
export default class MemberSettingsView extends React.PureComponent {
  static propTypes = {
    member: PropTypes.shape({
      id: PropTypes.string,
      groupName: PropTypes.string,
      groupType: PropTypes.string,
      group: PropTypes.shape({
        startDate: PropTypes.number,
        expireDate: PropTypes.number,
        unlimitedDate: PropTypes.bool,
      }),
      name: PropTypes.string,
      gender: PropTypes.number,
      additionalInfo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      birthday: PropTypes.shape({
        day: PropTypes.number,
        month: PropTypes.number,
        year: PropTypes.number,
      }),
      notification: PropTypes.object,
    }).isRequired,
    lockedBirthday: PropTypes.bool.isRequired,
    lockedCountry: PropTypes.arrayOf(PropTypes.string).isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    transformLocale: PropTypes.func.isRequired,
    form: PropTypes.objectOf(PropTypes.func).isRequired,
    dispatchAction: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showPopConfirm: false,
    };
  }

  handleVisibleChange = visible => {
    const {
      lockedBirthday,
      member: { birthday = { year: null, month: null, day: null } },
    } = this.props;
    const { day, month, year } = birthday;
    if (!visible) {
      this.setState({ showPopConfirm: visible });
    }
    if (lockedBirthday && (year == null || month == null || day == null)) {
      this.setState({ showPopConfirm: visible });
    } else {
      this.handleSubmit();
    }
  };

  handleSubmit = e => {
    if (e) {
      e.preventDefault();
    }

    const {
      form: { validateFieldsAndScroll },
      dispatchAction,
      member,
    } = this.props;

    validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {
          name = null,
          gender = null,
          tel = null,
          mobile = null,
          birthday,
          address,
          street = null,
          isNotCancelEmail,
        } = values;
        let year = null;
        let month = null;
        let day = null;
        if (birthday) {
          year = +birthday.format('YYYY');
          month = +birthday.format('M');
          day = +birthday.format('D');
        }

        dispatchAction('updateUser', {
          user: {
            id: member.id,
            name,
            gender,
            birthday: {
              year,
              month,
              day,
            },
            additionalInfo: {
              tel,
              mobile,
              address: {
                yahooCode: {
                  country: address[0],
                  city: address[1] || '',
                  county: address[2] || '',
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
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      transformLocale,
      lockedCountry,
      lockedBirthday,
      member: {
        groupName,
        groupType,
        group: { startDate, expireDate, unlimitedDate },
        name,
        email,
        gender,
        birthday: { day, month, year },
        additionalInfo: {
          tel,
          mobile,
          address: {
            yahooCode: { country, city, county, street },
          },
        },
        notification,
      },
      colors,
    } = this.props;
    const { showPopConfirm } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.groupName} style={{ color: colors[4] }}>
          {groupName}
        </div>
        {groupType === 'normal' ? null : (
          <div className={styles.groupExpireDate} style={{ color: colors[4] }}>
            {`${transformLocale(LOCALE.GROUP_EXPIRE_DATE)}
            ${moment.unix(startDate).format('YYYY/MM/DD')} ~ `}
            {unlimitedDate
              ? transformLocale(LOCALE.FOREVER)
              : moment.unix(expireDate).format('YYYY/MM/DD')}
          </div>
        )}
        <Form className={styles.form} onSubmit={this.handleSubmit}>
          <div className={styles.row}>
            <div className={styles.nameInput}>
              {getFieldDecorator('name', {
                initialValue: name == null ? undefined : name,
              })(
                <Input
                  size="large"
                  placeholder={transformLocale(LOCALE.NAME)}
                />,
              )}
            </div>
            <div className={styles.genderInput}>
              {getFieldDecorator('gender', {
                initialValue: gender == null ? undefined : gender,
              })(
                <Select
                  size="large"
                  allowClear
                  placeholder={transformLocale(LOCALE.GENDER)}
                >
                  <Option value={0}>{transformLocale(LOCALE.MALE)}</Option>
                  <Option value={1}>{transformLocale(LOCALE.FEMALE)}</Option>
                </Select>,
              )}
            </div>
          </div>
          <div className={styles.row}>
            {getFieldDecorator('email', {
              initialValue: email == null ? undefined : email,
            })(
              <Input
                disabled
                size="large"
                placeholder={transformLocale(LOCALE.EMAIL)}
              />,
            )}
          </div>
          <div className={styles.row}>
            <div className={styles.telInput}>
              {getFieldDecorator('tel', {
                initialValue: tel == null ? undefined : tel,
              })(
                <Input
                  size="large"
                  placeholder={transformLocale(LOCALE.TEL_NO)}
                />,
              )}
            </div>
            <div className={styles.mobileInput}>
              {getFieldDecorator('mobile', {
                initialValue: mobile == null ? undefined : mobile,
              })(
                <Input
                  size="large"
                  placeholder={transformLocale(LOCALE.MOBILE_NO)}
                />,
              )}
            </div>
          </div>
          <div className={styles.row}>
            {getFieldDecorator('birthday', {
              initialValue:
                day == null || month == null || year == null
                  ? undefined
                  : moment(`${year}-${month}-${day}`, 'YYYY-MM-DD'),
            })(
              <DatePicker
                size="large"
                style={{ width: '100%' }}
                placeholder={transformLocale(LOCALE.BIRTHDAY)}
                showToday={false}
                disabled={
                  !(
                    day == null ||
                    month == null ||
                    year == null ||
                    !lockedBirthday
                  )
                }
              />,
            )}
          </div>
          <div className={styles.row}>
            {getFieldDecorator('address', {
              initialValue: country
                ? [country, city, county].filter(text => text)
                : [],
            })(
              <AddressCascader
                size="large"
                placeholder={transformLocale(LOCALE.PLACEHOLDER)}
                // AddressCascader checks lockedCountry array data by Chinese
                lockedCountry={
                  lockedCountry &&
                  lockedCountry.map(e => e === 'Taiwan' && '台灣')
                }
              />,
            )}
          </div>
          <div className={styles.row}>
            {getFieldDecorator('street', {
              initialValue: street == null ? undefined : street,
            })(
              <Input
                size="large"
                placeholder={transformLocale(LOCALE.ADDRESS)}
              />,
            )}
          </div>
          <div className={styles.cancelEmailCheckbox}>
            {getFieldDecorator('isNotCancelEmail', {
              initialValue: !notification?.newsletters?.cancelEmail,
              valuePropName: 'checked',
            })(<Checkbox>{transformLocale(LOCALE.NEWSLETTER)}</Checkbox>)}
          </div>
          <div>
            <Popconfirm
              title={transformLocale(LOCALE.UPDATE_BIRTHDAY_WARNING)}
              visible={showPopConfirm}
              onVisibleChange={this.handleVisibleChange}
              okText={transformLocale(
                LOCALE.UPDATE_BIRTHDAY_WARNING_CONFIRM_TEXT,
              )}
              cancelText={transformLocale(
                LOCALE.UPDATE_BIRTHDAY_WARNING_CANCEL_TEXT,
              )}
              onConfirm={this.handleSubmit}
            >
              <Button
                className={styles.submitButton}
                style={{ color: colors[3], borderColor: colors[3] }}
                size="large"
                type="primary"
                htmlType="submit"
              >
                {transformLocale(LOCALE.UPDATE)}
              </Button>
            </Popconfirm>
          </div>
        </Form>
      </div>
    );
  }
}
