import React from 'react';
import radium from 'radium';

import * as styles from './styles/taiwansoapLogin';

// TODO: add dynamic
@radium
export default class TaiwansoapLogin extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div style={styles.root}>
        ● 持有阿原貴賓卡者，使用生日優惠
        <a style={styles.link} href="http://www.eshop.yuansoap.com/pages/terms">
          請點此
        </a>
        前往說明
        <br />
        ● 欲累積直營門市集點與官方商城消費者，請來信
        <br />
        <a style={styles.link} href="mailto:yuandgmk@taiwansoap.com.tw">
          yuandgmk@taiwansoap.com.tw
        </a>
        {' 或於上班時段洽詢 '}
        <a style={styles.link} href="tel:0800055680">
          0800-055680
        </a>
      </div>
    );
  }
}
