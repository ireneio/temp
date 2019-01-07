import React from 'react';
import PropTypes from 'prop-types';
import { enhancer } from '@meepshop/meep-ui/lib/layout/DecoratorsRoot'; // eslint-disable-line import/no-unresolved

@enhancer
export default class extends React.Component {
  static propTypes = {
    user: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
  };

  render() {
    const { user } = this.props;
    return (
      <div style={{ textAlign: 'center', padding: '80px 120px' }}>
        <div style={{ fontSize: 16 }}>{`Hi, ${user.name ? user.name : ''} (${
          user.email
        })`}</div>
        <div style={{ fontSize: 20, marginTop: 20 }}>
          無此訂單，請確認是否登入正確的帳號。
        </div>
      </div>
    );
  }
}
