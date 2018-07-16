import React from 'react';
import PropTypes from 'prop-types';
import * as Utils from 'utils';
import './index.less';

import ezpayLogo from './images/ezpay-logo.png';
import sevenEleven from './images/7eleven.png';
import familymart from './images/familymart.png';
import hilife from './images/hi-life.png';
import okmart from './images/ok-mart.png';

export default class EzpayView extends React.Component {
  static propTypes = {
    order: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { order } = this.props;
    const payment = Utils.getIn(['paymentInfo', 'list', 0])(order);
    const memo = Utils.getIn(['memo', 0, 'ezpay'])(payment);
    const paycode = Utils.getIn(['paycode'])(memo);
    const merchantNumber = Utils.getIn([
      'accountInfo',
      'ezpay',
      'merchantNumber',
    ])(payment);
    const storeName = Utils.getIn(['storeName'])(memo);
    const orderNumber = Utils.getIn(['orderNumber'])(memo);
    const amount = Utils.getIn(['amount'])(memo);
    const expireDate = Utils.getIn(['expireDate'])(memo);
    return (
      <div className="ezpay_wrapper">
        <img className="ezpay_logo" src={ezpayLogo} alt="ezpayLogo" />

        <div className="ezpay_container">
          <div className="ezpay_title">您已成功產生繳款編號！</div>

          <div className="ezpay_paycode">繳款編號：{paycode}</div>

          <div className="ezpay_fields">
            <div>商店編號</div>
            <div>{`${merchantNumber} - ${storeName}`}</div>

            <div>訂單編號</div>
            {orderNumber}

            <div>交易金額</div>
            {amount}

            <div>繳費期限</div>
            <div>
              {`${new Date(expireDate * 1000).getFullYear()} / ${new Date(
                expireDate * 1000,
              ).getMonth() + 1} / ${new Date(expireDate * 1000).getDate()}`}
            </div>
          </div>

          <div className="ezpay_block">
            <div className="ezpay_notice">注意事項</div>

            <div className="ezpay_noticeList">
              <ul className="ezpay_ul">
                <li>
                  請紀錄上列16位數繳款編號，至便利商店列印出繳費單到櫃檯繳費。如欲了解各便利商店繳費操作流程，請點選以下圖示：
                </li>

                <div className="ezpay_imgs">
                  {[
                    {
                      id: 'sevenEleven',
                      src: sevenEleven,
                      link: 'http://www.ibon.com.tw/paymentcode.aspx#gsc.tab=0',
                    },
                    {
                      id: 'familymart',
                      src: familymart,
                      link:
                        'http://www.famiport.com.tw/intro.asp?page=5&oc=A05&ocsub=B02',
                    },
                    {
                      id: 'hiLife',
                      src: hilife,
                      link: 'http://www.hilife.com.tw/serviceInfo.aspx',
                    },
                    {
                      id: 'okMart',
                      src: okmart,
                      link: 'http://www.okmart.com.tw/okGo_service',
                    },
                  ].map(({ id, src, link }) => (
                    <a
                      key={id}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={src} alt={id} />
                    </a>
                  ))}
                </div>

                <li>
                  繳款編號產生後有效期限請依交易商家之規則為準，但在超商列印出條碼繳費單後需在
                  <font className="ezpay_limitTime">3小時</font>
                  內繳款完成，如逾時未繳，需重新至機台列印條碼繳費單。
                </li>

                <li>請勿對同一筆帳單列印多張繳費單重複繳款。</li>
              </ul>
            </div>
          </div>

          <div className="ezpay_buttonWrapper">
            <button
              type="button"
              className="ezpay_printBtn"
              onClick={() => window.print()}
            >
              列印此頁
            </button>
            <button
              type="button"
              className="ezpay_backBtn"
              onClick={() =>
                Utils.goTo({ pathname: `/checkout/thank-you-page/${order.id}` })
              }
            >
              回商家網站
            </button>
          </div>
        </div>

        <div className="ezpay_footerTip">
          藍新金流僅提供款項代收付服務，如有商品問題，請向購買商家聯繫
        </div>
      </div>
    );
  }
}
