// typescript import
import { ModulesType } from './hooks/useModules';

// import
import React from 'react';

import modules from '@meepshop/modules';

import Indicator from './Indicator';
import useCustomDrop from './hooks/useCustomDrop';
import useCustomDrag from './hooks/useCustomDrag';
import styles from './styles/module.less';

// typescript definition
interface PropsType {
  data: ModulesType['data'];
  parentNode: ModulesType['parentNode'];
  settings: {
    minWidth: string;
    level: number;
  };
}

// definition
export default React.memo(
  ({ data, parentNode, settings: { level } }: PropsType) => {
    const { __typename } = data;
    const Module = modules[__typename];
    const [{ isOver, direction }, dropRef] = useCustomDrop({
      data,
      parentNode,
      level,
    });
    const [{ isDragging }, dragRef] = useCustomDrag({
      data,
      parentNode,
      level,
    });

    return (
      <div
        className={`${styles.root} ${
          direction ? styles[direction.toward] : ''
        } ${direction?.isBorderline ? styles.isBorderline : ''} ${
          isDragging ? styles.isDragging : ''
        }`}
      >
        <div className={styles.border}>
          <div ref={dragRef} className={styles.handler}>
            level: {level}
          </div>

          <div ref={dropRef} className={styles.mask} />

          <div className={styles.module}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Module {...(data as any)} />
          </div>
        </div>

        {!isOver ? null : <Indicator toward={direction?.toward} />}
      </div>
    );
  },
);
