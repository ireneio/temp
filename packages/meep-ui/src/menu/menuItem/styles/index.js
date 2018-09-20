import { PHONE_MEDIA } from 'constants/media';

import { DEFAULT_COLOR_WITH_PATTERN } from '../../constants';

export const root = (isExpandSubItem, minHeight) => [
  {
    minHeight,
    position: 'relative',
  },

  isExpandSubItem
    ? {
        maxWidth: '200px',
        padding: '15px 20px',
        textAlign: 'left',
        lineHeight: 1.5,
        [PHONE_MEDIA]: {
          flex: '1 1 0px',
        },
      }
    : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        cursor: 'pointer',
      },
];

export const link = isExpandSubItem =>
  isExpandSubItem
    ? {}
    : {
        display: 'flex',
        height: '100%',
        textDecoration: 'none',
        color: 'inherit',
      };

export const title = (isExpandSubItem, pages) => [
  {
    [PHONE_MEDIA]: isExpandSubItem
      ? {
          wordBreak: 'keep-all',
          whiteSpace: 'nowrap',
        }
      : {
          padding: '15px',
          wordBreak: 'keep-all',
          whiteSpace: 'nowrap',
        },
  },

  isExpandSubItem
    ? {
        position: 'relative',
        margin: '10px 0px',
        fontWeight: 'bold',
        ...(pages.length !== 0 ? {} : { cursor: 'pointer' }),
      }
    : {
        display: 'flex',
        padding: '15px 20px',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      },
];

/**
 * @param {Boolean} isActive - check if item is active
 * @param {Object} props - menu > design
 * @param {Object} colors - from enhancer
 */
export const menuItemHoverAndActive = (
  isActive,
  { pattern, hover, active },
  colors,
) => {
  const selected = DEFAULT_COLOR_WITH_PATTERN[pattern];
  const defaultStyles = isActive ? active : hover;
  const background =
    defaultStyles.background || colors[selected[isActive ? 5 : 2]];
  const color = defaultStyles.color || colors[selected[isActive ? 6 : 3]];
  const borderColor =
    defaultStyles.borderColor || colors[selected[isActive ? 7 : 4]];

  // eslint-disable-next-line consistent-return
  const style = (() => {
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
          background,
          margin: '3px',
          padding: '10px 15px',
          height: 'calc(100% - 3px * 2)',
          border: `2px solid ${borderColor}`,
          borderRadius: 2,
        };

      case 2:
        return {
          color,
          margin: '9px 19px',
          padding: '5px 1px',
          height: 'calc(100% - 9px * 2)',
          borderBottom: `1px solid ${borderColor}`,
        };

      case 3:
        return {
          color,
          background,
          boxShadow: `inset 0px -5px ${borderColor}`,
        };
    }
  })();

  return isActive ? style : { ':hover': style };
};
