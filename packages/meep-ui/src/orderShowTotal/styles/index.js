import { PHONE_MEDIA } from 'constants/media';

export const root = {
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  [PHONE_MEDIA]: {
    minWidth: 'initial',
    maxWidth: 'initial',
    width: '100%',
    marginBottom: '2px',
  },
};

export const item = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 0px 0px',
  [PHONE_MEDIA]: {
    padding: '0',
    marginBottom: '8px',
  },
};

export const total = {
  padding: '16px 0px 0px',
  fontSize: '18px',
  [PHONE_MEDIA]: {
    padding: '0',
    fontSize: '16px',
  },
};

export const totalPrice = {
  fontSize: '20px',
  fontWeight: 'bold',
  [PHONE_MEDIA]: {
    fontSize: '16px',
  },
};
