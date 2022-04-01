// import
import React from 'react';

import filter from '@meepshop/utils/lib/filter';

import Module from './Module';
import useSections from './hooks/useSections';
import styles from './styles/moduleTab.less';

// graphql typescript
import { moduleTabFragment as moduleTabFragmentType } from '@meepshop/types/gqls/admin';

// graphql import
import { useSectionsFragment } from './gqls/useSections';

// definition
export default React.memo(({ Store }: { Store: moduleTabFragmentType }) => {
  const sections = useSections(filter(useSectionsFragment, Store));

  return (
    <div className={styles.root}>
      {sections.map(({ title, modules }) => (
        <div key={title} className={styles.section}>
          <div>{title}</div>
          <div>
            {modules.map(module => (
              <Module key={module} module={module} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});
