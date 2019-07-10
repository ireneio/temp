// TODO: should remove
// typescript import
import { ContextType } from './constants';

// import
import { gql } from 'apollo-boost';

import { COUNTRIES } from './constants';

// graphql typescript
import { addUnknownCity } from './__generated__/addUnknownCity';
import { CityFilterInput, AreaFilterInput } from '../../../__generated__/store';

// definition
const requestCache: {
  [key: string]: string[];
} = {};

const getAreas = async (
  cityId: string,
  areaId: string | undefined,
  cache: ContextType['cache'],
): Promise<string[]> => {
  const url = `//street-name.meepstage.com/list/Taiwan/${cityId}`;
  const areasData =
    requestCache[url] ||
    (await fetch(url)
      .then(res => res.json() || [])
      .then(data => data || []));

  requestCache[url] = areasData;

  const fragment = {
    id: 'Taiwan',
    fragment: gql`
      fragment addUnknownCity on Country {
        cities {
          id
          name {
            zh_TW
            en_US
            ja_JP
            vi_VN
          }

          areas {
            id
            name {
              zh_TW
              en_US
              ja_JP
              vi_VN
            }
            zipCode
          }
        }
      }
    `,
  };
  const { cities, ...country }: addUnknownCity = cache.readFragment<
    addUnknownCity
  >(fragment) || {
    __typename: 'Country',
    cities: [],
  };
  const city = cities.find(({ id }) => id === cityId);

  if (areasData.length === 0) {
    if (cities.length !== 0) {
      if (!city)
        cities.push({
          __typename: 'City',
          id: cityId,
          name: {
            __typename: 'Locale',
            /* eslint-disable @typescript-eslint/camelcase */
            zh_TW: cityId,
            en_US: cityId,
            ja_JP: cityId,
            vi_VN: cityId,
            /* eslint-enable @typescript-eslint/camelcase */
          },
          areas: !areaId
            ? []
            : [
                {
                  __typename: 'Area',
                  id: areaId,
                  name: {
                    __typename: 'Locale',
                    /* eslint-disable @typescript-eslint/camelcase */
                    zh_TW: areaId,
                    en_US: areaId,
                    ja_JP: areaId,
                    vi_VN: areaId,
                    /* eslint-enable @typescript-eslint/camelcase */
                  },
                  zipCode: null,
                },
              ],
        });
      else if (areaId) {
        const area = city.areas.find(({ id }) => id === areaId);

        if (!area)
          city.areas.push({
            __typename: 'Area',
            id: areaId,
            name: {
              __typename: 'Locale',
              /* eslint-disable @typescript-eslint/camelcase */
              zh_TW: areaId,
              en_US: areaId,
              ja_JP: areaId,
              vi_VN: areaId,
              /* eslint-enable @typescript-eslint/camelcase */
            },
            zipCode: null,
          });
      }

      cache.writeFragment({
        ...fragment,
        data: {
          ...country,
          cities,
        },
      });
    }
  } else if (cities.length !== 0 && city && areaId) {
    const area = city.areas.find(({ id }) => id === areaId);

    if (!area)
      city.areas.push({
        __typename: 'Area',
        id: areaId,
        name: {
          __typename: 'Locale',
          /* eslint-disable @typescript-eslint/camelcase */
          zh_TW: areaId,
          en_US: areaId,
          ja_JP: areaId,
          vi_VN: areaId,
          /* eslint-enable @typescript-eslint/camelcase */
        },
        zipCode: null,
      });

    cache.writeFragment({
      ...fragment,
      data: {
        ...country,
        cities,
      },
    });
  }

  return areasData;
};

export const resolver = {
  Query: {
    addressService: () => ({
      __typename: 'AddressService',
    }),
  },
  AddressService: {
    countryId: async (
      _: unknown,
      {
        countryId,
        cityId,
        areaId,
      }: { countryId?: string; cityId?: string; areaId?: string },
      { cache }: ContextType,
    ) => {
      if (cityId) await getAreas(cityId, areaId, cache);

      if (countryId === '臺灣') return COUNTRIES[0].id;

      return (
        COUNTRIES.find(({ name }) =>
          Object.values(name).includes(countryId || ''),
        ) || { id: 'no-data' }
      ).id;
    },
    countries: () => COUNTRIES,
    cities: async (
      _: unknown,
      { input: { countryId } }: { input: CityFilterInput },
    ) => {
      if (![...Object.values(COUNTRIES[0].name), '臺灣'].includes(countryId))
        return [];

      const url = `//street-name.meepstage.com/list/${countryId}`;
      const citiesData =
        requestCache[url] ||
        (await fetch(url)
          .then(res => res.json() || [])
          .then(data => data || []));

      requestCache[url] = citiesData;

      return citiesData.map((cityName: string) => ({
        __typename: 'City',
        id: cityName,
        name: {
          __typename: 'Locale',
          /* eslint-disable @typescript-eslint/camelcase */
          zh_TW: cityName,
          en_US: cityName,
          ja_JP: cityName,
          vi_VN: cityName,
          /* eslint-enable @typescript-eslint/camelcase */
        },
        areas: [],
      }));
    },
    areas: async (
      _: unknown,
      { input: { cityId } }: { input: AreaFilterInput },
      { cache }: ContextType,
    ) =>
      Promise.all(
        (await getAreas(cityId, undefined, cache)).map(
          async (areaName: string) => {
            const areaUrl = `//street-name.meepstage.com/list/Taiwan/${cityId}/${areaName}`;
            const zipCode =
              requestCache[areaUrl] ||
              (await (async () => {
                const { zip } = await fetch(areaUrl).then(
                  res => res.json() || { zip: null },
                );

                requestCache[areaUrl] = zip;

                return zip;
              })());

            return {
              __typename: 'Area',
              id: areaName,
              name: {
                __typename: 'Locale',
                /* eslint-disable @typescript-eslint/camelcase */
                zh_TW: areaName,
                en_US: areaName,
                ja_JP: areaName,
                vi_VN: areaName,
                /* eslint-enable @typescript-eslint/camelcase */
              },
              zipCode,
            };
          },
        ),
      ),
  },
};
