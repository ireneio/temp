// import
import React from 'react';
import { filter } from 'graphql-anywhere';

import { ModulesProvider } from '@meepshop/modules';

import Layout from './Layout';
import useModules from './hooks/useModules';
import styles from './styles/index.less';

// graphql typescript
import { contextUserFragment as contextUserFragmentType } from '@meepshop/modules/src/__generated__/contextUserFragment';
import { contextOrderFragment as contextOrderFragmentType } from '@meepshop/modules/src/__generated__/contextOrderFragment';

import { groupFragment as groupFragmentType } from './gqls/__generated__/groupFragment';

// graphql import
import {
  modulesFragment,
  contextUserFragment,
  contextOrderFragment,
} from '@meepshop/modules';

// typescript definition
interface PropsType {
  page: groupFragmentType | null;
  user: contextUserFragmentType | null;
  order: contextOrderFragmentType | null;
}

// definition
export default React.memo(({ page, user, order }: PropsType) => {
  const modules = useModules(
    !page?.modules ? null : filter(modulesFragment, page.modules),
  );
  const maxWidth = page?.width;

  return (
    <ModulesProvider
      user={!user ? null : filter(contextUserFragment, user)}
      order={!order ? null : filter(contextOrderFragment, order)}
    >
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
                      padding: calc(${padding?.replace(
                        /^PADDING(.*)$/,
                        '$1px',
                      ) || '0px'} / 4);
                    }
                  }
                `,
                }}
              />
            </div>
          ),
        )}
      </div>
    </ModulesProvider>
  );
});
