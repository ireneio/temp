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
        title: PropTypes.shape({
          zh_TW: PropTypes.string.isRequired,
        }),
        galleryInfo: PropTypes.shape({
          media: PropTypes.arrayOf(URL_TYPE).isRequired,
        }),
        status: PropTypes.oneOf([0, 1]),
        createdOn: PropTypes.number.isRequired,
      }),
    ).isRequired,

    /** props from DecoratorsRoot */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,
  };

  generateColumns = () => {
    const { transformLocale } = this.props;
    return [
      {
        title: '',
        dataIndex: 'galleryInfo',
        render: this.renderImage,
      },
      {
        title: transformLocale(LOCALE.PRODUCT_TITLE),
        dataIndex: 'title',
        render: this.renderTitle,
      },
      {
        title: transformLocale(LOCALE.ADD_DATE),
        dataIndex: 'createdOn',
        className: 'alignCenter nowrap',
        render: this.renderDate,
      },
      {
        title: transformLocale(LOCALE.CANCEL_COLLECT),
        className: 'alignCenter',
        render: this.renderCancel,
      },
    ];
  };

  cancelCollect = index => {
    const { wishList, dispatchAction } = this.props;
    dispatchAction('updateWishList', { remove: [wishList[index].id] });
  };

  renderImage = (value, record) => {
    const { id } = record;
    return (
      <Link href={`/product/${id}`} target="_blank">
        <div style={styles.productImage(((value || {}).media || [])[0])} />
      </Link>
    );
  };

  renderTitle = (value, record) => {
    const { transformLocale } = this.props;
    const { id, status } = record;
    return status ? (
      <Link href={`/product/${id}`} target="_blank">
        <span style={styles.productText(status)}>{transformLocale(value)}</span>
      </Link>
    ) : (
      <span style={styles.productText(status)}>
        {transformLocale(LOCALE.PRODUCT_STATUS_OFF)}
      </span>
    );
  };

  renderDate = (value, record) => {
    const { status } = record;
    return (
      <span style={styles.productText(status)}>
        {value ? moment.unix(value).format('YYYY/MM/DD') : '-'}
      </span>
    );
  };

  renderCancel = (value, record, index) => (
    <CloseIcon style={styles.icon} onClick={() => this.cancelCollect(index)} />
  );

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
