// typescript import
import { MutationFunction } from '@apollo/react-common';
import { DataProxy } from 'apollo-cache';

import { I18nPropsType } from '@meepshop/utils/lib/i18n';
import { ColorsType } from '@meepshop/context/lib/Colors';

import { PropsType as FormPropsType } from './Form';

// import
import React from 'react';
import { Query, Mutation } from '@apollo/react-components';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import Router from 'next/router';
import { Spin, Icon, Button, message } from 'antd';
import moment from 'moment';
import transformColor from 'color';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import { Colors as ColorsContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';
import {
  calculateOrderApply,
  calculateOrderProducts,
  calculateOrderApplications,
} from '@store/apollo/lib/utils/calculateOrder';

import Products, { getProductsStyles } from './Products';
import Form from './Form';
import styles from './styles/index.less';

// graphql typescript
import {
  getMemberOrderApply,
  getMemberOrderApplyVariables,
  getMemberOrderApply_viewer_order as getMemberOrderApplyViewerOrder,
} from './__generated__/getMemberOrderApply';
import {
  createOrderApply,
  createOrderApplyVariables,
} from './__generated__/createOrderApply';
import { getOrderCache } from './__generated__/getOrderCache';
import { memberOrderApplyFragment } from './__generated__/memberOrderApplyFragment';

// graphql import
import {
  calculateOrderOrderFragment,
  calculateOrderOrderApplyListFragment,
} from '@store/apollo/lib/utils/calculateOrder';

import {
  productsProductsObjectTypeFragment,
  productsOrderApplyFragment,
  SelectedProduct,
} from './Products';

// typescript definition
interface PropsType extends I18nPropsType {
  type: 'refund' | 'exchange';
  order: getMemberOrderApplyViewerOrder;
  colors: ColorsType;
}

interface StateType {
  selectedProducts: SelectedProduct[];
  checking: boolean;
  replaceRecipient: FormPropsType['recipient'];
}

// definition
class MemberOrderApply extends React.PureComponent<PropsType, StateType> {
  public state: StateType = {
    selectedProducts: [],
    checking: false,
    replaceRecipient: {
      // eslint-disable-next-line react/destructuring-assignment
      name: this.props.order.shipmentInfo?.list?.[0]?.recipient?.name || '',
      // eslint-disable-next-line react/destructuring-assignment
      mobile: this.props.order.shipmentInfo?.list?.[0]?.recipient?.mobile || '',
      address: this.props?.order.address?.fullAddress || '',
    },
  };

  // TODO: createOrderApplyVariables 與實際參數不相符
  private submit = (
    createApplication: MutationFunction<createOrderApply>,
  ) => () => {
    const {
      /** HOC */
      t,

      /** props */
      type,
      order: { id },
    } = this.props;
    const { checking, selectedProducts, replaceRecipient } = this.state;

    if (selectedProducts.length === 0)
      return message.info(t(`warning.${type}`));

    if (!checking) return this.setState({ checking: true });

    return createApplication({
      variables: {
        createOrderApplyList: {
          applicationType: type === 'refund' ? 'return' : 'replace',
          orderId: id || 'null id' /** TODO: should be not null */,
          orderProducts: selectedProducts.map(
            ({
              id: productId,
              reason: comment,
              quantitySelected: quantity,
            }) => ({
              id: productId || 'null id' /** TODO: should be not null */,
              quantity,
              applicationInfo: {
                comment,
              },
            }),
          ),
          ...(type !== 'exchange'
            ? null
            : {
                recipient: {
                  name: replaceRecipient.name,
                  mobile: replaceRecipient.mobile,
                  address: {
                    streetAddress: replaceRecipient.address,
                  },
                },
              }),
        },
      },
    });
  };

  private updateApplications = (
    store: DataProxy,
    { data: { createOrderApplyList } }: { data: createOrderApply },
  ): void => {
    const {
      order: { id },
    } = this.props;

    const query = gql`
      query getOrderCache($orderId: ID!) {
        viewer {
          id
          order(orderId: $orderId) {
            id
            ...calculateOrderOrderFragment
          }
        }

        getOrderApplyList(
          search: { size: 100, sort: [{ field: "createdOn", order: "desc" }] }
        ) {
          ...calculateOrderOrderApplyListFragment
        }
      }

      ${calculateOrderOrderFragment}
      ${calculateOrderOrderApplyListFragment}
    `;

    const cache = store.readQuery<getOrderCache>({
      query,
      variables: {
        orderId: id,
      },
    });

    const Applications = cache?.getOrderApplyList?.data;

    if (!Applications || !createOrderApplyList) return;

    const getOrderApplyList = {
      __typename: 'OrderApplyList' as 'OrderApplyList',
      data: [...createOrderApplyList, ...Applications],
    };

    store.writeQuery<getOrderCache>({
      query,
      data: {
        getOrderApplyList,
      } as getOrderCache,
    });

    const order = cache?.viewer?.order;

    if (!id || !order) return;

    store.writeFragment<memberOrderApplyFragment>({
      id,
      fragment: gql`
        fragment memberOrderApplyFragment on Order {
          status
          isOrderApplied @client
          isAvailableForOrderApply @client
          products {
            id
            unappliedQuantity @client
          }

          applications @client {
            id
            orderId
            orderProductId
            returnId
            applicationType
            createdOn
            recipient {
              name
              mobile
              address {
                streetAddress
              }
            }
            applicationInfo {
              comment
            }
            quantity
            status
            applicationStatus
            extra {
              id
              orderId
              orderProductId
              returnId
              applicationType
              createdOn
              recipient {
                name
                mobile
                address {
                  streetAddress
                }
              }
              applicationInfo {
                comment
              }
              quantity
              status
              applicationStatus
              product {
                id
                quantity
                type
                coverImage {
                  scaledSrc {
                    w60
                    w120
                    w240
                    w480
                    w720
                    w960
                    w1200
                    w1440
                    w1680
                    w1920
                  }
                }
                title {
                  zh_TW
                  en_US
                  ja_JP
                  vi_VN
                  fr_FR
                  es_ES
                  th_TH
                  id_ID
                }
                specs {
                  title {
                    zh_TW
                    en_US
                    ja_JP
                    vi_VN
                    fr_FR
                    es_ES
                    th_TH
                    id_ID
                  }
                }
              }
            }
          }
        }
      `,
      data: {
        __typename: 'Order',
        status: 3,
        products: calculateOrderProducts(order, getOrderApplyList),
        applications: calculateOrderApplications(order, getOrderApplyList),
        ...calculateOrderApply(order, getOrderApplyList),
      } as memberOrderApplyFragment,
    });

    Router.push('/orders');
  };

  public render(): React.ReactNode {
    const {
      /** HOC */
      t,

      /** props */
      order: { orderNo, createdOn, ...order },
      colors,
      type,
    } = this.props;
    const { checking, selectedProducts, replaceRecipient } = this.state;

    return (
      <div className={styles.root}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media (max-width: ${styles.screenSmMax}) {
                .${styles.root} h1 > span:last-child {
                  color: ${transformColor(colors[3]).alpha(0.5)};
                }
              }

              ${getProductsStyles(colors)}
            `,
          }}
        />

        <h1>
          <span>
            {t('order-no')}
            {orderNo}
          </span>

          <span>
            <span>{t('created-on')}</span>

            {moment.unix(createdOn || 0).format('YYYY/MM/DD')}
          </span>
        </h1>

        {type !== 'exchange' || !checking ? null : (
          <div className={styles.replaceInfo}>
            {[
              {
                key: 'name',
                children: `${t('recipient.name')}：${replaceRecipient?.name ||
                  ''}`,
              },
              {
                key: 'mobile',
                children: `${t(
                  'recipient.mobile',
                )}：${replaceRecipient?.mobile || ''}`,
              },
              {
                key: 'address',
                children: `${t(
                  'recipient.address',
                )}：${replaceRecipient?.address || ''}`,
              },
            ].map(props => (
              <p {...props} />
            ))}
          </div>
        )}

        <Products
          products={filter(productsProductsObjectTypeFragment, order.products)}
          type={type}
          checking={checking}
          onChange={newProducts =>
            this.setState({ selectedProducts: newProducts })
          }
          selectedProducts={checking ? selectedProducts : []}
        />

        {type !== 'exchange' || checking ? null : (
          <Form
            recipient={replaceRecipient}
            onChange={(value: FormPropsType['recipient']) =>
              this.setState({ replaceRecipient: value })
            }
          />
        )}

        <div className={styles.buttonRoot}>
          <Button
            style={{
              color: colors[3],
              borderColor: colors[3],
            }}
            onClick={() =>
              checking
                ? this.setState({ checking: false })
                : Router.push('/orders')
            }
            size="large"
          >
            {t('recede')}
          </Button>

          <Mutation<createOrderApply, createOrderApplyVariables>
            mutation={gql`
              mutation createOrderApply(
                $createOrderApplyList: [NewOrderApply]
              ) {
                createOrderApplyList(
                  createOrderApplyList: $createOrderApplyList
                ) {
                  ...productsOrderApplyFragment
                }
              }

              ${productsOrderApplyFragment}
            `}
            update={this.updateApplications}
          >
            {createApplication => (
              <Button
                style={{
                  color: colors[3],
                  borderColor: colors[3],
                }}
                onClick={this.submit(createApplication)}
                size="large"
              >
                {t('proceed')}
              </Button>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

const EnhancedMemberOrderApply = withTranslation('member-order-apply')(
  withContext(ColorsContext, colors => ({ colors }))(MemberOrderApply),
);

export default React.memo(
  ({ type, orderId }: { type: 'refund' | 'exchange'; orderId: string }) => (
    <Query<getMemberOrderApply, getMemberOrderApplyVariables>
      query={gql`
        query getMemberOrderApply($orderId: ID!) {
          viewer {
            id
            order(orderId: $orderId) {
              id
              orderNo
              createdOn
              products {
                ...productsProductsObjectTypeFragment
              }
              shipmentInfo {
                list {
                  id
                  recipient {
                    name
                    mobile
                  }
                }
              }
              address {
                fullAddress
              }
            }
          }

          # TODO: use new api
          getOrderApplyList(
            search: { size: 100, sort: [{ field: "createdOn", order: "desc" }] }
          ) {
            data {
              ...productsOrderApplyFragment
            }
          }
        }

        ${productsProductsObjectTypeFragment}
        ${productsOrderApplyFragment}
      `}
      variables={{
        orderId,
      }}
    >
      {({ loading, error, data }) => {
        if (loading || error)
          return <Spin indicator={<Icon type="loading" spin />} />;

        const order = data?.viewer?.order;

        if (!order) return <Spin indicator={<Icon type="loading" spin />} />;

        return <EnhancedMemberOrderApply type={type} order={order} />;
      }}
    </Query>
  ),
);
