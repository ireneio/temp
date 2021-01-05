// import
import mock from '../mock';

// graphql typescript
import { addressServiceMockFragment } from './gqls/__generated__/addressServiceMockFragment';

// definition
export default mock.add<addressServiceMockFragment>('AddressService', [
  () => ({
    __typename: 'AddressService',
    countries: [
      {
        __typename: 'Country',
        id: 'a1e4aa6c-5a52-408a-9ede-471b10b1e265',
      },
      {
        __typename: 'Country',
        id: '6cd709bd-3d05-47a4-b86d-b54e64af0538',
      },
    ],
  }),
]);
