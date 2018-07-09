import React from 'react';
import radium from 'radium';

import { URL_TYPE, ALIGNMENT_TYPE } from 'constants/propTypes';

import { DEFAULT_URL, BRANDS } from './constants';

import FacebookIcon from './FacebookIcon';
import LineIcon from './LineIcon';
import TwitterIcon from './TwitterIcon';
import WeChatIcon from './WeChatIcon';
import WhatsAppIcon from './WhatsAppIcon';

import * as styles from './styles';

@radium
export default class SocialMedia extends React.PureComponent {
  static propTypes = {
    href: URL_TYPE,
    alignment: ALIGNMENT_TYPE.isRequired,
  };

  static defaultProps = {
    href: DEFAULT_URL,
  };

  render() {
    const { href, alignment } = this.props;
    const fill = '#fff';

    return (
      <div style={styles.root(alignment)}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${BRANDS.facebook.url}${href}`}
          style={styles.shareButton({
            fill,
            backgroundColor: BRANDS.facebook.color,
          })}
        >
          <FacebookIcon />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${BRANDS.line.url}${href}`}
          style={styles.shareButton({
            fill,
            backgroundColor: BRANDS.line.color,
          })}
        >
          <LineIcon />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${BRANDS.twitter.url}${href}`}
          style={styles.shareButton({
            fill,
            backgroundColor: BRANDS.twitter.color,
          })}
        >
          <TwitterIcon />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${BRANDS.weChat.url}${href}`}
          style={styles.shareButton({
            fill,
            backgroundColor: BRANDS.weChat.color,
          })}
        >
          <WeChatIcon />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${BRANDS.whatsApp.url}${href}`}
          style={styles.shareButton({
            fill: '#fff',
            backgroundColor: BRANDS.whatsApp.color,
          })}
        >
          <WhatsAppIcon />
        </a>
      </div>
    );
  }
}
