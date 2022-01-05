// typescript import
import {
  DragElementWrapper,
  DragSourceOptions,
  DragSourceMonitor,
} from 'react-dnd';

import { ModulesType, DragObjectType } from '../../constants';

// import
import { useEffect, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

// typescript definition
interface PropsType extends ModulesType {
  level: number;
}
interface CollectedProps {
  isDragging: boolean;
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
      type: 'MODULE',
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
