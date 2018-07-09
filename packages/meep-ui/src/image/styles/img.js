export const root = alignment => {
  const defaultStyle = {
    display: 'flex',
    width: '100%',
    height: '100%',
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

export const wrapper = contentWidth => ({
  width: `${contentWidth}%`,
});

export const link = {
  width: '100%',
  height: '100%',
};

export const background = src => ({
  width: '100%',
  backgroundSize: 'cover',
  backgroundPosition: '50% 50%',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${src})`,
});

export const image = {
  width: '100%',
  height: '100%',
};
