// typescript import
import { ModulesType } from './hooks/useModules';

// import
import React from 'react';

import Layout from './Layout';
import useGroupDnd from './hooks/useGroupDnd';
import styles from './styles/group.less';

// graphql typescript
import { editorFragment_modules_GroupModule as editorFragmentModulesGroupModule } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  data: editorFragmentModulesGroupModule;
  childModules?: ModulesType['children'];
}

// definition
export default React.memo(({ data, childModules }: PropsType) => {
  const { __typename, id, percentWidth, componentWidth, padding } = data;
  const [{ isOver, isDragging }, dropRef, dragRef] = useGroupDnd({
    data,
    childModules,
  });
  const minWidth = `${componentWidth?.replace('WIDTH', '') || 0}px`;

  return (
    <div
      id={`${__typename}-${id}`} // TODO: remove
      className={`${styles.group} ${isOver ? styles.isOver : ''}`}
      style={{
        width: percentWidth.replace(/^WIDTH(.*)$/, '$1%'),
        minWidth,
        outline: '1px solid black',
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div>
        <div ref={dragRef} className={styles.handler}>
          id: {id}
        </div>
        <div ref={dropRef}>
          {childModules ? (
            childModules.map(({ data: childData, children, parent }) => (
              <Layout
                key={childData.id}
                data={childData}
                childModules={children}
                parentNode={parent}
                settings={{
                  level: 1,
                  minWidth,
                }}
              />
            ))
          ) : (
            <div style={{ height: '100px' }}>空的群組請拖拉元件</div>
          )}

          <style
            dangerouslySetInnerHTML={{
              __html: `
                #${__typename}-${id},
                #${__typename}-${id} .wrapper {
                  padding: calc(${padding?.replace(/^PADDING(.*)$/, '$1px') ||
                    '0px'} / 2);
                }

                @media (max-width: ${styles.screenSmMax}) {
                  #${__typename}-${id},
                  #${__typename}-${id} .wrapper {
                    padding: calc(${padding?.replace(/^PADDING(.*)$/, '$1px') ||
                      '0px'} / 4);
                  }
                }
              `,
            }}
          />
        </div>
      </div>
    </div>
  );
});
