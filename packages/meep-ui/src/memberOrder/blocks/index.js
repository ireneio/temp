import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { filter } from 'graphql-anywhere';
import transformColor from 'color';

import { contextProvider } from 'context';
import Link from 'link';

import PaymentInfo, { paymentInfoFragment } from './PaymentInfo';
import ShipmentInfo, { shipmentInfoFragment } from './ShipmentInfo';
import InvoiceInfo, { invoiceInfoFragment } from './InvoiceInfo';
import * as LOCALE from './locale';
import styles from './styles/index.less';

const { enhancer } = contextProvider(['storeSetting', 'locale']);

export const blocksFragment = gql`
  fragment blocksFragment on Order {
    userInfo {
      name
      email
      mobile
    }
    shipmentInfo {
      status
      list {
        name
        recipient {
          name
          email
          mobile
          address {
            streetAddress
          }
          comment
        }
        storeShipmentDetails {
          searchLink
        }
        ...shipmentInfoFragment
      }
    }
    paymentInfo {
      status
      list {
        name
      }
    }
    invoices {
      ...invoiceInfoFragment
    }
    status
    ...paymentInfoFragment
  }
  ${paymentInfoFragment}
  ${shipmentInfoFragment}
  ${invoiceInfoFragment}
`;

@enhancer
export default class Blocks extends React.PureComponent {
  static propTypes = {
    order: PropTypes.shape({}).isRequired,
  };

  renderDescription = children =>
    !children || children.length === 0 ? null : (
      <div className={styles.description}>
        {children instanceof Array
          ? children
              .filter(dom => dom)
              .map((dom, index, totalArray) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index}>
                  {dom}

                  {index === totalArray.length - 1 ? null : (
                    <div className={styles.border} />
                  )}
                </div>
              ))
          : children}
      </div>
    );

  render() {
    const {
      /** context */
      storeSetting: { colors },
      transformLocale,

      /** props */
      order: {
        userInfo,
        shipmentInfo: {
          list: [
            {
              recipient: { comment, ...recipient },
              storeShipmentDetails,
              ...shipmentObj
            },
          ],
          ...shipmentInfo
        },
        paymentInfo: {
          list: [paymentObj],
          ...paymentInfo
        },
        status,
        invoices,
        ...order
      },
    } = this.props;

    return (
      <div className={styles.root}>
        <div>
          <h4>{transformLocale(LOCALE.BUYER)}</h4>

          <div className={styles.description}>
            {['name', 'email', 'mobile'].map(key => (
              <div key={key}>{userInfo[key]}</div>
            ))}
          </div>
        </div>

        <div>
          <h4>{transformLocale(LOCALE.RECIPIENT)}</h4>

          <div className={styles.description}>
            {['name', 'email', 'mobile', 'address'].map(key => (
              <div key={key}>
                {key === 'address'
                  ? recipient.address?.streetAddress
                  : recipient[key]}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4>{transformLocale(LOCALE.PAYMENT_STATUS)}</h4>

          <div className={styles.status}>
            {transformLocale(LOCALE.PAYMENT[paymentInfo.status])}
          </div>
        </div>

        <div>
          <h4>{transformLocale(LOCALE.SHIPMENT_STATUS)}</h4>

          <div className={styles.status}>
            {transformLocale(LOCALE.SHIPMENT[shipmentInfo.status])}
          </div>
        </div>

        <div>
          <h4>{transformLocale(LOCALE.PAYMENT_TYPE)}</h4>

          <div className={styles.status}>{paymentObj.name}</div>

          <PaymentInfo
            order={filter(paymentInfoFragment, {
              ...order,
              paymentInfo: {
                ...paymentInfo,
                list: [paymentObj],
              },
            })}
          >
            {this.renderDescription}
          </PaymentInfo>
        </div>

        <div>
          <h4>{transformLocale(LOCALE.SHIPMENT_TYPE)}</h4>

          <div className={styles.status}>{shipmentObj.name}</div>

          {!storeShipmentDetails?.searchLink ? null : (
            <Link
              className={styles.link}
              href={storeShipmentDetails.searchLink}
              target="_blank"
            >
              {transformLocale(LOCALE.SHIPMENT_LINK)}
            </Link>
          )}

          <ShipmentInfo
            shipmentInfo={filter(shipmentInfoFragment, {
              ...shipmentObj,
              recipient,
            })}
          >
            {this.renderDescription}
          </ShipmentInfo>
        </div>

        <div>
          <h4>{transformLocale(LOCALE.INVOICE_INFO)}</h4>

          <InvoiceInfo invoices={invoices}>
            {(invoiceStatus, description) => (
              <>
                <div className={styles.status}>{invoiceStatus}</div>

                {this.renderDescription(description)}
              </>
            )}
          </InvoiceInfo>
        </div>

        <div>
          <h4>{transformLocale(LOCALE.ORDER_STATUS)}</h4>

          <div className={styles.status}>
            {transformLocale(LOCALE.STATUS[status])}
          </div>

          {this.renderDescription(
            comment?.split('\n').map(str => <div key={str}>{str}</div>),
          )}
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .${styles.description} {
                color: ${colors[3]};
                background: ${transformColor(colors[4]).alpha(0.1)};
              }

              .${styles.description} .${styles.border} {
                background: ${colors[5]};
              }

              .${styles.status} {
                color: ${colors[2]};
                background: ${colors[4]};
              }

              .${styles.link} {
                border: 1px solid ${colors[3]};
              }
            `,
          }}
        />
      </div>
    );
  }
}
