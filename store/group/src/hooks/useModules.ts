// import
import { useMemo } from 'react';
import * as d3 from 'd3-hierarchy';

// graphql typescript
import {
  getModules_viewer_store_page as getModulesViewerStorePage,
  getModules_viewer_store_page_modules as getModulesViewerStorePageModules,
} from '../__generated__/getModules';

// typescript definition
export interface ModulesType {
  data: getModulesViewerStorePageModules;
  children: ModulesType[];
}

// definition
const treemap = d3
  .stratify<getModulesViewerStorePageModules>()
  .id(({ id }) => id)
  .parentId(({ parentId }) => parentId);

export default (page: getModulesViewerStorePage | null): ModulesType[] =>
  useMemo(
    () =>
      (!page
        ? []
        : treemap([
            {
              id: 'root',
            },
            ...page.modules,
          ] as getModulesViewerStorePageModules[]).children ||
          []) as ModulesType[],
    [page],
  );
