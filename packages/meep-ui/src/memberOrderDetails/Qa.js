import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import moment from 'moment';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE, ID_TYPE } from 'constants/propTypes';
import findDOMTop from 'utils/findDOMTop';

import * as styles from './styles/qa';
import * as LOCALE from './locale';

@enhancer
@radium
export default class Qa extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,
    orderId: ID_TYPE.isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        bearer: PropTypes.oneOf(['CUSTOMER', 'STORE']),
        createdAt: PropTypes.instanceOf(Date),
      }),
    ).isRequired,
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    messages: this.props.messages,
    text: '',
  };

  componentDidMount() {
    if (window.location.hash === '#qa') {
      setTimeout(() => {
        window.scrollTo(0, findDOMTop(document.getElementById('qa')));
      }, 2);
    }
  }

  addOrderMessage = () => {
    const { dispatchAction, orderId } = this.props;
    const { text, messages } = this.state;

    dispatchAction('addOrderMessage', { text, orderId });
    messages.push({ text, bearer: 'CUSTOMER', createdAt: new Date() });
    this.setState({ text: '' });
  };

  render() {
    const { colors, transformLocale } = this.props;
    const { text, messages } = this.state;

    return (
      <div style={styles.root}>
        <div style={styles.header(colors)}>{transformLocale(LOCALE.QA)}</div>
        <div style={styles.content(colors)}>
          {messages.map(message => {
            if (message.bearer === 'CUSTOMER') {
              return (
                <div style={styles.flexRight} key={message.createdAt}>
                  <div style={styles.frame(colors[5])}>
                    {message.text}
                    <div style={styles.time(colors)}>
                      {moment(message.createdAt).format('YYYY/MM/DD HH:mm')}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div style={styles.frame(colors[4])} key={message.createdAt}>
                {message.text}
                <div style={styles.time(colors)}>
                  {moment(message.createdAt).format('YYYY/MM/DD HH:mm')}
                </div>
              </div>
            );
          })}
        </div>
        <textarea
          id="qa"
          placeholder={transformLocale(LOCALE.PLEASE_WRITE_MESSAGE)}
          style={styles.textarea(colors)}
          value={text}
          onChange={e => this.setState({ text: e.target.value })}
        />
        <div style={styles.footer}>
          <div
            style={styles.button(colors, text)}
            onClick={text ? () => this.addOrderMessage() : null}
          >
            {transformLocale(LOCALE.SEND)}
          </div>
        </div>
      </div>
    );
  }
}
