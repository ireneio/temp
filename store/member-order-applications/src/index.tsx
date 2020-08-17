// typescript import
import { I18nPropsType } from '@meepshop/utils/lib/i18n';

// import
import React, { useContext } from 'react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';
import { Spin, Icon } from 'antd';
import transformColor from 'color';
import moment from 'moment';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import { Colors as ColorsContext } from '@meepshop/context';

import Application, { getApplicationStyles } from './Application';
import styles from './styles/index.less';

// graphql typescript
import {
  getMemberOrderApplications,
  getMemberOrderApplicationsVariables,
  getMemberOrderApplications_viewer_order as getMemberOrderApplicationsViewerOrder,
} from './__generated__/getMemberOrderApplications';

// graphql import
import {
  applicationOrderApplyFragment,
  applicationProductsObjectTypeFragment,
} from './Application';

// typescript definition
interface PropTypes extends I18nPropsType {
  order: getMemberOrderApplicationsViewerOrder;
}

// definition
const MemberOrderApplications = React.memo(
  ({ t, order: { orderNo, createdOn, applications } }: PropTypes) => {
    const colors = useContext(ColorsContext);

    return (
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
    );
  },
);

const EnhancedMemberOrderApplications = withTranslation(
  'member-order-applications',
)(MemberOrderApplications);

export default React.memo(({ orderId }: { orderId: string }) => (
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
      }

      ${applicationOrderApplyFragment}
      ${applicationProductsObjectTypeFragment}
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

      return <EnhancedMemberOrderApplications order={order} />;
    }}
  </Query>
));
