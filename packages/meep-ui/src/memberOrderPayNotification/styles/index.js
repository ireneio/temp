import { PHONE_MEDIA } from 'constants/media';

export const root = {
  display: 'flex',
  justifyContent: 'center',
};

export const container = {
  width: '100%',
  maxWidth: '840px',
  padding: '56px 30px',
  [PHONE_MEDIA]: {
    padding: '20px 15px',
  },
};

export const banner = {
  fontSize: '16px',
  lineHeight: '15px',
};

export const textarea = {
  marginTop: '30px',
};

export const footer = {
  marginTop: '25px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const button = ({ color }) => ({
  height: '45px',
  width: '100px',
  color,
  borderColor: color,
  backgroundColor: 'transparent',
});

export const modal = {
  lineHeight: 2.5,
  fontSize: '15px',
};
