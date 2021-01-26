// typescript import
import { HierarchyNode } from 'd3-hierarchy';

import { Colors as ColorsContext } from '@meepshop/context';
import { DefaultLeaf } from '@meepshop/hooks/lib/useVariantsTree';

// import
import React, { useContext } from 'react';
import { Select } from 'antd';

import styles from './styles/specs.less';

// typescript definition
interface PropsType {
  nodes: HierarchyNode<DefaultLeaf>[];
  order?: number;
  coordinates: number[];
  unfoldedVariantsOnMobile: boolean;
  onChangeSpec: (order: number, index: number) => void;
}

// definition
const Specs = React.memo(
  ({
    nodes,
    order = 0,
    coordinates,
    unfoldedVariantsOnMobile,
    onChangeSpec,
  }: PropsType) => {
    const colors = useContext(ColorsContext);

    const [coordinate, ...rest] = coordinates;
    const {
      data: { category },
      children,
    } = nodes[coordinate];

    return (
      <>
        <div className={styles.root} key={category.id}>
          <div>{category.title?.zh_TW}</div>

          <div>
            {unfoldedVariantsOnMobile ? (
              nodes?.map((node, index) => (
                <div
                  key={node.id}
                  className={`${styles.node} ${
                    index === coordinate ? styles.selected : ''
                  }`}
                  onClick={() => {
                    if (index !== coordinate) onChangeSpec(order, index);
                  }}
                >
                  {node.data.title?.zh_TW}
                </div>
              ))
            ) : (
              <Select
                size="large"
                value={coordinate}
                dropdownClassName={styles.select}
                dropdownMatchSelectWidth={false}
                onChange={(value: number) => {
                  if (value !== coordinate) onChangeSpec(order, value);
                }}
              >
                {nodes?.map((node, index) => (
                  <Select.Option
                    key={node.id}
                    value={index}
                    title={node.data.title?.zh_TW || ''}
                  >
                    {node.data.title?.zh_TW}
                  </Select.Option>
                ))}
              </Select>
            )}
          </div>
        </div>

        {!children ? null : (
          <Specs
            nodes={children}
            order={order + 1}
            coordinates={rest}
            unfoldedVariantsOnMobile={unfoldedVariantsOnMobile}
            onChangeSpec={onChangeSpec}
          />
        )}

        {!order ? (
          <style
            dangerouslySetInnerHTML={{
              __html: `
                .${styles.root} .ant-select-selection,
                .${styles.node} {
                  background-color: ${colors[0]};
                  border: 1px solid ${colors[5]};
                }

                .${styles.node}:hover, .${styles.selected} {
                  background-color: ${colors[4]};
                  border: 1px solid ${colors[4]};
                  color: ${colors[2]}
                }

                .${styles.select} .ant-select-dropdown-menu-item {
                  background-color: ${colors[0]};
                  color: ${colors[3]};
                }

                .${styles.select} .ant-select-dropdown-menu-item-selected,
                .${styles.select} .ant-select-dropdown-menu-item-active,
                .${styles.select} .ant-select-dropdown-menu-item:hover {
                  background-color: ${colors[4]};
                  color: ${colors[2]};
                }
            `,
            }}
          />
        ) : null}
      </>
    );
  },
);

export default Specs;
