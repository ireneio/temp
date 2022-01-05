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

import styles from '../styles/useIndicator.less';
import { ModuleIcons } from '../../constants';

// typescript definition
interface PropsType {
  currentOffset: XYCoord | null;
  toward?: Direction['toward'];
  module: keyof typeof ModuleIcons;
}

// definition
export default ({
  currentOffset,
  toward,
  module,
}: PropsType): React.ReactNode => {
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
    const arrow = (() => {
      switch (toward) {
        case 'right':
          return <CaretRightOutlined />;
        case 'left':
          return <CaretLeftOutlined />;
        case 'up':
          return <CaretUpOutlined />;
        case 'down':
          return <CaretDownOutlined />;
        default:
          return null;
      }
    })();
    const Icon = ModuleIcons[module];

    return (
      <div className={`${styles.root} ${styles[toward || '']}`} style={style}>
        <div>
          <Icon />
        </div>
        {arrow}
      </div>
    );
  }, [module, style, toward]);
};
