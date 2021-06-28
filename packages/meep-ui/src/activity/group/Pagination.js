import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { POSITIVE_NUMBER_TYPE } from 'constants/propTypes';

import { Pagination as AntdPagination } from 'antd';

import * as styles from './styles/pagination';

@radium
export default class Pagination extends React.PureComponent {
  static propTypes = {
    params: PropTypes.shape({
      limit: POSITIVE_NUMBER_TYPE.isRequired,
      offset: POSITIVE_NUMBER_TYPE.isRequired,
    }).isRequired,
    total: POSITIVE_NUMBER_TYPE.isRequired,
    scrollToTop: PropTypes.func.isRequired,
    getProductsData: PropTypes.func.isRequired,
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    current: this.props.params.offset / this.props.params.limit + 1,
  };

  onChange = page => {
    const { params, scrollToTop, getProductsData } = this.props;

    this.setState({
      current: page,
    });

    const offset = (page - 1) * params.limit;
    getProductsData({ ...params, offset });
    scrollToTop();
  };

  render() {
    const { current } = this.state;
    const { params, total } = this.props;
    const { limit } = params;

    return (
      <div style={styles.root}>
        <AntdPagination
          simple
          current={current}
          defaultPageSize={limit}
          total={total}
          onChange={this.onChange}
          showSizeChanger={false}
        />
      </div>
    );
  }
}
