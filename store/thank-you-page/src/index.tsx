// typescript import
import { I18nPropsType } from '@store/utils/lib/i18n';

// import
import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import Router from 'next/router';
import { Spin, Icon, Progress, Button, message } from 'antd';
import Clipboard from 'clipboard';
import idx from 'idx';

import { withNamespaces } from '@store/utils/lib/i18n';
import getLinkProps from '@store/utils/lib/getLinkProps';

import styles from './styles/index.less';

// graphql typescript
import { getOrderInThankYouPage } from './__generated__/getOrderInThankYouPage';

// graphql import

// typescript definition
interface PropsType extends I18nPropsType {
  orderId?: string | null;
  href: string;
}

// definition
class ThankYouPage extends React.PureComponent<PropsType> {
  public componentDidMount = () => {
    const { t, href, orderId } = this.props;

    if (!orderId)
      new Clipboard('button[role="copy"]', {
        text: () => `${t('data-error')}${href}`,
      }).on('success', () => {
        message.success(t('copied'));
      });
  };

  public render(): React.ReactNode {
    const {
      /** HOC */
      t,

      /** props */
      orderId,
    } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.header} />

        <div>
          <Progress
            type="circle"
            percent={100}
            width={72}
            {...(!orderId ? { status: 'exception', format: () => '!' } : {})}
          />

          <h1>{!orderId ? t('title.error') : t('title.default')}</h1>

          <p>{!orderId ? t('info.error') : t('info.default')}</p>

          <div className={styles.buttonRoot}>
            <Button onClick={() => Router.push('/')}>{t('return')}</Button>

            <Button
              {...(!orderId
                ? {
                    role: 'copy',
                  }
                : {
                    onClick: () => {
                      const { href, as: asHref } = getLinkProps(
                        `/order/${orderId}`,
                      );

                      Router.push(href, asHref);
                    },
                  })}
            >
              {!orderId ? t('copy') : t('order')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const EnhancedThankYouPage = withNamespaces('thank-you-page')(ThankYouPage);

export default ({ orderId, href }: { orderId: string; href: string }) => (
  <Query<getOrderInThankYouPage>
    query={gql`
      query getOrderInThankYouPage($orderId: ID!) {
        viewer {
          id
          order(orderId: $orderId) {
            id
          }
        }
      }
    `}
    variables={{
      orderId,
    }}
  >
    {({ loading, data }) => {
      if (loading) return <Spin indicator={<Icon type="loading" spin />} />;

      return (
        <EnhancedThankYouPage
          orderId={idx(data, _ => _.viewer.order.id)}
          href={href}
        />
      );
    }}
  </Query>
);
