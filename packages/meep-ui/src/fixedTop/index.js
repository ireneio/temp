import React from 'react';
import PropTypes from 'prop-types';
import { Affix } from 'antd';

import { enhancer } from 'layout/DecoratorsRoot';
import Menu from 'menu';
import { ID_TYPE, URL_TYPE } from 'constants/propTypes';

import styles from './styles/index.less';

@enhancer
export default class FixedTop extends React.PureComponent {
  static propTypes = {
    /** context */
    storeSetting: PropTypes.shape({
      logoUrl: URL_TYPE,
    }).isRequired,

    /** props */
    id: ID_TYPE.isRequired,
    menu: PropTypes.shape({
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
      menu: { pages, design },
    } = this.props;

    return (
      <Affix offsetTop={0}>
        <header className={styles.root}>
          <Menu
            id={id}
            logoUrl={logoUrl}
            pages={pages}
            design={design}
            openKeys={pages.map(({ id: pageId }) => pageId)}
          />
        </header>
      </Affix>
    );
  }
}
