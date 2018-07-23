import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from 'react-icons/lib/md/close';

import { enhancer } from 'layout/DecoratorsRoot';
import Image from 'image';
import Sidebar from 'sidebar';
import { COLOR_TYPE, STORE_SETTING_TYPE } from 'constants/propTypes';

import styles from './styles/mobileSidebar.less';

@enhancer
export default class MobileSidebar extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    storeSetting: STORE_SETTING_TYPE.isRequired,

    /** props */
    design: PropTypes.shape({}).isRequired,
    pages: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    toggleSidebar: PropTypes.func.isRequired,
  };

  state = {
    isOpened: true,
  };

  render() {
    const { colors, storeSetting, design, pages, toggleSidebar } = this.props;
    const { isOpened } = this.state;

    const { mobileLogoUrl } = storeSetting;

    return (
      <div
        className={`${styles.root} ${styles[isOpened ? 'show' : 'hide']}`}
        onAnimationEnd={() => {
          if (!isOpened) toggleSidebar();
        }}
      >
        <div
          className={styles.sidebar}
          style={{
            color: colors[2],
            background: colors[1],
          }}
        >
          <div className={styles.iconWrapper}>
            <div>
              <Image
                style={{
                  /* FIXME */
                  width: '150px',
                  height: '60px',
                  backgroundSize: 'contain',
                  backgroundPosition: 'left center',
                }}
                files={{ image: mobileLogoUrl, href: '/' }}
                contentWidth={100}
                newWindow={false}
                mode="background"
                alignment="center"
                width={150}
              />
            </div>

            <CloseIcon onClick={() => this.setState({ isOpened: false })} />
          </div>

          <Sidebar
            menu={{
              pages,
              design: {
                ...design,
                width: 280,
                paddingTop: 0,
                pattern: 0,
                showLogo: false,
                showSearchbar: true,
                hover: {
                  color: 'inherit',
                  background: 'inherit',
                },
                active: {
                  color: 'inherit',
                  background: 'inherit',
                },
                background: {
                  color: 'inherit',
                  background: 'inherit',
                },
              },
            }}
          />
        </div>

        <div
          className={`${styles.hideBlock} ${
            styles[isOpened ? 'show' : 'hide']
          }`}
          onClick={() => this.setState({ isOpened: false })}
        />
      </div>
    );
  }
}
