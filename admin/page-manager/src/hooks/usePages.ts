// import
import { useMemo } from 'react';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';

// graphql typescript
import { getPages, getPagesVariables } from '../__generated__/getPages';
import { usePagesPageFragment as usePagesPageFragmentType } from './__generated__/usePagesPageFragment';

// graphql import
import localeFragment from '@admin/utils/lib/fragments/locale';

import { previewerPageFragment } from '../Previewer';
import { itemFragment } from '../item';

// typescript definition
export interface DataType extends usePagesPageFragmentType {
  isHomePage: boolean;
}

// definition
export const usePagesPageFragment = gql`
  fragment usePagesPageFragment on Page {
    ...itemFragment
    ...previewerPageFragment
    id
    title {
      ...localeFragment
    }
    isDefaultTemplatePage: isProductDefault
  }

  ${localeFragment}
  ${itemFragment}
  ${previewerPageFragment}
`;

export const usePagesStoreFragment = gql`
  fragment usePagesStoreFragment on Store {
    id

    homePage: pages(first: 500, filter: $homePagesFilter) {
      edges {
        node {
          ...usePagesPageFragment
        }
      }
    }

    customPage: pages(first: 500, filter: $customPagesFilter) {
      edges {
        node {
          ...usePagesPageFragment
        }
      }
    }

    defaultHomePage {
      id
    }

    defaultProductListPage {
      ...usePagesPageFragment
    }

    templatePage: pages(first: 500, filter: $templatePagesFilter) {
      edges {
        node {
          ...usePagesPageFragment
        }
      }
    }
  }

  ${usePagesPageFragment}
`;

const formatData = (
  data: { node: usePagesPageFragmentType }[],
  homePageId: string | null,
): DataType[] =>
  data.map(({ node }: { node: usePagesPageFragmentType }) => ({
    ...node,
    isHomePage: node.id === homePageId,
  }));

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
    data: DataType[];
  }[];
}[] =>
  useMemo(() => {
    const store = data?.viewer?.store;

    if (!store) return [];

    const {
      homePage,
      customPage,
      defaultHomePage,
      defaultProductListPage,
      templatePage,
    } = filter(usePagesStoreFragment, store);

    return [
      {
        key: 'page',
        data: [
          {
            key: 'home-page',
            hint: false,
            data: formatData(homePage.edges, defaultHomePage.id),
          },
          {
            key: 'custom-page',
            hint: false,
            data: formatData(customPage.edges, defaultHomePage.id),
          },
        ],
      },
      {
        key: 'product-page',
        data: [
          {
            key: 'default-product-list-page',
            hint: true,
            data: formatData(
              !variables.homePagesFilter?.searchTerm ||
                new RegExp(variables.homePagesFilter.searchTerm).test(
                  defaultProductListPage.title.zh_TW,
                )
                ? [{ node: defaultProductListPage }]
                : [],
              defaultHomePage.id,
            ),
          },
          {
            key: 'template-page',
            hint: true,
            data: formatData(templatePage.edges, defaultHomePage.id),
          },
        ],
      },
    ];
  }, [data, variables]);
