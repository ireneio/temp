// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';

import AddressCascader, {
  validateAddressCascader,
} from '@meepshop/address-cascader';
import { Colors as ColorsContext } from '@meepshop/context';
import validateMobile from '@meepshop/utils/lib/validate/mobile';
import { useTranslation } from '@meepshop/utils/lib/i18n';

import useFormSubmit from './hooks/useFormSubmit';
import styles from './styles/form.less';

// graphql typescript
import { formRecipientAddressFragment as formRecipientAddressFragmentType } from './gqls/__generated__/formRecipientAddressFragment';
import { formStoreFragment as formStoreFragmentType } from './gqls/__generated__/formStoreFragment';

// typescript definition
interface PropsType extends FormComponentProps {
  recipientAddress: formRecipientAddressFragmentType | null;
  store: formStoreFragmentType | null;
  cancel: () => void;
}

// definition
const { Item: FormItem } = Form;

export default Form.create<PropsType>({
  mapPropsToFields: ({ recipientAddress }) => ({
    name: Form.createFormField({
      value: recipientAddress?.name,
    }),
    mobile: Form.createFormField({
      value: recipientAddress?.mobile,
    }),
    addressAndZipCode: Form.createFormField({
      value: {
        address: ([
          recipientAddress?.country,
          recipientAddress?.city,
          recipientAddress?.area,
        ].filter(Boolean) as {
          id: string;
        }[]).map(({ id }) => id),
        zipCode: recipientAddress?.zipCode,
      },
    }),
    street: Form.createFormField({
      value: recipientAddress?.street,
    }),
  }),
})(
  React.memo(
    ({
      // HOC
      form: {
        getFieldDecorator,
        getFieldValue,
        getFieldsError,
        validateFields,
      },

      // props
      recipientAddress,
      store,
      cancel,
    }: PropsType) => {
      const colors = useContext(ColorsContext);
      const { t } = useTranslation('member-recipients');
      const submit = useFormSubmit(
        validateFields,
        recipientAddress?.id,
        cancel,
      );

      return (
        <Form className={styles.root} onSubmit={submit}>
          <style
            dangerouslySetInnerHTML={{
              __html: `
              .${styles.root} .ant-btn {
                color: ${colors[3]};
                border-color: ${colors[3]};
              }
            `,
            }}
          />

          <FormItem>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: t('form.required'),
                },
              ],
            })(<Input size="large" placeholder={t('name')} />)}
          </FormItem>

          <FormItem
            extra={validateMobile.extra(
              getFieldValue('mobile'),
              t('form.not-taiwan-mobile'),
            )}
          >
            {getFieldDecorator('mobile', {
              rules: [
                {
                  validator: validateMobile.rule({
                    notMobile: t('form.not-mobile'),
                    notNumber: t('form.not-number'),
                  }),
                },
              ],
            })(<Input size="large" placeholder={t('mobile')} maxLength={20} />)}
          </FormItem>

          <FormItem>
            {getFieldDecorator('addressAndZipCode', {
              rules: [
                {
                  validator: validateAddressCascader(t('form.required')),
                },
              ],
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
              rules: [
                {
                  required: true,
                  message: t('form.required'),
                },
              ],
            })(<Input size="large" placeholder={t('street')} />)}
          </FormItem>

          <div className={styles.buttons}>
            {!recipientAddress?.id ? null : (
              <Button onClick={cancel} size="large" type="primary">
                {t('cancel')}
              </Button>
            )}

            <Button
              disabled={(fieldsError =>
                Object.keys(fieldsError).some(field => fieldsError[field]))(
                getFieldsError(),
              )}
              size="large"
              type="primary"
              htmlType="submit"
            >
              {t(recipientAddress?.id ? 'submit' : 'create')}
            </Button>
          </div>
        </Form>
      );
    },
  ),
);
