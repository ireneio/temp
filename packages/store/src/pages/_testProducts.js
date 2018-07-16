import React from 'react';
import * as Api from 'api';
import { connect } from 'react-redux';
import * as Utils from 'utils';

class TestProducts extends React.Component {
  static getInitialProps = async context => {
    const { isServer, XMeepshopDomain, userAgent, cookie, query } = context;
    const data = await Api.getProductList({
      ...query,
      isServer,
      XMeepshopDomain,
      cookie,
    });
    console.log('>>>', data);
    const products =
      Utils.getIn(['data', 'computeProductList', 'data'])(data) || [];
    const total =
      Utils.getIn(['data', 'computeProductList', 'total'])(data) || [];
    return {
      userAgent,
      XMeepshopDomain,
      products,
      total,
    };
  };

  static defaultProps = { error: null };

  render() {
    console.log(this.props);
    const {
      total,
      products,
      location: { query },
    } = this.props; // eslint-disable-line
    const { offset = 0, limit = 20 } = query;
    const qsRest = Object.keys(query).reduce((_qs, key, id) => {
      if (id === 0) {
        return `?${key}=${query[key]}`;
      }
      return `${_qs}&${key}=${query[key]}`;
    }, '');
    const numPages = Math.ceil(total / +limit);
    const arr = Array.from({ length: numPages }, (_, i) => i).filter(
      n => n !== Math.floor(+offset / +limit),
    );
    const pageLinks = arr.map(n => {
      if (qsRest.length === 0) {
        return `?offset=${n * limit}`;
      } else if (qsRest.match(/offset=\d*(?=&*)/i)) {
        return qsRest.replace(/offset=\d*(?=&*)/i, `offset=${n * limit}`);
      }
      return `${qsRest}&offset=${n * limit}`;
    });
    console.log(pageLinks);
    return (
      <div>
        {/* <Container {...this.props} > */}
        <div>
          Test Products
          <div style={{ display: 'none' }}>
            {/* eslint-disable */}
            {products.map(product => (
              <a key={product.id} href={`/product/${product.id}`} />
            ))}
            {pageLinks.map((link, id) => (
              <a key={id} href={`/_testProducts${link}`} />
            ))}
            {/* eslint-enable */}
          </div>
        </div>
        {/* </Container> */}
      </div>
    );
  }
}

const mapStateToProps = (_, props) => ({ location: Utils.uriParser(props) });

export default connect(mapStateToProps)(TestProducts);
