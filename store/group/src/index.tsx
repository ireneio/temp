// import
import React from 'react';
import { filter } from 'graphql-anywhere';

import Layout from './Layout';
import useModules from './hooks/useModules';
import styles from './styles/index.less';

// graphql typescript
import { groupFragment as groupFragmentType } from './gqls/__generated__/groupFragment';

// graphql import
import { modulesFragment } from '@meepshop/modules/gqls';

// typescript definition
interface PropsType {
  page: groupFragmentType | null;
}

// definition
export default React.memo(({ page }: PropsType) => {
  const modules = useModules(filter(modulesFragment, page?.modules || null));
  const maxWidth = page?.width;

  return (
    <div
      className={styles.root}
      style={{ maxWidth: !maxWidth ? '100%' : `${maxWidth}px` }}
    >
      {modules.map(
        ({
          data: {
            id,
            percentWidth,
            componentWidth,
            padding,
            background,
            backgroundImage,
          },
          children,
        }) => (
          <div
            key={id}
            id={`block-${id}`}
            className={styles.group}
            style={{
              width: percentWidth.replace(/^WIDTH(.*)$/, '$1%'),
              minWidth: `${componentWidth || 0}px`,
              backgroundImage: !backgroundImage
                ? 'initial'
                : `url(${backgroundImage.image.scaledSrc?.w1920})`,
              backgroundColor: background || 'transparent',
              backgroundRepeat: backgroundImage?.repeat
                ? 'repeat'
                : 'no-repeat',
              backgroundSize: backgroundImage?.cover ? '100% auto' : 'auto',
            }}
          >
            {children?.map(({ data: childData, children: childModules }) => (
              <Layout
                key={childData.id}
                data={childData}
                childModules={childModules}
                settings={{
                  level: 1,
                  componentWidth,
                }}
              />
            ))}

            <style
              dangerouslySetInnerHTML={{
                __html: `
                #block-${id},
                #block-${id} .module {
                  padding: calc(${padding?.replace(/^PADDING(.*)$/, '$1px') ||
                    '0px'} / 2);
                }

                @media (max-width: ${styles.screenSmMax}) {
                  #block-${id},
                  #block-${id} .module {
                    padding: calc(${padding?.replace(/^PADDING(.*)$/, '$1px') ||
                      '0px'} / 4);
                  }
                }
              `,
              }}
            />
          </div>
        ),
      )}
    </div>
  );
});
