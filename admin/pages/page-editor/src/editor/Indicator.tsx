// typescript import
import { Direction } from './hooks/useDirection';

// import
import React from 'react';
import { useDragLayer } from 'react-dnd';

import useIndicator from './hooks/useIndicator';
import styles from './styles/indicator.less';

// typescript definition
interface PropsType {
  toward?: Direction['toward'];
}

// definition
export default React.memo(
  ({ toward }: PropsType): React.ReactElement => {
    const { currentOffset } = useDragLayer(monitor => ({
      currentOffset: monitor.getSourceClientOffset(),
    }));
    const icon = useIndicator(currentOffset, toward);

    return <div className={styles.root}>{icon}</div>;
  },
);
