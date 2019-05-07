// typescript import
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
import { areEqual } from 'fbjs';
import moment from 'moment';

import { withNamespaces } from '@admin/utils/lib/i18n';
import DatePicker from '@admin/date-picker';

import AdvancedSearch from './AdvancedSearch';
import ChangeStatus from './ChangeStatus';
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
} from './__generated__/getEcfitList';
import {
  createEcfitOrder,
  createEcfitOrderVariables,
} from './__generated__/createEcfitOrder';

// graphql import
import {
  advancedSearchPaymentListFragment,
  advancedSearchShipmentListFragment,
} from './AdvancedSearch';
import { tagsPaymentListFragment, tagsShipmentListFragment } from './Tags';
import { ordersFragment } from './Orders';

// typescript definition
type PropsType = I18nPropsType &
  Pick<getEcfitListQueryPropsType, 'variables' | 'fetchMore' | 'refetch'> & {
    ecfitOrders: getEcfitListViewerEcfitOrders;
    getStorePaymentList: getEcfitListGetStorePaymentList;
    getStoreShipmentList: getEcfitListGetStoreShipmentList;
    sentFailedAmount: number;
    isEnabled: boolean;
  };

interface StateType {
  runningIds: string[];
  selected: string[];
  loading: boolean;
  current: number;
  isEnabled: boolean;
}

type createEcfitOrderType = (options: {
  variables: createEcfitOrderVariables;
}) => Promise<{ data: createEcfitOrder }>;

// definition
const { Group } = Radio;
const { Search } = Input;
const cache: Pick<StateType, 'current' | 'selected'> &
  Pick<getEcfitListVariables, 'first' | 'filter'> = {
  current: 0,
  first: 10,
  selected: [],
};

const query = gql`
  query getEcfitList(
    $first: PositiveInt!
    $cursor: String
    $filter: EcfitOrderFilterInput
  ) {
    viewer {
      id
      ecfitOrders(first: $first, after: $cursor, filter: $filter) {
        ...ordersFragment
        edges {
          node {
            id
          }
        }
        pageInfo {
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
        storeEcfitSettings {
          isEnabled
        }
      }
    }

    getStorePaymentList {
      ...advancedSearchPaymentListFragment
      ...tagsPaymentListFragment
    }

    getStoreShipmentList {
      ...advancedSearchShipmentListFragment
      ...tagsShipmentListFragment
    }
  }

  ${advancedSearchPaymentListFragment}
  ${advancedSearchShipmentListFragment}
  ${tagsPaymentListFragment}
  ${tagsShipmentListFragment}
  ${ordersFragment}
`;

class Container extends React.PureComponent<PropsType, StateType> {
  public state: StateType = {
    selected: cache.selected,
    runningIds: [],
    loading: false,
    current: cache.current,
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

  private changePage = (newCurrent: number) => {
    const {
      variables: { first, ...variables },
      ecfitOrders: {
        edges,
        pageInfo: { endCursor },
      },
      fetchMore,
    } = this.props;
    const { current, loading } = this.state;

    if (loading || newCurrent === current) return;

    cache.current = newCurrent;

    if (newCurrent < current) {
      this.setState({ current: newCurrent });
      return;
    }

    if (Math.ceil((edges || []).length / first) - 1 > current) {
      this.setState({ current: newCurrent });
      return;
    }

    this.setState(
      {
        current: newCurrent,
        loading: true,
      },
      () =>
        fetchMore({
          query,
          variables: {
            ...variables,
            cursor: endCursor,
            first,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (
              (idx(fetchMoreResult, _ => _.viewer.ecfitOrders.edges) || [])
                .length > 0
            )
              return {
                ...previousResult,
                viewer: {
                  ...previousResult.viewer,
                  ecfitOrders: {
                    __typename: 'OrderConnection',
                    edges: [
                      ...(idx(
                        previousResult,
                        _ => _.viewer.ecfitOrders.edges,
                      ) || []),
                      ...(idx(
                        fetchMoreResult,
                        _ => _.viewer.ecfitOrders.edges,
                      ) || []),
                    ],
                    pageInfo: idx(
                      fetchMoreResult,
                      _ => _.viewer.ecfitOrders.pageInfo,
                    ),
                    total: idx(
                      fetchMoreResult,
                      _ => _.viewer.ecfitOrders.total,
                    ),
                  },
                },
              };

            this.setState({ loading: false });

            return previousResult;
          },
        }),
    );
  };

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
    createEcfitOrderMutation: createEcfitOrderType,
  ) => {
    const { variables } = this.props;
    const { isEnabled, selected } = this.state;
    const ecfitSentStatus = idx(variables, _ => _.filter.ecfitSentStatus);
    let isFail = false;

    cache.selected = [];
    this.setState({ selected: [], runningIds: selected });

    const successIds = (await Promise.all(
      selected.map(orderId =>
        createEcfitOrderMutation({
          variables: {
            input: { orderId },
          },
        }),
      ),
    )).reduce((result, { data: { createEcfitOrder: { status } } }, index) => {
      if (
        isEnabled &&
        ['FAIL_ECFIT_NOT_ENABLED', 'FAIL_ECFIT_NOT_AUTHORIZED'].includes(status)
      )
        isFail = true;

      if (
        ecfitSentStatus === 'NOT_SENT' ||
        (ecfitSentStatus === 'SENT_FAILED' && status === 'OK')
      )
        return [...result, selected[index]];

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
      fetchMore,
    } = this.props;

    await fetchMore({
      query,
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
                ).filter(
                  edges =>
                    // TODO: should not be null
                    !successIds.includes(
                      idx(edges, _ => _.node.id) || 'null id',
                    ),
                ),
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
  };

  public render(): React.ReactNode {
    const {
      // HOC
      t,

      // props
      variables,
      refetch,
      ecfitOrders,
      getStorePaymentList,
      getStoreShipmentList,
      sentFailedAmount,
    } = this.props;
    const { runningIds, selected, loading, current } = this.state;

    return (
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

          {selected.length === 0 ? null : (
            <div>
              <ChangeStatus selected={selected} />
            </div>

            /* TODO: T2701 */
            /* <Select value={t('more-operating.title')} size="large">
                {['export', 'print'].map(status => (
                  <Option key={status} value={status}>
                    {t(`more-operating.${status}`)}
                  </Option>
                ))}
              </Select> */
          )}
        </div>

        <div className={styles.root}>
          <div className={styles.filter}>
            <div>
              <AdvancedSearch
                variables={variables}
                refetch={refetch}
                getStorePaymentList={filter(
                  advancedSearchPaymentListFragment,
                  getStorePaymentList,
                )}
                getStoreShipmentList={filter(
                  advancedSearchShipmentListFragment,
                  getStoreShipmentList,
                )}
              />

              <Search
                className={styles.search}
                defaultValue={idx(variables, _ => _.filter.searchTerm) || ''}
                placeholder={t('filter.searchTerm')}
                onSearch={searchTerm =>
                  refetch({
                    ...variables,
                    filter: {
                      ...variables.filter,
                      searchTerm,
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
                  refetch({
                    ...variables,
                    filter: {
                      ecfitSentStatus: idx(
                        variables,
                        _ => _.filter.ecfitSentStatus,
                      ),
                    },
                  })
                }
              >
                {t('filter.reset')}
              </div>
            </div>

            <div />

            {(selected.length === 0 && runningIds.length === 0) ||
            idx(variables, _ => _.filter.ecfitSentStatus) ===
              'SENT_SUCCESSFUL' ? null : (
              <Mutation
                mutation={gql`
                  mutation createEcfitOrder($input: CreateEcfitOrderInput!) {
                    createEcfitOrder(input: $input) {
                      status
                    }
                  }
                `}
              >
                {(createEcfitOrderMutation: createEcfitOrderType) => (
                  <Button
                    onClick={() =>
                      this.updateCreateEcfitOrder(createEcfitOrderMutation)
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
              tagsPaymentListFragment,
              getStorePaymentList,
            )}
            getStoreShipmentList={filter(
              tagsShipmentListFragment,
              getStoreShipmentList,
            )}
          />

          <Orders
            selectOrders={selectedKeys => {
              cache.selected = selectedKeys;
              this.setState({ selected: selectedKeys });
            }}
            changePage={this.changePage}
            runningIds={runningIds}
            selected={selected}
            loading={loading}
            current={current}
            variables={variables}
            refetch={refetch}
            ecfitOrders={filter(ordersFragment, ecfitOrders)}
          />
        </div>
      </>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
export default React.memo(() => (
  <Query<getEcfitList, getEcfitListVariables>
    query={query}
    variables={
      {
        first: 10,
        filter: {
          ecfitSentStatus: 'NOT_SENT',
        },
      } as getEcfitListVariables
    }
  >
    {({ error, data, variables, fetchMore, refetch }) => {
      if (error) return <Spin indicator={<Icon type="loading" spin />} />;

      const ecfitOrders = idx(data, _ => _.viewer.ecfitOrders);
      const { getStorePaymentList = null, getStoreShipmentList = null } =
        data || {};

      if (!ecfitOrders || !getStorePaymentList || !getStoreShipmentList)
        return <Spin indicator={<Icon type="loading" spin />} />;

      if (
        variables.first !== cache.first ||
        !areEqual(variables.filter, cache.filter)
      ) {
        cache.first = variables.first;
        cache.filter = variables.filter;
        cache.current = 0;
      }

      return React.createElement(withNamespaces('orders-ecfit')(Container), {
        variables,
        fetchMore,
        refetch,
        ecfitOrders,
        // TODO: should not be null
        isEnabled:
          idx(data, _ => _.viewer.store.storeEcfitSettings.isEnabled) || false,
        getStorePaymentList,
        getStoreShipmentList,
        sentFailedAmount: idx(data, _ => _.viewer.sentFailedList.total) || 0,
      });
    }}
  </Query>
));
