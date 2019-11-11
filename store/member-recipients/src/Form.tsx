// typescript import
import { FormComponentProps } from 'antd/lib/form';

import { I18nPropsType } from '@store/utils/lib/i18n';

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
    Partial<
      Omit<
        getUserRecipientsViewerRecipientAddressBook,
        '__typename' | 'address'
      >
    > {
  colors: getUserRecipientsGetColorList['colors'];
  lockedCountry: string[] | null;
  cancel: () => void;
  // TODO: remove after removing redux
  dispatchAction: (dispatchName: string, data: unknown) => void;
  // TODO: remove after removing redux
  recipientIndexForRedux: number;
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
      dispatchAction,
      recipientIndexForRedux,
    } = this.props;

    validateFields((err, values) => {
      if (err) return;

      const {
        name,
        mobile,
        addressAndZipCode: { address, zipCode },
        street,
      } = values;

      dispatchAction(!id ? 'addRecipientAddress' : 'updateRecipientAddress', {
        ...(!id
          ? {}
          : {
              recipientIndexForRedux,
            }),
        input: {
          ...(!id
            ? {}
            : {
                id,
              }),
          name,
          mobile,
          countryId: address[0],
          cityId: address[1],
          areaId: address[2],
          street,
          zipCode,
        },
      });
    });
  };

  public render(): React.ReactNode {
    const {
      // HOC
      t,
      i18n,
      form: { getFieldDecorator, getFieldValue, getFieldsError },

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
          {getFieldDecorator('addressAndZipCode', {
            rules: [
              {
                required: true,
                message: t('form.required'),
              },
            ],
          })(
            <AddressCascader
              className={styles.addressCascader}
              size="large"
              placeholder={[t('address'), t('zip-code')]}
              i18n={i18n}
              lockedCountry={!lockedCountry ? undefined : lockedCountry}
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
      area,
      zipCode,
      street,
    }) => ({
      name: AntdForm.createFormField({
        value: name,
      }),
      mobile: AntdForm.createFormField({
        value: mobile,
      }),
      addressAndZipCode: AntdForm.createFormField({
        value: {
          address: ([country, city, area].filter(Boolean) as NonNullable<
            typeof country | typeof city | typeof area
          >[]).map(({ id }) => id),
          zipCode,
        },
      }),
      street: AntdForm.createFormField({
        value: street,
      }),
    }),
  })(Form),
);
