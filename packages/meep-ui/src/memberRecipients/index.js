import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot, Style } from 'radium';
import { enhancer } from 'layout/DecoratorsRoot';
import { Row, Form, Table, Input, Button, Divider } from 'antd';

import { ID_TYPE, COLOR_TYPE } from 'constants/propTypes';
import fetchStreamName from 'utils/fetchStreamName';
import { TAIWAN } from 'locale/country';

import validateMobile, {
  validateTaiwanMobileNumber,
} from 'utils/validateMobile';

import AddressCascader from '../addressCascader';

import * as styles from './styles';
import * as LOCALE from './locale';

const { Item: FormItem } = Form;

@Form.create()
@enhancer
@radium
export default class MemberRecipients extends React.PureComponent {
  static propTypes = {
    member: PropTypes.shape({
      id: ID_TYPE.isRequired,
      recipientData: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          mobile: PropTypes.string.isRequired,
          address: PropTypes.shape({
            yahooCode: PropTypes.shape({
              country: PropTypes.string.isRequired,
              city: PropTypes.string.isRequired,
              county: PropTypes.string.isRequired,
              street: PropTypes.string.isRequired,
            }),
          }).isRequired,
        }),
      ).isRequired,
    }).isRequired,
    lockedCountry: PropTypes.arrayOf(PropTypes.string).isRequired,

    /** props from DecoratorsRoot */
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func.isRequired,
      getFieldsError: PropTypes.func.isRequired,
      validateFields: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
    }).isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,
  };

  state = {
    selectedIndex: null,
  };

  generateColumns = () => {
    const { transformLocale } = this.props;

    return [
      {
        title: transformLocale(LOCALE.NAME),
        dataIndex: 'name',
        render: this.renderTitle,
      },
      {
        title: transformLocale(LOCALE.ADDRESS),
        dataIndex: 'address',
        className: 'hideOnMobile',
        render: this.renderAddress,
      },
      {
        title: transformLocale(LOCALE.MOBILE),
        dataIndex: 'mobile',
        className: 'hideOnMobile nowrap',
      },
      {
        title: '',
        key: 'action',
        className: 'hideOnMobile nowrap',
        render: this.renderAction,
      },
    ];
  };

  editRecipient = index => {
    const {
      form: { resetFields },
    } = this.props;

    this.setState({
      selectedIndex: index,
    });
    resetFields();
  };

  deleteRecipient = index => {
    const { member, dispatchAction } = this.props;

    const user = {
      id: member.id,
      recipientData: member.recipientData,
    };

    user.recipientData = {
      replaceData: [
        ...user.recipientData.slice(0, index),
        ...user.recipientData.slice(index + 1, user.recipientData.length),
      ],
    };
    dispatchAction('updateUser', { user });
  };

  submit = e => {
    if (e) {
      e.preventDefault();
    }
    const {
      form: { validateFields, resetFields },
      member,
      dispatchAction,
    } = this.props;
    const { selectedIndex } = this.state;

    validateFields(
      async (err, { postalCode, address, street, ...filedsValue }) => {
        if (!err) {
          if (Object.values(TAIWAN).includes(address[0])) {
            // eslint-disable-next-line
            postalCode = await fetchStreamName(address).then(({ zip }) =>
              zip.toString(),
            );
          }

          const recipient = {
            ...filedsValue,
            address: {
              postalCode,
              streetAddress: `${postalCode} ${address[0]} ${address[1] ||
                ''}${address[2] || ''}${street}`,
              yahooCode: {
                country: address[0],
                city: address[1] || '',
                county: address[2] || '',
                street,
              },
            },
          };

          const user = {
            id: member.id,
            recipientData: member.recipientData,
          };

          if (selectedIndex !== null) {
            user.recipientData[selectedIndex] = recipient;
          } else {
            user.recipientData = [...user.recipientData, recipient];
          }
          user.recipientData = {
            replaceData: user.recipientData,
          };

          dispatchAction('updateUser', { user });
          resetFields();
          this.setState({
            selectedIndex: null,
          });
        }
      },
    );
  };

  renderTitle = (value, record, index) => {
    const { transformLocale } = this.props;
    const {
      address: { yahooCode },
      mobile,
    } = record;
    const { country = '', city = '', county = '', street = '' } =
      yahooCode || {};
    return (
      <>
        <div className="hideOnMobile">{value}</div>
        <div className="showOnMobile" style={styles.recipient}>
          <div style={styles.recipientRow}>
            <span style={styles.recipientRowTitle}>
              {transformLocale(LOCALE.NAME)}
            </span>
            <span>{value}</span>
          </div>
          <div style={styles.recipientRow}>
            <span style={styles.recipientRowTitle}>
              {transformLocale(LOCALE.ADDRESS)}
            </span>
            <span>{country + city + county + street}</span>
          </div>
          <div style={styles.recipientRow}>
            <span style={styles.recipientRowTitle}>
              {transformLocale(LOCALE.MOBILE)}
            </span>
            <span>{mobile}</span>
          </div>
          <div style={styles.recipientRow}>
            <span style={styles.recipientRowTitle}>
              {transformLocale(LOCALE.ACTION)}
            </span>
            <div>{this.renderAction(null, null, index)}</div>
          </div>
        </div>
      </>
    );
  };

  renderAddress = (address = {}) => {
    const {
      postalCode,
      yahooCode: { country, city, county, street },
    } = address;
    return (
      <>
        {`${postalCode ? `${postalCode} ` : ''}${
          country ? `${country} ` : ''
        }${city || ''}${county || ''}${street || ''}`}
      </>
    );
  };

  renderAction = (value, record, index) => {
    const { transformLocale } = this.props;
    return (
      <>
        <span style={styles.action} onClick={() => this.editRecipient(index)}>
          {transformLocale(LOCALE.EDIT)}
        </span>
        <Divider type="vertical" />
        <span style={styles.action} onClick={() => this.deleteRecipient(index)}>
          {transformLocale(LOCALE.DELETE)}
        </span>
      </>
    );
  };

  renderForm = () => {
    const { selectedIndex } = this.state;
    const {
      form: { getFieldDecorator, getFieldsError, getFieldValue },
      colors,
      member,
      lockedCountry,
      transformLocale,
    } = this.props;

    let recipient;
    const selected = selectedIndex !== null;
    if (selected) {
      recipient = member.recipientData[selectedIndex];
    } else {
      recipient = {};
    }
    const { name = '', mobile = '', address = {} } = recipient;
    const { country, city, county, street } = address.yahooCode || {};

    return (
      <Form onSubmit={this.submit}>
        <FormItem>
          {getFieldDecorator('name', {
            initialValue: name,
            rules: [
              {
                required: true,
                message: transformLocale(LOCALE.NAME_IS_REQUIRED),
              },
            ],
          })(<Input size="large" placeholder={transformLocale(LOCALE.NAME)} />)}
        </FormItem>
        <FormItem
          extra={validateTaiwanMobileNumber(
            transformLocale,
            getFieldValue('mobile') || '',
          )}
        >
          {getFieldDecorator('mobile', {
            initialValue: mobile,
            rules: [
              {
                validator: validateMobile(transformLocale, 'recipientMobile'),
              },
            ],
          })(
            <Input
              size="large"
              placeholder={transformLocale(LOCALE.MOBILE)}
              maxLength={20}
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('address', {
            initialValue: country
              ? [country, city, county].filter(text => text)
              : [],
            rules: [
              {
                required: true,
                message: transformLocale(LOCALE.AREA_IS_REQUIRED),
              },
            ],
          })(
            <AddressCascader
              size="large"
              placeholder={transformLocale(LOCALE.PLACEHOLDER)}
              allowClear={false}
              lockedCountry={lockedCountry}
            />,
          )}
        </FormItem>
        {[undefined, ...Object.values(TAIWAN)].includes(
          getFieldValue('address')?.[0],
        ) ? null : (
          <FormItem>
            {getFieldDecorator('postalCode', {
              rules: [
                {
                  required: true,
                  message: transformLocale(LOCALE.IS_REQUIRED),
                },
              ],
            })(<Input placeholder={transformLocale(LOCALE.POSTAL_CODE)} />)}
          </FormItem>
        )}
        <FormItem>
          {getFieldDecorator('street', {
            initialValue: street,
            rules: [
              {
                required: true,
                message: transformLocale(LOCALE.STREET_IS_REQUIRED),
              },
            ],
          })(
            <Input size="large" placeholder={transformLocale(LOCALE.STREET)} />,
          )}
        </FormItem>
        <Row type="flex" justify="center">
          {selected && (
            <Button
              style={styles.button(colors)}
              size="large"
              type="primary"
              onClick={() => this.editRecipient(null)}
            >
              {transformLocale(LOCALE.CANCEL)}
            </Button>
          )}
          <Button
            style={styles.button(colors)}
            size="large"
            type="primary"
            htmlType="submit"
            disabled={(fieldsError =>
              Object.keys(fieldsError).some(field => fieldsError[field]))(
              getFieldsError(),
            )}
          >
            {transformLocale(selected ? LOCALE.SUBMIT : LOCALE.CREATE)}
          </Button>
        </Row>
      </Form>
    );
  };

  render() {
    const {
      colors,
      member: { recipientData },
    } = this.props;

    return (
      <StyleRoot className="member-recipient" style={styles.root}>
        <Style scopeSelector=".member-recipient" rules={styles.Style(colors)} />
        <div style={styles.table}>
          <Table
            rowKey={(record, index) => `${index}-${record.name}`}
            columns={this.generateColumns()}
            dataSource={recipientData}
            pagination={false}
          />
        </div>
        <div style={styles.form}>{this.renderForm()}</div>
      </StyleRoot>
    );
  }
}
