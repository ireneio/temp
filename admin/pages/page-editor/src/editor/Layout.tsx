// typescript import
import { ModulesType } from './hooks/useModules';

// import
import React from 'react';

import Module from './Module';
import styles from './styles/layout.less';

// typescript definition
interface PropsType {
  data: ModulesType['data'];
  childModules?: ModulesType['children'];
  parentNode: ModulesType['parentNode'];
  settings: {
    minWidth: string;
    level: number;
  };
}

// definition
const Layout = React.memo(
  ({
    data,
    childModules,
    parentNode,
    settings: { level, minWidth },
  }: PropsType) => {
    const { id, __typename } = data;

    return (
      <div
        id={id}
        className={`${styles.root} ${level % 2 ? styles.isOdd : ''} ${
          level === 1 ? styles.isLevelOne : ''
        }`}
        style={{
          flex: `1 1 ${minWidth}`,
        }}
      >
        {__typename === 'LayoutModule' ? (
          childModules?.map(({ data: childData, children, parent }) => (
            <Layout
              key={childData.id}
              data={childData}
              childModules={children}
              parentNode={parent}
              settings={{
                level: level + 1,
                minWidth,
              }}
            />
          ))
        ) : (
          <Module
            data={data}
            parentNode={parentNode}
            settings={{ level, minWidth }}
          />
        )}
      </div>
    );
  },
);

export default Layout;
