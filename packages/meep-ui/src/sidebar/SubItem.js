import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { enhancer } from 'layout/DecoratorsRoot';
import Link from 'link';
import {
  ISLOGIN_TYPE,
  ID_TYPE,
  ONE_OF_LOCALE_TYPE,
  ONE_OF_CURRENCY_TYPE,
  LOCALE_TYPE,
} from 'constants/propTypes';

import { PAGES_TYPE, FONTSIZE_TYPE } from 'menu/constants';
import { PARAMS_TYPE } from 'menu/menuItem/constants';
import generateURL from 'menu/menuItem/utils/generateURL';
import getSubItemPages from 'menu/menuItem/utils/getSubItemPages';

import * as styles from './styles/subItem';

@enhancer
@radium
export default class SubItem extends React.PureComponent {
  static propTypes = {
    isLogin: ISLOGIN_TYPE.isRequired,
    toggleCart: PropTypes.func.isRequired,
    transformLocale: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    setLocale: PropTypes.func.isRequired,
    setCustomerCurrency: PropTypes.func.isRequired,
    locale: ONE_OF_LOCALE_TYPE.isRequired,
    customerCurrency: ONE_OF_CURRENCY_TYPE.isRequired,
    page: PropTypes.shape({
      id: PropTypes.oneOfType([
        ID_TYPE,
        ONE_OF_LOCALE_TYPE,
        ONE_OF_CURRENCY_TYPE,
      ]).isRequired,
      title: LOCALE_TYPE.isRequired,
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
        'locale',
        'currency',
        'logout',
      ]).isRequired,
    }).isRequired,
    design: PropTypes.shape({
      expandSubItem: PropTypes.bool.isRequired,
      fontSize: FONTSIZE_TYPE.isRequired,
    }).isRequired,
  };

  state = {
    expand: false,
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
      locale,
      customerCurrency,
      page,
      design,
      ...props
    } = this.props;
    const { expand } = this.state;

    const { id, newWindow, title, action, pages } = page;
    const { expandSubItem, fontSize } = design;

    const url = generateURL(page, isLogin);
    const subItemPages = getSubItemPages({ isLogin, action, pages });
    const fontBold = id === locale || id === customerCurrency;

    return (
      <div style={styles.root(expandSubItem ? 25 : fontSize)}>
        <div style={styles.item(fontBold)}>
          {expandSubItem || subItemPages.length === 0 ? null : (
            <span
              style={styles.expandIcon}
              onClick={() => this.setState({ expand: !expand })}
            >
              {expand ? '−' : '+'}
            </span>
          )}
          <Link href={url} target={newWindow ? '_blank' : '_self'}>
            <div onClick={this.onClick({ id, action })}>
              {transformLocale(title)}
            </div>
          </Link>
        </div>

        {!((expandSubItem || expand) && subItemPages.length !== 0)
          ? null
          : subItemPages.map(subPage => (
              <SubItem
                {...props}
                key={subPage.id}
                page={subPage}
                design={design}
                transformLocale={transformLocale}
                isLogin={isLogin}
                locale={locale}
                customerCurrency={customerCurrency}
              />
            ))}
      </div>
    );
  }
}
