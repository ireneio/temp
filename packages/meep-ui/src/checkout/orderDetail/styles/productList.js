import { PHONE_MEDIA } from 'constants/media';
import addAnimation from 'utils/addAnimation';

const showDetail = {
  transform: 'translate(0px, 0px)',
};

const hideDetail = {
  transform: 'translate(100vw, 0px)',
};

export const rootAnimation = {
  showToHide: addAnimation('checkout-show-to-hide', showDetail, hideDetail),
  hideToShow: addAnimation('checkout-hide-to-show', hideDetail, showDetail),
};

export const hide = {
  [PHONE_MEDIA]: {
    display: 'none',
  },
};

export const stopAnimation = {
  animation: 'initial',
};

export const root = colors => ({
  width: '560px',
  animation: 'x 0.3s ease-in-out',
  [PHONE_MEDIA]: {
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100vw',
    height: '100%',
    color: colors[3],
    background: colors[0],
    borderLeft: '0px',
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.05)',
    zIndex: 11,
  },
});

export const closeIconRoot = colors => ({
  display: 'none',
  [PHONE_MEDIA]: {
    display: 'block',
    margin: '0px',
    padding: '20px 10px',
    color: colors[3],
    background: colors[0],
    borderBottom: `1px solid ${colors[5]}`,
    textAlign: 'right',
  },
});

export const closeIcon = {
  width: '24px',
  height: '24px',
  cursor: 'pointer',
  fontSize: '18px',
};
