import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { log } from '@meepshop/logger/lib/gqls/log';

import { Container, ErrorPageNotFound } from 'components';
import * as CONST from 'constants';

export default class Pages extends React.Component {
  static getInitialProps = async context => {
    const { res, query, client, router } = context;
    const { path, pId } = query;

    // FIXME: should use get getServerSideProps return notFound
    if (!path) throw new Error('[FIXME] path is undefined');

    if (pId) {
      // Redirect /pages/{PRODUCT-NAME}?pId={PRODUCT-ID} to /product/{PRODUCT-ID}
      client.mutate({
        mutation: log,
        variables: {
          input: {
            type: 'WARN',
            name: 'URL_REDIRECT',
            data: {
              message: 'product redirect',
            },
          },
        },
      });

      if (typeof window === 'undefined') {
        res.writeHead(302, {
          Location: `/product/${pId}`,
        });
        res.end();
      } else router.push(`/product/${pId}`);

      return {};
    }

    return { path };
  };

  static propTypes = {
    page: PropTypes.shape(CONST.PAGE_TYPE).isRequired,
  };

  render() {
    const { loading, page } = this.props;

    if (loading) return <Spin indicator={<LoadingOutlined spin />} />;

    if (!page) return <ErrorPageNotFound />;

    const { tabTitle = '' } = page;
    const { keywords, description, image } = page.seo || {};

    return (
      <>
        <Head>
          {!tabTitle ? null : <title>{tabTitle}</title>}

          {!description ? null : (
            <meta key="description" name="description" content={description} />
          )}

          <meta key="keywords" name="keywords" content={keywords} />

          {!tabTitle ? null : (
            <meta key="og:title" property="og:title" content={tabTitle} />
          )}

          {!image ? null : (
            <meta key="og:image" property="og:image" content={image} />
          )}

          {!description ? null : (
            <meta
              key="og:description"
              property="og:description"
              content={description}
            />
          )}
        </Head>

        <Container {...this.props} page={page} />
      </>
    );
  }
}
