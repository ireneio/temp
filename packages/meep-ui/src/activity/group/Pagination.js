import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { POSITIVE_NUMBER_TYPE } from 'constants/propTypes';

import { Pagination as AntdPagination } from 'antd';

import * as styles from './styles/pagination';

@radium
export default class Pagination extends React.PureComponent {
  static propTypes = {
    total: POSITIVE_NUMBER_TYPE.isRequired,
    scrollToTop: PropTypes.func.isRequired,
  };

  state = {
    current:
      // eslint-disable-next-line react/destructuring-assignment
      this.props.variables.search.from / this.props.variables.search.size + 1,
  };

  onChange = async page => {
    const { variables, refetch, scrollToTop } = this.props;
    const limit = variables.search.size;

    this.setState({
      current: page,
    });

    await refetch({
      ...variables,
      search: {
        ...variables.search,
        from: (page - 1) * limit,
      },
    });
    scrollToTop();
  };

  render() {
    const { current } = this.state;
    const { variables, total } = this.props;
    const limit = variables.search.size;

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
