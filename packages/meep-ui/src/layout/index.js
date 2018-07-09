import React from 'react';
import PropTypes from 'prop-types';
import radium, { Style } from 'radium';

import { URL_TYPE, COLOR_TYPE } from 'constants/propTypes';

import Cart from './cart';
import DecoratorsRoot from './DecoratorsRoot';
import ContainerSwitch from './ContainerSwitch';
import { SPECIAL_HIDE_FOOTER } from './constants';
import * as styles from './styles';

export { enhancer } from './DecoratorsRoot';

@radium
export default class Layout extends React.PureComponent {
  /*
   * colors - the setting of the colors
   * backgroundImage - the img info of the background
  */
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
      image: URL_TYPE,
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

  render() {
    const {
      cname,
      backgroundImage,
      colors,
      background,
      blocks,
      carts,
      container,
      ...props
    } = this.props;

    return (
      <DecoratorsRoot {...props} colors={colors} carts={carts} cname={cname}>
        <Style rules={styles.globalStyles(colors)} />

        <div style={styles.root(backgroundImage, colors, background)}>
          <ContainerSwitch
            {...props}
            key={container}
            containerName={container}
            carts={carts}
            blocks={blocks}
          />

          {SPECIAL_HIDE_FOOTER.includes(cname) ? null : (
            <footer style={styles.meepshopFooter}>
              <a
                href="http://www.meepshopmax.com/?p=new-store-page"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.meepshopFooterLink}
              >
                meepShop MAX 極速開店
              </a>
            </footer>
          )}

          <Cart carts={carts} />
        </div>
      </DecoratorsRoot>
    );
  }
}
