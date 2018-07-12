import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import AngleRightIcon from 'react-icons/lib/fa/angle-right';
import AngleDownIcon from 'react-icons/lib/fa/angle-down';

import { enhancer } from 'layout/DecoratorsRoot';
import Link from 'link';
import { ISLOGIN_TYPE, LOCATION_TYPE, COLOR_TYPE } from 'constants/propTypes';
import { NOTLOGIN } from 'constants/isLogin';

import ContentSwitch from 'menu/menuItem/ContentSwitch';
import { PAGES_TYPE, ACTION_TYPE, PATTERN_TYPE } from 'menu/constants';
import { PARAMS_TYPE, STATE_STYLE_TYPE } from 'menu/menuItem/constants';
import generateURL from 'menu/menuItem/utils/generateURL';
import getSubItemPages from 'menu/menuItem/utils/getSubItemPages';

import SubItem from './SubItem';
import * as styles from './styles/sidebarItem';

@enhancer
@radium
export default class SidebarItem extends React.PureComponent {
  static propTypes = {
    isLogin: ISLOGIN_TYPE.isRequired,
    location: LOCATION_TYPE.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    toggleCart: PropTypes.func.isRequired,
    page: PropTypes.shape({
      pages: PAGES_TYPE({}),
      params: PARAMS_TYPE,
      newWindow: PropTypes.bool,
      action: ACTION_TYPE.isRequired,
    }).isRequired,
    design: PropTypes.shape({
      expandSubItem: PropTypes.bool.isRequired,
      pattern: PATTERN_TYPE.isRequired,
      normal: STATE_STYLE_TYPE.isRequired,
      hover: STATE_STYLE_TYPE.isRequired,
      active: STATE_STYLE_TYPE.isRequired,
    }).isRequired,
  };

  state = {
    isHover: false,
    expand: false,
  };

  render() {
    const {
      isLogin,
      location,
      colors,
      toggleCart,
      page,
      design,
      ...props
    } = this.props;
    const { isHover, expand } = this.state;
    const { pathname, search } = location;
    const { action, newWindow, pages } = page;
    const { expandSubItem } = design;

    const url = generateURL(page, isLogin);
    const isActive =
      action === 8 ? pathname.match('/login') : url === `${pathname}${search}`;
    const subItemPages = getSubItemPages({ isLogin, action, pages });
    const ExpandIcon = expand ? AngleDownIcon : AngleRightIcon;

    return (
      <div
        style={styles.root(design, action, isLogin !== NOTLOGIN, colors)}
        onClick={action !== 5 ? () => {} : toggleCart()}
      >
        <div
          style={styles.item(design, isActive, colors)}
          onMouseOver={() => this.setState({ isHover: true })}
          onMouseLeave={() => this.setState({ isHover: false })}
        >
          <Link
            href={url}
            target={newWindow ? '_blank' : '_self'}
            style={styles.link}
          >
            <div style={styles.title(design, isActive, colors, isHover)}>
              <ContentSwitch
                {...props}
                {...page}
                {...design}
                type="sidebar"
                action={action}
              />
            </div>
          </Link>
          {subItemPages.length === 0 || expandSubItem ? null : (
            <ExpandIcon onClick={() => this.setState({ expand: !expand })} />
          )}
        </div>

        {!((expandSubItem || expand) && subItemPages.length !== 0)
          ? null
          : subItemPages.map(subPage => (
              <SubItem
                {...props}
                key={subPage.id}
                page={subPage}
                design={design}
              />
            ))}
      </div>
    );
  }
}
