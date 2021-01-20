// import
import mock from '../mock';

// graphql typescript
import { tagListMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<tagListMockFragment>('TagList', [
  () => ({
    __typename: 'TagList',
    data: [{ __typename: 'Tag', tags: ['tag', 'tag-a', 'tag-b'] }],
  }),
]);
