// typescript import
import { DragObjectType } from '../hooks/useCustomDrag';

// graphql typescript
import { editorFragment_modules as editorFragmentModules } from '@meepshop/types/gqls/admin';

// definition
export default (
  modules: editorFragmentModules[],
  dropId: string,
  item: DragObjectType,
): editorFragmentModules[] => {
  const { parentNode } = item;
  const dropItem = modules.find(module => module.id === dropId);
  const dropParentItem = modules.find(
    module => module.id === dropItem?.parentId,
  );

  if (
    !parentNode?.children ||
    parentNode.children.length > 2 ||
    parentNode.id === dropItem?.parentId ||
    parentNode.data.__typename === 'GroupModule'
  )
    return modules;

  const modifiedModules = modules.slice();

  // remove parent
  modifiedModules.forEach((module, index, origin) => {
    if (module.id === parentNode.id) {
      origin.splice(index, 1);
    }
  });

  if (parentNode.children.length === 1) return modifiedModules;

  if (parentNode.id === dropParentItem?.parentId) {
    modifiedModules.forEach((module, index, origin) => {
      if (module.id === dropParentItem?.id) {
        origin.splice(index, 1);
      }
    });

    modifiedModules.forEach((module, index) => {
      if (module.parentId === dropParentItem?.id) {
        modifiedModules[index].parentId = parentNode.parent?.id || '';
      }
    });
    return modifiedModules;
  }

  // reparent single child
  modifiedModules.forEach((module, index) => {
    if (module.parentId === parentNode.id) {
      modifiedModules[index].parentId = parentNode.parent?.id || '';
    }
  });

  return modifiedModules;
};
