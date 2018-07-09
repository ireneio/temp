import { PHONE_MEDIA } from 'constants/media';

export const root = (colors, expandSubItem) => ({
  position: 'absolute',
  right: expandSubItem ? '-23px' : '-5px',
  bottom: expandSubItem ? '-12px' : '5px',
  width: '20px',
  height: '20px',
  textAlign: 'center',
  color: colors[2],
  background: colors[4],
  boxShadow: `0px 1px 1px ${colors[5]}`,
  borderRadius: '10px',
  lineHeight: '20px',
  fontSize: '10px',
  zIndex: '1',
  [PHONE_MEDIA]: {
    right: '10px',
    top: '5px',
  },
});
