// typescript import
import { ContextType, fieldsType } from '../mock';

// import
import mock from '../mock';

// graphql typescript
import { cityMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
const cities: cityMockFragment[] = [
  {
    __typename: 'City',
    id: '804df1c0-b99d-482b-9014-1fa49dc9b428',
    name: {
      __typename: 'Locale',
      // eslint-disable-next-line @typescript-eslint/camelcase
      zh_TW: '基隆市',
    },
    areas: [
      {
        __typename: 'Area',
        id: '4d0e80e7-23da-43d5-856d-50dce23bff89',
      },
      {
        __typename: 'Area',
        id: '131bbd68-b641-4e68-b623-bc3040b24cc0',
      },
    ],
  },
  {
    __typename: 'City',
    id: '3b6cbd75-b341-4824-bbc7-37e5569cb07b',
    name: {
      __typename: 'Locale',
      // eslint-disable-next-line @typescript-eslint/camelcase
      zh_TW: '臺北市',
    },
    areas: [
      {
        __typename: 'Area',
        id: 'a2033e99-4f52-4468-b855-c8c8911d638f',
      },
    ],
  },
];

const findCity = (id: string): cityMockFragment =>
  cities.find(({ id: cityId }) => cityId === id) || cities[0];

export default mock.add<cityMockFragment>('City', [
  ({ id }: { id: string }, _: unknown, { isList }: ContextType) =>
    !isList
      ? findCity(id)
      : Object.keys(cities[0]).reduce(
          (result, key: keyof cityMockFragment) => ({
            ...result,
            [key]: ({ id: cityId }: { id: string }) => findCity(cityId)[key],
          }),
          {} as fieldsType<cityMockFragment, { id: string }>,
        ),
]);
