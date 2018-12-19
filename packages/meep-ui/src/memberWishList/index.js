import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot, Style } from 'radium';
import moment from 'moment';
import { Table } from 'antd';
import { close as CloseIcon } from 'react-icons/md';

import { enhancer } from 'layout/DecoratorsRoot';
import Link from 'deprecated/link';
import { ID_TYPE, URL_TYPE, COLOR_TYPE } from 'constants/propTypes';

import * as styles from './styles';
import * as LOCALE from './locale';

@enhancer
@radium
export default class MemberWishList extends React.PureComponent {
  static propTypes = {
    wishList: PropTypes.arrayOf(
      PropTypes.shape({
        id: ID_TYPE.isRequired,
        productId: ID_TYPE.isRequired,
        createdAt: PropTypes.number.isRequired,
        title: PropTypes.shape({
          zh_TW: PropTypes.string.isRequired,
        }),
        productImage: PropTypes.shape({
          src: URL_TYPE.isRequired,
        }),
        isAvailableForSale: PropTypes.bool.isRequired,
      }),
    ).isRequired,

    /** props from DecoratorsRoot */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,
  };

  generateColumns = () => {
    const { transformLocale, dispatchAction } = this.props;

    return [
      {
        dataIndex: 'productImage',
        render: (value, { productId }) => (
          <Link href={`/product/${productId}`} target="_blank">
            <div style={styles.productImage(value?.src)} />
          </Link>
        ),
      },
      {
        title: transformLocale(LOCALE.PRODUCT_TITLE),
        dataIndex: 'title',
        render: (value, { productId, isAvailableForSale }) => (
          <Link
            href={!isAvailableForSale ? null : `/product/${productId}`}
            target="_blank"
          >
            <span style={styles.productText(isAvailableForSale)}>
              {transformLocale(
                isAvailableForSale ? value : LOCALE.PRODUCT_STATUS_OFF,
              )}
            </span>
          </Link>
        ),
      },
      {
        title: transformLocale(LOCALE.ADD_DATE),
        dataIndex: 'createdAt',
        className: 'alignCenter nowrap',
        render: (value, { isAvailableForSale }) => (
          <span style={styles.productText(isAvailableForSale)}>
            {isAvailableForSale ? moment.unix(value).format('YYYY/MM/DD') : '-'}
          </span>
        ),
      },
      {
        title: transformLocale(LOCALE.CANCEL_COLLECT),
        dataIndex: 'productId',
        className: 'alignCenter',
        render: value => (
          <CloseIcon
            style={styles.icon}
            onClick={() =>
              dispatchAction('updateWishList', {
                remove: value,
              })
            }
          />
        ),
      },
    ];
  };

  render() {
    const { colors, wishList } = this.props;

    return (
      <StyleRoot style={styles.root}>
        <Style
          scopeSelector=".ant-table-wrapper"
          rules={styles.Style(colors)}
        />

        <Table
          rowKey="id"
          columns={this.generateColumns()}
          dataSource={wishList}
          pagination={false}
        />
      </StyleRoot>
    );
  }
}
