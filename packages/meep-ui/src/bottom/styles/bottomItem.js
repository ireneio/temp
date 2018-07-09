export const root = {
  minWidth: '140px',
  paddingLeft: '10px',
  borderLeft: '1px solid #ddd',
};

export const title = (fontSize, type) => ({
  cursor: 'pointer',
  fontWeight: type === 'subItem' ? 'unset' : 'bold',
  lineHeight: type === 'subItem' ? `${fontSize + 3}px` : `${fontSize + 9}px`,
});
