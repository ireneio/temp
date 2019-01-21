import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { withRouter } from 'next/router';
import { Spin, Icon, Progress, Button, message } from 'antd';
import Clipboard from 'clipboard';

import { contextProvider } from 'context';
import { ID_TYPE } from 'constants/propTypes';

import * as LOCALE from './locale';
import * as styles from './styles/index.less';

const { enhancer } = contextProvider(['locale', 'location', 'func']);

@enhancer
class ThankYouPage extends React.PureComponent {
  static propTypes = {
    orderId: ID_TYPE,
  };

  static defaultProps = {
    orderId: null,
  };

  otherRef = React.createRef();

  componentDidMount() {
    const { orderId, transformLocale } = this.props;

    if (!orderId)
      new Clipboard(this.otherRef.current.buttonNode).on('success', () => {
        message.success(transformLocale(LOCALE.COPY));
      });
  }

  render() {
    const {
      /** context */
      transformLocale,
      goTo,
      location: { href },

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
            {...(orderId ? {} : { status: 'exception', format: () => '!' })}
          />

          <h1>{transformLocale(LOCALE.TITLE(orderId))}</h1>

          <p>{transformLocale(LOCALE.INFO(orderId))}</p>

          <div className={styles.buttonRoot}>
            <Button onClick={() => goTo({ pathname: '/' })}>
              {transformLocale(LOCALE.GO_TO_HOME)}
            </Button>

            <Button
              {...(!orderId
                ? {
                    ref: this.otherRef,
                    'data-clipboard-text': `${transformLocale(
                      LOCALE.COPY_INFO,
                    )}${href}`,
                  }
                : {
                    onClick: () => goTo({ pathname: `/order/${orderId}` }),
                  })}
            >
              {transformLocale(
                !orderId ? LOCALE.COPY_DETAIL : LOCALE.ORDER_DETAIL,
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(({ router: { query: { orderId } } }) => (
  <Query
    query={gql`
      query getOrderInThankYouPage($orderId: ID!) {
        viewer {
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

      return <ThankYouPage orderId={data?.viewer.order?.id} />;
    }}
  </Query>
));
