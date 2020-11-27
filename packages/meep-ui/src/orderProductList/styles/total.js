import { PHONE_MEDIA } from 'constants/media';

export const root = colors => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexShrink: 0,
  width: '100%',
  padding: '32px 24px',
  color: colors[3],
  background: colors[0],
  boxShadow: '0 -2px 15px 0 rgba(102,102,102,0.15)',
  [PHONE_MEDIA]: {
    display: 'block',
    padding: '10px 10px 83px',
    borderTop: `1px solid ${colors[5]}`,
    boxShadow: 'none',
  },
});

export const buttonRoot = {
  minWidth: '150px',
  marginLeft: '100px',
  [PHONE_MEDIA]: {
    width: '100%',
    marginLeft: 0,
  },
};

export const button = colors => ({
  width: '100%',
  height: '40px',
  color: colors[2],
  background: colors[4],
  border: '0px',
});
