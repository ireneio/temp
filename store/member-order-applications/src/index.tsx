// typescript import
import { I18nPropsType } from '@store/utils/lib/i18n';

// import
import React from 'react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';
import { Spin, Icon } from 'antd';
import transformColor from 'color';
import moment from 'moment';

import { withTranslation } from '@store/utils/lib/i18n';

import Application, { getApplicationStyles } from './Application';
import styles from './styles/index.less';

// graphql typescript
import {
  getMemberOrderApplications,
  getMemberOrderApplicationsVariables,
  getMemberOrderApplications_viewer_order as getMemberOrderApplicationsViewerOrder,
  getMemberOrderApplications_getColorList as getMemberOrderApplicationsGetColorList,
} from './__generated__/getMemberOrderApplications';

// graphql import
import { colorListFragment } from '@store/apollo-client-resolvers/lib/ColorList';
import {
  applicationOrderApplyFragment,
  applicationProductsObjectTypeFragment,
} from './Application';

// typescript definition
interface PropTypes extends I18nPropsType {
  order: getMemberOrderApplicationsViewerOrder;
  colors: getMemberOrderApplicationsGetColorList['colors'];
}

// definition
const MemberOrderApplications = React.memo(
  ({ t, order: { orderNo, createdOn, applications }, colors }: PropTypes) => (
    <div className={styles.root}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
              .${styles.root} .ant-table-tbody > tr:hover > td {
                background: ${transformColor(colors[4]).alpha(0.1)};
              }

              ${getApplicationStyles(colors)}
            `,
        }}
      />
      <div>
        <h1>
          <span>
            {t('order-no')}
            {orderNo}
          </span>

          <span>
            <span>{t('order-date')}</span>

            {moment.unix(createdOn || 0).format('YYYY/MM/DD')}
          </span>
        </h1>
        {applications.map(app => (
          <Application
            // TODO: id should not be null
            key={app.id || 'null id'}
            data={app}
          />
        ))}
      </div>
    </div>
  ),
);

const EnhancedMemberOrderApplications = withTranslation(
  'member-order-applications',
)(MemberOrderApplications);

export default ({ orderId }: { orderId: string }): React.ReactElement => (
  <Query<getMemberOrderApplications, getMemberOrderApplicationsVariables>
    query={gql`
      query getMemberOrderApplications($orderId: ID!) {
        viewer {
          id
          order(orderId: $orderId) {
            id
            orderNo
            createdOn
            products {
              id
              ...applicationProductsObjectTypeFragment
            }

            applications @client {
              id
              ...applicationOrderApplyFragment
              extra {
                id
                ...applicationOrderApplyFragment
                product {
                  id
                  ...applicationProductsObjectTypeFragment
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
            id
            ...applicationOrderApplyFragment
          }
        }
        getColorList {
          ...colorListFragment
        }
      }

      ${applicationOrderApplyFragment}
      ${applicationProductsObjectTypeFragment}
      ${colorListFragment}
    `}
    variables={{
      orderId,
    }}
  >
    {({ loading, error, data }) => {
      if (loading || error)
        return <Spin indicator={<Icon type="loading" spin />} />;

      const order = data?.viewer?.order;
      const colors = data?.getColorList?.colors || [];

      if (!order) return <Spin indicator={<Icon type="loading" spin />} />;

      return <EnhancedMemberOrderApplications order={order} colors={colors} />;
    }}
  </Query>
);
