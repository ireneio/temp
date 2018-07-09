export const root = alignment => {
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

export const facebookWall = height => ({
  width: '100%',
  maxWidth: '500px',
  height,
  border: '0px',
});
