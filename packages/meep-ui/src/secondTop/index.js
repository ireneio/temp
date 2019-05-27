import React from 'react';
import PropTypes from 'prop-types';

import { enhancer } from 'layout/DecoratorsRoot';
import Menu from 'menu';
import { ID_TYPE, URL_TYPE } from 'constants/propTypes';

import styles from './styles/index.less';

@enhancer
export default class SecondTop extends React.PureComponent {
  static propTypes = {
    /** context */
    storeSetting: PropTypes.shape({
      logoUrl: URL_TYPE,
    }).isRequired,

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
      /** context */
      storeSetting: { logoUrl },

      /** props */
      id,
      menu: { iconSize, pages, design },
    } = this.props;

    return (
      <Menu
        id={id}
        className={styles.root}
        logoUrl={logoUrl}
        iconSize={iconSize}
        pages={pages}
        design={design}
      />
    );
  }
}
