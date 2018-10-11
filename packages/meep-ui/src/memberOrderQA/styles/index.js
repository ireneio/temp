export const mobileWidth = '(max-width: 768px)';

export const root = {
  width: '100%',
  maxWidth: '840px',
  margin: 'auto',
  fontSize: '16px',
};

export const orderNo = {
  lineHeight: '30px',
  marginBottom: '25px',
  [`@media ${mobileWidth}`]: {
    marginBottom: 0,
  },
};

export const content = {
  padding: '30px',
  [`@media ${mobileWidth}`]: {
    padding: '15px',
  },
};

export const qa = {
  lineHeight: '24px',
  padding: '0 10px',
  borderBottom: 'solid 1px #e0e0e0',
  marginBottom: '40px',
  [`@media ${mobileWidth}`]: {
    padding: 0,
    borderBottom: 'none',
    borderTop: 'solid 1px #e0e0e0',
  },
};

export const textarea = {
  borderRadius: '0px',
  marginTop: '10px',
};

export const button = colors => ({
  height: '50px',
  width: '100%',
  color: colors[3],
  borderColor: colors[3],
  backgroundColor: 'transparent',
});
