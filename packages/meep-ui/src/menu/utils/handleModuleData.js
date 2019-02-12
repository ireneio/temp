import React from 'react';
import PropTypes from 'prop-types';

import { enhancer } from 'layout/DecoratorsRoot';
import { ID_TYPE, URL_TYPE } from 'constants/propTypes';

import styles from '../styles/handleModuleData.less';

export default Component => {
  class MenuWrapper extends React.PureComponent {
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
        menu: {
          pages,
          design: { expandSubItem, ...design },
        },
      } = this.props;

      return (
        <Component
          id={id}
          className={expandSubItem ? '' : styles.root}
          logoUrl={logoUrl}
          pages={pages}
          design={{
            ...design,
            expandSubItem,
            // TODO: module should not have width
            width: 0,
          }}
        />
      );
    }
  }

  return enhancer(MenuWrapper);
};
