import { PHONE_MEDIA } from 'constants/media';

export const root = alignment => {
  // eslint-disable-line consistent-return
  const defaultStyle = {
    display: 'flex',
    width: '100%',
  };

  switch (alignment) {
    case 'left':
      return {
        ...defaultStyle,
        justifyContent: 'flex-start',
      };

    case 'right':
      return {
        ...defaultStyle,
        justifyContent: 'flex-end',
      };

    default:
      return {
        ...defaultStyle,
        justifyContent: 'center',
      };
  }
};

export const divider = (background, width, height, borderRadius) => ({
  background,
  width: `${width}%`,
  height: `${height}px`,
  borderRadius,
  [PHONE_MEDIA]: {
    height: `${height / 2}px`,
  },
});
