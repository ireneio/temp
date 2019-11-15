// import
import gql from 'graphql-tag';

import mock from '../mock';

import getCountry from './utils/getCountry';
import getCity from './utils/getCity';
import getArea from './utils/getArea';

// graphql typescript
import { RecipientAddressMock } from './__generated__/RecipientAddressMock';

// graphql import
import localeFragment from './fragments/locale';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment RecipientAddressMock on RecipientAddress {
    name
    mobile
    country {
      id
      name {
        ...localeFragment
      }
    }
    city {
      id
      name {
        ...localeFragment
      }
    }
    area {
      id
      name {
        ...localeFragment
      }
    }
    street
    zipCode
  }

  ${localeFragment}
`;

export default mock.add<RecipientAddressMock>('RecipientAddress', [
  () =>
    ({
      __typename: 'RecipientAddress',
      name: 'name',
      mobile: '0912345678',
      country: getCountry('a1e4aa6c-5a52-408a-9ede-471b10b1e265'),
      city: getCity('804df1c0-b99d-482b-9014-1fa49dc9b428'),
      area: getArea('4d0e80e7-23da-43d5-856d-50dce23bff89'),
      street: 'xxx 街',
      zipCode: (
        getArea('4d0e80e7-23da-43d5-856d-50dce23bff89') || {
          zipCodes: ['error'],
        }
      ).zipCodes[0],
    } as RecipientAddressMock),
]);
