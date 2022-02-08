// typescript import
import {
  DragElementWrapper,
  DragSourceOptions,
  DragSourceMonitor,
  DropTargetMonitor,
  ConnectDragPreview,
} from 'react-dnd';

import { ModulesType, DragObjectType } from '../../constants';

// import
import { useContext, useCallback } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import uuid from 'uuid/v4';
import { findIndex, insert, move, propEq } from 'ramda';

import reparent from '../utils/reparent';
import ModuleContext from '../context/module';
import { DEFAULT_MODULE_DATA } from '../../constants';

// typescript definition
interface PropsType {
  data: NonNullable<ModulesType['data']>;
  childModules: ModulesType['children'];
}

interface DropCollectedProps {
  isOver: boolean;
  isGroupOver: boolean;
}

interface DragCollectedProps {
  isDragging: boolean;
}

// definition
export default ({
  data,
  childModules,
}: PropsType): [
  DropCollectedProps & DragCollectedProps,
  DragElementWrapper<unknown>,
  DragElementWrapper<DragSourceOptions>,
  ConnectDragPreview,
] => {
  const { id } = data;
  const { modules, setModules } = useContext(ModuleContext);
  const [{ isDragging }, dragRef, preview] = useDrag<
    DragObjectType,
    void,
    DragCollectedProps
  >({
    item: {
      type: 'GROUP',
      data,
    },
    collect: useCallback(
      (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
      [],
    ),
  });
  const [{ isOver, isGroupOver }, dropRef] = useDrop<
    DragObjectType,
    void,
    DropCollectedProps
  >({
    accept: ['MODULE', 'GROUP'],
    canDrop: useCallback(
      (item: DragObjectType) => {
        if (item.data?.id === id) return false;
        if (item.type === 'GROUP') return true;
        if (!childModules) return true;
        return false;
      },
      [id, childModules],
    ),
    drop: useCallback(
      (item: DragObjectType) => {
        if (!modules) return;

        const { type } = item;
        const groupIndex = findIndex(propEq('id', id))(modules);

        if (item.module) {
          setModules(
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore FIXME: DEFAULT_MODULE_DATA
            insert(
              groupIndex,
              {
                id: uuid(),
                parentId: type === 'GROUP' ? 'root' : id,
                ...DEFAULT_MODULE_DATA[item.module],
              },
              modules,
            ),
          );
          return;
        }

        if (type === 'GROUP') {
          const modifiedModules = move(
            findIndex(propEq('id', item.data?.id))(modules),
            groupIndex,
            modules,
          );

          setModules(modifiedModules);
          return;
        }

        if (type === 'MODULE') {
          const modifiedModules = modules.map(module => {
            if (module.id !== item.data?.id) return module;

            return {
              ...module,
              parentId: id,
            };
          });

          setModules(reparent(modifiedModules, id, item));
        }
      },
      [id, modules, setModules],
    ),
    collect: useCallback(
      (monitor: DropTargetMonitor) => ({
        isOver: monitor.canDrop() && monitor.isOver(),
        isGroupOver: monitor.getItemType() === 'GROUP',
      }),
      [],
    ),
  });

  return [
    {
      isOver,
      isGroupOver,
      isDragging,
    },
    dropRef,
    dragRef,
    preview,
  ];
};
