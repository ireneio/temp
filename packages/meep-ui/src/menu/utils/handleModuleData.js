import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { enhancer } from 'layout/DecoratorsRoot';

import { getMenu } from '../gqls/handleModuleData';
import styles from '../styles/handleModuleData.less';

export default Component =>
  enhancer(
    React.memo(({ id, menuId }) => {
      const { data } = useQuery(getMenu, {
        variables: {
          menuId,
        },
      });

      if (!data?.viewer?.store?.menu) return null;

      const {
        iconSize,
        logoAlignment,
        pages,
        design: { expandSubItem, ...design },
      } = data.viewer.store.menu;

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
          isModule
        />
      );
    }),
  );
