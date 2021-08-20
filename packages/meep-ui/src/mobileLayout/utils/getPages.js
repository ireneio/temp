import { NOTLOGIN } from 'constants/isLogin';

const mergePages = pages =>
  pages.reduce((result, page) => {
    const specificMenuItem = (page.pages || []).filter(({ action }) =>
      [5, 8].includes(action),
    );

    return [
      ...result,
      {
        ...page,
        pages: (page.pages || []).filter(
          ({ action }) => ![5, 8].includes(action),
        ),
      },
      ...specificMenuItem,
    ];
  }, []);

export default (
  fixedtop,
  secondtop,
  sidebar,
  { isLogin, hasStoreAppPlugin },
) => {
  const design =
    fixedtop?.menu?.design || secondtop?.menu?.design || sidebar?.menu?.design;
  const showSearchbar =
    fixedtop?.menu?.design?.showSearchbar ||
    secondtop?.menu?.design?.showSearchbar ||
    sidebar?.menu?.design?.showSearchbar;

  return {
    ...mergePages([
      ...(fixedtop?.menu?.pages || []),
      ...(secondtop?.menu?.pages || []),
      ...(sidebar?.menu?.pages || []),
    ]).reduce(
      ({ pages, headerPages }, { id, action, ...page }) => {
        const newPage = {
          ...page,
          id,
          action,
        };

        delete newPage.image;

        if (
          [...pages, ...headerPages].some(
            ({ id: newPageId }) => newPageId === id,
          )
        )
          return {
            pages,
            headerPages,
          };

        if ([5, 8].includes(action)) {
          if (
            headerPages.some(
              ({ action: headerPageAction }) => headerPageAction === action,
            )
          )
            return {
              pages,
              headerPages,
            };

          return {
            pages,
            headerPages: [
              ...headerPages,
              {
                ...newPage,
                image: {
                  __typename: 'DefaultIcon',
                  icon: action === 5 ? 'SHOPPING_CART' : 'PERSON',
                },
                imagePosition: 'ONLY',
                pages:
                  action === 5 || isLogin === NOTLOGIN
                    ? []
                    : [
                        {
                          id: 'ORDERS',
                          title: null,
                          action: 2,
                          params: { url: '/orders' },
                        },
                        {
                          id: 'SETTINGS',
                          title: null,
                          action: 2,
                          params: { url: '/settings' },
                        },
                        {
                          id: 'RECIPIENTS',
                          title: null,
                          action: 2,
                          params: { url: '/recipients' },
                        },
                        {
                          id: 'PASSWORD_CHANGE',
                          title: null,
                          action: 2,
                          params: { url: '/passwordChange' },
                        },
                        ...(!hasStoreAppPlugin('wishList')
                          ? []
                          : [
                              {
                                id: 'WISHLIST',
                                title: null,
                                action: 2,
                                params: { url: '/wishlist' },
                              },
                            ]),
                        {
                          id: 'REWARD_POINTS',
                          title: null,
                          action: 2,
                          params: { url: '/rewardPoints' },
                        },
                        {
                          id: 'LOGOUT',
                          title: null,
                          action: 'logout',
                        },
                      ],
              },
            ].sort((a, b) => b.action - a.action),
          };
        }

        return {
          pages: [...pages, newPage],
          headerPages,
        };
      },
      { pages: [], headerPages: [] },
    ),
    design: {
      ...design,
      showSearchbar,
    },
  };
};
