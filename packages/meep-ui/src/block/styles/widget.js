export const root = ({ componentWidth, padding, level }, hasVisibleModule) => ({
  ...(level === 1
    ? {
        display: 'flex',
        flexWrap: 'wrap',
        flexShrink: 0,
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        padding: hasVisibleModule ? `${padding / 2}px` : '0px',
        minWidth: `${componentWidth}px`,
      }
    : {
        display: level % 2 ? 'flex' : 'block',
        flex: `1 1 ${componentWidth}px`,
        justifyContent: 'center',
        width: '100%',
        padding: hasVisibleModule ? `${padding / 2}px` : '0px',
      }),
});
