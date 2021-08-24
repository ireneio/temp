import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Button } from 'antd';
import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { withTranslation } from '@meepshop/locales';
import withHook from '@store/utils/lib/withHook';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

import { INVOICE_SEARCH_LINK } from './constants';
import styles from './styles/invoice.less';

const { Item: FormItem } = Form;

@withTranslation('receiver-default-form-item')
@withHook(() => ({
  client: useApolloClient(),
}))
@enhancer
@radium
export default class Invoice extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    style: PropTypes.shape({}),
  };

  static defaultProps = {
    style: {},
  };

  validateInvoiceVAT = async (_, value) => {
    const { t, client } = this.props;
    const { data } = await client.query({
      query: gql`
        query isBANValid($ban: String!) {
          isBANValid(ban: $ban)
        }
      `,
      variables: {
        ban: value,
      },
    });

    if (!data?.isBANValid) throw new Error(t('wrong-invoice-number'));
  };

  validateLoveCode = async (_, value) => {
    const { t, client } = this.props;
    const { data } = await client.query({
      query: gql`
        query IsEInvoiceLoveCodeValid($loveCode: String!) {
          isEInvoiceLoveCodeValid(loveCode: $loveCode)
        }
      `,
      variables: { loveCode: value },
    });

    if (!data?.isEInvoiceLoveCodeValid) throw new Error(t('wrong-donate-code'));
  };

  validateBarCode = async (_, value) => {
    const { t, client } = this.props;
    const { data } = await client.query({
      query: gql`
        query isEInvoiceBarCodeValid($barCode: String!) {
          isEInvoiceBarCodeValid(barCode: $barCode)
        }
      `,
      variables: { barCode: value },
    });

    if (!data?.isEInvoiceBarCodeValid) throw new Error(t('wrong-barcode'));
  };

  render() {
    const { colors, t, style, className, invoice } = this.props;
    const isECPAY = invoice?.[0] === 'ECPAY_ELECTRONIC';

    switch (invoice?.[1]) {
      case 'TRIPLICATE':
        return (
          <>
            <div className={styles.itemRoot}>
              <FormItem
                className={className}
                style={style}
                name={['invoiceTitle']}
                rules={[
                  {
                    required: true,
                    message: t('is-required'),
                  },
                ]}
                validateTrigger="onBlur"
              >
                <Input placeholder={t('invoice-title')} />
              </FormItem>

              <FormItem
                className={className}
                style={style}
                name={['invoiceVAT']}
                rules={[
                  {
                    required: true,
                    message: t('is-required'),
                  },
                  {
                    validator: this.validateInvoiceVAT,
                  },
                ]}
                validateTrigger="onBlur"
              >
                <Input placeholder={t('invoice-number')} />
              </FormItem>
            </div>

            <FormItem dependencies={['address', 'addressDetail']} noStyle>
              {({ getFieldValue }) => (
                <FormItem
                  className={className}
                  style={style}
                  name={['invoiceAddress']}
                  initialValue={[
                    ...(getFieldValue('address') || []),
                    getFieldValue('addressDetail'),
                  ]
                    .filter(Boolean)
                    .join(' / ')}
                  rules={[
                    {
                      required: true,
                      message: t('is-required'),
                    },
                  ]}
                  validateTrigger="onBlur"
                >
                  <Input placeholder={t('invoice-address')} />
                </FormItem>
              )}
            </FormItem>
          </>
        );

      case 'DONATION':
        return (
          <div className={styles.donate}>
            <FormItem
              className={className}
              style={style}
              name={['invoiceDonate']}
              rules={[
                {
                  required: true,
                  message: t('is-required'),
                },
                {
                  pattern: /^\d{3,7}$/,
                  message: t('wrong-donate-code'),
                },
                isECPAY && {
                  validator: this.validateLoveCode,
                },
              ]}
              validateTrigger="onBlur"
              validateFirst
            >
              <div className={styles.donateInput}>
                <Input placeholder={t('invoice-donate')} />

                <Button
                  style={{
                    color: colors[2],
                    background: colors[4],
                    borderColor: colors[4],
                  }}
                  href={INVOICE_SEARCH_LINK}
                  target="_blank"
                >
                  {t('invoice-search')}
                </Button>
              </div>
            </FormItem>

            <div>{t('invoice-donate-description')}</div>
          </div>
        );

      case 'MOBILE_BARCODE':
        return (
          <FormItem
            className={className}
            style={style}
            name={['invoiceEInvoiceNumber']}
            rules={[
              {
                required: true,
                message: t('is-required'),
              },
              {
                pattern: /^\/{1}[0-9.+\-A-Z]{7}$/,
                message: t('wrong-barcode'),
              },
              isECPAY && {
                validator: this.validateBarCode,
              },
            ]}
            validateTrigger="onBlur"
            validateFirst
          >
            <Input placeholder={t('invoice-e-invoice-number.moile-barcode')} />
          </FormItem>
        );

      case 'CITIZEN_DIGITAL_CERTIFICATE':
        return (
          <FormItem
            className={className}
            style={style}
            name={['invoiceEInvoiceNumber']}
            rules={[
              {
                required: true,
                message: t('is-required'),
              },
              {
                pattern: /^[A-Z]{2}[0-9]{14}$/,
                message: t('wrong-certificate'),
              },
            ]}
            validateTrigger="onBlur"
            validateFirst
          >
            <Input
              placeholder={t(
                'invoice-e-invoice-number.citizen-digital-certificate',
              )}
            />
          </FormItem>
        );

      default:
        return null;
    }
  }
}
