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

export const shareButton = ({ fill, backgroundColor }) => ({
  fill,
  backgroundColor,
  width: '28px',
  height: '28px',
  borderRadius: '5px',
  margin: '0 2px',
});
