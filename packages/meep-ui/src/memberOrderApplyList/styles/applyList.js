import { PHONE_MEDIA } from 'constants/media';

export const root = {
  marginBottom: '80px',
  [PHONE_MEDIA]: {
    marginBottom: '40px',
  },
};

export const receiverInfo = {
  fontSize: '16px',
  lineHeight: '32px',
  marginBottom: '30px',
};

export const table = ({ borderColor }) => ({
  width: '100%',
  whiteSpace: 'nowrap',
  borderTop: `1px solid ${borderColor}`,
  borderBottom: `1px solid ${borderColor}`,
});

export const thead = {
  [PHONE_MEDIA]: {
    display: 'none',
  },
};

export const th = textAlign => ({
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '22px',
  padding: '17px 10px',
  textAlign,
});

export const tr = ({ borderColor }) => ({
  borderTop: `1px solid ${borderColor}`,
});

export const td = textAlign => ({
  fontSize: '14px',
  lineHeight: '24px',
  width: '20%',
  padding: '30px 10px',
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  wordBreak: 'break-all',
  textAlign,
  [PHONE_MEDIA]: {
    padding: '15px 5px',
  },
});

export const comment = {
  display: 'none',
  [PHONE_MEDIA]: {
    display: 'inline-block',
  },
};

export const image = {
  borderRadius: '8px',
  border: '1px solid #979797',
  [PHONE_MEDIA]: {
    width: '60px',
    height: '60px',
  },
};

export const statusText = status => ({
  [PHONE_MEDIA]: {
    textAlign: status === 2 ? 'left' : 'center',
  },
});

export const tag = ({ color, backgroundColor }) => ({
  color,
  backgroundColor,
  padding: '5px 10px',
  fontSize: '14px',
  lineHeight: '20px',
  display: 'inline-block',
  whiteSpace: 'nowrap',
});
