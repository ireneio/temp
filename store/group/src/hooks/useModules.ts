// typescript import
import { HierarchyNode } from 'd3-hierarchy';

// import
import { useMemo } from 'react';
import { stratify } from 'd3-hierarchy';

// graphql typescript
import {
  groupFragment_modules as groupFragmentModules,
  groupFragment_modules_GroupModule as groupFragmentModulesGroupModule,
} from '@meepshop/types/gqls/store';

// typescript definition
export interface ModulesType {
  data: groupFragmentModules;
  children?: HierarchyNode<groupFragmentModules>[];
}

// definition
const treemap = stratify<
  | groupFragmentModules
  | {
      id: string;
    }
>().id(({ id }) => id);

export default (
  modules: groupFragmentModules[] | null,
): HierarchyNode<groupFragmentModulesGroupModule>[] =>
  useMemo(
    () =>
      !modules
        ? []
        : ((treemap([
            {
              id: 'root',
            },
            ...modules,
          ]).children || []) as HierarchyNode<
            groupFragmentModulesGroupModule
          >[]),
    [modules],
  );
