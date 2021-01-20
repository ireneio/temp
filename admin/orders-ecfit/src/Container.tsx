// import
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { filter } from 'graphql-anywhere';
import { Spin, Icon, Radio, Input, Button, Badge } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import DatePicker from '@admin/date-picker';
import Table from '@admin/table';

import useColumns from './hooks/useColumns';
import useChangePage from './hooks/useChangePage';
import useDatePicker from './hooks/useDatePicker';
import useUpdateCreateEcfitOrder from './hooks/useUpdateCreateEcfitOrder';
import useInitVariables, { initVariables } from './hooks/useInitVariables';

import AdvancedSearch from './AdvancedSearch';
import ChangeStatus from './ChangeStatus';
import MoreOperating from './MoreOperating';
import Tags from './Tags';

import styles from './styles/container.less';

// graphql typescript
import {
  getEcfitList as getEcfitListType,
  getEcfitListVariables as getEcfitListVariablesType,
  setOrdersToSelectedOrders as setOrdersToSelectedOrdersType,
  setOrdersToSelectedOrdersVariables as setOrdersToSelectedOrdersVariablesType,
  useColumnsFragment_edges as useColumnsFragmentEdgesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  advancedSearchStorePaymentFragment,
  advancedSearchStoreShipmentFragment,
} from './AdvancedSearch';
import { changeStatusOrderConnectionFragment } from './ChangeStatus';
import { tagsStorePaymentFragment, tagsStoreShipmentFragment } from './Tags';
import { setOrdersToSelectedOrders, getEcfitList } from './gqls/container';
import {
  useUpdateCreateEciftOrderFragment,
  useUpdateCreateEcfitOrdersOrderConnectionFragment,
} from './gqls/useUpdateCreateEcfitOrder';
import { useChangePageFragment } from './gqls/useChangePage';

// definition
const { Group } = Radio;
const { Search } = Input;

export default React.memo(
  ({ rootRef }: { rootRef: React.RefObject<HTMLDivElement> }) => {
    const { data, variables, fetchMore, refetch } = useQuery<
      getEcfitListType,
      getEcfitListVariablesType
    >(getEcfitList, {
      variables: initVariables,
      ssr: false,
    });

    const [mutation] = useMutation<
      setOrdersToSelectedOrdersType,
      setOrdersToSelectedOrdersVariablesType
    >(setOrdersToSelectedOrders);

    const [searchTerm, setSearchTerm] = useState<string>(
      variables?.filter?.searchTerm || '',
    );

    const { t } = useTranslation('orders-ecfit');
    const columns = useColumns(variables);

    const ecfitOrders = data?.viewer?.ecfitOrders || null;
    const storePayments = data?.viewer?.store?.storePayments;
    const storeShipments = data?.viewer?.store?.storeShipments;
    const selectedOrders = data?.selectedOrders || null;
    const sentFailedAmount = data?.viewer?.sentFailedList?.total || 0;

    const { changePage, loading } = useChangePage({
      user: filter(useChangePageFragment, data?.viewer || null),
      variables,
      fetchMore,
      refetch,
    });

    const { runningIds, updateCreateEcfitOrder } = useUpdateCreateEcfitOrder({
      user: filter(useUpdateCreateEciftOrderFragment, data?.viewer || null),
      variables,
      fetchMore,
      selectedOrders: filter(
        useUpdateCreateEcfitOrdersOrderConnectionFragment,
        selectedOrders,
      ),
    });
    const { datepickerValue, changeDatePicker } = useDatePicker({
      variables,
      refetch,
    });

    useInitVariables(variables);

    if (!ecfitOrders || !storePayments || !storeShipments || !selectedOrders)
      return <Spin indicator={<Icon type="loading" spin />} />;

    const { first: pageSize } = variables;
    const {
      edges,
      total,
      pageInfo: {
        currentInfo: { current },
      },
    } = ecfitOrders;

    return (
      <>
        <div className={styles.sendStatus}>
          <Group
            value={variables?.filter?.ecfitSentStatus}
            onChange={({ target: { value } }) =>
              refetch({
                ...variables,
                filter: {
                  ...variables.filter,
                  ecfitSentStatus: value,
                },
              })
            }
          >
            {['NOT_SENT', 'SENT_SUCCESSFUL', 'SENT_FAILED'].map(key => (
              <Radio key={key} value={key}>
                {key !== 'SENT_FAILED' ? (
                  t(`status.${key}`)
                ) : (
                  <Badge dot={sentFailedAmount !== 0}>
                    {t(`status.${key}`)}
                  </Badge>
                )}
              </Radio>
            ))}
          </Group>

          {selectedOrders.total === 0 ? null : (
            <div className={styles.operating}>
              <ChangeStatus
                runningIds={runningIds}
                selectedOrders={filter(
                  changeStatusOrderConnectionFragment,
                  selectedOrders,
                )}
              />

              <MoreOperating />
            </div>
          )}
        </div>

        <div className={styles.tableContainer}>
          <Table<useColumnsFragmentEdgesType>
            loading={loading}
            pagination={{
              total,
              current,
              pageSize,
              pageSizeOptions: ['10', '20', '50', '100', '500'],
              onChange: (nowCurrent, newPageSize) => {
                changePage(nowCurrent, newPageSize as number);
              },
            }}
            optional={
              selectedOrders.total === 0 ? null : (
                <>
                  {t('orders-info.select')}
                  <span className={styles.selected}>
                    {selectedOrders.total}
                  </span>

                  {t('orders-info.amount')}
                </>
              )
            }
            dataSource={edges.slice(
              current * pageSize,
              (current + 1) * pageSize,
            )}
            columns={columns}
            locale={{ emptyText: t('empty-orders') }}
            rowKey={
              ({ node: { id } }) => id || 'null-id' /** SHOULD_NOT_BE_NULL */
            }
            rowClassName={({ node: { id } }) =>
              runningIds.includes(id || 'null-id' /** SHOULD_NOT_BE_NULL */)
                ? styles.running
                : ''
            }
            rowSelection={{
              selectedRowKeys: selectedOrders.edges.map(
                ({ node: { id } }) => id || 'null-id' /** SHOULD_NOT_BE_NULL */,
              ),
              onChange: (ids: string[]) =>
                mutation({
                  variables: { input: { ids } },
                }),
            }}
          >
            <div className={styles.filter}>
              <div>
                <AdvancedSearch
                  rootRef={rootRef}
                  variables={variables}
                  refetch={refetch}
                  storePayments={filter(
                    advancedSearchStorePaymentFragment,
                    storePayments,
                  )}
                  storeShipments={filter(
                    advancedSearchStoreShipmentFragment,
                    storeShipments,
                  )}
                />

                <Search
                  className={styles.search}
                  value={searchTerm}
                  onChange={({ target: { value: newSearchTerm } }) =>
                    setSearchTerm(newSearchTerm)
                  }
                  placeholder={t('filter.searchTerm')}
                  onSearch={newSearchTerm =>
                    refetch({
                      ...variables,
                      filter: {
                        ...variables.filter,
                        searchTerm: newSearchTerm,
                      },
                    })
                  }
                />

                <DatePicker
                  value={datepickerValue}
                  onChange={changeDatePicker}
                />

                <div
                  className={styles.reset}
                  onClick={() => {
                    setSearchTerm('');
                    refetch({
                      ...variables,
                      filter: {
                        ecfitSentStatus: variables?.filter?.ecfitSentStatus,
                      },
                    });
                  }}
                >
                  {t('filter.reset')}
                </div>
              </div>

              <div />

              {(selectedOrders.total === 0 && runningIds.length === 0) ||
              variables?.filter?.ecfitSentStatus ===
                'SENT_SUCCESSFUL' ? null : (
                <Button
                  onClick={() => updateCreateEcfitOrder()}
                  loading={runningIds.length !== 0}
                  type="primary"
                  size="large"
                >
                  {t('send')}
                </Button>
              )}
            </div>

            <Tags
              variables={variables}
              refetch={refetch}
              storePayments={filter(tagsStorePaymentFragment, storePayments)}
              storeShipments={filter(tagsStoreShipmentFragment, storeShipments)}
            />
          </Table>
        </div>
      </>
    );
  },
);
