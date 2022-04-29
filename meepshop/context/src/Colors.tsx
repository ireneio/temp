// import
import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import transformColor from 'color';

import './styles/colors.less';

// graphql typescript
import { getColors as getColorsType } from '@meepshop/types/gqls/meepshop';

// graphql import
import { getColors } from './gqls/colors';

// typescript definition
export type ColorsType = string[];

// definition
const ColorsContext = React.createContext<ColorsType>([]);

export const ColorsProvider = React.memo(({ children }) => {
  const { data } = useQuery<getColorsType>(getColors);
  const colors = useMemo(() => {
    const { selected = null, themes = null } =
      data?.getColorList?.data?.[0] || {};

    return themes?.[parseInt(selected || '0', 10)]?.colors || [];
  }, [data]) as ColorsType;

  if (!data) return <Spin indicator={<LoadingOutlined spin />} />;

  return (
    <ColorsContext.Provider value={colors}>
      {children}

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
            .ant-input:hover,
            .ant-input:focus,
            .ant-input[disabled],
            .ant-input-password,
            .ant-input-password:focus,
            .ant-input-password .ant-input-suffix .ant-input-password-icon,
            .ant-input-number,
            .ant-input-number:hover,
            .ant-input-number:focus,
            .ant-input-number-input,
            .ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover,
            .ant-picker,
            .ant-picker.ant-picker-disabled,
            .ant-cascader-picker,
            .ant-form-item-has-error .ant-input,
            .ant-form-item-has-error .ant-input-affix-wrapper,
            .ant-form-item-has-error .ant-input:hover,
            .ant-form-item-has-error .ant-input-affix-wrapper:hover,
            .ant-form-item-has-error .ant-input-number,
            .ant-form-item-has-error .ant-picker,
            .ant-form-item-has-error .ant-input-number:not([disabled]):hover,
            .ant-form-item-has-error .ant-picker:not([disabled]):hover,
            .ant-picker-input > input,
            .ant-picker-input > input[disabled],
            .ant-picker-input .ant-picker-suffix,
            .ant-picker-input .ant-picker-clear {
              color: ${colors[3]};
              border-color: ${colors[5]};
              background-color: ${colors[0]};
              box-shadow: none;
            }

            .ant-cascader-picker .ant-input {
              border-color: ${colors[5]};
            }

            .ant-cascader-picker .ant-input:focus,
            .ant-cascader-picker:focus .ant-cascader-input,
            .ant-cascader-picker-label:hover + .ant-cascader-input:not(.ant-cascader-picker-disabled .ant-cascader-picker-label:hover + .ant-cascader-input) {
              box-shadow: 0 0 0 2px ${transformColor(colors[5]).alpha(0.2)};
              border-color: ${colors[5]};
            }

            .ant-cascader-picker .ant-cascader-picker-label,
            .ant-cascader-picker .ant-cascader-picker-clear,
            .ant-cascader-picker .ant-cascader-picker-arrow,
            .ant-cascader-menus .ant-cascader-menu-item {
              color: ${colors[3]};
            }

            .ant-cascader-picker-clear {
              background-color: ${colors[0]};
            }

            .ant-cascader-menus {
              background-color: ${colors[0]};
              box-shadow: 0 2px 8px ${transformColor(colors[3]).alpha(0.15)};
            }

            .ant-cascader-menus .ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled),
            .ant-cascader-menus .ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled):hover,
            .ant-cascader-menus .ant-cascader-menu-item:hover {
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
          `,
        }}
      />
    </ColorsContext.Provider>
  );
});

export default ColorsContext;
