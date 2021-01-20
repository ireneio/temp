// import
import React from 'react';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';

import Description from './Description';
import Credit from './Credit';
import Allpay from './Allpay';
import Ezpay from './Ezpay';
import Gmo from './Gmo';
import CathayAtm from './CathayAtm';
import TransactionNo from './TransactionNo';

// graphql typescript
import {
  paymentInfoFragment as paymentInfoFragmentType,
  paymentInfoFragment_paymentInfo_list_accountInfo_ezpay as paymentInfoFragmentPaymentInfoListAccountInfoEzpay,
  paymentInfoFragment_paymentInfo_list_accountInfo_gmo as paymentInfoFragmentPaymentInfoListAccountInfoGmo,
} from '@meepshop/types/gqls/store';

// graphql import
import { descriptionFragment } from './Description';
import { creditFragment } from './Credit';
import { allpayFragment } from './Allpay';
import { ezpayFragment } from './Ezpay';
import { gmoOrderFragment } from './Gmo';
import { cathayAtmOrderFragment } from './CathayAtm';
import { transactionNoFragment } from './TransactionNo';

// typescript definition
interface PropsType {
  order: paymentInfoFragmentType;
}

// definition
export const paymentInfoFragment = gql`
  fragment paymentInfoFragment on Order {
    ...descriptionFragment
    ...gmoOrderFragment
    ...cathayAtmOrderFragment

    paymentInfo {
      ...creditFragment
      ...allpayFragment
      ...ezpayFragment
      ...transactionNoFragment
      id
      list {
        id
        template
        accountInfo {
          allpay {
            choosePayment: ChoosePayment
          }
          ezpay {
            choosePayment: ezpayPaymentType
          }
          gmo {
            choosePayment: paymentType
          }
          cathay {
            choosePayment: type
          }
          cathay_atm: cathay {
            choosePayment: type
          }
          chinatrust {
            choosePayment: type
          }
        }
      }
    }
  }

  ${descriptionFragment}
  ${creditFragment}
  ${allpayFragment}
  ${ezpayFragment}
  ${gmoOrderFragment}
  ${cathayAtmOrderFragment}
  ${transactionNoFragment}
`;

export default React.memo(({ order }: PropsType) => {
  const { paymentInfo } = order;
  const template = paymentInfo?.list?.[0]?.template as
    | 'allpay'
    | 'ezpay'
    | 'gmo'
    | 'cathay'
    | 'cathay_atm'
    | 'chinatrust'
    | 'hitrust'
    | 'linepay'
    | undefined
    | null;

  if (!template || !paymentInfo)
    return <Description order={filter(descriptionFragment, order)} />;

  // TODO: "hitrust" should list in "accountInfo"
  if (template === 'hitrust')
    return (
      <>
        <Credit paymentInfo={filter(creditFragment, paymentInfo)} />

        <Description order={filter(descriptionFragment, order)} />
      </>
    );

  if (template === 'linepay')
    return (
      <>
        <div>
          <Credit paymentInfo={filter(creditFragment, paymentInfo)} />
          <TransactionNo
            paymentInfo={filter(transactionNoFragment, paymentInfo)}
          />
        </div>

        <Description order={filter(descriptionFragment, order)} />
      </>
    );

  const choosePayment =
    paymentInfo?.list?.[0]?.accountInfo?.[template]?.choosePayment || null;

  switch (template) {
    case 'allpay':
      return (
        <>
          <Allpay
            choosePayment={choosePayment}
            paymentInfo={filter(allpayFragment, paymentInfo)}
          />

          <Description order={filter(descriptionFragment, order)} />
        </>
      );

    case 'ezpay':
      return (
        <>
          <Ezpay
            choosePayment={
              choosePayment as paymentInfoFragmentPaymentInfoListAccountInfoEzpay['choosePayment']
            }
            paymentInfo={filter(ezpayFragment, paymentInfo)}
          />

          <Description order={filter(descriptionFragment, order)} />
        </>
      );

    case 'gmo':
      return (
        <>
          <Gmo
            choosePayment={
              choosePayment as paymentInfoFragmentPaymentInfoListAccountInfoGmo['choosePayment']
            }
            order={filter(gmoOrderFragment, order)}
          />

          <Description order={filter(descriptionFragment, order)} />
        </>
      );

    case 'cathay':
      return (
        <>
          <Credit paymentInfo={filter(creditFragment, paymentInfo)} />

          <Description order={filter(descriptionFragment, order)} />
        </>
      );

    case 'cathay_atm':
      return (
        <>
          <CathayAtm order={filter(cathayAtmOrderFragment, order)} />

          <Description order={filter(descriptionFragment, order)} />
        </>
      );

    case 'chinatrust':
      return (
        <>
          {choosePayment !== 'CREDIT' ? null : (
            <Credit paymentInfo={filter(creditFragment, paymentInfo)} />
          )}

          <Description order={filter(descriptionFragment, order)} />
        </>
      );

    default:
      return <Description order={filter(descriptionFragment, order)} />;
  }
});
