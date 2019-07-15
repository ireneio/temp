// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { AddressObjectTypeMock } from './__generated__/AddressObjectTypeMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment AddressObjectTypeMock on AddressObjectType {
    postalCode
    yahooCode {
      country
      city
      county
      street
    }
  }
`;

export default mock.add<AddressObjectTypeMock>('AddressObjectType', [
  () => ({
    __typename: 'AddressObjectType',
    postalCode: '111',
    yahooCode: {
      __typename: 'YahooCodesObjectType',
      country: 'Taiwan',
      city: '臺北市',
      county: '信義區',
      street: 'xxx 街',
    },
  }),
]);
