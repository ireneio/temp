// typescript import
import { HierarchyNode } from 'd3-hierarchy';

// import
import { useMemo } from 'react';
import { stratify } from 'd3-hierarchy';

// graphql typescript
import {
  getModules_viewer_store_page_modules as getModulesViewerStorePageModules,
  getModules_viewer_store_page_modules_GroupModule as getModulesViewerStorePageModulesGroupModule,
} from '../__generated__/getModules';

// typescript definition
export interface ModulesType {
  data: getModulesViewerStorePageModules;
  children?: HierarchyNode<getModulesViewerStorePageModules>[];
}

// definition
const treemap = stratify<
  | getModulesViewerStorePageModules
  | {
      id: string;
    }
>().id(({ id }) => id);

export default (
  modules: getModulesViewerStorePageModules[] | null,
): HierarchyNode<getModulesViewerStorePageModulesGroupModule>[] =>
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
            getModulesViewerStorePageModulesGroupModule
          >[]),
    [modules],
  );
