// typescript import
import { DragObjectType } from '../../constants';

// import
import uuid from 'uuid/v4';
import { findIndex, insert, propEq } from 'ramda';

import { DEFAULT_MODULE_DATA } from '../../constants';

// graphql typescript
import {
  editorFragment_modules as editorFragmentModules,
  editorFragment_modules_LayoutModule as editorFragmentModulesLayoutModule,
} from '@meepshop/types/gqls/admin';

// definition
export default (
  modules: editorFragmentModules[],
  dropId: string,
  item: DragObjectType,
  {
    append,
    wrap,
  }: {
    append: boolean;
    wrap: boolean;
  },
): editorFragmentModules[] => {
  const dropIndex = findIndex(propEq('id', dropId))(modules);

  if (dropIndex < 0 || !item.module) return modules;

  const modifiedModules = insert(
    append ? dropIndex + 1 : dropIndex,
    {
      id: uuid(),
      parentId: modules[dropIndex].parentId,
      ...DEFAULT_MODULE_DATA[item.module],
    },
    modules,
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore FIXME: DEFAULT_MODULE_DATA
  if (!wrap) return modifiedModules;

  const layout: editorFragmentModulesLayoutModule = {
    __typename: 'LayoutModule',
    id: uuid(),
    parentId: modules[dropIndex].parentId,
  };

  modifiedModules[dropIndex].parentId = layout.id;
  modifiedModules[dropIndex + 1].parentId = layout.id;

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore FIXME: DEFAULT_MODULE_DATA
  return insert(dropIndex, layout, modifiedModules);
};
