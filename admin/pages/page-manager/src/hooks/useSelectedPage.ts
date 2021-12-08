// typescript import
import { QueryResult } from '@apollo/client';

import usePages from './usePages';

// import
import { useMemo, useState, useEffect, useRef, useCallback } from 'react';

import { useRouter } from '@meepshop/link';

// graphql typescript
import {
  getPages,
  getPagesVariables,
  usePagesPageFragment as usePagesPageFragmentType,
} from '@meepshop/types/gqls/admin';

// definition
const ALL_ACTIVE_KEY = [
  'home-page',
  'custom-page',
  'default-product-list-page',
  'template-page',
];

const getFirstPageByPId = (
  pages: ReturnType<typeof usePages>,
  pId: string | null,
): usePagesPageFragmentType | null =>
  !pId
    ? null
    : pages.reduce(
        (result, { data }) =>
          data.reduce(
            (subResult, { data: subData }) =>
              subResult || subData.find(({ id }) => pId === id) || null,
            result,
          ),
        null,
      );

const getCollapseActiveKey = (selectedPage: usePagesPageFragmentType): string =>
  `${
    selectedPage.pageType === 'products'
      ? 'default-product-list'
      : selectedPage.pageType
  }-page`;

export default (
  pages: ReturnType<typeof usePages>,
  variables: QueryResult<getPages, getPagesVariables>['variables'],
  loading: boolean,
): {
  selectedPage: usePagesPageFragmentType | null;
  setSelectedPage: (selectedPage: usePagesPageFragmentType | null) => void;
  collapseActiveKey: string | string[];
  setCollapseActiveKey: (collapseActiveKey: string) => void;
} => {
  const router = useRouter();
  const prevSearchTerm = useRef<string>(null);
  const firstPageByPId = useMemo(
    () => getFirstPageByPId(pages, router.query.pId as string),
    // Only need to get the first page before the component is mounted
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const [collapseActiveKey, setCollapseActiveKey] = useState<string | string[]>(
    !firstPageByPId ? 'home-page' : getCollapseActiveKey(firstPageByPId),
  );
  const [
    selectedPage,
    setSelectedPage,
  ] = useState<usePagesPageFragmentType | null>(firstPageByPId);
  const setSelectedPageWithCollapseActiveKey = useCallback(page => {
    setSelectedPage(page);

    if (page?.pageType) setCollapseActiveKey(getCollapseActiveKey(page));
  }, []);

  useEffect(() => {
    if (loading) return;

    const { firstPage, currentSelectedPage } = pages.reduce(
      (result, { data }) => ({
        firstPage:
          data.find(({ key }) => key === collapseActiveKey)?.data[0] ||
          result.firstPage ||
          data.find(({ data: subData }) => subData.length !== 0)?.data[0],
        currentSelectedPage: data.reduce(
          (subResult, { data: subData }) =>
            subResult || subData.find(({ id }) => selectedPage?.id === id),
          result.currentSelectedPage,
        ),
      }),
      { firstPage: undefined, currentSelectedPage: undefined },
    );
    const shouldOpenAllKeys =
      variables?.homePagesFilter?.searchTerm !== prevSearchTerm.current;

    if (shouldOpenAllKeys) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore FIXME: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31065
      prevSearchTerm.current = variables?.homePagesFilter?.searchTerm || null;

      if (variables?.homePagesFilter?.searchTerm)
        setCollapseActiveKey(ALL_ACTIVE_KEY);
    }

    if (currentSelectedPage) {
      if (currentSelectedPage !== selectedPage)
        setSelectedPage(currentSelectedPage);
      return;
    }

    if (!firstPage) {
      setSelectedPage(null);
      return;
    }

    setSelectedPage(firstPage);

    if (!shouldOpenAllKeys)
      setCollapseActiveKey(
        `${
          firstPage.pageType === 'products'
            ? 'default-product-list'
            : firstPage.pageType
        }-page`,
      );
  }, [loading, pages, variables, selectedPage, collapseActiveKey]);
  useEffect(() => {
    if (!selectedPage?.id) return;

    const url = `${router.pathname}?pId=${selectedPage?.id}`;

    if (url === router.asPath) return;

    router.replace(url);
  }, [router, selectedPage]);

  return {
    selectedPage,
    setSelectedPage: setSelectedPageWithCollapseActiveKey,
    collapseActiveKey,
    setCollapseActiveKey,
  };
};
