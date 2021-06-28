import React from 'react';
import transformColor from 'color';

import './styles/globalStyles.less';

export default class GlobalStyles extends React.PureComponent {
  render() {
    const { colors } = this.props;

    return (
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body {
              background: ${colors[0]};
            }

            h1, h2, h3, h4, h5, h6,
            span,
            a, a:hover, a:active, a:focus, a:visited,
            .ant-form {
              color: ${colors[3]};
            }

            .ant-badge-count {
              color: ${colors[2]};
              background: ${colors[4]};
              box-shadow: 0px 1px 1px ${colors[5]};
            }

            .ant-scroll-number-only {
              color: ${colors[2]};
            }

            .ant-menu-submenu-popup {
              background: transparent;
            }

            .ant-menu-submenu-popup.ant-menu-submenu > .ant-menu,
            .ant-menu-submenu-popup.ant-menu-submenu .ant-menu-item {
              color: ${colors[2]};
              background: ${colors[1]};
              border-radius: 0px;
            }

            .ant-menu-submenu-popup.ant-menu-submenu .ant-menu-item:hover,
            .ant-menu-submenu-popup.ant-menu-submenu .ant-menu-submenu:hover {
              background: ${transformColor(colors[1]).darken(0.05)};
            }

            .ant-input,
            .ant-input[disabled],
            .ant-input-password,
            .ant-input-number-input,
            .ant-select:not(.ant-select-customize-input) .ant-select-selector,
            .ant-select:not(.ant-select-customize-input):hover .ant-select-selector,
            .ant-picker.ant-picker-disabled,
            .ant-cascader-picker  {
              border-color: ${colors[5]};
              background-color: ${colors[0]};
            }

            .ant-cascader-picker .ant-input {
              border-color: ${colors[5]};
            }

            .ant-cascader-picker .ant-input:focus,
            .ant-cascader-picker:focus .ant-cascader-input,
            .ant-cascader-picker-label:hover + .ant-cascader-input:not(.ant-cascader-picker-disabled .ant-cascader-picker-label:hover + .ant-cascader-input),
            .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
              box-shadow: 0 0 0 2px ${transformColor(colors[5]).alpha(0.2)};
              border-color: ${colors[5]};
            }

            .ant-cascader-picker .ant-cascader-picker-label,
            .ant-select:not(.ant-select-customize-input) .ant-select-selection-item,
            .ant-select:not(.ant-select-customize-input) .ant-select-arrow,
            .ant-cascader-menus .ant-cascader-menu-item,
            .ant-select-item {
              color: ${colors[3]};
            }

            .ant-select-clear, .ant-cascader-picker-clear {
              background-color: ${colors[0]};
            }

            .ant-cascader-menus,
            .ant-select-dropdown {
              background-color: ${colors[0]};
              box-shadow: 0 2px 8px ${transformColor(colors[3]).alpha(0.15)};
            }

            .ant-cascader-menus .ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled),
            .ant-cascader-menus .ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled):hover,
            .ant-cascader-menus .ant-cascader-menu-item:hover,
            .ant-select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled),
            .ant-select-dropdown .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
              background-color: ${colors[4]};
              color: ${colors[2]};
            }

            .ant-table,
            .ant-table-thead > tr > th {
              color: ${colors[3]};
            }

            .ant-table-tbody > tr.ant-table-row:hover > td,
            .ant-table-tbody > tr.ant-table-row-selected > td {
              background: ${transformColor(colors[4]).alpha(0.1)};
            }

            ${colors
              .map(
                (color, index) => `
              .color-${index},
              .color-${index}-hover:hover {
                color: ${color};
              }

              .background-color-${index},
              .background-color-${index}-hover:hover {
                background: ${color};
              }
            `,
              )
              .join('\n')}
          `,
        }}
      />
    );
  }
}
