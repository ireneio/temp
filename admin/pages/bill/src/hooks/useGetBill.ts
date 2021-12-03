// import
import { useQuery } from '@apollo/client';

import { useRouter } from '@meepshop/link';

// graphql typescript
import {
  getBill as getBillType,
  getBillVariables as getBillVariablesType,
  getBill_viewer_store_bill as getBillViewerStoreBill,
  paymentStoreBillingSettingFragment as paymentStoreBillingSettingFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getBill } from '../gqls';

// definition
export default (): {
  bill: getBillViewerStoreBill | null;
  billing: paymentStoreBillingSettingFragmentType | null;
} => {
  const { query } = useRouter();
  const { data } = useQuery<getBillType, getBillVariablesType>(getBill, {
    variables: { billId: query.billId as string },
  });

  return {
    bill: data?.viewer?.store?.bill || null,
    billing: data?.viewer?.store?.setting?.billing || null,
  };
};
