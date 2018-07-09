export const root = paddingLeft => ({
  paddingLeft,
});

export const item = fontBold => ({
  padding: '5px 25px 5px 25px',
  cursor: 'pointer',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  fontWeight: fontBold ? 'bold' : 'unset',
});

export const expandIcon = {
  paddingRight: '6px',
};
