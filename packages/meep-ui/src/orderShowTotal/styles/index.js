import { PHONE_MEDIA } from 'constants/media';

export const root = {
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  [PHONE_MEDIA]: {
    minWidth: 'initial',
    maxWidth: 'initial',
    width: '100%',
    padding: '10px',
  },
};

export const item = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '5px 0px',
};

export const total = {
  padding: '15px 0px 5px',
  fontSize: '18px',
};

export const totalPrice = {
  fontSize: '20px',
  fontWeight: 'bold',
};
