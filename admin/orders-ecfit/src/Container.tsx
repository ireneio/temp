// typescript import
import { MutationFn } from 'react-apollo';

import { I18nPropsType } from '@admin/utils/lib/i18n';
import { PropsType as DataPickerPropsType } from '@admin/date-picker';

import { getEcfitListQueryPropsType } from './constants';

// import
import React from 'react';
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import Router from 'next/router';
import { Spin, Icon, Radio, Input, Button, Badge, Modal } from 'antd';
import idx from 'idx';
import moment from 'moment';

import { withNamespaces } from '@admin/utils/lib/i18n';
import DatePicker from '@admin/date-picker';

import AdvancedSearch from './AdvancedSearch';
import ChangeStatus from './ChangeStatus';
import MoreOperating from './MoreOperating';
import Tags from './Tags';
import Orders from './Orders';
import styles from './styles/container.less';

// graphql typescript
import {
  getEcfitList,
  getEcfitListVariables,
  getEcfitList_viewer_ecfitOrders as getEcfitListViewerEcfitOrders,
  getEcfitList_getStorePaymentList as getEcfitListGetStorePaymentList,
  getEcfitList_getStoreShipmentList as getEcfitListGetStoreShipmentList,
  getEcfitList_selectedOrders as getEcfitListSelectedOrders,
} from './__generated__/getEcfitList';
import {
  createEcfitOrder,
  createEcfitOrderVariables,
} from './__generated__/createEcfitOrder';
import {
  setOrdersToSelectedOrders,
  setOrdersToSelectedOrdersVariables,
} from './__generated__/setOrdersToSelectedOrders';

// graphql import
import {
  advancedSearchStorePaymentListFragment,
  advancedSearchStoreShipmentListFragment,
} from './AdvancedSearch';
import { changeStatusOrderConnectionFragment } from './ChangeStatus';
import {
  tagsStorePaymentListFragment,
  tagsStoreShipmentListFragment,
} from './Tags';
import {
  ordersOrderConnectionFragment,
  ordersPageInfoFragment,
} from './Orders';

// typescript definition
interface PropsType
  extends I18nPropsType,
    Pick<getEcfitListQueryPropsType, 'variables' | 'fetchMore' | 'refetch'> {
  rootRef: React.RefObject<HTMLDivElement>;
  ecfitOrders: getEcfitListViewerEcfitOrders;
  getStorePaymentList: getEcfitListGetStorePaymentList;
  getStoreShipmentList: getEcfitListGetStoreShipmentList;
  selectedOrders: getEcfitListSelectedOrders;
  sentFailedAmount: number;
  isEnabled: boolean;
}

interface StateType {
  runningIds: string[];
  searchTerm: string;
  isEnabled: boolean;
}

// definition
const { Group } = Radio;
const { Search } = Input;

class Container extends React.PureComponent<PropsType, StateType> {
  public state: StateType = {
    runningIds: [],
    // eslint-disable-next-line react/destructuring-assignment
    searchTerm: idx(this.props.variables, _ => _.filter.searchTerm) || '',
    // eslint-disable-next-line react/destructuring-assignment
    isEnabled: this.props.isEnabled,
  };

  public componentDidMount(): void {
    const { t } = this.props;
    const { isEnabled } = this.state;

    if (!isEnabled)
      Modal.error({
        title: t('send-error.title'),
        content: t('send-error.content'),
        okText: t('send-error.confirm'),
        onOk: () => Router.push('/store-setting'),
      });
  }

  public componentDidUpdate(): void {
    const {
      // HOC
      t,

      // props
      variables,
    } = this.props;
    const { isEnabled } = this.state;

    if (!isEnabled)
      Modal.error({
        title: t('send-error.title'),
        content: t('send-error.content'),
        okText: t('send-error.confirm'),
        onOk: () => Router.push('/store-setting'),
      });

    // TODO: remove after print move to next-admin
    if (process.browser)
      localStorage.setItem('ecfitOrders-variables', JSON.stringify(variables));
  }

  private getDatePickerValue = ():
    | undefined
    | [moment.Moment, moment.Moment] => {
    const { variables } = this.props;
    const {
      start = undefined,
      end = undefined,
    }: {
      start?: number;
      end?: number;
    } = idx(variables, _ => _.filter.timeRange) || {};

    return !start || !end ? undefined : [moment.unix(start), moment.unix(end)];
  };

  private datePickerChange = (timeRange: DataPickerPropsType['value']) => {
    const { variables, refetch } = this.props;
    const [start = undefined, end = undefined] = timeRange || [];

    refetch({
      ...variables,
      filter: {
        ...variables.filter,
        timeRange:
          !start || !end
            ? undefined
            : {
                start: moment(start).format('X'),
                end: moment(end).format('X'),
              },
      },
    });
  };

  private updateCreateEcfitOrder = async (
    createEcfitOrderMutation: MutationFn<
      createEcfitOrder,
      createEcfitOrderVariables
    >,
    setOrdersToSelectedOrdersMutation: MutationFn<
      setOrdersToSelectedOrders,
      setOrdersToSelectedOrdersVariables
    >,
  ) => {
    const { variables, selectedOrders } = this.props;
    const { isEnabled } = this.state;
    const ecfitSentStatus = idx(variables, _ => _.filter.ecfitSentStatus);
    // TODO: should not be null
    const selectedIds = selectedOrders.edges.map(
      ({ node: { id } }) => id || 'null-id',
    );
    let isFail = false;

    this.setState({ runningIds: selectedIds });

    const successIds = (
      await Promise.all(
        selectedIds.map(orderId =>
          createEcfitOrderMutation({
            variables: {
              input: { orderId },
            },
          }),
        ),
      )
    ).reduce((result, response, index) => {
      if (!response) return result;

      const status = idx(response, _ => _.data.createEcfitOrder.status);

      if (!status) return result;

      if (
        isEnabled &&
        ['FAIL_ECFIT_NOT_ENABLED', 'FAIL_ECFIT_NOT_AUTHORIZED'].includes(status)
      )
        isFail = true;

      if (
        ecfitSentStatus === 'NOT_SENT' ||
        (ecfitSentStatus === 'SENT_FAILED' && status === 'OK')
      )
        return [...result, selectedIds[index]];

      return result;
    }, []);

    if (isFail) {
      this.setState({ isEnabled: false });
      return;
    }

    if (successIds.length === 0) {
      this.setState({ runningIds: [] });
      return;
    }

    const {
      variables: currentVariables,
      ecfitOrders: {
        pageInfo: { endCursor },
      },
      selectedOrders: currentSelectedOrders,
      fetchMore,
    } = this.props;
    // TODO: should not be null
    const currentSelectedIds = currentSelectedOrders.edges.map(
      ({ node: { id } }) => id || 'null-id',
    );

    await fetchMore({
      variables: {
        ...currentVariables,
        cursor: endCursor,
        first: successIds.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!previousResult.viewer) return previousResult;

        return {
          ...previousResult,
          viewer: {
            ...previousResult.viewer,
            ecfitOrders: {
              __typename: 'OrderConnection',
              edges: [
                ...(
                  idx(previousResult, _ => _.viewer.ecfitOrders.edges) || []
                ).filter(({ node: { id } }) => !successIds.includes(id)),
                ...(idx(fetchMoreResult, _ => _.viewer.ecfitOrders.edges) ||
                  []),
              ],
              pageInfo: idx(
                fetchMoreResult,
                _ => _.viewer.ecfitOrders.pageInfo,
              ),
              total: idx(fetchMoreResult, _ => _.viewer.ecfitOrders.total),
            },
          },
        };
      },
    });

    await setOrdersToSelectedOrdersMutation({
      variables: {
        input: {
          ids: currentSelectedIds.filter(id => !successIds.includes(id)),
        },
      },
    });

    this.setState({ runningIds: [] });
  };

  public render(): React.ReactNode {
    const {
      // HOC
      t,

      // props
      rootRef,
      variables,
      refetch,
      fetchMore,
      ecfitOrders,
      getStorePaymentList,
      getStoreShipmentList,
      selectedOrders,
      sentFailedAmount,
    } = this.props;
    const { runningIds, searchTerm } = this.state;

    return (
      <Mutation<setOrdersToSelectedOrders, setOrdersToSelectedOrdersVariables>
        mutation={gql`
          mutation setOrdersToSelectedOrders(
            $input: SetOrdersToSelectedOrdersInput!
          ) {
            setOrdersToSelectedOrders(input: $input) @client
          }
        `}
      >
        {setOrdersToSelectedOrdersMutation => (
          <>
            <div className={styles.sendStatus}>
              <Group
                value={idx(variables, _ => _.filter.ecfitSentStatus)}
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

            <div className={styles.root}>
              <div className={styles.filter}>
                <div>
                  <AdvancedSearch
                    rootRef={rootRef}
                    variables={variables}
                    refetch={refetch}
                    getStorePaymentList={filter(
                      advancedSearchStorePaymentListFragment,
                      getStorePaymentList,
                    )}
                    getStoreShipmentList={filter(
                      advancedSearchStoreShipmentListFragment,
                      getStoreShipmentList,
                    )}
                  />

                  <Search
                    className={styles.search}
                    value={searchTerm}
                    onChange={({ target: { value: newSearchTerm } }) =>
                      this.setState({ searchTerm: newSearchTerm })
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
                    value={this.getDatePickerValue()}
                    onChange={this.datePickerChange}
                  />

                  <div
                    className={styles.reset}
                    onClick={() =>
                      this.setState({ searchTerm: '' }, () =>
                        refetch({
                          ...variables,
                          filter: {
                            ecfitSentStatus: idx(
                              variables,
                              _ => _.filter.ecfitSentStatus,
                            ),
                          },
                        }),
                      )
                    }
                  >
                    {t('filter.reset')}
                  </div>
                </div>

                <div />

                {(selectedOrders.total === 0 && runningIds.length === 0) ||
                idx(variables, _ => _.filter.ecfitSentStatus) ===
                  'SENT_SUCCESSFUL' ? null : (
                  <Mutation<createEcfitOrder, createEcfitOrderVariables>
                    mutation={gql`
                      mutation createEcfitOrder(
                        $input: CreateEcfitOrderInput!
                      ) {
                        createEcfitOrder(input: $input) {
                          status
                        }
                      }
                    `}
                  >
                    {createEcfitOrderMutation => (
                      <Button
                        onClick={() =>
                          this.updateCreateEcfitOrder(
                            createEcfitOrderMutation,
                            setOrdersToSelectedOrdersMutation,
                          )
                        }
                        loading={runningIds.length !== 0}
                        type="primary"
                        size="large"
                      >
                        {t('send')}
                      </Button>
                    )}
                  </Mutation>
                )}
              </div>

              <Tags
                variables={variables}
                refetch={refetch}
                getStorePaymentList={filter(
                  tagsStorePaymentListFragment,
                  getStorePaymentList,
                )}
                getStoreShipmentList={filter(
                  tagsStoreShipmentListFragment,
                  getStoreShipmentList,
                )}
              />

              <Orders
                runningIds={runningIds}
                variables={variables}
                refetch={refetch}
                fetchMore={fetchMore}
                ecfitOrders={{
                  ...filter(ordersOrderConnectionFragment, ecfitOrders),
                  pageInfo: filter(
                    ordersPageInfoFragment,
                    ecfitOrders.pageInfo,
                  ),
                }}
                selectedOrders={filter(
                  ordersOrderConnectionFragment,
                  selectedOrders,
                )}
                setOrdersToSelectedOrdersMutation={
                  setOrdersToSelectedOrdersMutation
                }
              />
            </div>
          </>
        )}
      </Mutation>
    );
  }
}

const EnhancedContainer = withNamespaces('orders-ecfit')(Container);

// TODO: remove after print move to next-admin
if (
  process.browser &&
  moment().diff(
    moment(localStorage.getItem('selectedOrders-timeout') || undefined),
    'minutes',
    true,
  ) > 1
)
  localStorage.removeItem('ecfitOrders-variables');

const initVariables = (() => {
  // TODO: remove after orderlist move to next-admin
  if (process.browser) {
    const variables = JSON.parse(
      localStorage.getItem('ecfitOrders-variables') || '{}',
    );

    if (Object.keys(variables).length !== 0) return variables;
  }

  return {
    first: 10,
    filter: {
      ecfitSentStatus: 'NOT_SENT',
    },
  };
})();

// eslint-disable-next-line react/no-multi-comp
export default React.memo(
  ({ rootRef }: { rootRef: React.RefObject<HTMLDivElement> }) => (
    <Query<getEcfitList, getEcfitListVariables>
      query={gql`
        query getEcfitList(
          $first: PositiveInt!
          $cursor: String
          $filter: EcfitOrderFilterInput
        ) {
          viewer {
            id
            ecfitOrders(first: $first, after: $cursor, filter: $filter) {
              ...ordersOrderConnectionFragment
              edges {
                node {
                  id
                }
              }
              pageInfo {
                ...ordersPageInfoFragment
                endCursor
              }
            }

            sentFailedList: ecfitOrders(
              first: 10
              filter: { ecfitSentStatus: SENT_FAILED }
            ) {
              total
            }

            store {
              id
              storeEcfitSettings {
                isEnabled
              }
            }
          }

          getStorePaymentList {
            ...advancedSearchStorePaymentListFragment
            ...tagsStorePaymentListFragment
          }

          getStoreShipmentList {
            ...advancedSearchStoreShipmentListFragment
            ...tagsStoreShipmentListFragment
          }

          selectedOrders @client {
            ...changeStatusOrderConnectionFragment
            ...ordersOrderConnectionFragment
            edges {
              node {
                id
              }
            }
            total
          }
        }

        ${advancedSearchStorePaymentListFragment}
        ${advancedSearchStoreShipmentListFragment}
        ${changeStatusOrderConnectionFragment}
        ${tagsStorePaymentListFragment}
        ${tagsStoreShipmentListFragment}
        ${ordersOrderConnectionFragment}
        ${ordersPageInfoFragment}
      `}
      variables={initVariables}
      ssr={false}
    >
      {({ error, data, variables, fetchMore, refetch }) => {
        if (error) return <Spin indicator={<Icon type="loading" spin />} />;

        const ecfitOrders = idx(data, _ => _.viewer.ecfitOrders);
        const {
          getStorePaymentList = null,
          getStoreShipmentList = null,
          selectedOrders = null,
        } = data || {};

        if (
          !ecfitOrders ||
          !getStorePaymentList ||
          !getStoreShipmentList ||
          !selectedOrders
        )
          return <Spin indicator={<Icon type="loading" spin />} />;

        return (
          <EnhancedContainer
            rootRef={rootRef}
            variables={variables}
            fetchMore={fetchMore}
            refetch={refetch}
            ecfitOrders={ecfitOrders}
            isEnabled={
              idx(data, _ => _.viewer.store.storeEcfitSettings.isEnabled) ||
              false /** TODO: should not be null */
            }
            getStorePaymentList={getStorePaymentList}
            getStoreShipmentList={getStoreShipmentList}
            selectedOrders={selectedOrders}
            sentFailedAmount={
              idx(data, _ => _.viewer.sentFailedList.total) || 0
            }
          />
        );
      }}
    </Query>
  ),
);
