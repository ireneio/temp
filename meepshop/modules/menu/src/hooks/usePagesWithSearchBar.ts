// import
import { useMemo } from 'react';

import { ACION_TYPES } from '../constants';

// graphql typescript
import {
  DefaultIconEnum,
  ImagePositionEnum,
  menuMenuModuleFragment_menu_pages as menuMenuModuleFragmentMenuPages,
  usePagesWithSearchBarFragment as usePagesWithSearchBarFragmentType,
} from '@meepshop/types/gqls/meepshop';

// definition
export default (
  design: usePagesWithSearchBarFragmentType | null,
): menuMenuModuleFragmentMenuPages[] =>
  useMemo(
    () =>
      !design?.showSearchbar
        ? []
        : [
            {
              __typename: 'MenuPageObjectType',
              id: 'search',
              action: ACION_TYPES.indexOf('SEARCH_BAR'),
              image: {
                __typename: 'DefaultIcon',
                icon: 'SEARCH' as DefaultIconEnum,
              },
              imagePosition: 'LEFT' as ImagePositionEnum,
              newWindow: false,
              title: null,
              params: null,
              pages: null,
            },
          ],
    [design],
  );
