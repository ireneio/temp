// import
import { useMemo } from 'react';
import * as d3 from 'd3-hierarchy';

// graphql typescript
import {
  modulesFragment,
  modulesFragment_modules as modulesFragmentModules,
} from '../__generated__/modulesFragment';

// typescript definition
export interface ModulesType {
  data: modulesFragmentModules;
  children: ModulesType[];
}

// definition
const treemap = d3
  .stratify<modulesFragmentModules>()
  .id(({ id }) => id)
  .parentId(({ parentId }) => parentId);

export default (page: modulesFragment | null): ModulesType[] =>
  useMemo(
    () =>
      (!page
        ? []
        : treemap([
            {
              id: 'root',
            },
            ...page.modules,
          ] as modulesFragmentModules[]).children || []) as ModulesType[],
    [page],
  );
