// typescript import
import {
  DragElementWrapper,
  DragSourceOptions,
  DragSourceMonitor,
  DropTargetMonitor,
} from 'react-dnd';

import { ModulesType } from './useModules';

// import
import { useEffect, useContext, useCallback } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import * as R from 'ramda';

import ModuleContext from '../context/module';

// typescript definition
interface PropsType {
  data: ModulesType['data'];
  childModules: ModulesType['children'];
}

interface DropCollectedProps {
  isOver?: boolean;
}

interface DragCollectedProps {
  isDragging: boolean;
}

interface DragObjectType {
  type: string;
  data: ModulesType['data'];
}

// definition
export default ({
  data,
  childModules,
}: PropsType): [
  DropCollectedProps & DragCollectedProps,
  DragElementWrapper<unknown>,
  DragElementWrapper<DragSourceOptions>,
] => {
  const { id } = data;
  const { modules, setModules } = useContext(ModuleContext);
  const [{ isDragging }, dragRef, preview] = useDrag<
    DragObjectType,
    void,
    DragCollectedProps
  >({
    item: {
      type: 'group',
      data,
    },
    collect: useCallback(
      (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
      [],
    ),
  });
  const [{ isOver }, dropRef] = useDrop<
    DragObjectType,
    void,
    DropCollectedProps
  >({
    accept: ['module', 'group'],
    canDrop: useCallback(
      (item: DragObjectType) => {
        if (item.data.id === id) return false;
        if (item.type === 'group') return true;
        if (!childModules) return true;
        return false;
      },
      [id, childModules],
    ),
    drop: useCallback(
      (item: DragObjectType) => {
        const { type } = item;

        if (!modules) return;

        if (type === 'group') {
          const modifiedModules = R.move(
            R.findIndex(R.propEq('id', item.data.id))(modules),
            R.findIndex(R.propEq('id', id))(modules),
            modules,
          );

          setModules(modifiedModules);
        }

        if (type === 'module') {
          const modifiedModules = modules.map(module => {
            if (module.id !== id) return module;

            return {
              ...module,
              parentId: id,
            };
          });

          setModules(modifiedModules);
        }
      },
      [id, modules, setModules],
    ),
    collect: useCallback(
      (monitor: DropTargetMonitor) => ({
        isOver: monitor.canDrop() && monitor.isOver(),
      }),
      [],
    ),
  });

  useEffect(() => {
    preview(getEmptyImage());
  }, [preview]);

  return [
    {
      isOver,
      isDragging,
    },
    dropRef,
    dragRef,
  ];
};
