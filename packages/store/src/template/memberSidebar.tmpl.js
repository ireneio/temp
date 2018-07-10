import memberItems from './memberItems.tmpl';

const menu = {
  id: 'memberSidebar',
  menuType: 'memberSidebar',
  status: 1,
  title: {},
  design: {
    pattern: 0,
    showLogo: false,
    width: 300,
    paddingTop: 20,
    showSearchbar: false,
    fontSize: 13,
    font: null,
    opacity: 1,
    expandSubItem: false,
    normal: {
      color: null,
      background: null,
    },
    hover: {
      color: null,
      background: null,
      borderColor: null,
    },
    active: {
      color: null,
      background: null,
      borderColor: null,
    },
  },
  pages: memberItems,
};

const memberSidebar = {
  module: 'sidebar',
  width: 220,
  alignment: 'left',
  color: '',
  background: '',
  title: {},
  showTitle: false,
  menuId: 'memberSidebar',
  menu,
  fontSize: 18,
};

export default memberSidebar;
