import { PHONE_MEDIA } from 'constants/media';

export const root = colors => ({
  color: colors[3],
  maxWidth: '500px',
  wordWrap: 'break-word',
  hyphens: 'auto',
  textAlign: 'justify',
});

export const title = {
  marginBottom: 5,
  fontWeight: 'normal',
  fontSize: '20px',
  lineHeight: 1.5,
  borderTop: 0,
  padding: 0,
};

export const sku = {
  fontSize: '12px',
  marginBottom: 20,
  lineHeight: 1.5,
  opacity: 0.5,
};

export const description = {
  padding: 0,
};

export const activities = {
  display: 'flex',
  flexFlow: 'wrap',
  marginBottom: 10,
  marginTop: 20,
};

export const activityTag = colors => ({
  margin: '0 5px 5px 0',
  fontSize: '14px',
  padding: '5px 10px',
  borderRadius: 15,
  border: `1px solid ${colors[5]}`,
  color: colors[2],
});

export const price = {
  marginBottom: 20,
};

export const otherPrice = {
  marginRight: 15,
  fontSize: '13px',
  opacity: 0.5,
  [PHONE_MEDIA]: {
    display: 'block',
  },
};

export const strike = {
  fontSize: '15px',
  marginLeft: '5px',
};

export const thePrice = {
  fontSize: '28px',
  fontWeight: 300,
  marginRight: 6,
};
