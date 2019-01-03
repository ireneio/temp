import React from 'react';
import PropTypes from 'prop-types';

export default class Progressive extends React.PureComponent {
  state = {
    useLarge: false, // 是否開始使用大圖
    isClear: false, // 是否清除模糊
  };

  static propTypes = {
    /** ignore */
    children: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.setState({ useLarge: true });
  }

  onLoad = () => {
    const { useLarge } = this.state;
    // 大圖的onload完成，才清除模糊遮罩。
    if (useLarge) this.setState({ isClear: true });
  };

  // 如果img onload發生錯誤，則不需要模糊
  onError = () => this.setState({ isClear: true });

  render() {
    const { useLarge, isClear } = this.state;
    const { children } = this.props;
    return (
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {children({
          useLarge,
          isClear,
          onLoad: this.onLoad,
          onError: this.onError,
        })}
      </div>
    );
  }
}
