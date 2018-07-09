import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import CloseIcon from 'react-icons/lib/fa/close';

import { enhancer } from 'layout';
import Link from 'link';
import {
  ID_TYPE,
  COLOR_TYPE,
  LOCALE_TYPE,
  ISLOGIN_TYPE,
  ONE_OF_LOCALE_TYPE,
  ONE_OF_CURRENCY_TYPE,
} from 'constants/propTypes';

import { FONTSIZE_TYPE } from './../constants';
import { PARAMS_TYPE } from './constants';
import * as styles from './styles/subItem';
import generateURL from './utils/generateURL';

@enhancer
@radium
export default class SubItem extends React.PureComponent {
  static propTypes = {
    /** context */
    transformLocale: PropTypes.func.isRequired,
    isLogin: ISLOGIN_TYPE.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    toggleCart: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    setLocale: PropTypes.func.isRequired,
    setCustomerCurrency: PropTypes.func.isRequired,

    /** props */
    isClicked: PropTypes.bool.isRequired,
    hideSubItem: PropTypes.func.isRequired,
    pages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          ID_TYPE,
          ONE_OF_LOCALE_TYPE,
          ONE_OF_CURRENCY_TYPE,
        ]).isRequired,
        title: LOCALE_TYPE.isRequired,
        newWindow: /* istanbul ignore next */ process.env.STORYBOOK_DOCS
          ? PropTypes.bool.isRequired
          : PropTypes.bool,
        action: PropTypes.oneOf([0, 1, 2, 3, 5, 'locale', 'currency', 'logout'])
          .isRequired,
        params: PARAMS_TYPE,
      }).isRequired,
    ).isRequired,
    expandSubItem: PropTypes.bool.isRequired,
    fontSize: FONTSIZE_TYPE.isRequired,
    locale: ONE_OF_LOCALE_TYPE.isRequired,
    customerCurrency: ONE_OF_CURRENCY_TYPE.isRequired,
  };

  state = {
    isMounted: false,
  };

  componentDidMount() {
    const { className } = this.subItemRef.current;
    const allStyles = Array.from(document.querySelectorAll('style'));
    const check = () => {
      setTimeout(() => {
        const isLoaded = allStyles.reduce(
          (result, styleDOM) =>
            result || new RegExp(className).test(styleDOM.innerHTML),
          false,
        );

        if (this.isUnmounted) return;

        if (isLoaded) this.setState({ isMounted: true });
        else check();
      }, 1);
    };
    check();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

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

  subItemRef = React.createRef();

  render() {
    const {
      transformLocale,
      isLogin,
      colors,
      isClicked,
      hideSubItem,
      pages,
      fontSize,
      expandSubItem,
      locale,
      customerCurrency,
    } = this.props;
    const { isMounted } = this.state;

    return (
      <div
        ref={this.subItemRef}
        style={expandSubItem ? {} : styles.root(colors, isClicked, isMounted)}
      >
        {expandSubItem ? null : (
          <div style={styles.closeWrapper}>
            <CloseIcon style={styles.closeIcon} onClick={hideSubItem} />
          </div>
        )}

        {pages.map(({ id, newWindow, title, ...page }) => (
          <Link
            key={id}
            href={generateURL(page, isLogin)}
            target={newWindow ? '_blank' : '_self'}
            style={styles.link(expandSubItem)}
          >
            <div
              key={id}
              style={[
                styles.content(colors, expandSubItem, fontSize),
                id === locale || id === customerCurrency ? styles.fontBold : {},
              ]}
              onClick={this.onClick({ id, ...page })}
            >
              {transformLocale(title)}
            </div>
          </Link>
        ))}
      </div>
    );
  }
}
