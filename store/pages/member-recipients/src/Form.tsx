// import
import React, { useContext, useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { filter } from 'graphql-anywhere';

import AddressCascader from '@meepshop/form-address-cascader';
import { Colors as ColorsContext } from '@meepshop/context';
import validateMobile from '@meepshop/utils/lib/validate/mobile';
import { useTranslation } from '@meepshop/locales';

import useSave from './hooks/useSave';
import styles from './styles/form.less';

// graphql typescript
import {
  formUserFragment as formUserFragmentType,
  formRecipientAddressFragment as formRecipientAddressFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { useSaveFragment } from './gqls/useSave';

// typescript definition
interface PropsType {
  viewer: formUserFragmentType;
  recipientAddress: formRecipientAddressFragmentType | null;
  cancel: () => void;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ viewer, recipientAddress, cancel }: PropsType) => {
  const colors = useContext(ColorsContext);
  const { t } = useTranslation('member-recipients');
  const [form] = Form.useForm();
  const reset = useCallback(() => {
    cancel();
    form.resetFields();
  }, [cancel, form]);
  const save = useSave({
    viewer: filter(useSaveFragment, viewer),
    id: recipientAddress?.id,
    reset,
  });

  useEffect(() => {
    form.resetFields();
  }, [recipientAddress, form]);

  return (
    <Form
      id="recipient"
      className={styles.root}
      form={form}
      onFinish={save}
      validateTrigger="onBlur"
      scrollToFirstError
    >
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

      <FormItem
        name={['name']}
        initialValue={recipientAddress?.name}
        rules={[
          {
            required: true,
            message: t('form.required'),
          },
        ]}
      >
        <Input size="large" placeholder={t('name')} />
      </FormItem>

      <FormItem dependencies={['mobile']} noStyle>
        {({ getFieldValue }) => (
          <FormItem
            name={['mobile']}
            initialValue={recipientAddress?.mobile}
            extra={validateMobile.extra(
              getFieldValue(['mobile']),
              t('form.not-taiwan-mobile'),
            )}
            rules={[
              {
                validator: validateMobile.rule({
                  notMobile: t('form.not-mobile'),
                  notNumber: t('form.not-number'),
                }),
              },
            ]}
          >
            <Input size="large" placeholder={t('mobile')} maxLength={20} />
          </FormItem>
        )}
      </FormItem>

      <AddressCascader
        size="large"
        name={['addressAndZipCode']}
        initialValue={{
          address: [
            recipientAddress?.country?.id,
            recipientAddress?.city?.id,
            recipientAddress?.area?.id,
          ].filter(Boolean),
          zipCode: recipientAddress?.zipCode,
        }}
        rootClassName={styles.addressCascader}
        placeholder={[t('address'), t('zip-code')]}
        shippableCountries={viewer.store?.shippableCountries || []}
        enableValidator
      />

      <FormItem
        name={['street']}
        initialValue={recipientAddress?.street}
        rules={[
          {
            required: true,
            message: t('form.required'),
          },
        ]}
      >
        <Input size="large" placeholder={t('street')} />
      </FormItem>

      <div className={styles.buttons}>
        {!recipientAddress?.id ? null : (
          <Button onClick={reset} size="large" type="primary">
            {t('cancel')}
          </Button>
        )}

        <FormItem shouldUpdate noStyle>
          {({ getFieldsError }) => (
            <Button
              disabled={getFieldsError().some(
                ({ errors }) => errors.length !== 0,
              )}
              size="large"
              type="primary"
              htmlType="submit"
            >
              {t(recipientAddress?.id ? 'submit' : 'create')}
            </Button>
          )}
        </FormItem>
      </div>
    </Form>
  );
});
