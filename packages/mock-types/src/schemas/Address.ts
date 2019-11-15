// import
import gql from 'graphql-tag';

import mock from '../mock';

import getCountry from './utils/getCountry';
import getCity from './utils/getCity';
import getArea from './utils/getArea';

// graphql typescript
import { AddressMock } from './__generated__/AddressMock';

// graphql import
import localeFragment from './fragments/locale';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment AddressMock on Address {
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

export default mock.add<AddressMock>('Address', [
  () =>
    ({
      __typename: 'Address',
      country: getCountry('a1e4aa6c-5a52-408a-9ede-471b10b1e265'),
      city: getCity('804df1c0-b99d-482b-9014-1fa49dc9b428'),
      area: getArea('4d0e80e7-23da-43d5-856d-50dce23bff89'),
      street: 'xxx 街',
      zipCode: (
        getArea('4d0e80e7-23da-43d5-856d-50dce23bff89') || {
          zipCodes: ['error'],
        }
      ).zipCodes[0],
    } as AddressMock),
]);
