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
    menu: PropTypes.shape({
      iconSize: PropTypes.oneOf([24, 32, 48]).isRequired,
      logoAlignment: PropTypes.oneOf(['LEFT', 'RIGHT']).isRequired,
      pages: PropTypes.arrayOf(
        PropTypes.shape({
          id: ID_TYPE.isRequired,
        }).isRequired,
      ),
      design: PropTypes.shape({}).isRequired,
    }).isRequired,
  };

  render() {
    const { menu } = this.props;

    if (!menu) return null;

    const { iconSize, logoAlignment, pages, design } = menu;

    return (
      <Affix offsetTop={0}>
        <header className={styles.root}>
          <Menu
            id="fixedTop"
            pages={pages}
            design={{
              ...design,
              width: 0,
            }}
            iconSize={iconSize}
            logoAlignment={logoAlignment}
            hasLevelThree
          />
        </header>
      </Affix>
    );
  }
}
