// typescript import
import { RadioProps } from 'antd/lib/radio';
import { CheckboxOptionType } from 'antd/lib/checkbox';

// import
import React, { useContext } from 'react';
import { Radio } from 'antd';
import transformColor from 'color';

import { Colors as ColorsContext } from '@meepshop/context';

import styles from './styles/index.less';

// typescript definition
interface OptionsType extends CheckboxOptionType {
  description?: string | React.ReactElement;
}

interface PropsType extends RadioProps {
  options: OptionsType[];
}

// definition
const { Group } = Radio;

export default React.memo(({ value, options, ...props }: PropsType) => {
  const colors = useContext(ColorsContext);

  return (
    <>
      <Group className={styles.root} value={value} {...props}>
        {options.map(({ label, description, ...optionProps }) => (
          <div>
            <Radio {...optionProps}>{label}</Radio>

            <div
              className={`${styles.description} ${
                !description || value !== optionProps.value ? styles.hide : ''
              }`}
            >
              {description}
            </div>
          </div>
        ))}
      </Group>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} .ant-radio-wrapper span {
              color: ${colors[3]};
            }

            .${styles.root} .ant-radio-inner {
              border-color: ${transformColor(colors[3]).alpha(0.3)};
              background: ${colors[0]};
            }

            .${
              styles.root
            } .ant-radio-wrapper:hover .ant-radio, .ant-radio:hover .ant-radio-inner, .ant-radio-input:focus + .ant-radio-inner {
              border-color: ${transformColor(colors[3]).alpha(0.3)};
            }

            .${
              styles.root
            } .ant-radio-checked .ant-radio-inner, .ant-radio-checked::after {
              border: 6px solid ${colors[3]};
            }

            .${styles.root} .ant-radio-inner::after {
              display: none;
            }

            .${styles.root} .ant-radio-input:focus + .ant-radio-inner {
              box-shadow: 0 0 0 3px ${transformColor(colors[3]).alpha(0.08)};
            }

            .${styles.description} {
              color: ${colors[3]};
              background: ${transformColor(colors[3]).alpha(0.08)};
            }
          `,
        }}
      />
    </>
  );
});
