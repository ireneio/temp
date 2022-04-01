// import
import React, { useState } from 'react';

import filter from '@meepshop/utils/lib/filter';

import ModuleContext from './context/module';
import Group from './Group';
import useModules from './hooks/useModules';
import styles from './styles/index.less';

// graphql typescript
import {
  editorFragment,
  editorFragment_modules as editorFragmentModules,
} from '@meepshop/types/gqls/admin';

// graphql import
import { modulesFragment } from '@meepshop/modules/gqls';

// typescript definition
interface PropsType {
  page: editorFragment;
}

// definition
export default React.memo(
  ({ page }: PropsType): React.ReactElement => {
    const [modules, setModules] = useState<editorFragmentModules[]>(
      filter(modulesFragment, page.modules),
    );
    const modulesTree = useModules(modules);
    const maxWidth = page.width;

    return (
      <ModuleContext.Provider
        value={{
          setModules,
          modules,
        }}
      >
        <div
          className={styles.root}
          style={{ maxWidth: !maxWidth ? '100%' : `${maxWidth}px` }}
        >
          {modulesTree.map(({ id, data, children }) => (
            <Group
              key={id}
              data={data}
              childModules={children}
              isOnlyGroup={modulesTree.length === 1}
            />
          ))}
        </div>
      </ModuleContext.Provider>
    );
  },
);
