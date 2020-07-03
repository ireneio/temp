import React from 'react';
import Head from 'next/head';

import { pageNotFound_w635 as pageNotFound } from '@meepshop/images';

import './styles/index.less';

export default () => (
  <>
    <Head>
      <title>404 Page not found</title>
    </Head>

    <div className="error_page_not_found_root">
      <img className="error_page_not_found_img" src={pageNotFound} alt="oops" />
      <div className="error_page_not_found_title">看起來頁面似乎不存在</div>
      <div className="error_page_not_found_message">
        請再次檢查網址是否正確。
      </div>
      <div className="error_page_not_found_message">Oops! Page not found.</div>
    </div>
  </>
);
