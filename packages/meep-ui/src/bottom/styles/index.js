import { PHONE_MEDIA } from 'constants/media';

export const root = ({ color, background, fontSize }) => ({
  color,
  background,
  fontSize,
  width: '100%',
  padding: '20px 0',
  borderTop: '1px solid #ddd',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  [PHONE_MEDIA]: {
    display: 'none',
  },
});
