// typescript import
import { OrdersQueryResult } from '../../constants';

// import
import { useCallback } from 'react';
import { areEqual } from 'fbjs';

// typescript definition
interface PropsType extends Pick<OrdersQueryResult, 'variables' | 'refetch'> {
  setIsVisible: (visible: boolean) => void;
  filter: OrdersQueryResult['variables']['filter'];
  setFilter: (filter: OrdersQueryResult['variables']['filter']) => void;
}

// definition
export default ({
  variables,
  refetch,
  setIsVisible,
  filter,
  setFilter,
}: PropsType): {
  advancedSearch: () => void;
  onVisibleChange: (visible: boolean) => void;
} => {
  const advancedSearch = useCallback(() => {
    if (areEqual(filter, variables.filter)) return;

    refetch({
      ...variables,
      filter: {
        ...filter,
        createdAtRange: variables?.filter?.createdAtRange,
        searchTerm: variables?.filter?.searchTerm,
      },
    });
  }, [filter, variables, refetch]);

  return {
    onVisibleChange: useCallback(
      (visible: boolean) => {
        setIsVisible(visible);

        if (!visible) {
          advancedSearch();
          return;
        }

        setFilter(variables.filter);
      },
      [variables, advancedSearch, setIsVisible, setFilter],
    ),
    advancedSearch,
  };
};
