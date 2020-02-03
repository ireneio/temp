// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { TagListMock } from './__generated__/TagListMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment TagListMock on TagList {
    data {
      tags
    }
  }
`;

export default mock.add<TagListMock>('TagList', [
  () => ({
    __typename: 'TagList',
    data: [{ __typename: 'Tag', tags: ['tag', 'tag-a', 'tag-b'] }],
  }),
]);
