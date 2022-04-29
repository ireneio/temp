// typescript import
import { HierarchyNode } from 'd3-hierarchy';

import { Leaf, CoordinatesReturnType } from './hooks/useCoordinates';

// import
import React, { useContext } from 'react';

import { Colors as ColorsContext } from '@meepshop/context';
import Select, { Option } from '@meepshop/select';

import styles from './styles/specs.less';

// typescript definition
export interface PropsType extends Omit<CoordinatesReturnType, 'variantsTree'> {
  nodes: HierarchyNode<Leaf>[];
  order?: number;
  unfoldedVariants: boolean;
}

// definition
const Specs = React.memo(
  ({
    nodes,
    order = 0,
    coordinates,
    setCoordinates,
    unfoldedVariants,
  }: PropsType) => {
    const colors = useContext(ColorsContext);
    const coordinate = coordinates[order];
    const {
      data: { category },
      children,
    } = nodes[coordinate];

    return (
      <>
        <div className={styles.root} key={category.id}>
          <div>{category.title?.zh_TW}</div>

          <div>
            {unfoldedVariants ? (
              nodes?.map((node, index) => (
                <div
                  key={node.id}
                  className={`${styles.node} ${
                    index === coordinate ? styles.selected : ''
                  }`}
                  onClick={() => {
                    if (index === coordinate) return;

                    const newCoordinates = [...coordinates];

                    newCoordinates[order] = index;
                    setCoordinates(newCoordinates);
                  }}
                >
                  {node.data.title?.zh_TW}
                </div>
              ))
            ) : (
              <Select
                size="large"
                value={coordinate}
                dropdownMatchSelectWidth={false}
                onChange={(value: number) => {
                  if (value === coordinate) return;

                  const newCoordinates = [...coordinates];

                  newCoordinates[order] = value;
                  setCoordinates(newCoordinates);
                }}
              >
                {nodes?.map((node, index) => (
                  <Option
                    key={node.id}
                    value={index}
                    title={node.data.title?.zh_TW || ''}
                  >
                    {node.data.title?.zh_TW}
                  </Option>
                ))}
              </Select>
            )}
          </div>
        </div>

        {!children ? null : (
          <Specs
            nodes={children}
            order={order + 1}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            unfoldedVariants={unfoldedVariants}
          />
        )}

        {order ? null : (
          <style
            dangerouslySetInnerHTML={{
              __html: `
                .${styles.node} {
                  background-color: ${colors[0]};
                  border: 1px solid ${colors[5]};
                }

                .${styles.node}:hover, .${styles.selected} {
                  background-color: ${colors[4]};
                  border: 1px solid ${colors[4]};
                  color: ${colors[2]}
                }
            `,
            }}
          />
        )}
      </>
    );
  },
);

export default Specs;
