import { PHONE_MEDIA } from 'constants/media';

export const root = {
  marginBottom: '50px',
};

export const products = background => ({
  textAlign: 'center',
  boxSizing: 'border-box',
  borderRadius: '1px',
  padding: '30px 30px 0',
  letterSpacing: '0.7px',
  color: '#666',
  minHeight: '190px',
  background,
  [PHONE_MEDIA]: {
    padding: '20px 10px 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export const flexCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const header = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  fontSize: '18px',
  marginBottom: '20px',
  paddingLeft: '15px',
  minHeight: '27px',
};

export const sort = {
  cursor: 'pointer',
  width: '25px',
};

export const loading = colors => ({
  fontSize: 60,
  color: colors[2],
});
