import Clipboard from 'clipboard';
import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot, Style } from 'radium';
import { Progress, Button, message } from 'antd';

import { enhancer } from 'layout/DecoratorsRoot';
import { ID_TYPE, LOCATION_TYPE } from 'constants/propTypes';

import * as styles from './styles';
import * as LOCALE from './locale';

@enhancer
@radium
export default class ThankYouPage extends React.PureComponent {
  static propTypes = {
    /** context */
    location: LOCATION_TYPE.isRequired,
    transformLocale: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,

    /** props */
    orderId: ID_TYPE.isRequired,
  };

  state = {
    percent: 10,
    orderExist: false,
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      const {
        location: {
          query: { firstPurchase },
        },
        dispatchAction,
        orderId,
      } = this.props;
      const { percent, orderExist } = this.state;

      if (this.isUnmounted || percent === 100) return clearInterval(this.timer);

      if (orderExist) {
        if (firstPurchase === 'true') dispatchAction('getAuth');
        else dispatchAction('getOrder', { orderId });

        return this.setState({ percent: 100 });
      } else if (!this.checking && percent < 100) this.checkExist();

      return this.setState({ percent: percent + 1 });
    }, (3 * 1000) / 100);
  }

  componentDidUpdate() {
    const { percent, orderExist } = this.state;

    if (percent === 100 && !orderExist) {
      const { transformLocale } = this.props;
      const clipboard = new Clipboard(document.querySelector('#other-button'));

      clipboard.on('success', () => {
        message.success(transformLocale(LOCALE.COPY));
      });
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  getStatus = () => {
    const { percent, orderExist } = this.state;

    if (percent < 100) return 'checking';
    else if (!orderExist) return 'fail';

    return 'success';
  };

  checkExist = async () => {
    const { getData, orderId } = this.props;

    this.checking = true;

    const { data: result } = await getData(`
      query {
        getOrderList(search: {
          filter: {
            and: [{
              type: "ids"
              ids: ["${orderId}"]
            }]
          }
        }) {
          total
        }
      }
    `);

    this.checking = false;

    if (this.isUnmounted) return;
    if (result.getOrderList.total === 1) this.setState({ orderExist: true });
  };

  checking = false;

  render() {
    const { location, transformLocale, goTo, orderId } = this.props;
    const { percent } = this.state;
    const status = this.getStatus();
    const { href } = location;

    return (
      <div style={styles.root} className="thank-you-page">
        <Style scopeSelector=".thank-you-page" rules={styles.modifyAntdStyle} />

        <div style={styles.header} />

        <div>
          <Progress
            type="circle"
            percent={percent}
            width={status === 'checking' ? 120 : 72}
            {...{
              fail: { status: 'exception', format: () => '!' },
            }[status]}
          />

          {status === 'checking' ? null : (
            <StyleRoot style={styles.title}>
              {transformLocale(LOCALE.TITLE[status])}
            </StyleRoot>
          )}

          <StyleRoot style={styles.info}>
            {transformLocale(LOCALE.INFO[status])}
          </StyleRoot>

          {status === 'checking' ? null : (
            <StyleRoot style={styles.buttonRoot}>
              <Button
                id="go-to-home-button"
                onClick={() => goTo({ pathname: '/' })}
              >
                {transformLocale(LOCALE.GO_TO_HOME)}
              </Button>

              <Button
                id="other-button"
                {...(status === 'fail'
                  ? {
                      'data-clipboard-text': `${transformLocale(
                        LOCALE.COPY_INFO,
                      )}${href}`,
                    }
                  : {
                      onClick: () => goTo({ pathname: `/order/${orderId}` }),
                    })}
              >
                {transformLocale(
                  status === 'fail' ? LOCALE.COPY_DETAIL : LOCALE.ORDER_DETAIL,
                )}
              </Button>
            </StyleRoot>
          )}
        </div>
      </div>
    );
  }
}
