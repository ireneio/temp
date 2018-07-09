import { PHONE_MEDIA } from 'constants/media';

export const root = colors => ({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '0px 0px 40px',
  padding: '8px 0px',
  fontSize: '18px',
  letterSpacing: '0.7px',
  borderBottom: `1px solid ${colors[5]}`,
  [PHONE_MEDIA]: {
    display: 'none',
  },
});

export const storeName = {
  fontSize: '16px',
};

export const confirm = {
  margin: '0px 0px 0px 5px',
};
