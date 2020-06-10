// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { AppLoginMock } from './__generated__/AppLoginMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment AppLoginMock on AppLogin {
    appId
  }
`;

export default mock.add<AppLoginMock>('AppLogin', [
  () =>
    ({
      __typename: 'AppLogin',
      appId: '562977637396844',
    } as AppLoginMock),
]);
