import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { enhancer } from 'layout';
import Link from 'link';
import { COLOR_TYPE, ISLOGIN_TYPE, LOCATION_TYPE } from 'constants/propTypes';
import { PHONE_MEDIA_WIDTH } from 'constants/media';

import {
  PATTERN_TYPE,
  ACTION_TYPE,
  PAGES_TYPE,
  HEIGHT_TYPE,
} from './../constants';

import CartCount from './CartCount';
import SubItem from './SubItem';
import ContentSwitch from './ContentSwitch';
import { PARAMS_TYPE, STATE_STYLE_TYPE } from './constants';
import * as styles from './styles';
import generateURL from './utils/generateURL';
import getSubItemPages from './utils/getSubItemPages';

@enhancer
@radium
export default class MenuItem extends React.PureComponent {
  static propTypes = {
    isLogin: ISLOGIN_TYPE.isRequired,
    location: LOCATION_TYPE.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    toggleCart: PropTypes.func.isRequired,
    carts: PropTypes.shape({
      categories: PropTypes.shape({
        products: PropTypes.array.isRequired,
      }).isRequired,
    }),
    /**
     * [start] from page
     */
    pages: PAGES_TYPE({}),
    params: PARAMS_TYPE,
    newWindow: /* istanbul ignore next */ process.env.STORYBOOK_DOCS
      ? PropTypes.bool.isRequired
      : PropTypes.bool,
    action: ACTION_TYPE.isRequired,
    /**
     * [end] from page
     */
    /**
     * [start] from design
     */
    height: HEIGHT_TYPE.isRequired,
    expandSubItem: PropTypes.bool.isRequired,
    pattern: PATTERN_TYPE.isRequired,
    hover: STATE_STYLE_TYPE.isRequired,
    active: STATE_STYLE_TYPE.isRequired,
    /**
     * [end] from design
     */
    menuItemClick: PropTypes.func,
  };

  static defaultProps = {
    carts: null,
    newWindow: /* istanbul ignore next */ process.env.STORYBOOK_DOCS
      ? null
      : false,
    pages: null,
    params: {},
    menuItemClick: () => {},
  };

  state = {
    isHover: false,
    isClicked: false,
  };

  click = subItemPages => () => {
    const { toggleCart, action, menuItemClick, expandSubItem } = this.props;
    const { isClicked } = this.state;
    const bodyDOM = document.querySelector('body');

    if (action !== 5) {
      if (!expandSubItem && subItemPages.length !== 0) {
        if (!isClicked) {
          menuItemClick();
          this.setState({ isClicked: true });
          if (PHONE_MEDIA_WIDTH > bodyDOM.offsetWidth) {
            bodyDOM.style.overflow = 'hidden';
          }
        } else if (PHONE_MEDIA_WIDTH > bodyDOM.offsetWidth) {
          bodyDOM.style.overflow = 'initial';
        }
      }

      return;
    }

    toggleCart()();
  };

  render() {
    const {
      isLogin,
      location,
      colors,
      toggleCart,
      carts,
      action,
      newWindow,
      height,
      expandSubItem,
      menuItemClick,
      ...props
    } = this.props;
    const { isHover, isClicked } = this.state;

    const { pathname, search } = location;
    const url = generateURL(this.props, isLogin);
    const subItemPages = getSubItemPages(this.props);

    return (
      <li
        style={styles.root(expandSubItem, height)}
        onMouseEnter={() => this.setState({ isHover: true })}
        onMouseLeave={() => this.setState({ isHover: false, isClicked: false })}
        onClick={this.click(subItemPages)}
      >
        <Link
          href={url}
          target={newWindow ? '_blank' : '_self'}
          style={styles.link(expandSubItem)}
        >
          <div
            style={[
              styles.title(expandSubItem, subItemPages),
              expandSubItem
                ? {}
                : styles.menuItemHoverAndActive(
                    action === 8
                      ? pathname.match('/login')
                      : url === `${pathname}${search}`,
                    this.props,
                    colors,
                  ),
            ]}
          >
            <ContentSwitch action={action} {...props} />

            {action !== 5 ||
            !carts ||
            carts.categories.products.length === 0 ? null : (
              <CartCount
                products={carts.categories.products}
                expandSubItem={expandSubItem}
              />
            )}
          </div>
        </Link>

        {!(
          (expandSubItem || isHover || isClicked) &&
          subItemPages.length !== 0
        ) ? null : (
          <SubItem
            {...props}
            isClicked={isClicked}
            hideSubItem={() => {
              menuItemClick(-1);
              this.setState({ isClicked: false });
            }}
            pages={subItemPages}
            expandSubItem={expandSubItem}
          />
        )}
      </li>
    );
  }
}
