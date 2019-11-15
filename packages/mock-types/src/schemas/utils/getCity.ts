// import
import getArea from './getArea';

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
      areas: ReturnType<typeof getArea>[];
    }
  | undefined =>
  [
    {
      __typename: 'City',
      id: '804df1c0-b99d-482b-9014-1fa49dc9b428',
      name: {
        __typename: 'Locale',
        /* eslint-disable @typescript-eslint/camelcase */
        zh_TW: '基隆市',
        en_US: 'Keelung City',
        ja_JP: null,
        vi_VN: null,
        /* eslint-enable @typescript-eslint/camelcase */
      },
      areas: [
        getArea('4d0e80e7-23da-43d5-856d-50dce23bff89'),
        getArea('131bbd68-b641-4e68-b623-bc3040b24cc0'),
      ],
    },
    {
      __typename: 'City',
      id: '3b6cbd75-b341-4824-bbc7-37e5569cb07b',
      name: {
        __typename: 'Locale',
        /* eslint-disable @typescript-eslint/camelcase */
        zh_TW: '臺北市',
        en_US: 'Taipei City',
        ja_JP: null,
        vi_VN: null,
        /* eslint-enable @typescript-eslint/camelcase */
      },
      areas: [getArea('a2033e99-4f52-4468-b855-c8c8911d638f')],
    },
  ].find(({ id: cityId }) => cityId === id);
