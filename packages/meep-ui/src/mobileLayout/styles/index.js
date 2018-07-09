import { PHONE_MEDIA } from 'constants/media';

const HEADEER_HEIGHT = '60px';

export const root = {
  [PHONE_MEDIA]: {
    padding: `${HEADEER_HEIGHT} 0px 0px`,
  },
};

export const header = colors => ({
  display: 'none',
  [PHONE_MEDIA]: {
    display: 'flex',
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100vw',
    height: HEADEER_HEIGHT,
    color: colors[2],
    background: colors[1],
    zIndex: 990,
  },
});

export const buttonRoot = {
  display: 'flex',
  flexBasis: '94px',
  margin: '0px',
  padding: '0px',
};

export const alignRight = {
  justifyContent: 'flex-end',
};

export const icon = {
  display: 'flex',
  padding: '18px',
  width: '60px',
  height: HEADEER_HEIGHT,
  cursor: 'pointer',
};

export const logoWrapper = {
  display: 'flex',
  justifyContent: 'center',
  flexGrow: 1,
};

export const logo = {
  width: '150px',
  height: HEADEER_HEIGHT,
  backgroundSize: 'contain',
  backgroundPosition: 'top',
};
