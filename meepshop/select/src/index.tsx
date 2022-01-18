// typescript import
import { SelectProps } from 'antd/lib/select';

// import
import React, { useContext } from 'react';
import { Select } from 'antd';
import transformColor from 'color';

import { Colors as ColorsContext } from '@meepshop/context';

import styles from './styles/index.less';

// definition
export default React.memo(({ ...props }: SelectProps<string | number>) => {
  const colors = useContext(ColorsContext);

  return (
    <div className={styles.root}>
      <Select dropdownClassName={styles.dropDown} {...props} />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${
              styles.root
            } .ant-select:not(.ant-select-customize-input) .ant-select-selector,
            .${
              styles.root
            } .ant-select:not(.ant-select-customize-input):hover .ant-select-selector,
            .${
              styles.root
            } .ant-select:not(.ant-select-disabled):not(.ant-select-customize-input) .ant-select-selector {
              color: ${colors[3]};
              border-color: ${colors[5]};
              background-color: ${colors[0]};
              box-shadow: none;
            }

            .${
              styles.root
            } .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
              border-color: ${colors[5]};
              box-shadow: 0 0 0 2px ${transformColor(colors[5]).alpha(0.2)};
            }

            .${
              styles.root
            } .ant-select:not(.ant-select-customize-input) .ant-select-selection-item,
            .${
              styles.root
            } .ant-select:not(.ant-select-customize-input) .ant-select-arrow,
            .${
              styles.root
            } .ant-select:not(.ant-select-customize-input) .ant-select-clear,
            .${styles.root} .ant-select-item {
              color: ${colors[3]};
            }

            .${styles.root} .ant-select-clear {
              background-color: ${colors[0]};
            }

            .${styles.dropdown} {
              background-color: ${colors[0]};
              box-shadow: 0 2px 9px ${transformColor(colors[3]).alpha(0.15)};
            }

            .${styles.dropdown} .ant-select-item {
              color: ${colors[3]};
            }

            .${
              styles.dropdown
            } .ant-select-item-option-selected:not(.ant-select-item-option-disabled),
            .${
              styles.dropdown
            } .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
              color: ${colors[2]};
              background-color: ${colors[4]};
            }
          `,
        }}
      />
    </div>
  );
});
