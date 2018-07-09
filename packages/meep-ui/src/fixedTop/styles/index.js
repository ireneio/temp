import transformColor from 'color';

import { PHONE_MEDIA } from 'constants/media';
import { DEFAULT_COLOR_WITH_PATTERN } from 'menu/constants';

export const root = ({ pattern, normal, opacity, fontSize, font }, colors) => {
  const selected = DEFAULT_COLOR_WITH_PATTERN[pattern];
  const color = normal.color || colors[selected[1]];
  const background = normal.background || colors[selected[0]];

  return {
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100vw',
    color,
    background: transformColor(background).alpha(opacity),
    fontSize,
    fontFamily:
      font === '黑體'
        ? 'PingFang TC,微軟正黑體,Microsoft JhengHei,Helvetica Neue,Helvetica,source-han-sans-traditional,Arial,sans-serif'
        : `${font},微軟正黑體,Microsoft JhengHei,sans-serif`,
    zIndex: 10,
    [PHONE_MEDIA]: {
      display: 'none',
    },
  };
};

export const menu = alignment => {
  const defaultStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    margin: '0px auto',
    padding: '0px 70px',
    width: '100%',
    color: 'inherit',
  };

  switch (alignment) {
    case 'center':
      return {
        ...defaultStyle,
        justifyContent: 'center',
      };

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
      /**
       * This should not be called.
       * Let production not to break.
       */
      return defaultStyle;
  }
};

export const menuMain = {
  display: 'flex',
  flexWrap: 'wrap',
  listStyleType: 'none',
  padding: '0px',
  margin: '0px',
};

export const flex = {
  display: 'flex',
};
