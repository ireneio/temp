// typescript import
import { ColumnProps } from 'antd/lib/table';

import { OrdersQueryResult } from './constants';

// import
import React, { useState, useEffect, useRef } from 'react';
import {
  DownOutlined,
  LoadingOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu, Input, Spin, Button } from 'antd';
import { filter } from 'graphql-anywhere';

import { useRouter } from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';
import DatePicker from '@admin/date-picker';
import Table from '@admin/table';

import AdvancedSearch from './advancedSearch';
import ChangeStatus from './ChangeStatus';
import MoreOperating from './MoreOperating';
import Tags from './Tags';
import useChangePage from './hooks/useChangePage';
import useDatePicker from './hooks/useDatePicker';
import useOrdersColumns from './hooks/useOrdersColumns';
import useOrdersMenu from './hooks/useOrdersMenu';
import styles from './styles/index.less';

// graphql typescript
import { useOrdersColumnsFragment_edges as useOrdersColumnsFragmentEdgesType } from '@meepshop/types/gqls/admin';

// graphql import
import {
  advancedSearchStorePaymentFragment,
  advancedSearchStoreShipmentFragment,
} from './advancedSearch/gqls';
import { useChangePageFragment } from './gqls/useChangePage';
import {
  tagsStorePaymentFragment,
  tagsStoreShipmentFragment,
} from './gqls/tags';

// typescript definition
interface PropsType extends OrdersQueryResult {
  pageId: string;
  reset: () => void;
  getColumns?: (columns: ColumnProps<unknown>[]) => ColumnProps<unknown>[];
  extraColumns?: ColumnProps<unknown>[];
  ecpayColumn?: ColumnProps<unknown>;
  runningIds: string[];
  submitOrders: (selectedIds: string[]) => Promise<void>;
  disabledSend?: boolean;
  children?: React.ReactElement;
}

// definition
const { Item } = Menu;
const { Search } = Input;

export default React.memo(
  ({
    pageId,
    data,
    variables,
    fetchMore,
    refetch,
    reset,
    getColumns,
    runningIds,
    submitOrders,
    disabledSend,
    children,
  }: PropsType): React.ReactElement => {
    const router = useRouter();
    const { t } = useTranslation('orders');
    const rootRef = useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = useState<string>(
      variables?.filter?.searchTerm || '',
    );
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const orders = data?.viewer?.orders || null;
    const storePayments = data?.viewer?.store?.storePayments;
    const storeShipments = data?.viewer?.store?.storeShipments;

    const { changePage, loading } = useChangePage({
      user: filter(useChangePageFragment, data?.viewer || null),
      variables,
      fetchMore,
      refetch,
      pageId,
    });

    const { datepickerValue, changeDatePicker } = useDatePicker({
      variables,
      refetch,
    });

    const columns = useOrdersColumns(pageId, getColumns);
    const ordersMenu = useOrdersMenu(
      data?.viewer?.store?.storeEcfitSettings?.isEnabled || false,
    );

    useEffect(() => {
      setSelectedIds([]);
    }, [variables]);

    if (!orders || !storePayments || !storeShipments)
      return <Spin indicator={<LoadingOutlined spin />} />;

    const pageSize = variables.first || 10;
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
                  <Menu onClick={({ key }) => router.push(key as string)}>
                    {ordersMenu.map(({ key, title, path, useIcon }) => (
                      <Item key={path} disabled={key === pageId}>
                        {!useIcon ? null : <ProfileOutlined />}
                        {title}
                      </Item>
                    ))}
                  </Menu>
                }
              >
                <div className={styles.title}>
                  {t(`title.${pageId}`)}
                  <DownOutlined />
                </div>
              </Dropdown>

              {children}
            </div>

            {selectedIds.length === 0 ? null : (
              <div className={styles.operating}>
                <ChangeStatus
                  runningIds={runningIds}
                  selectedIds={selectedIds}
                />

                <MoreOperating pageId={pageId} selectedIds={selectedIds} />
              </div>
            )}
          </div>

          <div className={styles.tableContainer}>
            <Table<useOrdersColumnsFragmentEdgesType>
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
                selectedIds.length === 0 ? null : (
                  <>
                    {t('orders-info.select')}
                    <span className={styles.selected}>
                      {selectedIds.length}
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
                selectedRowKeys: selectedIds,
                onChange: (ids: string[]) => setSelectedIds(ids),
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
                      reset();
                    }}
                  >
                    {t('filter.reset')}
                  </div>
                </div>

                <div />

                {(selectedIds.length === 0 && runningIds.length === 0) ||
                disabledSend ? null : (
                  <Button
                    onClick={() => submitOrders(selectedIds)}
                    loading={runningIds.length !== 0}
                    type="primary"
                    size="large"
                  >
                    {t(`send.${pageId}`)}
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
