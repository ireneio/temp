// import
import { useMemo } from 'react';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';

// graphql typescript
import { getPages, getPagesVariables } from '../__generated__/getPages';
import { usePagesPageFragment as usePagesPageFragmentType } from './__generated__/usePagesPageFragment';

// graphql import
import localeFragment from '@meepshop/utils/lib/fragments/locale';

import { previewerPageFragment } from '../Previewer';
import { itemStoreFragment, itemPageFragment } from '../item';

// definition
export const usePagesPageFragment = gql`
  fragment usePagesPageFragment on Page {
    ...itemPageFragment
    ...previewerPageFragment
    id
    title {
      ...localeFragment
    }
  }

  ${localeFragment}
  ${itemPageFragment}
  ${previewerPageFragment}
`;

export const usePagesStoreFragment = gql`
  fragment usePagesStoreFragment on Store {
    ...itemStoreFragment

    id
    homePages: pages(first: 500, filter: $homePagesFilter) {
      edges {
        node {
          ...usePagesPageFragment
        }
      }
    }

    customPages: pages(first: 500, filter: $customPagesFilter) {
      edges {
        node {
          ...usePagesPageFragment
        }
      }
    }

    defaultProductListPage {
      ...usePagesPageFragment
    }

    productTemplatePage: pages(first: 500, filter: $productTemplatePageFilter) {
      edges {
        node {
          ...usePagesPageFragment
        }
      }
    }
  }

  ${usePagesPageFragment}
  ${itemStoreFragment}
`;

export default (
  data: getPages | null,
  variables: getPagesVariables,
): {
  key: string;
  data: {
    key:
      | 'home-page'
      | 'custom-page'
      | 'default-product-list-page'
      | 'template-page';
    hint: boolean;
    data: usePagesPageFragmentType[];
  }[];
}[] =>
  useMemo(() => {
    const store = data?.viewer?.store;

    if (!store) return [];

    const {
      homePages,
      customPages,
      defaultProductListPage,
      productTemplatePage,
    } = filter(usePagesStoreFragment, store);

    return [
      {
        key: 'page',
        data: [
          {
            key: 'home-page',
            hint: false,
            data: homePages.edges.map(
              ({ node }: { node: usePagesPageFragmentType }) => node,
            ),
          },
          {
            key: 'custom-page',
            hint: false,
            data: customPages.edges.map(
              ({ node }: { node: usePagesPageFragmentType }) => node,
            ),
          },
        ],
      },
      {
        key: 'product-page',
        data: [
          {
            key: 'default-product-list-page',
            hint: true,
            data:
              !variables.homePagesFilter?.searchTerm ||
              new RegExp(variables.homePagesFilter.searchTerm).test(
                defaultProductListPage.title.zh_TW,
              )
                ? [defaultProductListPage]
                : [],
          },
          {
            key: 'template-page',
            hint: true,
            data: productTemplatePage.edges.map(
              ({ node }: { node: usePagesPageFragmentType }) => node,
            ),
          },
        ],
      },
    ];
  }, [data, variables]);
