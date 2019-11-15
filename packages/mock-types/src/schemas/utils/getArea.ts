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
      zipCodes: string[];
    }
  | undefined =>
  [
    {
      __typename: 'Area',
      id: '4d0e80e7-23da-43d5-856d-50dce23bff89',
      name: {
        __typename: 'Locale',
        /* eslint-disable @typescript-eslint/camelcase */
        zh_TW: '仁愛區',
        en_US: 'Ren’ai Dist.',
        ja_JP: null,
        vi_VN: null,
        /* eslint-enable @typescript-eslint/camelcase */
      },
      zipCodes: ['199', '200'],
    },
    {
      __typename: 'Area',
      id: '131bbd68-b641-4e68-b623-bc3040b24cc0',
      name: {
        __typename: 'Locale',
        /* eslint-disable @typescript-eslint/camelcase */
        zh_TW: '信義區',
        en_US: 'Xinyi Dist.',
        ja_JP: null,
        vi_VN: null,
        /* eslint-enable @typescript-eslint/camelcase */
      },
      zipCodes: ['201'],
    },
    {
      __typename: 'Area',
      id: 'a2033e99-4f52-4468-b855-c8c8911d638f',
      name: {
        __typename: 'Locale',
        /* eslint-disable @typescript-eslint/camelcase */
        zh_TW: '中正區',
        en_US: 'Zhongzheng Dist.',
        ja_JP: null,
        vi_VN: null,
        /* eslint-enable @typescript-eslint/camelcase */
      },
      zipCodes: ['100'],
    },
  ].find(({ id: areaId }) => areaId === id);
