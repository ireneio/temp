import React from 'react';
import transformColor from 'color';

import { contextProvider } from 'context';

import './styles/globalStyles.less';

const { enhancer } = contextProvider('storeSetting');

@enhancer
export default class GlobalStyles extends React.PureComponent {
  render() {
    const {
      storeSetting: { colors },
    } = this.props;

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
