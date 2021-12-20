// typescript import
import { XYCoord } from 'react-dnd';

import { Direction } from './useDirection';

// import
import React, { useMemo } from 'react';
import {
  CaretRightOutlined,
  CaretLeftOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';

// definition
export default (
  currentOffset: XYCoord | null,
  toward?: Direction['toward'],
): React.ReactNode => {
  const style = useMemo(() => {
    if (!currentOffset) {
      return {
        display: 'none',
      };
    }

    const { x, y } = currentOffset;

    return {
      transform: `translate(${x}px, ${y}px)`,
    };
  }, [currentOffset]);

  return useMemo(() => {
    switch (toward) {
      case 'right':
        return <CaretRightOutlined style={style} />;
      case 'left':
        return <CaretLeftOutlined style={style} />;
      case 'up':
        return <CaretUpOutlined style={style} />;
      case 'down':
        return <CaretDownOutlined style={style} />;
      default:
        return null;
    }
  }, [style, toward]);
};
