import React from 'react';
import PropTypes from 'prop-types';
import { enhancer } from '@meepshop/meep-ui/lib/layout';
import { Form, Input, Button, Select, DatePicker, Popconfirm } from 'antd';
import moment from 'moment';

import AddressCascader from '@meepshop/meep-ui/lib/addressCascader';
import * as LOCALE from './locale';
import './styles/index.less';

const { Option } = Select;

@enhancer
@Form.create()
export default class MemberSettingsView extends React.PureComponent {
  static propTypes = {
    member: PropTypes.shape({
      id: PropTypes.string,
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
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {
          name = null,
          gender = null,
          tel = null,
          mobile = null,
          birthday,
          address,
          street = null,
        } = values;
        let year = null;
        let month = null;
        let day = null;
        if (birthday) {
          year = +birthday.format('YYYY');
          month = +birthday.format('M');
          day = +birthday.format('D');
        }
        const member = {
          id: this.props.member.id,
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
                city: address[1],
                county: address[2],
                street,
              },
            },
          },
        };
        this.props.dispatchAction('updateUser', { user: member });
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
      },
      colors,
    } = this.props;
    const { showPopConfirm } = this.state;

    return (
      <div className="member_settings_view_form_wrapper">
        <Form
          className="member_settings_view_form"
          onSubmit={this.handleSubmit}
        >
          <div className="member_settings_view_form_row">
            <div className="member_settings_view_form_name_input">
              {getFieldDecorator('name', {
                initialValue: name == null ? undefined : name,
              })(
                <Input
                  size="large"
                  placeholder={transformLocale(LOCALE.NAME)}
                />,
              )}
            </div>
            <div className="member_settings_view_form_gender_input">
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
          <div className="member_settings_view_form_row">
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
          <div className="member_settings_view_form_row">
            <div className="member_settings_view_form_tel_input">
              {getFieldDecorator('tel', {
                initialValue: tel == null ? undefined : tel,
              })(
                <Input
                  size="large"
                  placeholder={transformLocale(LOCALE.TEL_NO)}
                />,
              )}
            </div>
            <div className="member_settings_view_form_mobile_input">
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
          <div className="member_settings_view_form_row">
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
          <div className="member_settings_view_form_row">
            {getFieldDecorator('address', {
              initialValue: country ? [country, city, county] : [],
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
          <div className="member_settings_view_form_row">
            {getFieldDecorator('street', {
              initialValue: street == null ? undefined : street,
            })(
              <Input
                size="large"
                placeholder={transformLocale(LOCALE.ADDRESS)}
              />,
            )}
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
                className="member_settings_view_form_submit_button"
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
