// typescript import
import { ConvenienceStorePropsType } from './constants';
import { ConvenienceStoresInputType } from './StoreList';

// import
import React from 'react';
import { useQuery } from '@apollo/client';
import {
  FileSearchOutlined,
  LoadingOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Spin, Cascader, Select } from 'antd';

import { useTranslation } from '@meepshop/locales';

import useGetAreas from './hooks/useGetAreas';
import useGetStreets from './hooks/useGetStreets';
import styles from './styles/addressSelect.less';

// graphql typescript
import {
  getValidatedConvenienceStoreCities as getValidatedConvenienceStoreCitiesType,
  getValidatedConvenienceStoreCitiesVariables as getValidatedConvenienceStoreCitiesVariablesType,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { getValidatedConvenienceStoreCities } from './gqls/addressSelect';

// typescript definition
interface PropsType extends Omit<ConvenienceStorePropsType, 'confirmStore'> {
  setVariables: (value: ConvenienceStoresInputType) => void;
  variables: ConvenienceStoresInputType;
}

// definition
const { Option } = Select;

export default React.memo(
  ({ shipmentType, storeTypes, variables, setVariables }: PropsType) => {
    const { t } = useTranslation('convenience-store-map');
    const { data } = useQuery<
      getValidatedConvenienceStoreCitiesType,
      getValidatedConvenienceStoreCitiesVariablesType
    >(getValidatedConvenienceStoreCities, {
      variables: {
        input: {
          shipmentType,
          storeTypes,
        },
      },
    });
    const getAreas = useGetAreas({ shipmentType, storeTypes });
    const { streets, getStreets } = useGetStreets({
      shipmentType,
      storeTypes,
      variables,
      setVariables,
    });

    if (!data) return <Spin indicator={<LoadingOutlined spin />} />;

    const cities = data.validatedConvenienceStoreCities;

    return (
      <div className={styles.root}>
        <div>{t('pleaseSelectCityArea')}</div>
        <Cascader
          popupClassName={styles.popupClassName}
          placeholder={t('pleaseSelectCityArea')}
          options={cities.map(city => ({
            value: city.id,
            label: city.name.zh_TW,
            isLeaf: false,
            children: !city.children.length
              ? undefined
              : city.children.map(area => ({
                  value: area.id,
                  label: area.name.zh_TW,
                  streets: area.streets,
                })),
          }))}
          loadData={getAreas}
          onChange={getStreets}
          changeOnSelect
        />
        <Select<string>
          showSearch
          suffixIcon={<SearchOutlined />}
          placeholder={t('pleaseSelectStreet')}
          notFoundContent={
            <div className={styles.notFoundContent}>
              <FileSearchOutlined />
              <div>{t('noStreet')}</div>
            </div>
          }
          disabled={!streets.length}
          value={variables.street || undefined}
          onChange={(street: string) =>
            setVariables({
              ...variables,
              street,
            })
          }
        >
          {streets.map(street => (
            <Option key={street} value={street}>
              {street}
            </Option>
          ))}
        </Select>
      </div>
    );
  },
);
