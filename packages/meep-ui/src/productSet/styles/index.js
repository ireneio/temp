import { PHONE_MEDIA } from 'constants/media';

export const root = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
};

export const half = {
  width: '50%',
  [PHONE_MEDIA]: {
    width: '100%',
  },
};

export const block = {
  width: '100%',
};
