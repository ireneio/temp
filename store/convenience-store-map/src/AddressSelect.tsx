// typescript import
import { QueryResult } from '@apollo/react-common';
import { CascaderOptionType } from 'antd/lib/cascader';

import { I18nPropsType } from '@store/utils/lib/i18n';

// import
import React from 'react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';
import { Spin, Icon, Cascader, Select } from 'antd';

import { withTranslation } from '@store/utils/lib/i18n';

import styles from './styles/addressSelect.less';

// graphql typescript
import {
  getValidatedConvenienceStoreCities,
  getValidatedConvenienceStoreCities_validatedConvenienceStoreCities as getValidatedConvenienceStoreCitiesValidatedConvenienceStoreCities,
  getValidatedConvenienceStoreCities_validatedConvenienceStoreCities_children as getValidatedConvenienceStoreCitiesValidatedConvenienceStoreCitiesChildren,
} from './__generated__/getValidatedConvenienceStoreCities';
import { getValidatedConvenienceStoreAreas } from './__generated__/getValidatedConvenienceStoreAreas';

// typescript definition
interface PropsType
  extends I18nPropsType,
    Pick<QueryResult<getValidatedConvenienceStoreAreas>, 'client'> {
  shipmentType: string;
  storeTypes: string[];
  cities: getValidatedConvenienceStoreCitiesValidatedConvenienceStoreCities[];
  filterConvenienceStores: (input: {}) => void;
}

// definition
const { Option } = Select;

// definition
class AddressSelect extends React.PureComponent<PropsType> {
  private titleRef = React.createRef<HTMLDivElement>();

  public state = {
    selectedAddress: { cityId: '', areaId: '', street: undefined },
    streets: [],
    width: 0,
  };

  public componentDidMount(): void {
    this.setState({ width: this.titleRef.current?.offsetWidth });
  }

  private getAreas = async (
    selectedOptions: CascaderOptionType[],
  ): Promise<void> => {
    const { client, shipmentType, storeTypes } = this.props;

    const selectedOption = selectedOptions[selectedOptions.length - 1];

    if (selectedOption.loading || !selectedOption.value) return;

    selectedOption.loading = true;

    const { data } = await client.query({
      query: gql`
        query getValidatedConvenienceStoreAreas(
          $input: ValidatedConvenienceStoreAreasFilterInput!
        ) {
          validatedConvenienceStoreAreas(input: $input) {
            id
            name {
              zh_TW
            }
          }
        }
      `,
      variables: {
        input: {
          shipmentType,
          storeTypes,
          cityId: selectedOption.value,
        },
      },
    });

    client.writeFragment({
      id: selectedOption.value,
      fragment: gql`
        fragment areas on City {
          areas {
            id
            name {
              zh_TW
            }
            streets
          }
        }
      `,
      data: {
        __typename: 'City',
        areas:
          data?.validatedConvenienceStoreAreas.map(
            (
              area: getValidatedConvenienceStoreCitiesValidatedConvenienceStoreCitiesChildren,
            ) => ({ ...area, streets: [] }),
          ) || [],
      },
    });
  };

  private getStreets = async (
    value: string[],
    selectedOptions: CascaderOptionType[],
  ): Promise<void> => {
    const {
      client,
      shipmentType,
      storeTypes,
      filterConvenienceStores,
    } = this.props;
    const {
      selectedAddress: { cityId, areaId },
    } = this.state;

    if (!value || (value[0] === cityId && value[1] === areaId)) return;

    if (value.length === 1) {
      this.setState({
        selectedAddress: { cityId: value[0] },
        streets: [],
      });

      filterConvenienceStores({ cityId: value[0] });
    } else if (value.length === 2) {
      if (!selectedOptions[1].streets.length) {
        const { data } = await client.query({
          query: gql`
            query getValidatedConvenienceStoreStreets(
              $input: ValidatedConvenienceStoreStreetsFilterInput!
            ) {
              validatedConvenienceStoreStreets(input: $input)
            }
          `,
          variables: {
            input: {
              shipmentType,
              storeTypes,
              areaId: value[1],
            },
          },
        });

        client.writeFragment({
          id: value[1],
          fragment: gql`
            fragment streets on Area {
              streets
            }
          `,
          data: {
            __typename: 'Area',
            streets: data?.validatedConvenienceStoreStreets || [],
          },
        });

        this.setState({
          selectedAddress: { cityId: value[0], areaId: value[1] },
          streets: data?.validatedConvenienceStoreStreets || [],
        });
      } else {
        this.setState({
          selectedAddress: { cityId: value[0], areaId: value[1] },
          streets: selectedOptions[1].streets,
        });
      }

      filterConvenienceStores({ cityId: value[0], areaId: value[1] });
    }
  };

  private filterConvenienceStores = (value: string): void => {
    const { filterConvenienceStores } = this.props;
    const {
      selectedAddress: { cityId, areaId },
    } = this.state;

    this.setState({ selectedAddress: { cityId, areaId, street: value } });
    filterConvenienceStores({ cityId, areaId, street: value });
  };

  public render(): React.ReactNode {
    const {
      // HOC
      t,

      // props
      cities,
    } = this.props;
    const { streets, selectedAddress, width } = this.state;

    return (
      <div className={styles.root}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .${styles.popupClassName} ul {
                width: ${width ? `${width / 2}px` : 'auto'};
              }
            `,
          }}
        />
        <div ref={this.titleRef}>{t('pleaseSelectCityArea')}</div>
        <Cascader
          popupClassName={styles.popupClassName}
          placeholder={t('pleaseSelectCityArea')}
          options={cities.map(city => ({
            value: city.id,
            label: city.name.zh_TW,
            isLeaf: false,
            children:
              !city.children || city.children.length === 0
                ? undefined
                : city.children.map(area => ({
                    value: area.id,
                    label: area.name.zh_TW,
                    streets: area.streets,
                  })),
          }))}
          loadData={this.getAreas}
          onChange={this.getStreets}
          changeOnSelect
        />
        <Select
          showSearch
          suffixIcon={<Icon type="search" />}
          placeholder={t('pleaseSelectStreet')}
          notFoundContent={
            <div className={styles.notFoundContent}>
              <Icon type="file-search" />
              <div>{t('noStreet')}</div>
            </div>
          }
          disabled={!streets || !streets.length}
          value={selectedAddress.street}
          onChange={this.filterConvenienceStores}
        >
          {streets.map(street => (
            <Option key={street} value={street}>
              {street}
            </Option>
          ))}
        </Select>
      </div>
    );
  }
}

const EnhancedAddressSelect = withTranslation('convenience-store-map')(
  AddressSelect,
);

export default React.memo(
  ({
    shipmentType,
    storeTypes,
    filterConvenienceStores,
  }: {
    shipmentType: string;
    storeTypes: string[];
  } & Pick<PropsType, 'filterConvenienceStores'>) => (
    <Query<getValidatedConvenienceStoreCities>
      query={gql`
        query getValidatedConvenienceStoreCities(
          $input: ValidatedConvenienceStoreCitiesFilterInput!
        ) {
          validatedConvenienceStoreCities(input: $input) {
            id
            name {
              zh_TW
            }

            children: areas @client {
              id
              name {
                zh_TW
              }
              streets
            }
          }
        }
      `}
      variables={{
        input: {
          shipmentType,
          storeTypes,
        },
      }}
    >
      {({ loading, error, data, client }) => {
        if (loading || error || !data)
          return <Spin indicator={<Icon type="loading" spin />} />;

        const { validatedConvenienceStoreCities } = data;

        return (
          <EnhancedAddressSelect
            client={client}
            shipmentType={shipmentType}
            storeTypes={storeTypes}
            cities={validatedConvenienceStoreCities}
            filterConvenienceStores={filterConvenienceStores}
          />
        );
      }}
    </Query>
  ),
);
