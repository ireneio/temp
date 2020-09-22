// import
import React from 'react';
import { Icon } from 'antd';

import useHeight from './hooks/useHeight';
import styles from './styles/card.less';

// typescript definition
interface PropsType {
  id: string;
  src: string;
  selectedIds: string[];
  setSelectedIds: (selectedIds: string[]) => void;
}

// definition
export default ({
  id,
  src,
  selectedIds,
  setSelectedIds,
}: PropsType): React.ReactElement => {
  const { rootRef, height } = useHeight();

  return (
    <div
      ref={rootRef}
      className={styles.root}
      style={{
        height: `${height}px`,
        backgroundImage: `url("${src}")`,
      }}
      onClick={() =>
        setSelectedIds(
          !selectedIds.includes(id) && !selectedIds.includes(src) // TODO: should only include id
            ? [...selectedIds, id]
            : selectedIds.filter(existingIds => existingIds !== id),
        )
      }
    >
      {!selectedIds.includes(id) &&
      !selectedIds.includes(src) /* TODO: should only include id */ ? null : (
        <div className={styles.selected}>
          <Icon type="check-circle" theme="filled" />
        </div>
      )}
    </div>
  );
};
