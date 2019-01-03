import React from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';

export default class Lazy extends React.PureComponent {
  state = {
    useLarge: false, // 是否開始使用大圖
    isClear: false, // 是否清除模糊
    activeSensor: true, // 是否關閉sernsor
  };

  static propTypes = {
    /** ignore */
    children: PropTypes.func.isRequired,
  };

  handleVisibilityChange = isVisible => {
    if (isVisible) {
      this.setState({
        activeSensor: false,
        useLarge: true,
      });
    }
  };

  onLoad = () => {
    const { useLarge } = this.state;
    // 大圖的onload完成，才清除模糊遮罩。
    if (useLarge) this.setState({ isClear: true });
  };

  // 如果img onload發生錯誤，則不需要模糊 & lazy loading
  onError = () => this.setState({ isClear: true, activeSensor: false });

  render() {
    const { useLarge, activeSensor, isClear } = this.state;
    const { children } = this.props;
    return (
      <VisibilitySensor
        onChange={this.handleVisibilityChange}
        /* offset: 多載入位於往下600px的圖片 */
        offset={{ bottom: -600 }}
        /* 是否啟用：當圖在可視範圍中，並開始載大圖後，就不需要此功能 */
        active={activeSensor}
        /* partialVisibility: 只要有部分圖片在viewport中就觸發onChange */
        partialVisibility
      >
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {children({
            useLarge,
            isClear,
            onLoad: this.onLoad,
            onError: this.onError,
          })}
        </div>
      </VisibilitySensor>
    );
  }
}
