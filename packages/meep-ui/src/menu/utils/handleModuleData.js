import React from 'react';
import PropTypes from 'prop-types';

import { enhancer } from 'layout/DecoratorsRoot';
import { ID_TYPE } from 'constants/propTypes';

import styles from '../styles/handleModuleData.less';

export default Component => {
  class MenuWrapper extends React.PureComponent {
    static propTypes = {
      /** props */
      id: ID_TYPE.isRequired,
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
      const {
        /** props */
        id,
        menu: {
          iconSize,
          logoAlignment,
          pages,
          design: { expandSubItem, ...design },
        },
      } = this.props;

      return (
        <Component
          id={id}
          className={expandSubItem ? '' : styles.root}
          pages={pages}
          iconSize={iconSize}
          logoAlignment={logoAlignment}
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
