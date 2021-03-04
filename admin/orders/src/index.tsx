// typescript import
import { ColumnProps } from 'antd/lib/table';

import { OrdersQueryResult } from './constants';

// import
import React, { useState, useRef } from 'react';
import { Dropdown, Menu, Icon, Input, Spin, Button } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import { filter } from 'graphql-anywhere';

import { useRouter } from '@meepshop/link';
import { useTranslation } from '@meepshop/utils/lib/i18n';
import DatePicker from '@admin/date-picker';
import Table from '@admin/table';

import useChangePage from './hooks/useChangePage';
import useDatePicker from './hooks/useDatePicker';
import AdvancedSearch from './advancedSearch';
import ChangeStatus from './ChangeStatus';
import MoreOperating from './MoreOperating';
import Tags from './Tags';
import { ORDERS } from './constants';
import styles from './styles/index.less';

// graphql typescript
import {
  setOrdersToSelectedOrders as setOrdersToSelectedOrdersType,
  setOrdersToSelectedOrdersVariables as setOrdersToSelectedOrdersVariablesType,
  useEcfitColumnsFragment_edges as useEcfitColumnsFragmentEdgesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { setOrdersToSelectedOrders } from './gqls';
import {
  advancedSearchStorePaymentFragment,
  advancedSearchStoreShipmentFragment,
} from './advancedSearch/gqls';
import { changeStatusOrderConnectionFragment } from './gqls/changeStatus';
import { useChangePageFragment } from './gqls/useChangePage';
import {
  tagsStorePaymentFragment,
  tagsStoreShipmentFragment,
} from './gqls/tags';

// typescript definition
interface PropsType extends OrdersQueryResult {
  title: string;
  service: string;
  columns: ColumnProps<useEcfitColumnsFragmentEdgesType>[];
  runningIds: string[];
  submitOrders: () => Promise<void>;
  children?: React.ReactElement;
}

// definition
const { Item } = Menu;
const { Search } = Input;

export default React.memo(
  ({
    title,
    service,
    data,
    variables,
    fetchMore,
    refetch,
    columns,
    runningIds,
    submitOrders,
    children,
  }: PropsType): React.ReactElement => {
    const router = useRouter();
    const { t } = useTranslation('orders');
    const rootRef = useRef<HTMLDivElement>(null);

    const [mutation] = useMutation<
      setOrdersToSelectedOrdersType,
      setOrdersToSelectedOrdersVariablesType
    >(setOrdersToSelectedOrders);

    const [searchTerm, setSearchTerm] = useState<string>(
      variables?.filter?.searchTerm || '',
    );

    const orders = data?.viewer?.orders || null;
    const storePayments = data?.viewer?.store?.storePayments;
    const storeShipments = data?.viewer?.store?.storeShipments;
    const selectedOrders = data?.selectedOrders || null;

    const { changePage, loading } = useChangePage({
      user: filter(useChangePageFragment, data?.viewer || null),
      variables,
      fetchMore,
      refetch,
    });

    const { datepickerValue, changeDatePicker } = useDatePicker({
      variables,
      refetch,
    });

    if (!orders || !storePayments || !storeShipments || !selectedOrders)
      return <Spin indicator={<Icon type="loading" spin />} />;

    const { first: pageSize } = variables;
    const {
      edges,
      total,
      pageInfo: {
        currentInfo: { current },
      },
    } = orders;

    return (
      <div className={styles.root} ref={rootRef}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div>
              <Dropdown
                overlayClassName={styles.options}
                overlay={
                  <Menu onClick={({ key }) => router.push(key)}>
                    {ORDERS.map(({ key, path, useIcon }) => (
                      <Item key={path} disabled={t(key) === title}>
                        {!useIcon ? null : <Icon type="profile" />}
                        {t(key)}
                      </Item>
                    ))}
                  </Menu>
                }
              >
                <div className={styles.title}>
                  {title}
                  <Icon type="down" />
                </div>
              </Dropdown>

              {children}
            </div>

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
            <Table<useEcfitColumnsFragmentEdgesType>
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
                  ({ node: { id } }) =>
                    id || 'null-id' /** SHOULD_NOT_BE_NULL */,
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
                    onClick={submitOrders}
                    loading={runningIds.length !== 0}
                    type="primary"
                    size="large"
                  >
                    {t('send', { service })}
                  </Button>
                )}
              </div>

              <Tags
                variables={variables}
                refetch={refetch}
                storePayments={filter(tagsStorePaymentFragment, storePayments)}
                storeShipments={filter(
                  tagsStoreShipmentFragment,
                  storeShipments,
                )}
              />
            </Table>
          </div>
        </div>
      </div>
    );
  },
);
