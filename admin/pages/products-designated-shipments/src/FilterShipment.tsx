/* eslint-disable @typescript-eslint/camelcase */
// typescript import
import { QueryResult } from '@apollo/client';

// import
import React, { useState } from 'react';
import { Input } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

import { useTranslation, useGetLanguage } from '@meepshop/locales';

import styles from './styles/filterShipment.less';

// graphql typescript
import {
  getAdminProducts as getAdminProductsType,
  getAdminProductsVariables as getAdminProductsVariablesType,
  filterShipmentFragment as filterShipmentFragmentType,
} from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType
  extends Pick<
    QueryResult<getAdminProductsType, getAdminProductsVariablesType>,
    'variables' | 'refetch'
  > {
  shipments: filterShipmentFragmentType[];
  selectedShipments: filterShipmentFragmentType[];
  setSelectedShipments: (value: filterShipmentFragmentType[]) => void;
}

// definition
const { Search } = Input;

const noApplicableShipments = {
  __typename: 'StoreShipment' as const,
  id: 'noApplicableShipments',
  status: 1,
  title: {
    __typename: 'Locale' as const,
    zh_TW: '無任何可用運送方式',
    en_US: null,
    ja_JP: null,
    vi_VN: null,
    fr_FR: null,
    es_ES: null,
    th_TH: null,
    id_ID: null,
  },
};

export default React.memo(
  ({
    shipments,
    selectedShipments,
    setSelectedShipments,
    variables,
    refetch,
  }: PropsType) => {
    const { t } = useTranslation('products-designated-shipments');
    const getLanguage = useGetLanguage();
    const [shipmentOptions, setShipmentOptions] = useState<
      filterShipmentFragmentType[]
    >([noApplicableShipments, ...shipments]);

    return (
      <div className={styles.root}>
        <Search
          className={styles.filterSearch}
          placeholder={t('filter-shipment')}
          onSearch={newSearchTerm => {
            if (!newSearchTerm) {
              setShipmentOptions([noApplicableShipments, ...shipments]);
              return;
            }

            const filterOption = shipmentOptions.reduce((result, shipment) => {
              const findeShipment = selectedShipments.find(ship =>
                getLanguage(ship.title).includes(newSearchTerm),
              );

              return getLanguage(shipment.title).includes(newSearchTerm) &&
                !findeShipment
                ? [...result, shipment]
                : result;
            }, [] as filterShipmentFragmentType[]);

            setShipmentOptions(filterOption);
          }}
        />
        <div className={styles.filterList}>
          {shipmentOptions.map(shipment => {
            const selectedShipment = selectedShipments.find(
              select => select.id === shipment.id,
            );

            return (
              <div
                className={`${selectedShipment ? styles.selected : ''}`}
                key={shipment.id || ''}
                onClick={() => {
                  const findShipment = selectedShipments.find(
                    selected => selected.id === shipment.id,
                  );

                  if (findShipment) {
                    const filterShipment = selectedShipments.filter(
                      selected => selected.id !== shipment.id,
                    );

                    setSelectedShipments(filterShipment);

                    refetch({
                      filter: {
                        ...variables?.filter,
                        applicableShipments: filterShipment
                          .filter(
                            selected =>
                              selected.id &&
                              selected.id !== 'noApplicableShipments',
                          )
                          .map(selected => selected.id) as string[],
                        noApplicableShipments: filterShipment.some(
                          selected => selected.id === 'noApplicableShipments',
                        ),
                      },
                    });
                  } else {
                    const newSelectedShipments = [
                      ...selectedShipments,
                      shipment,
                    ];

                    setSelectedShipments(newSelectedShipments);

                    refetch({
                      filter: {
                        ...variables?.filter,
                        applicableShipments: newSelectedShipments
                          .filter(
                            selected =>
                              selected.id &&
                              selected.id !== 'noApplicableShipments',
                          )
                          .map(selected => selected.id) as string[],
                        noApplicableShipments: newSelectedShipments.some(
                          select => select.id === 'noApplicableShipments',
                        ),
                      },
                    });
                  }
                }}
              >
                {getLanguage(shipment.title)}
                <CheckOutlined className={styles.check} />
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
