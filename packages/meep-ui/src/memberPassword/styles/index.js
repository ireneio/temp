export const mobileWidth = '(max-width: 768px)';

export const root = {
  maxWidth: '500px',
  margin: 'auto',
  padding: '30px 0',
  [`@media ${mobileWidth}`]: {
    width: '100%',
    padding: '15px',
  },
};

export const button = colors => ({
  height: '45px',
  width: '100px',
  color: colors[3],
  borderColor: colors[3],
  backgroundColor: 'transparent',
});
