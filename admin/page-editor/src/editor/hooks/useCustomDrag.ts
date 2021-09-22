// typescript import
import {
  DragElementWrapper,
  DragSourceOptions,
  DragSourceMonitor,
} from 'react-dnd';

import { ModulesType } from './useModules';

// import
import { useEffect, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

// typescript definition
interface PropsType {
  data: ModulesType['data'];
  parentNode: ModulesType['parentNode'];
  level: number;
}

interface CollectedProps {
  isDragging: boolean;
}

export interface DragObjectType extends PropsType {
  type: string;
}

// definition
export default ({
  data,
  parentNode,
  level,
}: PropsType): [CollectedProps, DragElementWrapper<DragSourceOptions>] => {
  const [{ isDragging }, dragRef, preview] = useDrag<
    DragObjectType,
    void,
    CollectedProps
  >({
    item: {
      type: 'module',
      data,
      parentNode,
      level,
    },
    collect: useCallback(
      (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
      [],
    ),
  });

  useEffect(() => {
    preview(getEmptyImage());
  }, [preview]);

  return [{ isDragging }, dragRef];
};
