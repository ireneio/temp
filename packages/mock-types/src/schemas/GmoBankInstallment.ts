// import
import mock from '../mock';

// graphql typescript
import { gmoBankInstallmentMockFragment } from './gqls/__generated__/gmoBankInstallmentMockFragment';

// definition
export default mock.add<gmoBankInstallmentMockFragment>('GmoBankInstallment', [
  () => ({
    __typename: 'GmoBankInstallment',
    name: {
      __typename: 'Locale',
      // eslint-disable-next-line @typescript-eslint/camelcase
      zh_TW: 'GmoBank1',
    },
    code: '1',
    installments: [2, 4, 6],
  }),
  () => ({
    __typename: 'GmoBankInstallment',
    name: {
      __typename: 'Locale',
      // eslint-disable-next-line @typescript-eslint/camelcase
      zh_TW: 'GmoBank2',
    },
    code: null,
    installments: [2, 4, 6, 8],
  }),
]);
