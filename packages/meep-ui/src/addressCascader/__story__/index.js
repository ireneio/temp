import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'antd';
import ReactMarkdown from 'react-markdown';

import { COUNTRY_TYPE } from 'constants/propTypes';

import AddressCascader from '..';

const { Item: FormItem } = Form;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 5 },
};

@Form.create({
  mapPropsToFields: ({ address }) => ({
    'address-form': Form.createFormField({
      value: address,
    }),
  }),
})
class AddressCascaderWrapper extends React.PureComponent {
  static propTypes = {
    lockedCountry: PropTypes.arrayOf(COUNTRY_TYPE.isRequired),
    address: PropTypes.arrayOf(PropTypes.string.isRequired),
  };

  static defaultProps = {
    lockedCountry: undefined,
    address: undefined,
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    addressState: this.props.address,
  };

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    const {
      form: { resetFields, setFieldsValue, getFieldDecorator, getFieldsValue },
      lockedCountry,
      address,
    } = this.props;
    const { addressState } = this.state;

    return (
      <Form layout="vertical">
        <ReactMarkdown
          className="markdown-body"
          source={`
#### How to modify data
\`\`\`js
{
  "address": ["台灣", "新北市", "永和區"]
}
\`\`\`

#### Data now
\`\`\`js
${JSON.stringify(
            { ...getFieldsValue(), 'address-state': addressState },
            null,
            2,
          )}
\`\`\``}
        />

        <FormItem {...formItemLayout} label="Build with Form.create()">
          {getFieldDecorator('address-form')(
            <AddressCascader lockedCountry={lockedCountry} />,
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Use initialValue with getFieldDecorator"
        >
          {getFieldDecorator('address-initialValue', {
            initialValue: address,
          })(<AddressCascader lockedCountry={lockedCountry} />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Not use getFieldDecorator">
          <AddressCascader
            defaultValue={address}
            value={addressState}
            lockedCountry={lockedCountry}
            onChange={value => this.setState({ addressState: value })}
          />
        </FormItem>

        <Button
          onClick={() => {
            resetFields();
            this.setState({ addressState: undefined });
          }}
        >
          reset value
        </Button>

        <Button
          onClick={() => {
            setFieldsValue({
              'address-form': ['台灣', '新北市', '永和區'],
              'address-initialValue': ['台灣', '新北市', '永和區'],
            });
            this.setState({ addressState: ['台灣', '新北市', '永和區'] });
          }}
        >
          test set value with another event
        </Button>
      </Form>
    );
  }
}

export default props => <AddressCascaderWrapper {...props} />;
