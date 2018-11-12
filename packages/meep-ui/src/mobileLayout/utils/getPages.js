export default (fixedtop, secondtop, sidebar) => {
  const design =
    fixedtop?.menu.design || secondtop?.menu.design || sidebar?.menu.design;

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
            ].sort((a, b) => a.action < b.action),
          };
        }

        return {
          pages: [...pages, newPage],
          headerPages,
        };
      },
      { pages: [], headerPages: [] },
    ),
    design,
  };
};
