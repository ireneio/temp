// import
import gql from 'graphql-tag';

import mock from '../mock';

import getLocale from './utils/getLocale';

// graphql typescript
import { GmoBankInstallmentMock } from './__generated__/GmoBankInstallmentMock';

// graphql import
import localeFragment from './fragments/locale';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment GmoBankInstallmentMock on GmoBankInstallment {
    name {
      ...localeFragment
    }
    code
    installments
  }
  ${localeFragment}
`;

export default mock.add<GmoBankInstallmentMock>('GmoBankInstallment', [
  () => ({
    __typename: 'GmoBankInstallment',
    name: getLocale('GmoBank1'),
    code: '1',
    installments: [2, 4, 6],
  }),
  () => ({
    __typename: 'GmoBankInstallment',
    name: getLocale('GmoBank2'),
    code: null,
    installments: [2, 4, 6, 8],
  }),
]);
