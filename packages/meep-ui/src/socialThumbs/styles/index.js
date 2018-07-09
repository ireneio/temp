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

export const socialThumbs = {
  width: '101px',
  height: '20px',
  border: 'none',
};
