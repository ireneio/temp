import transformColor from 'color';

export const collapse = {
  background: 'initial',
};

export const panel = colors => ({
  background: transformColor(colors[5]).alpha(0.15),
  color: colors[3],
  margin: '15px 0px 0px',
  border: '0px',
  borderRadius: '2px',
  overflow: 'hidden',
});
