import React from 'react';
import Head from 'next/head';
import Ship from './Ship.svg';
import './styles/serverError.less';

export default () => (
  <div className="server_error_root">
    <Head>
      <title>API error</title>
    </Head>
    <div className="server_error_row">
      <Ship />
      <div className="server_error_text_section">
        <div className="server_error_title">糟糕出錯了！</div>
        <div className="server_error_message">可以晚點再回來試試。</div>
        <div className="server_error_message">
          Please try again in a few minutes.
        </div>
      </div>
    </div>
  </div>
);
