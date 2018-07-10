export default function setDefaultValueForMenuDesign(_menus) {
  const menus = _menus.map(menu => {
    const design = {
      ...menu.design,
      alignment: (menu.design && menu.design.alignment) || 'right',
      showLogo: (menu.design && menu.design.showLogo) || false,
      height: (menu.design && menu.design.height) || 60,
      showSearchbar: (menu.design && menu.design.showSearchbar) || false,
      font: (menu.design && menu.design.font) || '標楷體',
      fontSize: (menu.design && menu.design.fontSize) || 14,
      opacity: (menu.design && menu.design.opacity) || 1,
      expandSubItem: (menu.design && menu.design.expandSubItem) || false,
      normal: (menu.design && menu.design.normal) || {
        color: null,
        background: null,
      },
      hover: (menu.design && menu.design.hover) || {
        color: null,
        background: null,
        borderColor: null,
      },
      active: (menu.design && menu.design.active) || {
        color: null,
        background: null,
        borderColor: null,
      },
      pattern: (menu.design && menu.design.pattern) || 0,
    };
    return {
      ...menu,
      design,
    };
  });
  return menus;
}
