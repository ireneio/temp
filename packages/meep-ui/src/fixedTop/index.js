import React from 'react';
import PropTypes from 'prop-types';
import { Affix } from 'antd';

import { enhancer } from 'layout/DecoratorsRoot';
import Menu from 'menu';
import { ID_TYPE } from 'constants/propTypes';

import styles from './styles/index.less';

@enhancer
export default class FixedTop extends React.PureComponent {
  static propTypes = {
    /** props */
    id: ID_TYPE.isRequired,
    menu: PropTypes.shape({
      iconSize: PropTypes.oneOf([24, 32, 48]).isRequired,
      pages: PropTypes.arrayOf(
        PropTypes.shape({
          id: ID_TYPE.isRequired,
        }).isRequired,
      ),
      design: PropTypes.shape({}).isRequired,
    }).isRequired,
  };

  render() {
    const {
      /** props */
      id,
      menu: { iconSize, pages, design },
    } = this.props;

    return (
      <Affix offsetTop={0}>
        <header className={styles.root}>
          <Menu id={id} pages={pages} design={design} iconSize={iconSize} />
        </header>
      </Affix>
    );
  }
}
