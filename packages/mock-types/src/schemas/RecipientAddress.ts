// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { RecipientAddressMock } from './__generated__/RecipientAddressMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment RecipientAddressMock on RecipientAddress {
    name
    mobile
    zipCode
    yahooCodeCountry
    yahooCodeCity
    yahooCodeCounty
    street
  }
`;

// TODO: remove
export default mock.add<RecipientAddressMock>('RecipientAddress', [
  () => ({
    __typename: 'RecipientAddress',
    zipCode: '111',
    name: 'name',
    mobile: '0912345678',
    yahooCodeCountry: 'Taiwan',
    yahooCodeCity: '臺北市',
    yahooCodeCounty: '信義區',
    street: 'xxx 街',
  }),
]);
