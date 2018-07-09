export const root = (padding, maxWidth) => ({
  display: 'flex',
  margin: '0px auto',
  padding: padding / 2,
  width: '100%',
  maxWidth: !maxWidth ? '100%' : `${maxWidth}px`,
  flexWrap: 'wrap',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
});
