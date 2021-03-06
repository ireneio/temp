import { PHONE_MEDIA } from 'constants/media';

export const root = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  margin: '0px 0px 16px',
  [PHONE_MEDIA]: {
    display: 'block',
  },
};

export const label = colors => ({
  margin: '0 10px 6px 0',
  fontSize: '14px',
  wordBreak: 'break-all',
  lineHeight: '32px',
  color: colors[3],
});

export const itemWrapper = {
  display: 'flex',
  flexWrap: 'wrap',
};

export const item = (colors, selected) => ({
  backgroundColor: selected ? colors[4] : 'transparent',
  color: selected ? colors[2] : colors[3],
  border: `1px solid ${selected ? colors[4] : colors[5]}`,
  borderRadius: '5px',
  margin: '0 6px 6px 0',
  padding: '5px 15px',
  cursor: 'pointer',
  fontSize: '14px',
  lineHeight: '30px',
  wordBreak: 'break-all',
  transition: '0.3s',
  ':hover': {
    backgroundColor: colors[4],
    color: colors[2],
    border: `1px solid ${colors[4]}`,
  },
});

export const overStock = {
  fontSize: '14px',
  lineHeight: '32px',
  color: '#d0021b',
  margin: '0 6px 6px 0',
};

export const amountSelect = unfoldedVariants => ({
  width: unfoldedVariants ? 'auto' : '100%',
});
