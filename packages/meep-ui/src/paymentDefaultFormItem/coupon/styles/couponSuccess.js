import transformColor from 'color';

export const root = colors => ({
  margin: '13px 0px 0px',
  padding: '14px 16px',
  background: transformColor(colors[5]).alpha(0.15),
  color: colors[2],
  borderRadius: '2px',
});
