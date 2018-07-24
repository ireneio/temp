export const root = maxWidth => ({
  display: 'flex',
  margin: '0px auto',
  width: '100%',
  maxWidth: !maxWidth ? '100%' : `${maxWidth}px`,
  flexWrap: 'wrap',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
});

export const block = (width, componentWidth, padding) => ({
  display: 'flex',
  padding: `${padding / 2}px`,
  width: `${width || 100}%`,
  minWidth: `${componentWidth}px`,
  flexWrap: 'wrap',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
});
