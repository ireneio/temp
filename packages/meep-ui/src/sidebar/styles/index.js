import transformColor from 'color';

import { PHONE_MEDIA } from 'constants/media';

import { DEFAULT_COLOR_WITH_PATTERN } from 'menu/constants';

export const root = {
  display: 'flex',
};

export const sidebar = (
  { pattern, normal, opacity, fontSize, font, width },
  colors,
) => {
  const selected = DEFAULT_COLOR_WITH_PATTERN[pattern];
  const color = normal.color || colors[selected[1]];
  const background = normal.background || colors[selected[0]];

  return {
    width,
    boxSizing: 'border-box',
    overflowX: 'hidden',
    overflowY: 'auto',
    minHeight: '600px',
    color,
    background: transformColor(background).alpha(opacity),
    fontSize,
    fontFamily:
      font === '黑體'
        ? 'PingFang TC,微軟正黑體,Microsoft JhengHei,Helvetica Neue,Helvetica,source-han-sans-traditional,Arial,sans-serif'
        : `${font},微軟正黑體,Microsoft JhengHei,sans-serif`,
  };
};

export const padding = paddingTop => ({
  paddingTop,
});

export const searchBar = ({ pattern, normal }, colors) => {
  const selected = DEFAULT_COLOR_WITH_PATTERN[pattern];
  const color = normal.color || colors[selected[1]];

  return {
    padding: '10px 25px',
    boxSizing: 'border-box',
    borderBottom: `1px solid ${transformColor(color).alpha(0.4)}`,
  };
};

export const searchIcon = {
  padding: 0,
  width: 'fit-content',
};

export const blockWrapper = ({ width }) => ({
  width: `calc(100% - ${width}px)`,
  [PHONE_MEDIA]: {
    width: '100%',
  },
});
