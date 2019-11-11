// import
import { gql } from 'apollo-boost';

import mock from '../mock';

import getCountry from './utils/getCountry';

// graphql typescript
import { AddressServiceMock } from './__generated__/AddressServiceMock';

// graphql import
import localeFragment from './fragments/locale';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment AddressServiceMock on AddressService {
    countries {
      id
      name {
        ...localeFragment
      }
      cities {
        id
        name {
          ...localeFragment
        }
        areas {
          id
          name {
            ...localeFragment
          }
          zipCodes
        }
      }
    }
  }

  ${localeFragment}
`;

export default mock.add<AddressServiceMock>('AddressService', [
  () =>
    ({
      __typename: 'AddressService',
      countries: [
        getCountry('a1e4aa6c-5a52-408a-9ede-471b10b1e265'),
        getCountry('6cd709bd-3d05-47a4-b86d-b54e64af0538'),
      ],
    } as AddressServiceMock),
]);
