// typescript import
import { I18nPropsType } from '@meepshop/utils/lib/i18n';

// import
import React, { useContext } from 'react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Spin, Icon } from 'antd';
import moment from 'moment';
import transformColor from 'color';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import { Colors as ColorsContext } from '@meepshop/context';

import NotFound from './NotFound';
import Products from './Products';
import TotalSheet from './TotalSheet';
import Blocks from './blocks';
import Qa from './Qa';
import styles from './styles/index.less';

// graphql typescript
import {
  getMemberOrder,
  getMemberOrderVariables,
  getMemberOrder_viewer_order as getMemberOrderViewerOrder,
} from '@meepshop/types/gqls/store';

// graphql import
import { notFoundFragment } from './NotFound';
import { productsFragment } from './Products';
import { totalSheetFragment } from './TotalSheet';
import { blocksFragment } from './blocks';
import { qaOrderMessageFragment } from './Qa';

// typescript definition
interface PropsType extends I18nPropsType {
  order: getMemberOrderViewerOrder;
}

// definition
const MemberOrder = React.memo(
  ({
    t,
    order: {
      orderNo,
      createdAt,
      products,
      environment,
      id,
      messages,
      ...order
    },
  }: PropsType) => {
    const colors = useContext(ColorsContext);

    return (
      <div className={styles.root} style={{ color: colors[3] }}>
        <div className={styles.wrapper}>
          <h1>
            <span>{`${t('order-number')}${orderNo || ''}`}</span>

            <span>
              <span>{t('created-at')}</span>

              {moment(createdAt).format('YYYY/MM/DD')}
            </span>
          </h1>

          <Products products={products} />

          <TotalSheet order={filter(totalSheetFragment, { ...order, id })} />

          <Blocks order={filter(blocksFragment, { ...order, id })} />

          {environment?.sourcePage === 'lp' ? null : (
            <Qa
              messages={filter(qaOrderMessageFragment, messages)}
              orderId={id}
            />
          )}
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media (max-width: ${styles.screenSmMax}) {
                .${styles.root} h1 > span:last-child {
                  color: ${transformColor(colors[3]).alpha(0.5)};
                }
              }
            `,
          }}
        />
      </div>
    );
  },
);

const EnhancedMemberOrder = withTranslation('member-order')(MemberOrder);

export default ({ orderId }: { orderId: string }): React.ReactElement => (
  <Query<getMemberOrder, getMemberOrderVariables>
    query={gql`
      query getMemberOrder($orderId: ID!) {
        viewer {
          id
          ...notFoundFragment
          order(orderId: $orderId) {
            id
            orderNo
            createdAt
            products {
              ...productsFragment
            }
            environment {
              sourcePage
            }
            messages {
              ...qaOrderMessageFragment
            }
            ...totalSheetFragment
            ...blocksFragment
          }
        }
      }

      ${notFoundFragment}
      ${productsFragment}
      ${totalSheetFragment}
      ${blocksFragment}
      ${qaOrderMessageFragment}
    `}
    variables={{ orderId }}
  >
    {({ loading, error, data }) => {
      if (loading || error)
        return <Spin indicator={<Icon type="loading" spin />} />;

      const order = data?.viewer?.order;

      if (!order) {
        return <NotFound user={filter(notFoundFragment, data?.viewer)} />;
      }

      return <EnhancedMemberOrder order={order} />;
    }}
  </Query>
);
