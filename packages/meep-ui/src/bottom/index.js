import React from 'react';
import PropTypes from 'prop-types';
import { isHexColor } from 'validator';

import { enhancer } from 'layout/DecoratorsRoot';
import Menu from 'menu';
import { ID_TYPE, COLOR_TYPE } from 'constants/propTypes';
import { PHONE_MEDIA } from 'constants/media';

import styles from './styles/index.less';

@enhancer
export default class Bottom extends React.PureComponent {
  resizeTimeout = null;

  static propTypes = {
    /** context */
    colors: COLOR_TYPE.isRequired,

    /** props */
    id: ID_TYPE.isRequired,
    menu: PropTypes.shape({
      pages: PropTypes.arrayOf(
        PropTypes.shape({
          id: ID_TYPE.isRequired,
        }).isRequired,
      ),
      design: PropTypes.shape({}).isRequired,
    }).isRequired,
  };

  state = {
    openKeys: [],
    isMobile: false,
  };

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    this.isUnmounted = true;
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      if (this.isUnmounted) return;

      const {
        menu: { pages },
      } = this.props;

      this.setState({
        openKeys:
          document.querySelector('body').offsetWidth <
          parseInt(styles.phoneWidth, 10)
            ? []
            : pages.map(({ id: pageId }) => pageId),
        isMobile: window.matchMedia(PHONE_MEDIA.substring(7)).matches,
      });
    }, 100);
  };

  render() {
    const {
      /** context */
      colors,

      /** props */
      id,
      menu: {
        pages,
        design: {
          normal: { background = '', color },
          opacity,
          ...design
        },
      },
    } = this.props;
    const { openKeys, isMobile } = this.state;

    const normal = {
      color: color || colors[3],
      background:
        !background || !isHexColor(background) ? '#ffffff' : background,
    };

    return (
      <div className={styles.root}>
        <div
          style={{
            ...normal,
            background,
          }}
        >
          <Menu
            id={id}
            className={styles.menu}
            pages={pages}
            design={{
              ...design,
              normal,
              opacity: !background || !isHexColor(background) ? 0 : 1,
            }}
            onOpenChange={newOpenKeys => {
              if (!isMobile) return;
              const latestOpenKey = newOpenKeys.find(
                key => !openKeys.includes(key),
              );

              if (pages.every(({ id: pageId }) => pageId !== latestOpenKey))
                this.setState({ openKeys: newOpenKeys });
              else
                this.setState({
                  openKeys: latestOpenKey ? [latestOpenKey] : [],
                });
            }}
            openKeys={openKeys}
          />
        </div>
      </div>
    );
  }
}
