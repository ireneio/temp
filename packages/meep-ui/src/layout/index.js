import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { UserAgent } from 'fbjs';

import Context from 'context';
import { COLOR_TYPE } from 'constants/propTypes';

import GlobalStyles from './GlobalStyles';
import Cart from './cart';
import DecoratorsRoot from './DecoratorsRoot';
import ContainerSwitch from './ContainerSwitch';
import styles from './styles/index.less';

@radium
export default class Layout extends React.PureComponent {
  /*
   * colors - the setting of the colors
   * backgroundImage - the img info of the background
   */
  rootRef = React.createRef();

  state = {
    shouldGetFixed: false,
  };

  static propTypes = {
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    background: COLOR_TYPE,
    cname: PropTypes.string,
    carts: PropTypes.shape({}),
    container: PropTypes.oneOf([
      'DefaultContainer',
      'FixedTopContainer',
      'TwoTopsContainer',
      'FixedTopContainerWithSidebar',
      'TwoTopsContainerWithSidebar',
      'FixedEndsContainer',
    ]).isRequired,
    backgroundImage: PropTypes.shape({
      files: PropTypes.array.isRequired,
      repeat: PropTypes.bool.isRequired,
      size: PropTypes.bool.isRequired,
      used: PropTypes.bool.isRequired,
    }).isRequired,
    blocks: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,

    /** must be Block */
    children: PropTypes.node,
  };

  static defaultProps = {
    background: null,
    cname: null,
    carts: null,
    children: null,
  };

  componentDidMount() {
    if (
      UserAgent.isBrowser('IE') &&
      this.rootRef.current.getBoundingClientRect().height <= window.innerHeight
    ) {
      this.setState({ shouldGetFixed: true });
    }
  }

  getRootStyle = () => {
    const { backgroundImage, colors, background } = this.props;

    const realBackground = (() => {
      const { files, used, repeat, size } = backgroundImage;
      const { image } = files?.[0] || {};

      if (used && image) {
        return `
          ${colors[0]}
          url(${`//${image}`})
          ${repeat ? 'repeat' : 'no-repeat'} top left /
          ${size ? '100%' : 'auto'} auto
        `;
      }

      return background || colors[0];
    })();

    return {
      color: colors[3],
      background: realBackground,
    };
  };

  render() {
    const { shouldGetFixed } = this.state;
    const {
      cname,
      backgroundImage,
      colors,
      background,
      blocks,
      carts,
      container,
      experiment,
      ...props
    } = this.props;

    return (
      <Context {...props}>
        <DecoratorsRoot {...props} colors={colors} carts={carts} cname={cname}>
          <GlobalStyles />

          <div
            style={{
              ...this.getRootStyle(),
              ...(shouldGetFixed && { height: 0 }),
            }}
            className={styles.root}
            ref={this.rootRef}
          >
            <div className={styles.container}>
              <ContainerSwitch
                {...props}
                key={container}
                containerName={container}
                carts={carts}
                blocks={blocks}
              />
            </div>

            {experiment.hiddingMeepshopMaxInFooterEnabled ? null : (
              <footer className={styles.footer}>
                <a
                  href="http://www.meepshopmax.com/?p=new-store-page"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  meepShop MAX 極速開店
                </a>
              </footer>
            )}

            <Cart carts={carts} />
          </div>
        </DecoratorsRoot>
      </Context>
    );
  }
}
