export default (fixedtop, secondtop, sidebar) => {
  const design =
    fixedtop?.menu.design || secondtop?.menu.design || sidebar?.menu.design;
  const showSearchbar =
    fixedtop?.menu.design?.showSearchbar ||
    secondtop?.menu.design?.showSearchbar ||
    sidebar?.menu.design?.showSearchbar;

  return {
    ...[
      ...(fixedtop?.menu.pages || []),
      ...(secondtop?.menu.pages || []),
      ...(sidebar?.menu.pages || []),
    ].reduce(
      ({ pages, headerPages }, { id, action, ...page }) => {
        const newPage = {
          ...page,
          id,
          action,
        };

        delete newPage.icon;

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
                icon: {
                  font: action === 5 ? 'shopping_cart' : 'person',
                  direction: 'only',
                },
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
