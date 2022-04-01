// typescript import
import { QueryResult } from '@apollo/client';

// import
import React, { useMemo } from 'react';

import { useTranslation } from '@meepshop/locales';
import filter from '@meepshop/utils/lib/filter';

// graphql typescript
import {
  getPages,
  getPagesVariables,
  usePagesPageFragment as usePagesPageFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { usePagesStoreFragment } from '../gqls/usePages';

// definition
export default ({
  data,
  variables,
}: Pick<QueryResult<getPages, getPagesVariables>, 'data' | 'variables'>): {
  key: string;
  data: {
    key:
      | 'home-page'
      | 'custom-page'
      | 'default-product-list-page'
      | 'template-page';
    hint: React.ReactNode | null;
    data: usePagesPageFragmentType[];
    pageInfo?: { hasNextPage: boolean; endCursor: string };
  }[];
}[] => {
  const { t } = useTranslation('page-manager');

  return useMemo(() => {
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
            hint: t('home-page.hint'),
            data: homePages.edges.map(
              ({ node }: { node: usePagesPageFragmentType }) => node,
            ),
            pageInfo: homePages.pageInfo,
          },
          {
            key: 'custom-page',
            hint: null,
            data: customPages.edges.map(
              ({ node }: { node: usePagesPageFragmentType }) => node,
            ),
            pageInfo: customPages.pageInfo,
          },
        ],
      },
      {
        key: 'product-page',
        data: [
          {
            key: 'default-product-list-page',
            hint: (
              <>
                <div>{t('default-product-list-page.hint')}</div>
                <a
                  href="https://supportmeepshop.com/knowledgebase/%e6%9e%b6%e6%a7%8b%e8%a6%8f%e5%8a%83/#3_sou_xun_jie_guo_ye_yu_she_shang_pin_lie_biao"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('default-product-list-page.link')}
                </a>
              </>
            ),
            data:
              !variables?.homePagesFilter?.searchTerm ||
              new RegExp(variables.homePagesFilter.searchTerm).test(
                defaultProductListPage.title.zh_TW,
              )
                ? [defaultProductListPage]
                : [],
          },
          {
            key: 'template-page',
            hint: (
              <>
                <div>{t('template-page.hint')}</div>
                <a
                  href="https://supportmeepshop.com/knowledgebase/%e5%95%86%e5%93%81%e9%a0%81%e7%89%88%e5%9e%8b%e7%b7%a8%e8%bc%af/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('template-page.link')}
                </a>
              </>
            ),
            data: productTemplatePage.edges.map(
              ({ node }: { node: usePagesPageFragmentType }) => node,
            ),
            pageInfo: productTemplatePage.pageInfo,
          },
        ],
      },
    ];
  }, [data, variables, t]);
};
