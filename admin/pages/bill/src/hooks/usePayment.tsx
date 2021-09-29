// import
import React, { useState, useMemo } from 'react';

import CreditCardAndAtm from '../CreditCardAndAtm';
import CreditCard from '../CreditCard';
import AtmCheck from '../AtmCheck';
import Atm from '../Atm';

// graphql typescript
import { paymentStoreBillingSettingFragment_payment_creditCard as paymentStoreBillingSettingFragmentPaymentCreditCard } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  billId: string | null;
  creditCard: paymentStoreBillingSettingFragmentPaymentCreditCard | null;
}

type paymentTypeType = 'ALL' | 'ATM' | 'CREDIT_CARD' | 'ATM_CHECK' | null;

// definition
export default ({
  billId,
  creditCard,
}: PropsType): {
  modal: React.ReactNode | null;
  setPaymentType: (value?: paymentTypeType) => void;
} => {
  const [paymentType, setPaymentType] = useState<paymentTypeType>();

  return {
    modal: useMemo(() => {
      if (!billId) return null;

      switch (paymentType) {
        case 'ALL':
          return (
            <CreditCardAndAtm
              billId={billId}
              creditCard={creditCard}
              setPaymentType={setPaymentType}
            />
          );

        case 'CREDIT_CARD':
          return (
            <CreditCard
              billId={billId}
              creditCard={creditCard}
              setPaymentType={setPaymentType}
            />
          );

        case 'ATM_CHECK':
          return <AtmCheck setPaymentType={setPaymentType} />;

        case 'ATM':
          return <Atm billId={billId} onCancel={() => setPaymentType(null)} />;

        default:
          return null;
      }
    }, [billId, creditCard, paymentType]),
    setPaymentType,
  };
};
