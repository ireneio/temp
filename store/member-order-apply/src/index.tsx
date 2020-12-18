// typescript import
import { MutationFunction } from '@apollo/react-common';

import { I18nPropsType } from '@meepshop/utils/lib/i18n';
import { ColorsType } from '@meepshop/context';

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

// graphql import
import { productsObjectTypeOrderApplyFragment } from '@store/apollo/lib/productsObjectType';
import {
  createOrderApplyWithOrderOrderClientFragment,
  createOrderApplyWithOrderOrderFragment,
  createOrderApplyWithOrderOrderApplyFragment,
} from '@store/apollo/lib/createOrderApplyWithOrder';

import {
  productsProductsObjectTypeFragment,
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
        orderId: id,
        createOrderApplyList: {
          applicationType: type === 'refund' ? 'return' : 'replace',
          orderId: id || 'null id' /** SHOULD_NOT_BE_NULL */,
          orderProducts: selectedProducts.map(
            ({
              id: productId,
              reason: comment,
              quantitySelected: quantity,
            }) => ({
              id: productId || 'null id' /** SHOULD_NOT_BE_NULL */,
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

  public render(): React.ReactNode {
    const {
      /** HOC */
      t,

      /** props */
      order: { orderNo, createdAt, ...order },
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
            <span>{t('created-at')}</span>

            {moment(createdAt).format('YYYY/MM/DD')}
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
                $orderId: ID!
              ) {
                createOrderApplyList(
                  createOrderApplyList: $createOrderApplyList
                ) {
                  id
                  ...createOrderApplyWithOrderOrderApplyFragment
                }

                createOrderApplyWithOrder(orderId: $orderId) @client {
                  id
                  ...createOrderApplyWithOrderOrderClientFragment
                }
              }

              ${createOrderApplyWithOrderOrderApplyFragment}
              ${createOrderApplyWithOrderOrderClientFragment}
            `}
            update={() => {
              Router.push('/orders');
            }}
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
              createdAt
              products {
                id
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
              ...createOrderApplyWithOrderOrderFragment
            }
          }

          # TODO: use new api
          getOrderApplyList(
            search: { sort: [{ field: "createdAt", order: "desc" }] }
          ) {
            data {
              ...createOrderApplyWithOrderOrderApplyFragment
              ...productsObjectTypeOrderApplyFragment
            }
          }
        }

        ${createOrderApplyWithOrderOrderFragment}
        ${createOrderApplyWithOrderOrderApplyFragment}
        ${productsObjectTypeOrderApplyFragment}
        ${productsProductsObjectTypeFragment}
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
