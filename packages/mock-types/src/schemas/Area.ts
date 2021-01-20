// typescript import
import { ContextType, fieldsType } from '../mock';

// import
import mock from '../mock';

// graphql typescript
import { areaMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
const areas: areaMockFragment[] = [
  {
    __typename: 'Area',
    id: '4d0e80e7-23da-43d5-856d-50dce23bff89',
    name: {
      __typename: 'Locale',
      // eslint-disable-next-line @typescript-eslint/camelcase
      zh_TW: '仁愛區',
    },
    zipCodes: ['199', '200'],
  },
  {
    __typename: 'Area',
    id: '131bbd68-b641-4e68-b623-bc3040b24cc0',
    name: {
      __typename: 'Locale',
      // eslint-disable-next-line @typescript-eslint/camelcase
      zh_TW: '信義區',
    },
    zipCodes: ['201'],
  },
  {
    __typename: 'Area',
    id: 'a2033e99-4f52-4468-b855-c8c8911d638f',
    name: {
      __typename: 'Locale',
      // eslint-disable-next-line @typescript-eslint/camelcase
      zh_TW: '中正區',
    },
    zipCodes: ['100'],
  },
];

const findArea = (id: string): areaMockFragment =>
  areas.find(({ id: areaId }) => areaId === id) || areas[0];

export default mock.add<areaMockFragment>('Area', [
  ({ id }: { id: string }, _: unknown, { isList }: ContextType) =>
    !isList
      ? findArea(id)
      : Object.keys(areas[0]).reduce(
          (result, key: keyof areaMockFragment) => ({
            ...result,
            [key]: ({ id: areaId }: { id: string }) => findArea(areaId)[key],
          }),
          {} as fieldsType<areaMockFragment, { id: string }>,
        ),
]);
