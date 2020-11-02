// import
import mock from '../mock';

// graphql typescript
import { tagListMockFragment } from './gqls/__generated__/tagListMockFragment';

// definition
export default mock.add<tagListMockFragment>('TagList', [
  () => ({
    __typename: 'TagList',
    data: [{ __typename: 'Tag', tags: ['tag', 'tag-a', 'tag-b'] }],
  }),
]);
