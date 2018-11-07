import transformColor from 'color';
import { PHONE_MEDIA } from 'constants/media';

export const root = {
  padding: '44px 70px',
  [PHONE_MEDIA]: {
    padding: '0 15px',
  },
};

export const header = colors => ({
  borderTop: `1px solid ${colors[5]}`,
  borderBottom: `1px solid ${colors[5]}`,
  padding: '15px 0',
  textAlign: 'center',
  fontSize: '20px',
  lineHeight: '28px',
  fontWeight: 500,
  letterSpacing: '1px',
  [PHONE_MEDIA]: {
    padding: '7px 0',
  },
});

export const content = colors => ({
  padding: '31px 71px 16px',
  color: colors[2],
  [PHONE_MEDIA]: {
    padding: '23px 10px 16px',
  },
});

export const frame = backgroundColor => ({
  width: 'fit-content',
  maxWidth: '70%',
  borderRadius: '6px',
  padding: '10px 15px 5px',
  boxSizing: 'border-box',
  fontSize: '14px',
  lineHeight: '22px',
  marginBottom: '16px',
  backgroundColor: transformColor(backgroundColor).alpha(0.1),
  [PHONE_MEDIA]: {
    marginBottom: '8px',
  },
});

export const flexRight = {
  display: 'flex',
  justifyContent: 'flex-end',
};

export const time = colors => ({
  fontSize: '12px',
  lineHeight: '20px',
  color: transformColor(colors[2]).alpha(0.5),
});

export const textarea = colors => ({
  width: 'calc(100% - 142px)',
  height: '115px',
  fontSize: '16px',
  lineHeight: '24px',
  marginLeft: '71px',
  padding: '20px 17px',
  boxSizing: 'border-box',
  resize: 'none',
  outline: 'none',
  border: `1px solid ${colors[5]}`,
  backgroundColor: 'transparent',
  [PHONE_MEDIA]: {
    width: '100%',
    height: '97px',
    margin: 0,
    padding: '8px 12px',
  },
});

export const footer = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '17px',
  [PHONE_MEDIA]: {
    marginTop: '24px',
  },
};

export const button = (colors, text) => ({
  width: 'fit-content',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${colors[3]}`,
  fontSize: '18px',
  lineHeight: '21px',
  letterSpacing: '0.7px',
  padding: '12px 31px',
  cursor: text ? 'pointer' : 'not-allowed',
  [PHONE_MEDIA]: {
    padding: '12px 50px',
  },
});
