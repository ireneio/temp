// typescript import
import { QueryResult } from '@apollo/client';

// graphql typescript
import {
  getTags as getTagsType,
  getTagsVariables as getTagsVariablesType,
} from '@meepshop/types/gqls/admin';

// typescript definition
export interface OptionType {
  value: string;
}

export interface TagType {
  id: string;
  value: string;
}

export type RefetchType = QueryResult<
  getTagsType,
  getTagsVariablesType
>['refetch'];
