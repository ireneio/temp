/* eslint-disable */

import React from 'react';
import getProducts from './api/getProducts.api';
import * as Utils from 'utils';

const LIMIT = 90;
const NUMBER_ITEM = 30;

const styles = {
  title: {
    fontSize: '24px',
    margin: '40px 40px 10px 67px',
    fontWeight: 'bold',
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    borderTop: 'solid 1.5px #ddd',
    margin: '0 65px',
  },
  groups: {
    flex: '1',
    padding: '20px 2px',
  },
  links: {
    textOverflow: 'ellipsis',
    width: 300,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  pagination: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
};

export default class extends React.Component {
  static getInitialProps = async context => {
    const { isServer, XMeepshopDomain, userAgent, cookie, query } = context;
    const { page = 1 } = query;
    const data = await getProducts({
      offset: (page - 1) * LIMIT,
      limit: LIMIT,
      isServer,
      XMeepshopDomain,
      cookie,
      sitemap: true,
    });
    const products = Utils.getIn(['data', 'getProductList', 'data'])(data);
    const total = Utils.getIn(['data', 'getProductList', 'total'])(data);
    const pages = Array.from(
      { length: Math.floor(total / LIMIT) + 1 },
      (__dirname, i) => ({ active: i + 1 === +page }),
    );
    const groups = {
      colA: products.slice(0, NUMBER_ITEM),
      colB: products.slice(NUMBER_ITEM, 2 * NUMBER_ITEM),
      colC: products.slice(2 * NUMBER_ITEM, 3 * NUMBER_ITEM),
    };
    return {
      query,
      userAgent,
      XMeepshopDomain,
      groups,
      pages,
    };
  };

  static defaultProps = { error: null };

  render() {
    console.log(this.props);
    const { groups, pages } = this.props;
    return (
      <div>
        <div style={styles.title}>所有商品</div>
        <div style={styles.content}>
          <div style={styles.groups}>
            {groups.colA.map((product, idx) => (
              <div key={product.id} style={styles.links}>
                <a href={`/product/${product.id}`} title={product.title.zh_TW}>
                  {product.title.zh_TW}
                </a>
              </div>
            ))}
          </div>
          <div style={styles.groups}>
            {groups.colB.map((product, idx) => (
              <div key={product.id} style={styles.links}>
                <a href={`/product/${product.id}`} title={product.title.zh_TW}>
                  {product.title.zh_TW}
                </a>
              </div>
            ))}
          </div>
          <div style={styles.groups}>
            {groups.colC.map((product, idx) => (
              <div key={product.id} style={styles.links}>
                <a href={`/product/${product.id}`} title={product.title.zh_TW}>
                  {product.title.zh_TW}
                </a>
              </div>
            ))}
          </div>
        </div>
        {/* pagination */}
        <div style={styles.pagination}>
          <div>
            {pages.map((page, id) => (
              <a
                key={id}
                href={`/sitemaps/v1?page=${id + 1}`}
                style={{
                  margin: '0 5px',
                  pointerEvents: `${page.active && 'none'}`,
                  color: `${page.active && 'grey'}`,
                }}
              >
                {id + 1}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
