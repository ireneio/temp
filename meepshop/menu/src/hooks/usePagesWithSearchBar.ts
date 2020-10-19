// import
import { useMemo } from 'react';

import { ACION_TYPES } from '../constants';

// graphql typescript
import {
  DefaultIconEnum,
  ImagePositionEnum,
} from '../../../../__generated__/meepshop';
import { menuFragment_menu_pages as menuFragmentMenuPages } from '../gqls/__generated__/menuFragment';
import { usePagesWithSearchBarFragment as usePagesWithSearchBarFragmentType } from '../gqls/__generated__/usePagesWithSearchBarFragment';

// definition
export default (
  design: usePagesWithSearchBarFragmentType | null,
): menuFragmentMenuPages[] =>
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
