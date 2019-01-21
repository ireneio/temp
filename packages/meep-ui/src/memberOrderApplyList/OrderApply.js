import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { Table } from 'antd';
import moment from 'moment';
import memoizeOne from 'memoize-one';

import { contextProvider } from 'context';
import Thumb from 'thumb';
import localeFragment from 'fragments/localeFragment';

import styles from './styles/orderApply.less';
import * as LOCALE from './locale';

const { enhancer } = contextProvider(['locale', 'storeSetting']);

export const orderApplyFragment = gql`
  fragment orderApplyFragment on OrderApply {
    id
    applicationType
    createdOn
    recipient {
      name
      mobile
      address {
        streetAddress
      }
    }
    applicationInfo {
      comment
    }
    quantity
    status
    applicationStatus
  }
`;

export const orderApplyProductFragment = gql`
  fragment orderApplyProductFragment on productsObjectType {
    mainImage {
      src
    }
    title {
      ...localeFragment
    }
    specs {
      title {
        ...localeFragment
      }
    }
  }

  ${localeFragment}
`;

@enhancer
export default class OrderApply extends React.PureComponent {
  static propTypes = {
    applyList: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  };

  columns = memoizeOne((type, applicationType) => {
    const {
      transformLocale,
      storeSetting: { colors },
    } = this.props;

    return [
      {
        dataIndex: 'product.mainImage.src',
        render: value => (!value ? null : <Thumb imgUrl={value} />),
        width: '10%',
        align: 'center',
      },
      {
        title: transformLocale(LOCALE.PRODUCT_NAME),
        dataIndex: 'product.title',
        render: (
          value,
          {
            orderApply: {
              applicationInfo: { comment },
            },
            product: { specs },
          },
        ) => (
          <>
            <div>{transformLocale(value)}</div>

            <div>
              {(specs || [])
                .map(({ title }) => transformLocale(title))
                .join(' / ')}
            </div>

            <div className={styles.mobileShow}>{comment}</div>
          </>
        ),
      },
      {
        title: `${type}${transformLocale(LOCALE.REASON)}`,
        dataIndex: 'orderApply.applicationInfo.comment',
      },
      {
        title: transformLocale(LOCALE.QUANTITY),
        dataIndex: 'orderApply.quantity',
        align: 'center',
      },
      {
        title: `${type}${transformLocale(LOCALE.STATUS)}`,
        dataIndex: 'orderApply.status',
        render: (value, { orderApply: { applicationStatus } }) =>
          [1, 2].includes(value) ? (
            transformLocale(LOCALE.ORDER_APPLY_STATUS(applicationType, value))
          ) : (
            <div
              className={styles.tag}
              style={{
                color: colors[2],
                background: colors[4],
              }}
            >
              {applicationStatus > 0 ? type : null}
              {transformLocale(LOCALE.APPLICATIN_STATUS(applicationStatus))}
            </div>
          ),
        align: 'center',
      },
    ];
  });

  render() {
    const {
      /** context */
      transformLocale,
      storeSetting: { colors },

      /** props */
      applyList,
    } = this.props;
    const {
      orderApply: { applicationType, createdOn, recipient },
    } = applyList[0];
    const type = transformLocale(LOCALE.APPLICATION_TYPE(applicationType));

    return (
      <div className={styles.root}>
        <div className={styles.receiverInfo}>
          <h4>
            {transformLocale(LOCALE.APPLY)}
            {type}
          </h4>
          <h4>
            {transformLocale(LOCALE.ORDER_APPLY_DATE)}
            {moment.unix(createdOn).format('YYYY/MM/DD')}
          </h4>
          {applicationType === 'return' ? null : (
            <>
              <h4>
                {transformLocale(LOCALE.RECIPIENT)}
                {recipient.name}
              </h4>
              <h4>
                {transformLocale(LOCALE.PHONE)}
                {recipient.mobile}
              </h4>
              <h4>
                {transformLocale(LOCALE.ADDRESS)}
                {recipient.address.streetAddress}
              </h4>
            </>
          )}
        </div>

        <Table
          dataSource={applyList}
          columns={this.columns(type, applicationType)}
          pagination={false}
          rowKey={({ orderApply: { id } }) => id}
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .${styles.root} .ant-table-thead > tr > th {
                border-top: 1px solid ${colors[5]};
                border-bottom: 1px solid ${colors[5]};
              }

              .${styles.root} .ant-table-tbody > tr > td {
                border-bottom: 1px solid ${colors[5]};
              }

              .${styles.root} .ant-table-tbody > tr:first-child > td {
                border-top: 1px solid ${colors[5]};
              }
            `,
          }}
        />
      </div>
    );
  }
}
