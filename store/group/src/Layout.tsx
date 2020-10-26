// typescript import
import { ModulesType } from './hooks/useModules';

// import
import React from 'react';

import modules, { ModulesContext } from '@meepshop/modules';

import styles from './styles/layout.less';

// graphql typescript
import { groupFragment_modules_GroupModule as groupFragmentModulesGroupModule } from './gqls/__generated__/groupFragment';

// typescript definition
interface PropsType {
  data: ModulesType['data'];
  childModules?: ModulesType[];
  settings: Pick<groupFragmentModulesGroupModule, 'componentWidth'> & {
    level: number;
  };
}

// definition
const Layout = React.memo(
  ({ data, childModules, settings: { level, componentWidth } }: PropsType) => {
    const { __typename } = data;
    const Module = modules[__typename];

    return (
      <div
        className={`${styles.root} ${level === 1 ? styles.isLevelOne : ''}`}
        style={
          level === 1
            ? {
                minWidth: `${componentWidth || 0}px`,
              }
            : {
                display: level % 2 ? 'flex' : 'block',
                flex: `1 1 ${componentWidth || 0}px`,
              }
        }
      >
        {__typename !== 'LayoutModule' && __typename !== 'GroupModule' ? (
          <div className={`module ${styles.wrapper}`}>
            <ModulesContext.Consumer>
              {value => (
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                <Module {...(data as any)} {...value[__typename]} />
              )}
            </ModulesContext.Consumer>
          </div>
        ) : (
          childModules?.map(({ data: childData, children }) => (
            <Layout
              key={childData.id}
              data={childData}
              childModules={children}
              settings={{
                level: level + 1,
                componentWidth,
              }}
            />
          ))
        )}
      </div>
    );
  },
);

export default Layout;
