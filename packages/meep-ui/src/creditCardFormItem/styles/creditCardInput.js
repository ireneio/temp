export const root = {
  display: 'flex',
  width: '100%',
};

export const input = index => ({
  width: 'calc(25% - 20px * 3 / 4)',
  margin: index < 3 ? '0px 20px 0px 0px' : '0px',
});
