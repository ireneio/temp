// typescript import
import { HierarchyNode } from 'd3-hierarchy';

// import
import { useMemo } from 'react';
import { stratify } from 'd3-hierarchy';

// graphql typescript
import {
  editorFragment_modules as editorFragmentModules,
  editorFragment_modules_GroupModule as editorFragmentModulesGroupModule,
} from '@meepshop/types/gqls/admin';

// definition
const treemap = stratify<
  | editorFragmentModules
  | {
      id: string;
    }
>().id(({ id }) => id);

export default (
  modules: editorFragmentModules[] | null,
): HierarchyNode<editorFragmentModulesGroupModule>[] =>
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
            editorFragmentModulesGroupModule
          >[]),
    [modules],
  );
