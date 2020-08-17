import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import gql from 'graphql-tag';
import { Query } from '@apollo/react-components';
import { UserAgent } from 'fbjs';

import { colors as colorsContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';

import Context from 'context';
import { COLOR_TYPE } from 'constants/propTypes';

import GlobalStyles from './GlobalStyles';
import Cart from './cart';
import cartFragment from './cart/fragment';
import DecoratorsRoot from './DecoratorsRoot';
import ContainerSwitch from './ContainerSwitch';
import styles from './styles/index.less';

const query = gql`
  query getCart {
    getCartList(search: { showDetail: true }) {
      data {
        ...cartFragment
      }
    }
  }

  ${cartFragment}
`;

@withContext(colorsContext, colors => ({ colors }))
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
    container: PropTypes.oneOf([
      'DefaultContainer',
      'FixedTopContainer',
      'TwoTopsContainer',
      'FixedTopContainerWithSidebar',
      'TwoTopsContainerWithSidebar',
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

    const colorConfig = (() => {
      const { files, used, repeat, size } = backgroundImage;
      const { image } = files?.[0] || {};

      if (used && image) {
        return `
          ${colors[0]}
          url(${/^http/.test(image) ? image : `//${image}`})
          ${repeat ? 'repeat' : 'no-repeat'} top left /
          ${size ? '100%' : 'auto'} auto
        `;
      }

      return colors[0];
    })();

    return {
      color: colors[3],
      background: background || colorConfig,
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
      container,
      experiment,
      ...props
    } = this.props;

    return (
      <Query query={query}>
        {({ data }) => {
          const carts = data?.getCartList?.data?.[0];

          return (
            <Context {...props}>
              <DecoratorsRoot
                {...props}
                colors={colors}
                cname={cname}
                carts={
                  !carts
                    ? null
                    : {
                        ...carts,
                        categories: carts.categories?.[0] || null,
                      }
                }
              >
                <GlobalStyles colors={colors} />

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
                      blocks={blocks}
                    />
                  </div>

                  {experiment.hiddingMeepshopMaxInFooterEnabled ? null : (
                    <footer className={styles.footer}>
                      <a
                        href="https://meepshop.cc/8h1kG"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        meepShop MAX 極速開店
                      </a>
                    </footer>
                  )}

                  <Cart />
                </div>
              </DecoratorsRoot>
            </Context>
          );
        }}
      </Query>
    );
  }
}
