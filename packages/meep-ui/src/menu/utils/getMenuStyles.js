import transformColor from 'color';

export default (
  id,
  normal,
  // minHeight
  height,
  // active and hover
  active,
  hover,
  colors,
  pattern,
  selected,
) => `
  #menu-${id}.show-border .searchBar,
  #menu-${id}.show-border .is-login {
    border-bottom: 1px solid ${transformColor(
      normal.color || colors[selected[1]],
    ).alpha(0.4)};
  }

  #menu-${id} .ant-menu-vertical .menu-1,
  #menu-${id} .ant-menu-vertical .menu-1 > .ant-menu-submenu-title {
    min-height: ${height}px;
  }

  #menu-${id}.show-hover .menu-1.is-active {
    ${(() => {
      const color = active.color || colors[selected[6]];
      const background = active.background || colors[selected[5]];
      const borderColor = active.borderColor || colors[selected[7]];

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

  #menu-${id}.show-hover .menu-1:not(.searchBar):not(.ant-menu-submenu):hover,
  #menu-${id}.show-hover .menu-1:not(.searchBar).ant-menu-submenu-active > .ant-menu-submenu-title {
    ${(() => {
      const color = hover.color || colors[selected[3]];
      const background = hover.background || colors[selected[2]];
      const borderColor = hover.borderColor || colors[selected[4]];

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
`;
