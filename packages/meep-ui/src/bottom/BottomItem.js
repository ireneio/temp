import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { enhancer } from 'layout/DecoratorsRoot';
import Link from 'link';
import {
  ISLOGIN_TYPE,
  LOCALE_TYPE,
  ID_TYPE,
  ONE_OF_LOCALE_TYPE,
  ONE_OF_CURRENCY_TYPE,
} from 'constants/propTypes';

import { PAGES_TYPE } from 'menu/constants';
import { PARAMS_TYPE } from 'menu/menuItem/constants';
import generateURL from 'menu/menuItem/utils/generateURL';
import getSubItemPages from 'menu/menuItem/utils/getSubItemPages';

import * as styles from './styles/bottomItem';
import { FONT_SIZE_TYPE } from './constants';

@enhancer
@radium
export default class BottomItem extends React.PureComponent {
  static propTypes = {
    transformLocale: PropTypes.func.isRequired,
    isLogin: ISLOGIN_TYPE.isRequired,
    toggleCart: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    setLocale: PropTypes.func.isRequired,
    setCustomerCurrency: PropTypes.func.isRequired,
    fontSize: FONT_SIZE_TYPE.isRequired,
    page: PropTypes.shape({
      id: PropTypes.oneOfType([
        ID_TYPE,
        ONE_OF_LOCALE_TYPE,
        ONE_OF_CURRENCY_TYPE,
      ]).isRequired,
      pages: PAGES_TYPE({}),
      params: PARAMS_TYPE,
      newWindow: PropTypes.bool,
      action: PropTypes.oneOf([
        0,
        1,
        2,
        3,
        5,
        6,
        7,
        8,
        'locale',
        'currency',
        'logout',
      ]).isRequired,
      title: LOCALE_TYPE.isRequired,
    }).isRequired,
    type: PropTypes.string,
  };

  static defaultProps = {
    type: '',
  };

  onClick = ({ id, action }) => () => {
    const { toggleCart, logout, setLocale, setCustomerCurrency } = this.props;

    switch (action) {
      case 5:
        toggleCart()();
        break;

      case 'logout':
        logout();
        break;

      case 'locale':
        setLocale(id);
        break;

      case 'currency':
        setCustomerCurrency(id);
        break;

      default:
        break;
    }
  };

  render() {
    const {
      transformLocale,
      isLogin,
      fontSize,
      page,
      type,
      ...props
    } = this.props;
    const { id, action, newWindow, pages, title } = page;

    const url = generateURL(page, isLogin);
    const subItemPages = getSubItemPages({ isLogin, action, pages });

    return (
      <div style={type === 'subItem' ? {} : styles.root}>
        <Link href={url} target={newWindow ? '_blank' : '_self'}>
          <div
            style={styles.title(fontSize, type)}
            onClick={this.onClick({ id, action })}
          >
            {transformLocale(title)}
          </div>
        </Link>

        {subItemPages.length === 0
          ? null
          : subItemPages.map(subPage => (
              <BottomItem
                key={subPage.id}
                type="subItem"
                fontSize={fontSize}
                page={subPage}
                transformLocale={transformLocale}
                isLogin={isLogin}
                {...props}
              />
            ))}
      </div>
    );
  }
}
