export const root = direction => {
  const defaultStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    verticalAlign: 'top',
  };

  switch (direction) {
    case 'left':
      return {
        ...defaultStyle,
        flexDirection: 'row',
      };

    case 'right':
      return {
        ...defaultStyle,
        flexDirection: 'row-reverse',
      };

    case 'upon':
      return {
        ...defaultStyle,
        flexDirection: 'column',
      };

    case 'below':
      return {
        ...defaultStyle,
        flexDirection: 'column-reverse',
      };

    default:
      return defaultStyle;
  }
};

export const addStyle = direction => {
  switch (direction) {
    case 'left':
      return {
        margin: '0px 5px 0px 0px',
      };

    case 'right':
      return {
        margin: '0px 0px 0px 5px',
      };

    case 'upon':
      return {
        margin: '0px 0px 5px 0px',
      };

    case 'below':
      return {
        margin: '5px 0px 0px 0px',
      };

    default:
      return {};
  }
};

export const icon = {
  width: '24px',
  height: '24px',
};

export const image = url => ({
  width: '32px',
  height: '32px',
  backgroundImage: `url(${`//${url}`}?w=32)`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
});
