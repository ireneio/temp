// import
import mock from '../mock';

// graphql typescript
import { menuPageParamsObjectTypeMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<menuPageParamsObjectTypeMockFragment>(
  'MenuPageParamsObjectType',
  [
    () => ({
      __typename: 'MenuPageParamsObjectType',
      displayMemberGroup: true,
      pageId: 'home',
      path: '',
      url: '/test',
      from: 0,
      size: 0,
      // eslint-disable-next-line @typescript-eslint/camelcase
      query_string: 'search',
      sort: null,
      price: null,
      tags: null,
    }),
  ],
);
