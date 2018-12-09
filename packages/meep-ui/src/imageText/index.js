import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';

import { enhancer } from 'layout/DecoratorsRoot';
import Image from 'image';
import Link from 'deprecated/link';

import {
  LOCATION_TYPE,
  CONTENT_WIDTH_TYPE,
  POSITIVE_NUMBER_TYPE,
  COLOR_TYPE,
} from 'constants/propTypes';

import {
  overlayBackground,
  headerStyle,
  descriptionStyle,
  buttonStyle,
} from './styles';
import styles from './styles/index.less';

@enhancer
@radium
export default class ImageText extends React.PureComponent {
  static propTypes = {
    location: LOCATION_TYPE.isRequired,
    files: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
    newWindow: PropTypes.bool,
    contentWidth: CONTENT_WIDTH_TYPE.isRequired,
    header: PropTypes.shape({
      show: PropTypes.bool.isRequired,
      fontSize: POSITIVE_NUMBER_TYPE,
      value: PropTypes.string,
      bold: PropTypes.bool,
    }).isRequired,
    description: PropTypes.shape({
      show: PropTypes.bool.isRequired,
      fontSize: POSITIVE_NUMBER_TYPE,
      value: PropTypes.string,
    }).isRequired,
    button: PropTypes.shape({
      show: PropTypes.bool.isRequired,
      fontSize: POSITIVE_NUMBER_TYPE,
      value: PropTypes.string,
    }).isRequired,
    position: PropTypes.string.isRequired,
    textColor: COLOR_TYPE.isRequired,
    showOverlay: PropTypes.bool.isRequired,
    overlayBackgroundColor: COLOR_TYPE.isRequired,
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
    showOverlay: false,
  };

  handleOverlay = boolean => {
    const { showOverlay } = this.props;
    if (showOverlay) {
      this.setState({ showOverlay: boolean });
    }
  };

  generateUrl = () => {
    const { location, files } = this.props;
    const { pathname } = location;
    const { href } = files?.[0] || {};

    if (/^#/.test(href)) return `${pathname}${href}`;

    if (href && !/(^\/)|(^http)/.test(href)) return `//${href}`;

    return href;
  };

  render() {
    const {
      files,
      newWindow,
      contentWidth,
      header,
      description,
      button,
      position,
      textColor,
      overlayBackgroundColor,
      customTracking,
    } = this.props;
    const { showOverlay } = this.state;

    const href = this.generateUrl();

    let handleClickTracking;
    if (customTracking?.status) {
      const { eventLabel, eventCategory } = customTracking;
      handleClickTracking = () => {
        if (window.fbq) window.fbq('track', eventLabel);
        if (window.gtag) {
          window.gtag('event', 'meepShop_click', {
            event_category:
              (eventCategory?.status && eventCategory?.value) || eventLabel,
            event_label: eventLabel,
          });
        }
      };
    }

    return (
      <div className={styles.root} style={{ width: `${contentWidth}%` }}>
        <Image
          image={files?.[0]?.image}
          contentWidth={100}
          newWindow={newWindow}
          alignment="center"
        />
        <Link
          href={href}
          target={newWindow ? '_blank' : '_self'}
          className={styles.link}
        >
          <div
            style={overlayBackground({
              showOverlay,
              overlayBackgroundColor,
              position,
            })}
            onMouseEnter={() => this.handleOverlay(true)}
            onMouseLeave={() => this.handleOverlay(false)}
            onClick={handleClickTracking}
          >
            <StyleRoot
              className={styles.textContainer}
              style={{ color: textColor }}
            >
              {!header.show ? null : (
                <div style={headerStyle(header.fontSize, header.bold)}>
                  {header.value}
                </div>
              )}
              {!description.show ? null : (
                <div style={descriptionStyle(description.fontSize)}>
                  {description.value}
                </div>
              )}
              {!button.show ? null : (
                <div
                  style={buttonStyle(
                    button.fontSize,
                    textColor,
                    overlayBackgroundColor,
                  )}
                >
                  {button.value}
                </div>
              )}
            </StyleRoot>
          </div>
        </Link>
      </div>
    );
  }
}
