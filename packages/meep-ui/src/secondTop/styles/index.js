import transformColor from 'color';

import { PHONE_MEDIA } from 'constants/media';
import { DEFAULT_COLOR_WITH_PATTERN } from 'menu/constants';

export const root = (
  { pattern, normal, opacity, fontSize, font, alignment, height },
  colors,
) => {
  const selected = DEFAULT_COLOR_WITH_PATTERN[pattern];
  const color = normal.color || colors[selected[1]];
  const background = normal.background || colors[selected[0]];

  const defaultStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    padding: '0 70px',
    boxSizing: 'border-box',
    zIndex: 10,
    minHeight: `${height}px`,
    color,
    background: transformColor(background).alpha(opacity),
    fontSize,
    fontFamily:
      font === '黑體'
        ? 'PingFang TC,微軟正黑體,Microsoft JhengHei,Helvetica Neue,Helvetica,source-han-sans-traditional,Arial,sans-serif'
        : `${font},微軟正黑體,Microsoft JhengHei,sans-serif`,
    [PHONE_MEDIA]: {
      display: 'none',
    },
  };

  switch (alignment) {
    case 'right':
      return {
        ...defaultStyle,
        justifyContent: 'space-between',
      };

    case 'left':
      return {
        ...defaultStyle,
        justifyContent: 'flex-start',
      };

    default:
      return {
        ...defaultStyle,
        justifyContent: 'center',
      };
  }
};

export const flex = {
  display: 'flex',
};

export const menuMain = {
  display: 'flex',
  flexWrap: 'wrap',
  listStyleType: 'none',
  padding: '0px',
  margin: '0px',
};
