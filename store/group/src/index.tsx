// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Spin, Icon } from 'antd';

import Layout from './Layout';
import useModules from './hooks/useModules';
import styles from './styles/index.less';

// graphql typescript
import { getModules } from './__generated__/getModules';

// graphql import
import { modulesFragment } from '@meepshop/modules';

// definition
const query = gql`
  query getModules($input: StorePageFilterInput, $productId: ID) {
    viewer {
      id
      store {
        id
        page(input: $input) {
          id
          width
          modules {
            ...modulesFragment
          }
        }
      }
    }
  }

  ${modulesFragment}
`;

export default React.memo(() => {
  const { data } = useQuery<getModules>(query);
  const modules = useModules(
    !data?.viewer?.store?.page?.modules
      ? null
      : filter(modulesFragment, data.viewer.store.page.modules),
  );
  const maxWidth = data?.viewer?.store?.page?.width;

  if (!data) return <Spin indicator={<Icon type="loading" spin />} />;

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
