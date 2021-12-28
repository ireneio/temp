// import
import React, { useState, useCallback } from 'react';
import { Radio } from 'antd';

import { RoundFilterFillIcon } from '@meepshop/icons';

import styles from './styles/index.less';

// typescript definition
interface FiltersType {
  text: string;
  value: string;
  children?: React.ReactElement;
}

interface PropsType {
  filters: FiltersType[];
}

// definition
const { Group, Button } = Radio;

export default React.memo(({ filters }: PropsType) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const onChange = useCallback(e => {
    setSelectedValue(e?.target?.value || null);
  }, []);

  return (
    <Group className={styles.root} value={selectedValue} onChange={onChange}>
      {filters.map(({ text, value, children }) => (
        <Button key={value} value={value}>
          {text}
          <RoundFilterFillIcon />

          {!children || value !== selectedValue ? null : (
            <div className={styles.children}>
              {React.cloneElement(children, {
                close: () => onChange(null),
              })}
            </div>
          )}
        </Button>
      ))}
    </Group>
  );
});
