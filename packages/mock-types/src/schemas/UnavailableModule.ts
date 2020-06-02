// import
import gql from 'graphql-tag';
import uuid from 'uuid/v4';

import mock from '../mock';

// graphql typescript
import { UnavailableModuleMock } from './__generated__/UnavailableModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment UnavailableModuleMock on UnavailableModule {
    id
  }
`;

export default mock.add<UnavailableModuleMock>('UnavailableModule', [
  () =>
    ({
      __typename: 'UnavailableModule',
      id: uuid(),
    } as UnavailableModuleMock),
]);
