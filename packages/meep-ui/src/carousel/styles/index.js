import { PHONE_MEDIA } from 'constants/media';

export const root = contentWidth => ({
  width: `${contentWidth}%`,
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
});

export const imagesContainer = (amount, imageIndex) => ({
  display: 'flex',
  width: `${amount * 100}%`,
  transition: 'all 0.35s ease-in',
  transform: `translateX(-${(100 / amount) * imageIndex}%)`,
});

export const image = {
  flexGrow: 1,
  width: '100%',
};

export const control = position => {
  const defaultStyle = {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    width: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    color: '#ffffff',
    opacity: 0.5,
    cursor: 'pointer',
    ':hover': {
      opacity: 0.9,
    },
    [PHONE_MEDIA]: {
      display: 'none',
    },
  };

  switch (position) {
    case 'right':
      return {
        ...defaultStyle,
        right: '0px',
      };
    default:
      return {
        ...defaultStyle,
      };
  }
};

export const chevronIcon = {
  filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, .6))',
};

export const indicatorContainer = {
  position: 'absolute',
  bottom: '10px',
  left: '20%',
  width: '60%',
  textAlign: 'center',
};

export const indicatorCell = isCurrent => ({
  display: 'inline-block',
  width: '12px',
  height: '12px',
  margin: '5px 7px',
  cursor: 'pointer',
  backgroundColor: '#666',
  borderRadius: '50%',
  opacity: isCurrent ? 1 : 0.5,
  ':hover': {
    opacity: 1,
  },
  [PHONE_MEDIA]: {
    width: '8px',
    height: '8px',
    margin: '2px 5px',
  },
});
