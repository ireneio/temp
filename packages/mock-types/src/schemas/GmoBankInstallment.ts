// import
import gql from 'graphql-tag';

import mock from '../mock';

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
    name: {
      __typename: 'Locale',
      /* eslint-disable @typescript-eslint/camelcase */
      zh_TW: 'GmoBank1',
      en_US: 'GmoBank1',
      ja_JP: 'GmoBank1',
      vi_VN: 'GmoBank1',
      /* eslint-enable @typescript-eslint/camelcase */
    },
    code: '1',
    installments: [2, 4, 6],
  }),
  () => ({
    __typename: 'GmoBankInstallment',
    name: {
      __typename: 'Locale',
      /* eslint-disable @typescript-eslint/camelcase */
      zh_TW: 'GmoBank2',
      en_US: 'GmoBank2',
      ja_JP: 'GmoBank2',
      vi_VN: 'GmoBank2',
      /* eslint-enable @typescript-eslint/camelcase */
    },
    code: null,
    installments: [2, 4, 6, 8],
  }),
]);
