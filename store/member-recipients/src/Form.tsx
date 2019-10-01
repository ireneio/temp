// typescript import
import { FormComponentProps } from 'antd/lib/form';

import { I18nPropsType } from '@store/utils/lib/i18n';
import { MaybeType } from '@store/utils/lib/types';

// import
import React from 'react';
import { Form as AntdForm, Input, Button } from 'antd';

import AddressCascader from '@store/address-cascader';
import { withNamespaces } from '@store/utils/lib/i18n';
import validateMobile from '@store/utils/lib/validate/mobile';

import styles from './styles/form.less';

// graphql typescript
import {
  getUserRecipients_viewer_recipientAddressBook as getUserRecipientsViewerRecipientAddressBook,
  getUserRecipients_getColorList as getUserRecipientsGetColorList,
} from './__generated__/getUserRecipients';

// typescript definition
interface PropsType
  extends I18nPropsType,
    FormComponentProps,
    MaybeType<
      Omit<
        getUserRecipientsViewerRecipientAddressBook,
        '__typename' | 'address'
      >
    > {
  colors: getUserRecipientsGetColorList['colors'];
  lockedCountry: string[] | null;
  cancel: () => void;
  // TODO: remove after removing redux
  userId: string | null;
  // TODO: remove after removing redux
  dispatchAction: (dispatchName: string, data: unknown) => void;
  // TODO: remove after removing redux
  recipientAddressBook: getUserRecipientsViewerRecipientAddressBook[];
}

// definition
const { Item: FormItem } = AntdForm;

class Form extends React.PureComponent<PropsType> {
  private onSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    const {
      // HOC
      form: { validateFields },

      // props
      id,
      userId,
      dispatchAction,
      recipientAddressBook,
    } = this.props;

    validateFields((err, values) => {
      if (err) return;

      const { name, mobile, zipCode, address, street } = values;
      const newRecipientAddressBook = recipientAddressBook.map(
        ({ id: recipientId, ...recipient }) =>
          id === recipientId
            ? {
                name,
                mobile,
                address: {
                  postalCode: zipCode,
                  streetAddress: `${zipCode} ${address[0] || ''} ${address[1] ||
                    ''}${address[2] || ''}${street}`,
                  yahooCode: {
                    country: !address ? null : address[0] || null,
                    city: !address ? null : address[1] || null,
                    county: !address ? null : address[2] || null,
                    street,
                  },
                },
              }
            : {
                name: recipient.name,
                mobile: recipient.mobile,
                address: {
                  postalCode: recipient.zipCode,
                  streetAddress: `${recipient.zipCode} ${recipient.country ||
                    ''} ${recipient.city || ''}${recipient.county || ''}${
                    recipient.street
                  }`,
                  yahooCode: {
                    country: recipient.country,
                    city: recipient.city,
                    county: recipient.county,
                    street: recipient.street,
                  },
                },
              },
      );

      if (!id)
        newRecipientAddressBook.push({
          name,
          mobile,
          address: {
            postalCode: zipCode,
            streetAddress: `${zipCode} ${address[0] || ''} ${address[1] ||
              ''}${address[2] || ''}${street}`,
            yahooCode: {
              country: !address ? null : address[0] || null,
              city: !address ? null : address[1] || null,
              county: !address ? null : address[2] || null,
              street,
            },
          },
        });

      dispatchAction('updateUser', {
        user: {
          id: userId,
          recipientData: {
            replaceData: newRecipientAddressBook,
          },
        },
      });
    });
  };

  public render(): React.ReactNode {
    const {
      // HOC
      t,
      i18n,
      form: {
        getFieldDecorator,
        getFieldValue,
        getFieldsError,
        setFieldsValue,
      },

      // props
      id,
      colors,
      lockedCountry,
      cancel,
    } = this.props;

    return (
      <AntdForm className={styles.root} onSubmit={this.onSubmit}>
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
          {getFieldDecorator('address', {
            rules: [
              {
                required: true,
                message: t('form.required'),
              },
            ],
            getValueFromEvent: (value, allValues) => {
              const county = allValues[2];

              if (county && county.zipCode)
                setFieldsValue({ zipCode: county.zipCode });
              else setFieldsValue({ zipCode: undefined });

              return value;
            },
          })(
            <AddressCascader
              size="large"
              placeholder={t('address')}
              i18n={i18n}
              lockedCountry={!lockedCountry ? undefined : lockedCountry}
            />,
          )}
        </FormItem>

        <FormItem
          className={
            getFieldValue('address').length === 0 ||
            getFieldValue('address').length === 3
              ? styles.hidden
              : ''
          }
        >
          {getFieldDecorator('zipCode', {
            rules: [
              {
                required: true,
                message: t('form.required'),
              },
            ],
          })(<Input placeholder={t('zip-code')} size="large" />)}
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
          {!id ? null : (
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
            {t(id ? 'submit' : 'create')}
          </Button>
        </div>
      </AntdForm>
    );
  }
}

export default withNamespaces('member-recipients')(
  AntdForm.create<PropsType>({
    mapPropsToFields: ({
      name,
      mobile,
      country,
      city,
      county,
      zipCode,
      street,
    }) => ({
      name: AntdForm.createFormField({
        value: name,
      }),
      mobile: AntdForm.createFormField({
        value: mobile,
      }),
      address: AntdForm.createFormField({
        value: [country, city, county].filter(text => text),
      }),
      zipCode: AntdForm.createFormField({
        value: zipCode,
      }),
      street: AntdForm.createFormField({
        value: street,
      }),
    }),
  })(Form),
);
