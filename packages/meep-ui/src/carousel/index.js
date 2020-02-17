import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';
import {
  FaChevronLeft as ChevronLeftIcon,
  FaChevronRight as ChevronRightIcon,
} from 'react-icons/fa';

import Image from 'image';
import { CONTENT_WIDTH_TYPE } from 'constants/propTypes';

import * as styles from './styles';

@radium
export default class Carousel extends React.PureComponent {
  touchStartCoordinate = {};

  static propTypes = {
    files: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
    newWindow: PropTypes.bool,
    contentWidth: CONTENT_WIDTH_TYPE.isRequired,
    enableAutoplay: PropTypes.bool.isRequired,
    enableIndicators: PropTypes.bool.isRequired,
    enableControls: PropTypes.bool.isRequired,
    pauseWhenHover: PropTypes.bool.isRequired,
    customTracking: PropTypes.objectOf({
      eventLabel: PropTypes.string.isRequired,
      eventCategory: PropTypes.objectOf({
        status: PropTypes.bool.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
    }),
  };

  static defaultProps = {
    files: null,
    newWindow: false,
    customTracking: null,
  };

  state = {
    imageIndex: 0,
  };

  componentDidMount() {
    const { enableAutoplay } = this.props;

    if (enableAutoplay) this.play();
  }

  componentWillUnmount() {
    this.pause();
  }

  getFiles = () => {
    const { files } = this.props;

    return !files || files.length === 0 ? [null, null, null] : files;
  };

  play = () => {
    clearInterval(this.carouselInterval);
    this.carouselInterval = setInterval(
      this.autoPlayCarousel,
      process.env.NODE_ENV === 'test' ? 2 : /* istanbul ignore next */ 3500,
    );
  };

  pause = () => {
    clearInterval(this.carouselInterval);
    this.carouselInterval = null;
  };

  autoPlayCarousel = () => {
    const { imageIndex } = this.state;

    this.setState({
      imageIndex: imageIndex < this.getFiles().length - 1 ? imageIndex + 1 : 0,
    });
  };

  handleTouchStart = e => {
    const { pauseWhenHover } = this.props;

    if (pauseWhenHover) this.pause();

    this.touchStartCoordinate.x = e.touches[0].pageX;
    this.touchStartCoordinate.y = e.touches[0].pageY;
    /**
     * if user just clicks, `handleTouchMove` will not be triggered.
     */
    this.touchStartCoordinate.distanceX = 0;
  };

  handleTouchMove = e => {
    const distanceX = e.touches[0].pageX - this.touchStartCoordinate.x;
    const distanceY = e.touches[0].pageY - this.touchStartCoordinate.y;

    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      this.touchStartCoordinate.distanceX = distanceX;
    }
  };

  handleTouchEnd = () => {
    const { enableAutoplay, pauseWhenHover } = this.props;
    const { imageIndex } = this.state;
    const files = this.getFiles();

    if (pauseWhenHover && enableAutoplay) this.play();

    if (this.touchStartCoordinate.distanceX < 0) {
      this.setState({
        imageIndex: imageIndex < files.length - 1 ? imageIndex + 1 : imageIndex,
      });
    } else if (this.touchStartCoordinate.distanceX > 0) {
      this.setState({
        imageIndex: imageIndex === 0 ? imageIndex : imageIndex - 1,
      });
    }
  };

  render() {
    const {
      newWindow,
      contentWidth,
      enableAutoplay,
      enableIndicators,
      enableControls,
      pauseWhenHover,
      customTracking, // 廣告追蹤用
    } = this.props;
    const { imageIndex } = this.state;
    const files = this.getFiles();

    return (
      <div
        ref={node => {
          this.carousel = node;
        }}
        style={styles.root(contentWidth)}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onMouseEnter={() => {
          if (pauseWhenHover) this.pause();
        }}
        onMouseLeave={() => {
          if (pauseWhenHover && enableAutoplay) this.play();
        }}
      >
        <div style={styles.imagesContainer(files.length, imageIndex)}>
          {files.map((file, index) => (
            <div
              key={
                `image-${index}` // eslint-disable-line react/no-array-index-key
              }
              style={styles.image}
            >
              <Image
                image={file?.image}
                href={file?.href}
                contentWidth={100}
                newWindow={newWindow}
                alignment="center"
                customTracking={customTracking}
              />
            </div>
          ))}
        </div>

        {!(imageIndex > 0 && enableControls) ? null : (
          <StyleRoot
            key="chevronLeft"
            style={styles.control('left')}
            onClick={() => this.setState({ imageIndex: imageIndex - 1 })}
          >
            <ChevronLeftIcon style={styles.chevronIcon} />
          </StyleRoot>
        )}

        {!(imageIndex < files.length - 1 && enableControls) ? null : (
          <StyleRoot
            key="chevronRight"
            style={styles.control('right')}
            onClick={() => this.setState({ imageIndex: imageIndex + 1 })}
          >
            <ChevronRightIcon style={styles.chevronIcon} />
          </StyleRoot>
        )}

        {!enableIndicators ? null : (
          <StyleRoot style={styles.indicatorContainer}>
            {files.map((file, index) => (
              <li
                key={
                  `indicator-${index}` // eslint-disable-line react/no-array-index-key
                }
                style={styles.indicatorCell(imageIndex === index)}
                onClick={() => this.setState({ imageIndex: index })}
              />
            ))}
          </StyleRoot>
        )}
      </div>
    );
  }
}
