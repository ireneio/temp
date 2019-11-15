// import
import getCity from './getCity';

// definition
export default (
  id: string,
):
  | {
      __typename: string;
      id: string;
      name: {
        __typename: string;
        zh_TW: string | null;
        en_US: string | null;
        ja_JP: string | null;
        vi_VN: string | null;
      };
      cities: ReturnType<typeof getCity>[];
    }
  | undefined =>
  [
    {
      __typename: 'Country',
      id: 'a1e4aa6c-5a52-408a-9ede-471b10b1e265',
      name: {
        __typename: 'Locale',
        /* eslint-disable @typescript-eslint/camelcase */
        zh_TW: '臺灣',
        en_US: 'Taiwan',
        ja_JP: '台湾',
        vi_VN: 'Đài Loan',
        /* eslint-enable @typescript-eslint/camelcase */
      },
      cities: [
        getCity('804df1c0-b99d-482b-9014-1fa49dc9b428'),
        getCity('3b6cbd75-b341-4824-bbc7-37e5569cb07b'),
      ],
    },
    {
      __typename: 'Country',
      id: '6cd709bd-3d05-47a4-b86d-b54e64af0538',
      name: {
        __typename: 'Locale',
        /* eslint-disable @typescript-eslint/camelcase */
        zh_TW: '日本',
        en_US: 'Japan',
        ja_JP: '日本',
        vi_VN: 'Nhật Bản',
        /* eslint-enable @typescript-eslint/camelcase */
      },
      cities: [],
    },
  ].find(({ id: countryId }) => countryId === id);
