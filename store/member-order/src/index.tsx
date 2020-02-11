// typescript import
import { I18nPropsType } from '@store/utils/lib/i18n';

// import
import React from 'react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Spin, Icon } from 'antd';
import moment from 'moment';
import transformColor from 'color';

import { withTranslation } from '@store/utils/lib/i18n';
import { phoneMedia } from '@store/utils/lib/styles';

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
  getMemberOrder_getColorList as getMemberOrderGetColorList,
} from './__generated__/getMemberOrder';

// graphql import
import { colorListFragment } from '@store/apollo-client-resolvers/lib/ColorList';
import { notFoundFragment } from './NotFound';
import { productsFragment } from './Products';
import { totalSheetFragment } from './TotalSheet';
import { blocksFragment } from './blocks';
import { qaOrderMessageFragment } from './Qa';

// typescript definition
interface PropsType extends I18nPropsType {
  order: getMemberOrderViewerOrder;
  colors: getMemberOrderGetColorList['colors'];
}

// definition
const MemberOrder = React.memo(
  ({
    t,
    order: {
      orderNo,
      createdOn,
      products,
      environment,
      id,
      messages,
      ...order
    },
    colors,
  }: PropsType) => (
    <div className={styles.root} style={{ color: colors[3] }}>
      <div className={styles.wrapper}>
        <h1>
          <span>{`${t('order-number')}${orderNo || ''}`}</span>

          <span>
            <span>{t('created-on')}</span>

            {moment.unix(createdOn || 0).format('YYYY/MM/DD')}
          </span>
        </h1>

        <Products products={products} colors={colors} />

        <TotalSheet order={filter(totalSheetFragment, { ...order, id })} />

        <Blocks
          order={filter(blocksFragment, { ...order, id })}
          colors={colors}
        />

        {environment?.sourcePage === 'lp' ? null : (
          <Qa
            messages={filter(qaOrderMessageFragment, messages)}
            orderId={id}
            colors={colors}
          />
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media ${phoneMedia} {
              .${styles.root} h1 > span:last-child {
                color: ${transformColor(colors[3]).alpha(0.5)};
              }
            }
          `,
        }}
      />
    </div>
  ),
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
            createdOn
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
        getColorList {
          ...colorListFragment
        }
      }
      ${notFoundFragment}
      ${productsFragment}
      ${totalSheetFragment}
      ${blocksFragment}
      ${qaOrderMessageFragment}
      ${colorListFragment}
    `}
    variables={{ orderId }}
  >
    {({ loading, error, data }) => {
      if (loading || error)
        return <Spin indicator={<Icon type="loading" spin />} />;

      const order = data?.viewer?.order;
      const colors = data?.getColorList?.colors || [];

      if (!order) {
        return <NotFound user={filter(notFoundFragment, data?.viewer)} />;
      }

      return <EnhancedMemberOrder colors={colors} order={order} />;
    }}
  </Query>
);
