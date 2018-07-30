import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form, Input, Button, message } from 'antd';
import * as Cookies from 'js-cookie';

import contextProps from '../../../contextProps';

message.config({ maxCount: 2 });

const { Item: FormItem } = Form;
const styles = {
  root: {
    margin: '0px auto 30px',
    padding: '0px 20px',
    maxWidth: '800px',
  },
};

const transformFields = (
  fieldsData,
  data,
  handleFieldKey,
  handleData = newData => newData,
) =>
  fieldsData.reduce(
    (result, { fieldKey, noUndefined }) => ({
      ...result,
      [fieldKey]: handleData(
        noUndefined
          ? data[handleFieldKey(fieldKey)] || ''
          : data[handleFieldKey(fieldKey)],
      ),
    }),
    {},
  );

export default ({
  storyPathname,
  dataName,
  getData,
  handleFieldKey = fieldKey => fieldKey,
  handleFieldValue = fieldValue => fieldValue,
  fieldsData,
}) => {
  class ContextStory extends React.Component {
    static displayName = `${dataName}Story`;

    reset = () => {
      const { form } = this.props;

      form.setFieldsValue(
        transformFields(fieldsData, getData(contextProps), handleFieldKey),
      );
    };

    render() {
      const { form } = this.props;

      return (
        <Form style={styles.root}>
          {fieldsData.map(({ fieldKey, fieldSetting }, index) => (
            /* eslint-disable react/no-array-index-key */
            <FormItem key={index} label={fieldKey.replace(/-/g, ' ')}>
              {form.getFieldDecorator(fieldKey, fieldSetting)(<Input />)}
            </FormItem>
            /* eslint-enable react/no-array-index-key */
          ))}

          <Button onClick={this.reset}>reset</Button>
        </Form>
      );
    }
  }

  const Component = Form.create({
    mapPropsToFields: () =>
      transformFields(
        fieldsData,
        getData(Cookies.getJSON('context') || contextProps),
        handleFieldKey,
        data => Form.createFormField({ value: data }),
      ),
    onFieldsChange: (props, fields) => {
      const dataUpdated = [];

      Object.keys(fields).forEach(fieldKey => {
        const { errors, validating, value } = fields[fieldKey];

        if (!validating && !errors) {
          const newContextProps = Cookies.getJSON('context') || contextProps;

          // eslint-disable-next-line no-param-reassign
          getData(newContextProps)[handleFieldKey(fieldKey)] = handleFieldValue(
            value,
          );
          Cookies.set('context', newContextProps);
          dataUpdated.push(fieldKey.replace(/-/g, ' '));
        }
      });

      if (dataUpdated.length !== 0) {
        message.success(`update "${dataUpdated.join(', ')}"`);
      }
    },
  })(ContextStory);

  const stories = storyPathname.split(/\//g);

  storiesOf(['context', ...stories.slice(0, -1)].join('/'), module).add(
    stories.slice(-1)[0],
    () => <Component />,
  );
};
