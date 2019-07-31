// graphql typescript
import { QueryResult } from 'react-apollo';
import { CascaderProps, CascaderOptionType } from 'antd/lib/cascader';

import { I18nPropsType } from '@store/utils/lib/i18n';
import { OmitType } from '@store/utils/lib/types';

// import
import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Cascader, Select } from 'antd';
import idx from 'idx';
import memoizeOne from 'memoize-one';

// graphql typescript
import {
  getCountriesAddress,
  getCountriesAddressVariables,
  getCountriesAddress_addressService_countries as getCountriesAddressAddressServiceCountries,
} from './__generated__/getCountriesAddress';
import {
  getCitiesAddress,
  getCitiesAddressVariables,
} from './__generated__/getCitiesAddress';
import {
  getAreasAddress,
  getAreasAddressVariables,
} from './__generated__/getAreasAddress';

// graphql import
import localeFragment from '@store/utils/lib/fragments/locale';

// typescript definition
interface PropsType
  extends OmitType<CascaderProps, 'options'>,
    Pick<QueryResult<getCountriesAddress>, 'client'>,
    Pick<I18nPropsType, 'i18n'> {
  lockedCountry?: string[];
  countries: getCountriesAddressAddressServiceCountries[];
}

interface OptionsType {
  __typename: string;
  id: string;
  name: {
    __typename: 'Locale';
    zh_TW: string | null;
    en_US: string | null;
    ja_JP: string | null;
    vi_VN: string | null;
  };
  children?: OptionsType[];
}

// definition
class AddressCascader extends React.PureComponent<PropsType> {
  private options: CascaderOptionType[] = [];

  public componentDidMount(): void {
    const { value } = this.props;

    if (value && value.length !== 0) this.findExist(value, this.options);
  }

  public componentDidUpdate(): void {
    const { value } = this.props;

    if (value && value.length !== 0) this.findExist(value, this.options);
  }

  private getOptions = (
    options: OptionsType[],
    i18n: PropsType['i18n'],
  ): CascaderOptionType[] =>
    options.map(({ __typename, id, name, children, ...data }) => ({
      ...data,
      __typename,
      value: id,
      label: name[i18n.language],
      isLeaf:
        (__typename === 'Country' && id !== 'Taiwan') || __typename === 'Area',
      children:
        !children || children.length === 0
          ? undefined
          : this.getOptions(children, i18n),
    }));

  private getCountriesOptions = memoizeOne(this.getOptions);

  private findExist = (value: string[], options: CascaderOptionType[]) => {
    const selectedItem = value[0];

    if (value.length === 1) return;

    const existOptions = options.find(
      ({ value: optionsValue }) => optionsValue === selectedItem,
    );

    if (!existOptions || !existOptions.children)
      this.loadData([
        {
          __typename: options[0].__typename,
          value: selectedItem,
        },
      ]);
    else this.findExist(value.slice(1), existOptions.children || []);
  };

  private loadData = async (selectedItems: CascaderOptionType[]) => {
    const { client } = this.props;
    const selectedItem = selectedItems[selectedItems.length - 1];

    if (selectedItem.loading || !selectedItem.value) return;

    selectedItem.loading = true;

    switch (selectedItem.__typename) {
      case 'Country': {
        const { data } = await client.query<
          getCitiesAddress,
          getCitiesAddressVariables
        >({
          query: gql`
            query getCitiesAddress($input: CityFilterInput!) {
              # TODO use real schema
              addressService @client {
                cities(input: $input) {
                  id
                  name {
                    ...localeFragment
                  }

                  areas {
                    id
                    name {
                      ...localeFragment
                    }
                    zipCode
                  }
                }
              }
            }

            ${localeFragment}
          `,
          variables: {
            input: {
              countryId: selectedItem.value,
            },
          },
        });

        client.writeFragment({
          id: selectedItem.value,
          fragment: gql`
            fragment addressCascaderCountryFragment on Country {
              cities {
                id
              }
            }
          `,
          data: {
            __typename: 'Country',
            cities: idx(data, _ => _.addressService.cities) || [],
          },
        });
        break;
      }

      case 'City': {
        const { data } = await client.query<
          getAreasAddress,
          getAreasAddressVariables
        >({
          query: gql`
            query getAreasAddress($input: AreaFilterInput!) {
              # TODO use real schema
              addressService @client {
                areas(input: $input) {
                  id
                  name {
                    ...localeFragment
                  }
                  zipCode
                }
              }
            }

            ${localeFragment}
          `,
          variables: {
            input: {
              cityId: selectedItem.value,
            },
          },
        });

        client.writeFragment({
          id: selectedItem.value,
          fragment: gql`
            fragment addressCascaderCityFragment on City {
              areas {
                id
              }
            }
          `,
          data: {
            __typename: 'City',
            areas: idx(data, _ => _.addressService.areas) || [],
          },
        });

        // TODO remove after using real schema
        const { value } = this.props;

        if (!value) return;

        client.query({
          query: gql`
            query unknownArea($countryId: ID, $cityId: ID, $areaId: ID) {
              addressService @client {
                # TODO remove
                countryId(
                  countryId: $countryId
                  cityId: $cityId
                  areaId: $areaId
                )
              }
            }
          `,
          variables: {
            countryId: value[0],
            cityId: value[1],
            areaId: value[2],
          },
        });
        break;
      }

      default:
        break;
    }
  };

  public render(): React.ReactNode {
    const { i18n, countries, lockedCountry, ...props } = this.props;

    delete props.client;
    this.options = this.getCountriesOptions(
      !lockedCountry || lockedCountry.length === 0
        ? countries
        : countries.filter(country =>
            // TODO: remove after using real schema
            lockedCountry.some(lock =>
              Object.values(country.name).includes(lock),
            ),
          ),
      i18n,
    );

    // TODO remove after using real schema
    if (!props.value) delete props.value;

    return (
      <Cascader {...props} options={this.options} loadData={this.loadData} />
    );
  }
}

export default React.forwardRef(({ // TODO remove value after using real schema
  value, ...props }: OmitType<PropsType, 'client' | 'countries'>, ref: React.Ref<Query<getCountriesAddress, getCountriesAddressVariables>>) => (
  <Query<getCountriesAddress, getCountriesAddressVariables>
    ref={ref}
    query={gql`
      query getCountriesAddress($countryId: ID) {
        # TODO use real schema
        addressService @client {
          # TODO remove
          countryId(countryId: $countryId)

          countries {
            id
            name {
              ...localeFragment
            }

            # TODO use client side schema
            children: cities {
              id
              name {
                ...localeFragment
              }

              children: areas {
                id
                name {
                  ...localeFragment
                }
                zipCode
              }
            }
          }
        }
      }

      ${localeFragment}
    `}
    variables={{
      // TODO remove after using real schema
      countryId: !value ? null : value[0],
    }}
  >
    {({ loading, error, data, client }) => {
      if (loading || error || !data) return <Select loading />;

      const {
        addressService: { countryId, countries },
      } = data;

      return (
        <AddressCascader
          {...props}
          value={
            // TODO remove after using real schema
            value && value[0] ? [countryId, ...value.slice(1)] : value
          }
          countries={countries}
          client={client}
        />
      );
    }}
  </Query>
));
