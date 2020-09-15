// typescript import
import { MutationFunction } from '@apollo/react-common';

import { I18nPropsType } from '@meepshop/utils/lib/i18n';
import { PropsType as DataPickerPropsType } from '@admin/date-picker';

import { getEcfitListQueryPropsType } from './constants';

// import
import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from '@apollo/react-components';
import { filter } from 'graphql-anywhere';
import Router from 'next/router';
import { Spin, Icon, Radio, Input, Button, Badge, Modal } from 'antd';
import moment from 'moment';

import { withTranslation } from '@meepshop/utils/lib/i18n';
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
  getEcfitList_viewer_store_storePayments as getEcfitListViewerStoreStorePayments,
  getEcfitList_viewer_store_storeShipments as getEcfitListViewerStoreStoreShipments,
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
  advancedSearchStorePaymentFragment,
  advancedSearchStoreShipmentFragment,
} from './AdvancedSearch';
import { changeStatusOrderConnectionFragment } from './ChangeStatus';
import { tagsStorePaymentFragment, tagsStoreShipmentFragment } from './Tags';
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
  storePayments: getEcfitListViewerStoreStorePayments[];
  storeShipments: getEcfitListViewerStoreStoreShipments[];
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
    searchTerm: this.props.variables?.filter?.searchTerm || '',
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
    if (typeof window !== 'undefined')
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
    } = variables?.filter?.timeRange || {};

    return !start || !end ? undefined : [moment.unix(start), moment.unix(end)];
  };

  private datePickerChange = (
    timeRange: DataPickerPropsType['value'],
  ): void => {
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
    createEcfitOrderMutation: MutationFunction<
      createEcfitOrder,
      createEcfitOrderVariables
    >,
    setOrdersToSelectedOrdersMutation: MutationFunction<
      setOrdersToSelectedOrders,
      setOrdersToSelectedOrdersVariables
    >,
  ): Promise<void> => {
    const { variables, selectedOrders } = this.props;
    const { isEnabled } = this.state;
    const ecfitSentStatus = variables?.filter?.ecfitSentStatus;
    // SHOULD_NOT_BE_NULL
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
      const status = response?.data?.createEcfitOrder.status;

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
      ecfitOrders: {
        pageInfo: { endCursor },
      },
      selectedOrders: currentSelectedOrders,
      fetchMore,
    } = this.props;
    // SHOULD_NOT_BE_NULL
    const currentSelectedIds = currentSelectedOrders.edges.map(
      ({ node: { id } }) => id || 'null-id',
    );

    await fetchMore({
      variables: {
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
                ...(previousResult?.viewer.ecfitOrders?.edges || []).filter(
                  ({ node: { id } }) =>
                    !successIds.includes(
                      id || 'null id' /** SHOULD_NOT_BE_NULL */,
                    ),
                ),
                ...(fetchMoreResult?.viewer?.ecfitOrders?.edges || []),
              ],
              pageInfo: fetchMoreResult?.viewer?.ecfitOrders?.pageInfo,
              total: fetchMoreResult?.viewer?.ecfitOrders?.total,
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
      storePayments,
      storeShipments,
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

            <div className={styles.root}>
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
                            ecfitSentStatus: variables?.filter?.ecfitSentStatus,
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
                variables?.filter?.ecfitSentStatus ===
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
                storePayments={filter(tagsStorePaymentFragment, storePayments)}
                storeShipments={filter(
                  tagsStoreShipmentFragment,
                  storeShipments,
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

const EnhancedContainer = withTranslation('orders-ecfit')(Container);

// TODO: remove after print move to next-admin
if (
  typeof window !== 'undefined' &&
  moment().diff(
    moment(localStorage.getItem('selectedOrders-timeout') || undefined),
    'minutes',
    true,
  ) > 1
)
  localStorage.removeItem('ecfitOrders-variables');

const initVariables = (() => {
  // TODO: remove after orderlist move to next-admin
  if (typeof window !== 'undefined') {
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
              storePayments {
                ...advancedSearchStorePaymentFragment
                ...tagsStorePaymentFragment
              }
              storeShipments {
                ...advancedSearchStoreShipmentFragment
                ...tagsStoreShipmentFragment
              }
            }
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

        ${advancedSearchStorePaymentFragment}
        ${advancedSearchStoreShipmentFragment}
        ${changeStatusOrderConnectionFragment}
        ${tagsStorePaymentFragment}
        ${tagsStoreShipmentFragment}
        ${ordersOrderConnectionFragment}
        ${ordersPageInfoFragment}
      `}
      variables={initVariables}
      ssr={false}
    >
      {({ error, data, variables, fetchMore, refetch }) => {
        if (error) return <Spin indicator={<Icon type="loading" spin />} />;

        const ecfitOrders = data?.viewer?.ecfitOrders;
        const storePayments = data?.viewer?.store?.storePayments;
        const storeShipments = data?.viewer?.store?.storeShipments;
        const selectedOrders = data?.selectedOrders;

        if (
          !ecfitOrders ||
          !storePayments ||
          !storeShipments ||
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
              data?.viewer?.store?.storeEcfitSettings?.isEnabled ||
              false /** SHOULD_NOT_BE_NULL */
            }
            storePayments={storePayments}
            storeShipments={storeShipments}
            selectedOrders={selectedOrders}
            sentFailedAmount={data?.viewer?.sentFailedList?.total || 0}
          />
        );
      }}
    </Query>
  ),
);
