// import
import mock from '../mock';

// graphql typescript
import { addressMockFragment } from './gqls/__generated__/addressMockFragment';

// definition
export default mock.add<addressMockFragment>('Address', [
  () => ({
    __typename: 'Address',
    country: {
      __typename: 'Country',
      id: 'a1e4aa6c-5a52-408a-9ede-471b10b1e265',
    },
    city: {
      __typename: 'City',
      id: '804df1c0-b99d-482b-9014-1fa49dc9b428',
    },
    area: {
      __typename: 'Area',
      id: '4d0e80e7-23da-43d5-856d-50dce23bff89',
    },
    street: 'xxx 街',
    zipCode: '199',
  }),
]);
