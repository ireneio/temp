import React from 'react';
import PropTypes from 'prop-types';

import { enhancer } from 'layout/DecoratorsRoot';
import { ALIGNMENT_TYPE, COLOR_TYPE } from 'constants/propTypes';

import { Facebook, Line, Wechat, Twitter } from './ShareButtons';
import styles from './styles/index.less';

@enhancer
export default class SocialMedia extends React.PureComponent {
  static propTypes = {
    /** props */
    alignItems: ALIGNMENT_TYPE.isRequired,
    color: COLOR_TYPE.isRequired,
    /** test 0,1,2,3 */
    iconStyle: PropTypes.number.isRequired,
    enableFacebook: PropTypes.bool.isRequired,
    enableLine: PropTypes.bool.isRequired,
    enableTwitter: PropTypes.bool.isRequired,
    enableWechat: PropTypes.bool.isRequired,
  };

  render() {
    const {
      location: { href },
      alignItems,
      color,
      iconStyle,
      enableFacebook,
      enableLine,
      enableTwitter,
      enableWechat,
    } = this.props;

    const props = {
      url: `https://${href}`,
      iconStyle,
      color,
    };

    return (
      <div className={`${styles.root} ${styles[alignItems]}`}>
        {enableFacebook && <Facebook {...props} />}
        {enableLine && <Line {...props} />}
        {enableWechat && <Wechat {...props} />}
        {enableTwitter && <Twitter {...props} />}
      </div>
    );
  }
}
