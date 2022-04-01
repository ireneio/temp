// import
import React, { useMemo } from 'react';

import filter from '@meepshop/utils/lib/filter';

import CathayAtm from '../CathayAtm';
import GmoAtm from '../GmoAtm';
import GmoCvs from '../GmoCvs';
import EcpayCredit from '../EcpayCredit';

// graphql typescript
import { getOrderInThankYouPage_viewer as getOrderInThankYouPageViewer } from '@meepshop/types/gqls/store';

// graphql import
import { cathayAtmFragment } from '../gqls/CathayAtm';
import { gmoAtmFragment } from '../gqls/GmoAtm';
import { gmoCvsFragment } from '../gqls/GmoCvs';
import { ecpayCreditFragment } from '../gqls/EcpayCredit';

// definition
export default (
  viewer: getOrderInThankYouPageViewer | null,
): React.ReactNode | null =>
  useMemo(() => {
    if (!viewer?.order) return null;

    const template = viewer?.order?.paymentInfo?.list?.[0]?.template;
    const order = viewer?.order;

    switch (template) {
      case 'cathay_atm':
        return <CathayAtm order={filter(cathayAtmFragment, order)} />;

      case 'gmo': {
        const paymentType =
          order.paymentInfo?.list?.[0]?.accountInfo?.gmo?.paymentType;

        if (paymentType === 'ATM')
          return <GmoAtm order={filter(gmoAtmFragment, order)} />;

        if (paymentType === 'KIOSK')
          return <GmoCvs order={filter(gmoCvsFragment, order)} />;

        return null;
      }

      case 'ecpay2': {
        const isCreditPayment = /CREDIT/.test(
          order.paymentInfo?.list?.[0]?.accountInfo?.ecpay2?.ChoosePayment ||
            '',
        );

        if (isCreditPayment)
          return <EcpayCredit viewer={filter(ecpayCreditFragment, viewer)} />;

        return null;
      }

      default:
        return null;
    }
  }, [viewer]);
