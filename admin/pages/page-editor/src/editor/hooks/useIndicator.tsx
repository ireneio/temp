// typescript import
import { XYCoord } from 'react-dnd';

import { Direction } from './useDirection';

// import
import React, { useMemo } from 'react';
import {
  RightOutlined,
  LeftOutlined,
  UpOutlined,
  DownOutlined,
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
        return <RightOutlined style={style} />;
      case 'left':
        return <LeftOutlined style={style} />;
      case 'up':
        return <UpOutlined style={style} />;
      case 'down':
        return <DownOutlined style={style} />;
      default:
        return null;
    }
  }, [style, toward]);
};
