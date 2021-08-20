import { useQuery } from '@apollo/react-hooks';

import { getTemplatesMenus } from '../gqls/useTemplatesMenus';

export default page => {
  const { data } = useQuery(getTemplatesMenus);

  if (!data) return null;

  return {
    ...page,
    fixedtop: {
      ...page.fixedtop,
      menu: data.viewer.store.fixedtop,
    },
    secondtop: {
      ...page.secondtop,
      menu: data.viewer.store.secondtop,
    },
    sidebar: {
      ...page.sidebar,
      menu: data.viewer.store.sidebar,
    },
    fixedbottom: {
      ...page.fixedbottom,
      menu: data.viewer.store.fixedbottom,
    },
  };
};
