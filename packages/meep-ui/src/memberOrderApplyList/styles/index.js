import { PHONE_MEDIA } from 'constants/media';

export const root = {
  display: 'flex',
  justifyContent: 'center',
};

export const container = {
  width: '100%',
  maxWidth: '1120px',
  padding: '56px 30px',
  [PHONE_MEDIA]: {
    padding: '20px 15px',
  },
};

export const banners = ({ borderColor }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '16px',
  lineHeight: '22px',
  marginBottom: '25px',
  [PHONE_MEDIA]: {
    borderBottom: `1px solid ${borderColor}`,
  },
});

export const orderDate = {
  display: 'inline',
  [PHONE_MEDIA]: {
    display: 'none',
  },
};
