import { PHONE_MEDIA } from 'constants/media';

export const root = edition => ({
  padding: edition === 'detail' ? '0 20px' : '0',
  [PHONE_MEDIA]: {
    position: 'fixed',
    width: '100%',
    background: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '0',
    left: '0',
    right: '0',
    padding: '0',
    zIndex: '10',
  },
});

export const addItemButton = (edition, colors, background = true) => {
  if (edition === 'detail') {
    return {
      minWidth: '200px',
      height: '50px',
      marginRight: '15px',
      borderRadius: '5px',
      fontSize: '18px',
      letterSpacing: '1.5px',
      border: `2px solid ${colors[4]}`,
      background: background ? colors[4] : '#CCC',
      color: colors[2],
    };
  }
  return {
    width: '100%',
    height: '50px',
    border: 'none',
    borderRadius: '0 0 4px 4px',
    fontSize: '18px',
    letterSpacing: '1.5px',
    background: background ? colors[4] : '#CCC',
    color: colors[2],
  };
};

export const addWishButton = (colors, isInWishList) => ({
  minWidth: '50px',
  height: '50px',
  borderRadius: '5px',
  border: `1px solid ${isInWishList ? colors[4] : colors[5]}`,
  backgroundColor: '#f5f5f5',
  color: isInWishList ? colors[4] : colors[5],
});
