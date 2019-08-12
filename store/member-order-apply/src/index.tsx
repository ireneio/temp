// typescript import
import { I18nPropsType } from '@store/utils/lib/i18n';
import { MutationFn } from 'react-apollo';
import { DataProxy } from 'apollo-cache';

// import
import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { filter } from 'graphql-anywhere';
import Router from 'next/router';
import { Spin, Icon, Button, message } from 'antd';
import moment from 'moment';
import transformColor from 'color';
import idx from 'idx';

import { withNamespaces } from '@store/utils/lib/i18n';
import {
  calculateOrderApply,
  calculateOrderProducts,
  calculateOrderApplications,
} from '@store/apollo-client-resolvers/lib/utils/calculateOrder';

import Products, { getProductsStyles } from './Products';
import Form from './Form';
import styles from './styles/index.less';

// graphql typescript
import {
  getMemberOrderApply,
  getMemberOrderApplyVariables,
  getMemberOrderApply_viewer_order as getMemberOrderApplyViewerOrder,
  getMemberOrderApply_getColorList as getMemberOrderApplyGetColorList,
} from './__generated__/getMemberOrderApply';
import {
  createOrderApply,
  createOrderApplyVariables,
} from './__generated__/createOrderApply';
import { getOrderCache } from './__generated__/getOrderCache';
import { RecipientCreateType } from '../../../__generated__/store';

// graphql import
import { colorListFragment } from '@store/apollo-client-resolvers/lib/ColorList';
import {
  calculateOrderOrderFragment,
  calculateOrderOrderApplyListFragment,
} from '@store/apollo-client-resolvers/lib/utils/calculateOrder';
import {
  productsProductsObjectTypeFragment,
  productsOrderApplyFragment,
  SelectedProduct,
} from './Products';
import { formFragment } from './Form';

// typescript definition
interface PropsType extends I18nPropsType {
  type: 'refund' | 'exchange';
  order: getMemberOrderApplyViewerOrder;
  colors: getMemberOrderApplyGetColorList['colors'];
}

interface StateType {
  selectedProducts: SelectedProduct[];
  checking: boolean;
  replaceRecipient: RecipientCreateType;
}

// definition
class MemberOrderApply extends React.PureComponent<PropsType, StateType> {
  public state: StateType = {
    selectedProducts: [],
    checking: false,
    replaceRecipient: {
      name:
        idx(this, _ => _.props.order.shipmentInfo.list[0].recipient.name) || '',
      mobile:
        idx(this, _ => _.props.order.shipmentInfo.list[0].recipient.mobile) ||
        '',
      address: {
        streetAddress:
          idx(
            this,
            _ =>
              _.props.order.shipmentInfo.list[0].recipient.address
                .streetAddress,
          ) || '',
      },
    },
  };

  // TODO: createOrderApplyVariables 與實際參數不相符
  private submit = (createApplication: MutationFn<createOrderApply>) => () => {
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
                recipient: replaceRecipient,
              }),
        },
      },
    });
  };

  private updateApplications = (
    store: DataProxy,
    { data: { createOrderApplyList } }: { data: createOrderApply },
  ) => {
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

    const Applications = idx(cache, _ => _.getOrderApplyList.data);

    if (!Applications || !createOrderApplyList) return;

    const getOrderApplyList = {
      __typename: 'OrderApplyList' as 'OrderApplyList',
      data: [...createOrderApplyList, ...Applications],
    };

    store.writeQuery({
      query,
      data: {
        getOrderApplyList,
      },
    });

    const order = idx(cache, _ => _.viewer.order);

    if (!id || !order) return;

    store.writeFragment({
      id,
      fragment: gql`
        fragment updateOrder on Order {
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
                coverImage {
                  src
                }
                title {
                  ...localeFragment
                }
                specs {
                  title {
                    ...localeFragment
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
      },
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
              @media ${styles.phoneMedia} {
                .${styles.root} h1 > font:last-child {
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
                children: `${t('recipient.name')}：${idx(
                  replaceRecipient,
                  _ => _.name,
                ) || ''}`,
              },
              {
                key: 'mobile',
                children: `${t('recipient.mobile')}：${idx(
                  replaceRecipient,
                  _ => _.mobile,
                ) || ''}`,
              },
              {
                key: 'address',
                children: `${t('recipient.address')}：${idx(
                  replaceRecipient,
                  _ => _.address.streetAddress,
                ) || ''}`,
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
            onChange={(value: RecipientCreateType) =>
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

const EnhancedMemberOrderApply = withNamespaces('member-order-apply')(
  MemberOrderApply,
);

export default ({
  type,
  orderId,
}: {
  type: 'refund' | 'exchange';
  orderId: string;
}) => (
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
                  ...formFragment
                }
              }
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

        getColorList {
          ...colorListFragment
        }
      }

      ${productsProductsObjectTypeFragment}
      ${productsOrderApplyFragment}
      ${formFragment}
      ${colorListFragment}
    `}
    variables={{
      orderId,
    }}
  >
    {({ loading, error, data }) => {
      if (loading || error)
        return <Spin indicator={<Icon type="loading" spin />} />;

      const order = idx(data, _ => _.viewer.order);
      const colors = idx(data, _ => _.getColorList.colors) || [];

      if (!order) return <Spin indicator={<Icon type="loading" spin />} />;

      return (
        <EnhancedMemberOrderApply type={type} order={order} colors={colors} />
      );
    }}
  </Query>
);
