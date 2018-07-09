import transformColor from 'color';

import { PHONE_MEDIA } from 'constants/media';

export const root = (colors, isClicked, isMounted) => ({
  display: isMounted ? 'block' : 'none',
  position: 'absolute',
  top: '100%',
  left: '50%',
  width: '200px',
  maxHeight: '500px',
  color: colors[3],
  background: colors[1],
  boxShadow: '0 3px 3px 0 rgba(0, 0, 0, 0.2)',
  textAlign: 'left',
  transform: 'translateX(-50%)',
  overflow: 'auto',
  zIndex: 99,
  [PHONE_MEDIA]: {
    display: isClicked ? 'block' : 'none',
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100vw',
    height: '100vh',
    maxHeight: 'initial',
    color: '#666666',
    background: '#ffffff',
    transform: 'translateX(0px)',
    zIndex: 1000,
  },
});

export const closeWrapper = {
  display: 'none',
  [PHONE_MEDIA]: {
    display: 'block',
    margin: '0px 0px 40px',
    padding: '10px',
    textAlign: 'right',
    borderBottom: '1px solid #cccccc',
  },
};

export const closeIcon = {
  padding: '10px',
  width: '45px',
  height: '45px',
};

export const link = isExpandSubItem => ({
  display: 'flex',
  ...(isExpandSubItem ? {} : { height: '100%' }),
  [PHONE_MEDIA]: isExpandSubItem
    ? {}
    : {
        height: '70px',
      },
});

export const content = (color, isExpandSubItem, fontSize) => ({
  ...(isExpandSubItem
    ? {
        cursor: 'pointer',
        whiteSpace: 'normal',
        wordBreak: 'break-all',
        fontSize: fontSize - 2,
        padding: `${Math.round(fontSize / 5)}px 0px`,
      }
    : {
        padding: '10px',
        width: '100%',
        lineHeight: 1.5,
        whiteSpace: 'normal',
        ':hover': {
          background: transformColor(color[1]).darken(0.05),
        },
      }),
  [PHONE_MEDIA]: isExpandSubItem
    ? {}
    : {
        margin: '10px',
        padding: '0px',
        width: 'calc(100% - 10px * 2)',
        height: '70px',
        textAlign: 'center',
        lineHeight: '70px',
        borderBottom: '1px solid #979797',
        ':hover': {
          background: 'initial',
        },
      },
});

export const fontBold = {
  fontWeight: 'bold',
};
