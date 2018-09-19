import React from 'react';
import Head from 'next/head';
import Ship from './Ship.svg';
import './styles/serverError.less';

export default () => (
  <div className="server_error_root">
    <Head>
      <title>Server error</title>
    </Head>
    <div className="server_error_row">
      <Ship />
      <div className="server_error_text_section">
        <div className="server_error_title">Un oh!好像有些地方壞掉了</div>
        <div className="server_error_message">
          我們正努力修復中，謝謝你們的耐心等待
        </div>
        <div className="server_error_message">Oops! Something went wrong.</div>
      </div>
    </div>
  </div>
);
