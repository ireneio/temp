import React from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';

const cache = [];

export default class Lazy extends React.PureComponent {
  state = {
    useLarge: false, // 是否開始使用大圖
    isClear: false, // 是否清除模糊
    isError: false,
    activeSensor: true, // 是否關閉sernsor
  };

  static propTypes = {
    /** ignore */
    children: PropTypes.func.isRequired,
  };

  static getDerivedStateFromProps = (newProps, prevState) => {
    const { image } = newProps;

    if (cache.includes(image instanceof Object ? image.scaledSrc.w1920 : image))
      return {
        ...prevState,
        useLarge: true,
        isClear: true,
        activeSensor: false,
      };

    return null;
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
    const { image } = this.props;
    const { useLarge } = this.state;

    if (!useLarge) return;

    cache.push(image instanceof Object ? image.scaledSrc.w1920 : image);
    this.setState({ isClear: true });
  };

  // 如果img onload發生錯誤，則不需要模糊 & lazy loading
  onError = () => {
    const { isError } = this.state;

    if (isError) return;

    this.setState({ activeSensor: false, isError: true });
  };

  render() {
    const { useLarge, activeSensor, isClear, isError } = this.state;
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
            isError,
            onLoad: this.onLoad,
            onError: this.onError,
          })}
        </div>
      </VisibilitySensor>
    );
  }
}
