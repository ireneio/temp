import { PHONE_MEDIA } from 'constants/media';

export const root = colors => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexShrink: 0,
  width: '100%',
  padding: '30px',
  color: colors[2],
  background: colors[4],
  [PHONE_MEDIA]: {
    display: 'block',
    padding: '0px',
  },
});

export const buttonRoot = {
  minWidth: '150px',
  [PHONE_MEDIA]: {
    width: '100%',
  },
};

export const button = colors => ({
  width: '100%',
  height: '50px',
  color: colors[2],
  background: colors[1],
  border: '0px',
});
