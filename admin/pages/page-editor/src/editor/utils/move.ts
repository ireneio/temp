// typescript import
import { DragObjectType } from '../../constants';

// import
import uuid from 'uuid/v4';
import { findIndex, insert, move, propEq } from 'ramda';

import add from './add';
import reparent from './reparent';

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
  if (!item.data) return add(modules, dropId, item, { append, wrap });

  const dragIndex = findIndex(propEq('id', item.data.id))(modules);
  const dropIndex = findIndex(propEq('id', dropId))(modules);

  if (dragIndex < 0 || dropIndex < 0) return modules;

  const modifiedModules = modules.slice();

  modifiedModules[dragIndex].parentId = modules[dropIndex].parentId;

  if (!wrap) {
    return reparent(
      move(dragIndex, append ? dropIndex + 1 : dropIndex, modifiedModules),
      dropId,
      item,
    );
  }

  const layout: editorFragmentModulesLayoutModule = {
    __typename: 'LayoutModule',
    id: uuid(),
    parentId: modules[dropIndex].parentId,
  };

  modifiedModules[dragIndex].parentId = layout.id;
  modifiedModules[dropIndex].parentId = layout.id;

  return reparent(
    insert(
      dropIndex,
      layout,
      move(dragIndex, append ? dropIndex + 1 : dropIndex, modifiedModules),
    ),
    dropId,
    item,
  );
};
