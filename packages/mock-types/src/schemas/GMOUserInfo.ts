// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { GMOUserInfoMock } from './__generated__/GMOUserInfoMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment GMOUserInfoMock on GMOUserInfo {
    exist
    cardNumberFront
    cardNumberLater
  }
`;

export default mock.add<GMOUserInfoMock>('GMOUserInfo', [
  () => ({
    __typename: 'GMOUserInfo',
    exist: true,
    cardNumberFront: '1234',
    cardNumberLater: '4321',
  }),
  () => ({
    __typename: 'GMOUserInfo',
    exist: false,
    cardNumberFront: '1234',
    cardNumberLater: '4321',
  }),
]);
