import { PHONE_MEDIA } from 'constants/media';

export const root = {
  height: '100%',
  flexGrow: 1,
  maxHeight: 'calc(100% - 62px)',
  [PHONE_MEDIA]: {
    height: 'auto',
    flexGrow: 'initial',
  },
};
