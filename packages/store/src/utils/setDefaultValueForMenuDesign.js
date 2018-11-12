export const handlePages = (pages, removeIcon = false) =>
  (pages || []).map(
    ({ pages: subPages, newWindow, params, icon, ...page }) => ({
      ...page,
      newWindow: !!newWindow,
      params: params || {},
      pages: handlePages(subPages),
      icon:
        removeIcon && !icon?.use
          ? null
          : {
              direction: icon?.direction || 'right',
              font: icon?.font || null,
              image: icon?.image || null,
            },
    }),
  );

export default ({ design, pages, ...menu }) => ({
  ...menu,
  pages: handlePages(pages),
  design: {
    ...design,
    showLogo: design?.showLogo || false,
    showSearchbar: design?.showSearchbar || false,
    expandSubItem: design?.expandSubItem || false,
    alignment: design?.alignment || 'right',
    pattern: design?.pattern || 0,
    opacity: design?.opacity || 1,
    normal: design?.normal || {},
    active: design?.active || {},
    hover: design?.hover || {},
    fontSize: design?.fontSize || 14,
    font: design?.font || '黑體',
    width: design?.width || 0,
    height: design?.height || 60,
  },
});
