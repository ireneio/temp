// typescript import
import { QueryResult } from '@apollo/react-common';

// graphql typescript
import {
  getProducts as getProductsType,
  getProductsVariables as getProductsVariablesType,
} from '@meepshop/types/gqls/admin';

// typescript definition
export interface ComponentProps
  extends Pick<
    QueryResult<getProductsType, getProductsVariablesType>,
    'variables' | 'refetch' | 'fetchMore'
  > {
  step: 'search' | 'sort';
}

// definition
export const pageSize = 15;
