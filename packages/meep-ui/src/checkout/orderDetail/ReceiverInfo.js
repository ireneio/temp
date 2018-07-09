import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Select, Checkbox } from 'antd';

import { enhancer } from 'layout';
import {
  ISLOGIN_TYPE,
  USER_TYPE,
  SHIPMENT_TEMPLATE_TYPE,
  COUNTRY_TYPE,
} from 'constants/propTypes';
import { NOTLOGIN } from 'constants/isLogin';

import ReceiverDefaultFormItem from 'receiverDefaultFormItem';

import * as LOCALE from './locale';
import * as styles from './styles/receiverInfo';

import {
  block as blockStyle,
  title as titleStyle,
  formItem as formItemStyle,
} from './styles';

const { Item: FormItem } = Form;
const { TextArea } = Input;
const { Option } = Select;

@enhancer
@radium
export default class ReceiverInfo extends React.PureComponent {
  static propTypes = {
    /** context */
    user: USER_TYPE,
    isLogin: ISLOGIN_TYPE.isRequired,
    transformLocale: PropTypes.func.isRequired,

    /** props */
    form: PropTypes.shape({}).isRequired,
    countries: PropTypes.arrayOf(COUNTRY_TYPE.isRequired),
    chooseShipmentTemplate: SHIPMENT_TEMPLATE_TYPE,
    isSynchronizeUserInfo: PropTypes.bool.isRequired,
    changeSynchronizeUserInfo: PropTypes.func.isRequired,
    isSaveAsReceiverTemplate: PropTypes.bool.isRequired,
    changeSaveAsReceiverTemplate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: null,
    countries: null,
    chooseShipmentTemplate: null,
  };

  setReceiverWithTemplate = index => {
    const { form, user } = this.props;
    const { setFieldsValue } = form;
    const { recipientData } = user;
    const { name, mobile, address } = recipientData[index];
    const { country, city, county, street } = address.yahooCode;

    setFieldsValue({
      name,
      mobile,
      address: [country, city, county].filter(data => data),
      addressDetail: street,
    });
  };

  synchronizeUserInfo = ({ target }) => {
    const { form, changeSynchronizeUserInfo } = this.props;

    if (target.checked) {
      const { getFieldsValue, setFieldsValue, validateFields } = form;
      const { userName, userMobile } = getFieldsValue([
        'userName',
        'userMobile',
      ]);

      setFieldsValue({
        name: userName,
        mobile: userMobile,
      });
      validateFields(['userName', 'userMobile', 'name', 'mobile']);
    }

    changeSynchronizeUserInfo(target.checked);
  };

  canSaveAsTemplate = () => {
    const {
      isLogin,
      chooseShipmentTemplate,
      changeSaveAsReceiverTemplate,
    } = this.props;
    const saveAsTemplate =
      isLogin !== NOTLOGIN &&
      chooseShipmentTemplate &&
      ['gd', 'blackcat', 'chunghwaPost', 'others'].includes(
        chooseShipmentTemplate,
      );

    if (this.storeSaveAsTemplate !== saveAsTemplate) {
      changeSaveAsReceiverTemplate(false);
    }

    this.storeSaveAsTemplate = saveAsTemplate;
    return saveAsTemplate;
  };

  storeSaveAsTemplate = false;

  render() {
    const {
      transformLocale,
      form,
      user,
      countries,
      chooseShipmentTemplate,
      isSynchronizeUserInfo,
      changeSaveAsReceiverTemplate,
      isSaveAsReceiverTemplate,
    } = this.props;
    const { getFieldDecorator } = form;
    const canSaveAsTemplate = this.canSaveAsTemplate();

    return (
      <div style={blockStyle}>
        <h3
          id="choose-shipment-store"
          style={[titleStyle, styles.receiverTitle]}
        >
          {transformLocale(LOCALE.RECEIVER_INFO)}

          <Checkbox
            onChange={this.synchronizeUserInfo}
            checked={isSynchronizeUserInfo}
          >
            {transformLocale(LOCALE.SAME_AS_USER_INFO)}
          </Checkbox>
        </h3>

        {!canSaveAsTemplate ||
        (user.recipientData || []).length === 0 ? null : (
          <FormItem style={formItemStyle}>
            {getFieldDecorator('receiverTemplate')(
              <Select
                placeholder={transformLocale(LOCALE.RECEIVER_TEMPLATE)}
                onChange={this.setReceiverWithTemplate}
              >
                {user.recipientData.map(({ name }, index) => (
                  /* eslint-disable react/no-array-index-key */
                  <Option key={`${name}-${index}`} value={index}>
                    {name}
                  </Option>
                  /* eslint-enable react/no-array-index-key */
                ))}
              </Select>,
            )}
          </FormItem>
        )}

        <FormItem style={formItemStyle}>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: transformLocale(LOCALE.IS_REQUIRED),
              },
              {
                validator: (rule, value, callback) => {
                  if (value && value.length > 10)
                    return callback(transformLocale(LOCALE.NAME_TOO_LONG));
                  return callback();
                },
              },
            ],
          })(<Input placeholder={transformLocale(LOCALE.NAME)} />)}
        </FormItem>

        <ReceiverDefaultFormItem
          style={formItemStyle}
          form={form}
          chooseShipmentTemplate={chooseShipmentTemplate}
          countries={countries}
          invoiceIsNeeded
        />

        <FormItem style={formItemStyle}>
          {getFieldDecorator('notes')(
            <TextArea placeholder={transformLocale(LOCALE.NOTES)} rows={4} />,
          )}
        </FormItem>

        {!canSaveAsTemplate ? null : (
          <div style={[formItemStyle, styles.saveAsReceiverTemplate]}>
            <Checkbox
              onChange={({ target }) =>
                changeSaveAsReceiverTemplate(target.checked)
              }
              checked={isSaveAsReceiverTemplate}
            >
              {transformLocale(LOCALE.SAVE_AS_RECEIVER_TEMPLATE)}
            </Checkbox>
          </div>
        )}
      </div>
    );
  }
}
