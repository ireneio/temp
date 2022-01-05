// typescript import
import { Direction } from './hooks/useDirection';
import { DragObjectType } from '../constants';

// import
import React from 'react';
import { useDragLayer } from 'react-dnd';

import useIndicator from './hooks/useIndicator';
import styles from './styles/indicator.less';
import { ModuleIcons } from '../constants';

// typescript definition
interface PropsType {
  toward?: Direction['toward'];
}

// definition
export default React.memo(({ toward }: PropsType) => {
  const { currentOffset, module } = useDragLayer(monitor => {
    const item: DragObjectType = monitor.getItem();

    return {
      currentOffset: monitor.getSourceClientOffset(),
      module:
        (item.data?.__typename as keyof typeof ModuleIcons) || item.module,
    };
  });
  const sign = useIndicator({ currentOffset, toward, module });

  return <div className={styles.root}>{sign}</div>;
});
