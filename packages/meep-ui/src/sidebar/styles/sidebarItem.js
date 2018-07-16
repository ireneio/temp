import transformColor from 'color';

import { DEFAULT_COLOR_WITH_PATTERN } from 'menu/constants';

export const root = (
  { expandSubItem, normal, pattern },
  action,
  isLogin,
  colors,
) => {
  const selected = DEFAULT_COLOR_WITH_PATTERN[pattern];
  const color = normal.color || colors[selected[1]];

  const defaultStyle = {
    marginBottom: expandSubItem ? '10px' : '0px',
    boxSizing: 'border-box',
  };

  if (action === 8 && isLogin && !expandSubItem) {
    return {
      ...defaultStyle,
      borderBottom: `1px solid ${transformColor(color).alpha(0.4)}`,
    };
  }
  return { ...defaultStyle };
};

export const link = {
  width: '100%',
};

export const item = (
  { expandSubItem, pattern, hover, active },
  isActive,
  colors,
) => {
  const selected = DEFAULT_COLOR_WITH_PATTERN[pattern];
  const type = isActive ? active : hover;
  const background = type.background || colors[selected[isActive ? 5 : 2]];
  const color = type.color || colors[selected[isActive ? 6 : 3]];
  const borderColor = type.borderColor || colors[selected[isActive ? 7 : 4]];

  const defaultStyle = {
    padding: `15px 15px ${expandSubItem ? '5px' : '15px'} 25px`,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
  };

  // eslint-disable-next-line consistent-return
  const patternStyle = (() => {
    // eslint-disable-next-line default-case
    switch (pattern) {
      case 0:
        return {
          color,
          background,
        };

      case 1:
        return {
          color,
          padding: '5px 15px 5px 13px',
        };

      case 2:
        return {
          color,
          padding: '11px 15px 10px 24px',
        };

      case 3:
        return {
          color,
          background,
          padding: '15px 15px 15px 20px',
          borderLeft: `5px solid ${borderColor}`,
        };
    }
  })();

  if (expandSubItem) {
    return { ...defaultStyle };
  }

  if (isActive) {
    return {
      ...defaultStyle,
      ...patternStyle,
    };
  }

  return { ...defaultStyle, ':hover': patternStyle };
};

export const title = (
  { expandSubItem, pattern, hover, active },
  isActive,
  colors,
  isHover,
) => {
  const selected = DEFAULT_COLOR_WITH_PATTERN[pattern];
  const type = isActive ? active : hover;
  const background = type.background || colors[selected[isActive ? 5 : 2]];
  const borderColor = type.borderColor || colors[selected[isActive ? 7 : 4]];

  if ((!isActive && !isHover) || expandSubItem) return {};

  switch (pattern) {
    case 1:
      return {
        background,
        padding: '8px 10px',
        border: `2px solid ${borderColor}`,
        borderRadius: 2,
      };

    case 2:
      return {
        padding: '4px 1px',
        borderBottom: `1px solid ${borderColor}`,
      };

    default:
      return {};
  }
};
