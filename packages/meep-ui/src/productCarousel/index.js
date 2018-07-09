import React from 'react';
import PropTypes from 'prop-types';
import radium, { Style, StyleRoot } from 'radium';
import Slider from 'react-slick';

import { URL_TYPE } from 'constants/propTypes';

import ArrowIcon from './ArrowIcon';
import * as styles from './styles';

@radium
export default class ProductCarousel extends React.PureComponent {
  static propTypes = {
    galleryInfo: PropTypes.shape({
      mainId: URL_TYPE,
      media: PropTypes.arrayOf(URL_TYPE).isRequired,
    }).isRequired,
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
    if (prevProps.thumbsPosition !== this.props.thumbsPosition) this.getRef();
  }

  getRef = () => {
    this.setState({
      slider: this.slider.current,
      navigator: this.navigator.current,
    });
  };

  setMainImage = () => {
    const {
      galleryInfo: { media, mainId },
    } = this.props;

    if (!mainId) return media.filter(url => url);

    return [mainId, ...media.filter(url => url && url !== mainId)];
  };

  render() {
    const { autoPlay, thumbsPosition, mode } = this.props;
    const { slider, navigator } = this.state;
    const images = this.setMainImage();

    if (!images.length) return null;

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
              {images.map((url, index) => (
                <div
                  key={
                    url + index // eslint-disable-line react/no-array-index-key
                  }
                  style={styles.showcase(url, mode)}
                />
              ))}
            </Slider>

            {thumbsPosition !== 'bottom' ? null : (
              <Slider
                ref={this.navigator}
                asNavFor={slider}
                className="navigator"
                dots={false}
                arrows={false}
                slidesToShow={images.length > 4 ? 4 : images.length}
                swipe={false}
                focusOnSelect
              >
                {images.map((url, index) => (
                  <div
                    key={
                      url + index // eslint-disable-line react/no-array-index-key
                    }
                    style={styles.thumbnail(url, mode)}
                  />
                ))}
              </Slider>
            )}
          </div>
        </StyleRoot>
      </div>
    );
  }
}
