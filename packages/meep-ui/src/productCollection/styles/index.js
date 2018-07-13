export const root = align => ({
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
  ...(align === 'side'
    ? {
        padding: '30px 0 0 30px',
      }
    : {
        paddingTop: '30px',
      }),
});

export const imgWrapper = align => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  overflow: 'hidden',
  ...(align !== 'side'
    ? {
        paddingBottom: '30px',
        width: '100%',
      }
    : {
        width: '50%',
        padding: '0 30px 30px 0',
      }),
});

export const img = {
  width: '100%',
};
