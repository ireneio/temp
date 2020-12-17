// import
import React, { useContext } from 'react';
import transformColor from 'color';

import { Colors as ColorsContext } from '@meepshop/context';

import { DEFAULT_COLOR_WITH_PATTERN } from './constants';
import styles from './styles/menuItem.less';

// graphql typescript
import { stylesFragment } from './gqls/__generated__/stylesFragment';

// typescript defintion
interface PropsType {
  id: string;
  design: stylesFragment | null;
}

// definition
export default React.memo(({ id, design }: PropsType) => {
  const colors = useContext(ColorsContext);
  const { pattern, active, hover } = design || {};
  const selected = DEFAULT_COLOR_WITH_PATTERN[design?.pattern || 0];

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          #meepshop .${styles.popup}.ant-menu-submenu-popup {
            background: transparent;
          }

          #meepshop .${styles.popup} > .ant-menu {
            color: ${colors[2]};
            background: ${colors[1]};
          }

          #meepshop .${styles.popup} .${styles.root}.ant-menu-item:hover,
          #meepshop .${styles.popup} .${styles.root}.ant-menu-submenu:hover {
            background: ${transformColor(colors[1]).darken(0.05)};
          }

          #menu-${id} .${styles['menu-1']}.ant-menu-item-selected {
            ${(() => {
              const color = active?.color || colors[selected[6]];
              const background =
                active?.background || colors[selected[5] as number];
              const borderColor =
                active?.borderColor || colors[selected[7] as number];

              switch (pattern) {
                case 0:
                default:
                  return `
                    color: ${color};
                    fill: ${color};
                    background: ${background};
                  `;

                case 1:
                  return `
                    color: ${color};
                    fill: ${color};
                    background: ${background};
                    border: 2px solid ${borderColor};
                  `;

                case 2:
                  return `
                    color: ${color};
                    fill: ${color};
                    border-bottom: 1px solid ${borderColor};
                  `;

                case 3:
                  return `
                    color: ${color};
                    fill: ${color};
                    background: ${background};
                    box-shadow: inset 0px -5px ${borderColor};
                  `;
              }
            })()}
          }

          #menu-${id} .${styles['menu-1']}:hover,
          #menu-${id} .${styles['menu-1']}.ant-menu-submenu-active {
            ${(() => {
              const color = hover?.color || colors[selected[3]];
              const background =
                hover?.background || colors[selected[2] as number];
              const borderColor =
                hover?.borderColor || colors[selected[4] as number];

              switch (pattern) {
                case 0:
                default:
                  return `
                    color: ${color};
                    fill: ${color};
                    background: ${background};
                  `;

                case 1:
                  return `
                    color: ${color};
                    fill: ${color};
                    background: ${background};
                    border: 2px solid ${borderColor};
                  `;

                case 2:
                  return `
                    color: ${color};
                    fill: ${color};
                    border-bottom: 1px solid ${borderColor};
                  `;

                case 3:
                  return `
                    color: ${color};
                    fill: ${color};
                    background: ${background};
                    box-shadow: inset 0px -5px ${borderColor};
                  `;
              }
            })()}
          }
        `,
      }}
    />
  );
});
