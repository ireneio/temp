// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Spin, Icon } from 'antd';
import moment from 'moment';

import {
  ezpayLogo,
  ezpaySevenEleven,
  ezpayFamilyMart,
  ezpayHiLife,
  ezpayOkMart,
} from '@meepshop/images';
import Link, { useRouter } from '@meepshop/link';

import styles from './styles/index.less';

// graphql typescript
import {
  getOrderInEzpay,
  getOrderInEzpayVariables,
} from './__generated__/getOrderInEzpay';

// definition
const query = gql`
  query getOrderInEzpay($orderId: ID!) {
    viewer {
      id
      order(orderId: $orderId) {
        id
        paymentInfo {
          id
          list {
            id
            memo {
              ezpay {
                paycode
                storeName
                orderNumber
                amount
                expireDate
              }
            }
            accountInfo {
              ezpay {
                merchantNumber
              }
            }
          }
        }
      }
    }
  }
`;

export default React.memo<{
  orderId: string;
}>(({ orderId }) => {
  const router = useRouter();
  const { data } = useQuery<getOrderInEzpay, getOrderInEzpayVariables>(query, {
    variables: {
      orderId,
    },
  });
  const order = data?.viewer?.order;
  const id = order?.id;
  const memoEzpay = order?.paymentInfo?.list?.[0]?.memo?.[0]?.ezpay;
  const accountInfoEzpay = order?.paymentInfo?.list?.[0]?.accountInfo?.ezpay;

  if (!id || !memoEzpay || !accountInfoEzpay)
    return <Spin indicator={<Icon type="loading" spin />} />;

  const { paycode, storeName, orderNumber, amount, expireDate } = memoEzpay;
  const { merchantNumber } = accountInfoEzpay;
  const { redirectUrl } = router.query;

  return (
    <div className={styles.wrapper}>
      <img className={styles.logo} src={ezpayLogo} alt="ezpayLogo" />

      <div className={styles.container}>
        <div className={styles.title}>您已成功產生繳款編號！</div>

        <div className={styles.paycode}>
          繳款編號：
          {paycode}
        </div>

        <div className={styles.fields}>
          <div>商店編號</div>
          <div>{`${merchantNumber} - ${storeName}`}</div>

          <div>訂單編號</div>
          {orderNumber}

          <div>交易金額</div>
          {amount}

          <div>繳費期限</div>
          <div>
            {moment((expireDate || 0) * 1000).format(
              'YYYY / MM / DD',
            ) /** SHOULD_NOT_BE_NULL */}
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.notice}>注意事項</div>

          <div className={styles.noticeList}>
            <ul className={styles.ul}>
              <li>
                請紀錄上列16位數繳款編號，至便利商店列印出繳費單到櫃檯繳費。如欲了解各便利商店繳費操作流程，請點選以下圖示：
              </li>

              <div className={styles.imgs}>
                {[
                  {
                    key: 'sevenEleven',
                    src: ezpaySevenEleven,
                    link: 'http://www.ibon.com.tw/paymentcode.aspx#gsc.tab=0',
                  },
                  {
                    key: 'familymart',
                    src: ezpayFamilyMart,
                    link:
                      'http://www.famiport.com.tw/intro.asp?page=5&oc=A05&ocsub=B02',
                  },
                  {
                    key: 'hiLife',
                    src: ezpayHiLife,
                    link: 'http://www.hilife.com.tw/serviceInfo.aspx',
                  },
                  {
                    key: 'okMart',
                    src: ezpayOkMart,
                    link: 'http://www.okmart.com.tw/okGo_service',
                  },
                ].map(({ key, src, link }) => (
                  <a
                    key={key}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={src} alt={key} />
                  </a>
                ))}
              </div>

              <li>
                繳款編號產生後有效期限請依交易商家之規則為準，但在超商列印出條碼繳費單後需在
                <span className={styles.limitTime}>3小時</span>
                內繳款完成，如逾時未繳，需重新至機台列印條碼繳費單。
              </li>

              <li>請勿對同一筆帳單列印多張繳費單重複繳款。</li>
            </ul>
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <button
            type="button"
            className={styles.printBtn}
            onClick={() => window.print()}
          >
            列印此頁
          </button>

          <Link
            href={
              (redirectUrl instanceof Array ? redirectUrl[0] : redirectUrl) ||
              `/checkout/thank-you-page/${id}`
            }
          >
            <button type="button" className={styles.backBtn}>
              回商家網站
            </button>
          </Link>
        </div>
      </div>

      <div className={styles.footerTip}>
        藍新金流僅提供款項代收付服務，如有商品問題，請向購買商家聯繫
      </div>
    </div>
  );
});
