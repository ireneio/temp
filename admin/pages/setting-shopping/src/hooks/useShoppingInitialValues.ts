// typescript import
import { FormInstance } from 'antd/lib/form';
import { EditorState } from 'braft-editor';

import { InvoiceType } from './useInvoiceType';

// import
import { useMemo, useEffect, useContext } from 'react';
import { usePrevious } from 'react-use';
import { areEqual } from 'fbjs';
import { filter } from 'graphql-anywhere';
import { createEditorState } from '@admin/text-editor';

import { useTranslation } from '@meepshop/locales';
import { Apps as AppsContext } from '@meepshop/context';

import useInvoiceType from './useInvoiceType';

// graphql typescript
import {
  useShoppingInitialValuesFragment as useShoppingInitialValuesFragmentType,
  CheckoutFieldSettingEnum,
} from '@meepshop/types/gqls/admin';

// graphql import
import { useInvoiceTypeFragment } from '../gqls/useInvoiceType';

// typescript definition
interface InitialValuesFragmentType
  extends Omit<
    useShoppingInitialValuesFragmentType,
    'shopperLoginMessageDraft'
  > {
  shopperLoginMessageDraft?: meepshopDraftText | null;
}

export interface InitialValuesType {
  setting: {
    locale: (string | null)[] | null;
    currency: (string | null)[] | null;
    lockedCountry: boolean;
    order: {
      useNotPayNow: boolean;
      afterPaymentFail: boolean;
      autoAddStock: boolean | null;
    } | null;
    checkoutFields: {
      name: CheckoutFieldSettingEnum;
      mobile: CheckoutFieldSettingEnum;
      address: CheckoutFieldSettingEnum;
    };
    paidMessage: string | null;
    lockedBirthday: boolean | null;
    rewardPointReminder: {
      isEnabled: boolean;
      daysPrior?: number;
    };
    backToTopButtonEnabled: boolean;
    shopperLoginMessageEnabled: boolean;
    shopperLoginMessage: EditorState | null;
    invoice: InvoiceType | null;
  };
  apps: {
    memberSeePrice: boolean;
    productNotice: boolean;
    replacement: boolean;
    returnOrder: boolean;
    wishList: boolean;
  };
}

// defintion
export default (
  { resetFields }: FormInstance,
  setting: InitialValuesFragmentType | null,
): InitialValuesType | undefined => {
  const { t } = useTranslation('setting-shopping');
  const apps = useContext(AppsContext);
  const invoice = useInvoiceType(
    filter(useInvoiceTypeFragment, setting?.invoice || null),
  );
  const shopperLoginMessageDraft = setting?.shopperLoginMessageDraft;

  const shopperLoginMessageEditorState = useMemo(
    () =>
      !shopperLoginMessageDraft
        ? null
        : createEditorState(shopperLoginMessageDraft),
    [shopperLoginMessageDraft],
  );
  const initialValues = useMemo(() => {
    if (!setting) return undefined;

    const otherSetting = { ...setting };

    delete otherSetting.shopperLoginMessageDraft;

    return {
      setting: {
        ...otherSetting,
        lockedCountry: Boolean(otherSetting.lockedCountry?.[0]),
        order: !otherSetting.order
          ? null
          : {
              ...otherSetting.order,
              useNotPayNow: Boolean(otherSetting.order.useNotPayNow),
              afterPaymentFail: Boolean(
                otherSetting.order.afterPaymentFail === 3,
              ),
            },
        paidMessage: otherSetting.paidMessage || t('order.3.default'),
        rewardPointReminder: {
          isEnabled: otherSetting.rewardPointReminder.isEnabled,
          ...(!otherSetting.rewardPointReminder.isEnabled
            ? null
            : {
                daysPrior: otherSetting.rewardPointReminder.daysPrior,
              }),
        },
        shopperLoginMessage: shopperLoginMessageEditorState,
        invoice,
      },
      apps: {
        memberSeePrice: apps.memberSeePrice.isInstalled,
        productNotice: apps.productNotice.isInstalled,
        replacement: apps.replacement.isInstalled,
        returnOrder: apps.returnOrder.isInstalled,
        wishList: apps.wishList.isInstalled,
      },
    };
  }, [
    apps.memberSeePrice.isInstalled,
    apps.productNotice.isInstalled,
    apps.replacement.isInstalled,
    apps.returnOrder.isInstalled,
    apps.wishList.isInstalled,
    invoice,
    setting,
    shopperLoginMessageEditorState,
    t,
  ]);

  const prevInitialValues = usePrevious(initialValues);

  useEffect(() => {
    if (!areEqual(prevInitialValues, initialValues)) resetFields();
  }, [resetFields, initialValues, prevInitialValues]);

  return initialValues;
};
