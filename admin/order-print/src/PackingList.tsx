// import
import React from 'react';

import filter from '@meepshop/utils/lib/filter';

import PackingListDetail from './PackingListDetail';
import styles from './styles/packingList.less';

// graphql typescript
import { packingListFragment as packingListFragmentType } from '@meepshop/types/gqls/admin';

// graphql import
import { packingListDetailFragment } from './gqls/packingListDetail';

// typescript definition
interface PropsType {
  viewer: packingListFragmentType | null;
}

// definition
export default React.memo(({ viewer }: PropsType) => {
  return (
    <div className={styles.root}>
      <PackingListDetail
        viewer={filter(packingListDetailFragment, viewer || null)}
      />
    </div>
  );
});
