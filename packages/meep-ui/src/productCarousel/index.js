import React from 'react';
import PropTypes from 'prop-types';
import radium, { Style, StyleRoot } from 'radium';
import Slider from 'react-slick';
import Lazy from 'image/img/Lazy';

import { placeholderThumbnail_scaledSrc as placeholderThumbnail } from '@meepshop/images';

import ArrowIcon from './ArrowIcon';
import * as styles from './styles';

@radium
export default class ProductCarousel extends React.PureComponent {
  static propTypes = {
    autoPlay: PropTypes.bool.isRequired,
    thumbsPosition: PropTypes.oneOf(['none', 'bottom']).isRequired,
    mode: PropTypes.oneOf(['list', 'detail']),
  };

  static defaultProps = {
    mode: 'detail',
  };

  constructor(props) {
    super(props);
    this.slider = React.createRef();
    this.navigator = React.createRef();
  }

  state = {
    slider: null,
    navigator: null,
  };

  componentDidMount() {
    this.getRef();
  }

  componentDidUpdate(prevProps) {
    const { thumbsPosition } = this.props;

    if (prevProps.thumbsPosition !== thumbsPosition) this.getRef();
  }

  getRef = () => {
    this.setState({
      slider: this.slider.current,
      navigator: this.navigator.current,
    });
  };

  setSlickActive = () => {
    // FIXME: react-slick bug - miss .slick-active class on slides that are visible
    // https://github.com/akiran/react-slick/issues/764
    const slickList = this.navigator.current.innerSlider.list.childNodes[0]
      .childNodes;

    slickList.forEach((slick, index) => {
      if (!/slick-active/.test(slickList[index].className)) {
        slickList[index].className += ' slick-active';
      }
    });
  };

  setMainImage = () => {
    const { coverImage, galleries } = this.props;
    const images = [
      ...(coverImage?.scaledSrc ? [coverImage] : []),
      ...(galleries?.[0]?.images || []).filter(
        image => image?.scaledSrc && image.id !== coverImage?.id,
      ),
    ];

    return images.length !== 0 ? images : [{ scaledSrc: placeholderThumbnail }];
  };

  render() {
    const { autoPlay, thumbsPosition, mode } = this.props;
    const { slider, navigator } = this.state;
    const images = this.setMainImage();

    return (
      <div style={styles.root}>
        <StyleRoot>
          <div
            className="product-carousel ant-carousel"
            style={styles.sliderWrapper(mode)}
          >
            <Style
              scopeSelector=".product-carousel.ant-carousel"
              rules={styles.Style(mode)}
            />

            <Slider
              ref={this.slider}
              asNavFor={navigator}
              autoplay={autoPlay}
              className="mainSlider"
              nextArrow={<ArrowIcon type="right-circle" />}
              prevArrow={<ArrowIcon type="left-circle" />}
            >
              {images.map(image => (
                <Lazy key={image.id}>
                  {({ useLarge, isClear, onLoad }) => {
                    const { scaledSrc } = image;

                    let width = 'w60';

                    if (useLarge) {
                      width = window?.devicePixelRatio > 1 ? 'w960' : 'w480';

                      const img = new Image();

                      img.onload = onLoad;
                      img.src = scaledSrc[width];
                    }

                    return (
                      <div
                        style={styles.showcase({
                          scaledSrc,
                          mode,
                          isClear,
                          width,
                        })}
                      />
                    );
                  }}
                </Lazy>
              ))}
            </Slider>

            {thumbsPosition !== 'bottom' || images.length === 1 ? null : (
              <Slider
                ref={this.navigator}
                asNavFor={slider}
                className="navigator"
                dots={false}
                arrows={false}
                slidesToShow={images.length > 4 ? 4 : images.length}
                swipe={false}
                focusOnSelect
                afterChange={this.setSlickActive}
              >
                {images.map(image => (
                  <div key={image.id}>
                    <div style={styles.thumbnail(image, mode)} />
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </StyleRoot>
      </div>
    );
  }
}
