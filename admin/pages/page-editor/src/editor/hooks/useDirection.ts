// typescript import
import { Position } from './useCustomDrop';

// import
import { useMemo } from 'react';

import { usePrevious } from '@meepshop/hooks';

// typescript definition
export interface Direction {
  toward: 'right' | 'left' | 'up' | 'down';
  isBorderline: boolean;
}

// definition
export default (
  current: Position | null,
  previous: Position | null,
  level: number,
): Direction | null => {
  const direction = useMemo<Direction | null>(() => {
    if (!previous || !current) return null;

    if (current.x === previous.x && current.y === previous.y) return null;

    const xOffset = current.x - previous.x;
    const yOffset = current.y - previous.y;

    if (Math.abs(xOffset) >= Math.abs(yOffset)) {
      if (xOffset > 0) {
        return {
          toward: 'right',
          isBorderline: level === 3,
        };
      }

      return {
        toward: 'left',
        isBorderline: level === 3,
      };
    }

    if (yOffset > 0) {
      return {
        toward: 'down',
        isBorderline: level > 1 && current.yRatio > 0.75,
      };
    }

    return {
      toward: 'up',
      isBorderline: level > 1 && current.yRatio < 0.25,
    };
  }, [current, previous, level]);

  const previousDirection = usePrevious(direction);

  return direction || previousDirection;
};
