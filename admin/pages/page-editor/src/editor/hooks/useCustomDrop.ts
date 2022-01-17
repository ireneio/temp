// typescript import
import { XYCoord, DropTargetMonitor } from 'react-dnd';

import { ModulesType, DragObjectType } from '../../constants';
import { Direction } from './useDirection';

// import
import { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { usePrevious } from 'react-use';
import { useDrop } from 'react-dnd';

import useDirection from './useDirection';
import ModuleContext from '../context/module';
import move from '../utils/move';

// typescript definition
interface PropsType extends ModulesType {
  data: NonNullable<ModulesType['data']>;
  level: number;
}

interface CollectedProps {
  isOver?: boolean;
  direction?: Direction | null;
}

export interface Position extends XYCoord {
  xRatio: number;
  yRatio: number;
}

// definition
export default ({
  data,
  parentNode,
  level,
}: PropsType): [CollectedProps, (element: HTMLDivElement) => void] => {
  const { id } = data;
  const divRef = useRef<HTMLDivElement>();
  const [position, setPosition] = useState<Position | null>(null);
  const previousPosition = usePrevious(position);
  const direction = useDirection(position, previousPosition || null, level);
  const { modules, setModules } = useContext(ModuleContext);

  const [{ isOver }, dropRef] = useDrop<DragObjectType, void, CollectedProps>({
    accept: 'MODULE',
    drop: useCallback(
      (item: DragObjectType) => {
        if (!direction || !modules || !parentNode) return;

        const { toward, isBorderline } = direction;
        const append = ['down', 'right'].includes(toward);
        const isSameDirection = (level % 2
          ? ['up', 'down']
          : ['left', 'right']
        ).includes(toward);

        if (!isBorderline) {
          setModules(
            move(modules, id, item, {
              append,
              wrap: !isSameDirection,
            }),
          );
          return;
        }

        const dropId =
          isSameDirection && parentNode.parent
            ? parentNode.parent.data.id
            : parentNode.data.id;

        setModules(
          move(
            modules,
            isSameDirection &&
              parentNode.parent?.id === item.parentNode?.id &&
              (item.parentNode?.children?.length || 1) < 3
              ? id
              : dropId,
            item,
            {
              append,
              wrap: false,
            },
          ),
        );
      },
      [id, level, direction, parentNode, modules, setModules],
    ),
    canDrop: useCallback((item: DragObjectType) => item.data?.id !== id, [id]),
    hover: useCallback(
      (_item, monitor: DropTargetMonitor) => {
        if (!monitor.isOver({ shallow: true }) || !monitor.canDrop()) return;

        const offset = monitor.getClientOffset();

        if (!offset || !divRef.current) return;

        const target = divRef.current.getBoundingClientRect();

        const x = offset.x - target.left;
        const xRatio = parseFloat((x / target.width).toFixed(2));
        const y = offset.y - target.top;
        const yRatio = parseFloat((y / target.height).toFixed(2));

        if (previousPosition) {
          const xOffset = x - previousPosition.x;
          const yOffset = y - previousPosition.y;
          // 敏感度
          if (Math.abs(xOffset) < 10 && Math.abs(yOffset) < 5) return;
        }

        if (
          !previousPosition ||
          previousPosition.x !== x ||
          previousPosition.y !== y
        ) {
          // 頻率
          setPosition({ x, xRatio, y, yRatio });
        }
      },
      [previousPosition],
    ),
    collect: useCallback((monitor: DropTargetMonitor) => {
      return {
        isOver: monitor.canDrop() && monitor.isOver({ shallow: true }),
      };
    }, []),
  });

  useEffect(() => {
    setPosition(null);
  }, [isOver]);

  return [
    { isOver, direction },
    useCallback(
      (element: HTMLDivElement) => {
        divRef.current = element;
        dropRef(divRef);
      },
      [dropRef],
    ),
  ];
};
