import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Popconfirm,
} from 'antd';
import moment from 'moment';

import { enhancer } from 'layout';
import AddressCascader from '../addressCascader';
import { USER_TYPE } from './constants';
import * as LOCALE from './locale';

const FormItem = Form.Item;
const { Option } = Select;

@enhancer
@radium
@Form.create()
export default class MemberInfo extends React.PureComponent {
  static propTypes = {
    member: PropTypes.shape(USER_TYPE).isRequired,
    lockedBirthday: PropTypes.bool.isRequired,
    lockedCountry: PropTypes.arrayOf(PropTypes.string).isRequired,
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
    } = this.props;
    const { showPopConfirm } = this.state;

    return (
      <Form
        style={{ marginTop: 20, padding: 5 }}
        onSubmit={this.handleSubmit}
        className="member-info-form"
      >
        <Row type="flex" justify="center" gutter={24}>
          <Col
            lg={{ span: 8 }}
            md={{ span: 8 }}
            sm={{ span: 8 }}
            xs={{ span: 16 }}
          >
            <FormItem>
              {getFieldDecorator('name', {
                initialValue: name == null ? undefined : name,
              })(<Input placeholder={transformLocale(LOCALE.NAME)} />)}
            </FormItem>
          </Col>
          <Col
            lg={{ span: 4 }}
            md={{ span: 4 }}
            sm={{ span: 4 }}
            xs={{ span: 8 }}
          >
            <FormItem>
              {getFieldDecorator('gender', {
                initialValue: gender == null ? undefined : gender,
              })(
                <Select allowClear placeholder={transformLocale(LOCALE.GENDER)}>
                  <Option value={0}>{transformLocale(LOCALE.MALE)}</Option>
                  <Option value={1}>{transformLocale(LOCALE.FEMALE)}</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem>
          <Row type="flex" justify="center" gutter={24}>
            <Col
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 12 }}
              xs={{ span: 24 }}
            >
              {getFieldDecorator('email', {
                initialValue: email == null ? undefined : email,
              })(
                <Input disabled placeholder={transformLocale(LOCALE.EMAIL)} />,
              )}
            </Col>
          </Row>
        </FormItem>
        <Row type="flex" justify="center" gutter={24}>
          <Col
            lg={{ span: 6 }}
            md={{ span: 6 }}
            sm={{ span: 6 }}
            xs={{ span: 12 }}
          >
            <FormItem>
              {getFieldDecorator('tel', {
                initialValue: tel == null ? undefined : tel,
              })(<Input placeholder={transformLocale(LOCALE.TEL_NO)} />)}
            </FormItem>
          </Col>
          <Col
            lg={{ span: 6 }}
            md={{ span: 6 }}
            sm={{ span: 6 }}
            xs={{ span: 12 }}
          >
            <FormItem>
              {getFieldDecorator('mobile', {
                initialValue: mobile == null ? undefined : mobile,
              })(<Input placeholder={transformLocale(LOCALE.MOBILE_NO)} />)}
            </FormItem>
          </Col>
        </Row>
        <FormItem>
          <Row type="flex" justify="center" gutter={24}>
            <Col
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 12 }}
              xs={{ span: 24 }}
            >
              {getFieldDecorator('birthday', {
                initialValue:
                  day == null || month == null || year == null
                    ? undefined
                    : moment(`${year}-${month}-${day}`, 'YYYY-MM-DD'),
              })(
                <DatePicker
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
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Row type="flex" justify="center" gutter={24}>
            <Col
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 12 }}
              xs={{ span: 24 }}
            >
              {getFieldDecorator('address', {
                initialValue: [country, city, county],
              })(
                <AddressCascader
                  placeholder={transformLocale(LOCALE.PLACEHOLDER)}
                  // AddressCascader checks lockedCountry array data by Chinese
                  lockedCountry={
                    lockedCountry &&
                    lockedCountry.map(e => e === 'Taiwan' && '台灣')
                  }
                />,
              )}
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Row type="flex" justify="center" gutter={24}>
            <Col
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 12 }}
              xs={{ span: 24 }}
            >
              {getFieldDecorator('street', {
                initialValue: street == null ? undefined : street,
              })(<Input placeholder={transformLocale(LOCALE.ADDRESS)} />)}
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Row type="flex" justify="center" gutter={24}>
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
                className="member-info-submit-button"
                size="large"
                type="primary"
                htmlType="submit"
              >
                {transformLocale(LOCALE.UPDATE)}
              </Button>
            </Popconfirm>
          </Row>
        </FormItem>
      </Form>
    );
  }
}
