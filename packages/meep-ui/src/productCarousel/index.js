import React from 'react';
import PropTypes from 'prop-types';
import radium, { Style, StyleRoot } from 'radium';
import Slider from 'react-slick';
import Lazy from 'image/img/Lazy';

import Placeholder from '@store/placeholder';

import { COVER_IMAGE_TYPE, GALLERY_TYPE } from 'constants/propTypes';

import ArrowIcon from './ArrowIcon';
import * as styles from './styles';

@radium
export default class ProductCarousel extends React.PureComponent {
  static propTypes = {
    coverImage: COVER_IMAGE_TYPE,
    galleries: GALLERY_TYPE.isRequired,
    autoPlay: PropTypes.bool.isRequired,
    thumbsPosition: PropTypes.oneOf(['none', 'bottom']).isRequired,
    mode: PropTypes.oneOf(['list', 'detail']),
  };

  static defaultProps = {
    coverImage: null,
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

    return [
      ...(coverImage?.src ? [coverImage] : []),
      ...(galleries?.[0]?.images || []).filter(
        image => image && image.src && image.fileId !== coverImage?.fileId,
      ),
    ];
  };

  render() {
    const { autoPlay, thumbsPosition, mode } = this.props;
    const { slider, navigator } = this.state;
    const images = this.setMainImage();

    if (!images.length) {
      return (
        <div style={styles.placeholder(mode)}>
          <Placeholder />
        </div>
      );
    }

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
                <Lazy key={image.fileId}>
                  {({ useLarge, isClear, onLoad }) => {
                    const { src } = image;
                    if (useLarge) {
                      const img = new Image();
                      img.onload = onLoad;
                      img.src = `${src}?w=400`;
                    }
                    return (
                      <div style={styles.showcase({ src, mode, isClear })} />
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
                  <div key={image.fileId}>
                    <div style={styles.thumbnail(image.src, mode)} />
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
