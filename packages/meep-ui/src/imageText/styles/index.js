import transformColor from 'color';

import { PHONE_MEDIA } from 'constants/media';

export const overlayBackground = ({
  showOverlay,
  overlayBackgroundColor,
  position,
}) => {
  const defaultStyle = {
    background:
      showOverlay && overlayBackgroundColor
        ? transformColor(overlayBackgroundColor).alpha(0.5)
        : '',
  };

  switch (position) {
    case 'topleft':
      return {
        ...defaultStyle,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        textAlign: 'left',
      };
    case 'topMiddle':
      return {
        ...defaultStyle,
        alignItems: 'flex-start',
        justifyContent: 'center',
        textAlign: 'center',
      };
    case 'topright':
      return {
        ...defaultStyle,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        textAlign: 'right',
      };
    case 'middleleft':
      return {
        ...defaultStyle,
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'left',
      };
    case 'middle':
      return {
        ...defaultStyle,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      };
    case 'middleright':
      return {
        ...defaultStyle,
        alignItems: 'center',
        justifyContent: 'flex-end',
        textAlign: 'right',
      };
    case 'bottomleft':
      return {
        ...defaultStyle,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        textAlign: 'left',
      };
    case 'bottomMiddle':
      return {
        ...defaultStyle,
        alignItems: 'flex-end',
        justifyContent: 'center',
        textAlign: 'center',
      };
    case 'bottomright':
      return {
        ...defaultStyle,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        textAlign: 'right',
      };
    default:
      return {
        ...defaultStyle,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        textAlign: 'left',
      };
  }
};

export const headerStyle = (fontSize, bold) => ({
  fontSize: `${fontSize}px`,
  fontWeight: bold ? '600' : 'normal',
  [PHONE_MEDIA]: {
    fontSize: `${fontSize * 0.6 >= 12 ? fontSize * 0.6 : 12}px`,
  },
});

export const descriptionStyle = fontSize => ({
  fontSize: `${fontSize}px`,
  [PHONE_MEDIA]: {
    fontSize: `${fontSize * 0.6 >= 12 ? fontSize * 0.6 : 12}px`,
  },
});

export const buttonStyle = (fontSize, color) => ({
  fontSize: `${fontSize}px`,
  border: `1px solid ${color}`,
  ':hover': {
    background: color,
    color: '#ffffff',
  },
  [PHONE_MEDIA]: {
    fontSize: `${fontSize * 0.6 >= 12 ? fontSize * 0.6 : 12}px`,
  },
});
