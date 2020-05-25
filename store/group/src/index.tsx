// typescript import
import { ModulesType } from './hooks/useModules';

// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Spin, Icon } from 'antd';

import { screenSmMax } from '@store/utils/lib/styles';

import Layout from './Layout';
import useModules from './hooks/useModules';
import styles from './styles/index.less';

// graphql typescript
import { getModules } from './__generated__/getModules';
import { modulesFragment_modules_GroupModule as modulesFragmentModulesGroupModule } from './__generated__/modulesFragment';

// graphql import
import { modulesFragment } from './modules';

// definition
const query = gql`
  query getModules($input: StorePageFilterInput) {
    viewer {
      id
      store {
        id
        page(input: $input) {
          id
          width
          ...modulesFragment
        }
      }
    }
  }

  ${modulesFragment}
`;

export default React.memo(() => {
  const { data } = useQuery<getModules>(query);
  const modules = useModules(
    !data?.viewer?.store?.page
      ? null
      : filter(modulesFragment, data.viewer.store.page),
  );
  const maxWidth = data?.viewer?.store?.page?.width;

  if (!data) return <Spin indicator={<Icon type="loading" spin />} />;

  return (
    <div
      className={styles.root}
      style={{ maxWidth: !maxWidth ? '100%' : `${maxWidth}px` }}
    >
      {(modules as {
        data: modulesFragmentModulesGroupModule;
        children: ModulesType[];
      }[]).map(
        ({ data: { id, percentWidth, componentWidth, padding }, children }) => (
          <div
            key={id}
            id={`block-${id}`}
            className={styles.group}
            style={{
              width: percentWidth.replace(/^WIDTH(.*)$/, '$1%'),
              minWidth: `${componentWidth || 0}px`,
            }}
          >
            {children.map(({ data: childData, children: childModules }) => (
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

                @media (max-width: ${screenSmMax}) {
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
