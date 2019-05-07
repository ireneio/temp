// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { AuthorityMock } from './__generated__/AuthorityMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment AuthorityMock on Authority {
    id
  }
`;

export default mock.add<AuthorityMock>('Authority', [
  () => ({
    __typename: 'Authority',
    id: 'helper-permission',
  }),
]);
