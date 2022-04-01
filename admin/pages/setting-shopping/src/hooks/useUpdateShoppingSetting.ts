// typescript import
import { InitialValuesType } from './useShoppingInitialValues';

// import
import { useCallback, useContext } from 'react';
import { message } from 'antd';
import { areEqual } from 'fbjs';

import { useTranslation } from '@meepshop/locales';
import { Apps as AppsContext } from '@meepshop/context';
import filter from '@meepshop/utils/lib/filter';

import useUpdateStoreList from './useUpdateStoreList';
import useUpdateStoreAppList from './useUpdateStoreAppList';

// graphql typescript
import {
  DisplayCurrencyEnum,
  getShoppingSetting_viewer_store as getShoppingSettingViewerStoreType,
} from '@meepshop/types/gqls/admin';

// graphqil import
import { updateShoppingSettingFragment } from '../gqls/useUpdateStoreList';

// typescript definitoin
type AppsType =
  | 'wishList'
  | 'productNotice'
  | 'returnOrder'
  | 'replacement'
  | 'memberSeePrice';

// definition
export default (
  store: getShoppingSettingViewerStoreType | null,
  initialValues: InitialValuesType | undefined,
): {
  loading: boolean;
  updateShoppingSetting: (values: InitialValuesType) => void;
} => {
  const apps = useContext(AppsContext);
  const { t } = useTranslation('setting');
  const {
    loading: updateStoreListLoading,
    updateStoreList,
  } = useUpdateStoreList(filter(updateShoppingSettingFragment, store || null));
  const {
    loading: updateStoreAppListLoading,
    updateStoreAppList,
  } = useUpdateStoreAppList();

  return {
    loading: updateStoreListLoading || updateStoreAppListLoading,
    updateShoppingSetting: useCallback(
      async ({ apps: shoppingApps, setting }) => {
        if (!store?.id || !initialValues) return;

        try {
          const mutations: void[] = [];

          if (!areEqual(initialValues.apps, shoppingApps)) {
            Object.keys(shoppingApps).forEach((key: AppsType) => {
              if (shoppingApps[key] !== initialValues.apps[key]) {
                const { storeAppId } = apps[key];

                mutations.push(
                  updateStoreAppList([
                    {
                      id: storeAppId || 'none-id' /** SHOULD_NOT_BE_NULL */,
                      isInstalled: shoppingApps[key] ? 1 : 0,
                    },
                  ]),
                );
              }
            });
          }

          if (!areEqual(initialValues.setting, setting)) {
            const { invoice, shopperLoginMessage, ...otherSetting } = setting;

            mutations.push(
              updateStoreList({
                ...otherSetting,
                shopperLoginMessage: !shopperLoginMessage
                  ? null
                  : (shopperLoginMessage.toRAW() as string),
                currency: otherSetting.currency as DisplayCurrencyEnum[],
                lockedCountry: otherSetting.lockedCountry ? ['Taiwan'] : [],
                invoice: !invoice
                  ? null
                  : {
                      paper: !invoice.paper
                        ? null
                        : {
                            donation: {
                              isEnabled: Boolean(
                                invoice.paper.isEnable &&
                                  invoice.paper.paperType?.includes('donation'),
                              ),
                            },
                            duplicate: {
                              isEnabled: Boolean(
                                invoice.paper.isEnable &&
                                  invoice.paper.paperType?.includes(
                                    'duplicate',
                                  ),
                              ),
                            },
                            triplicate: {
                              isEnabled: Boolean(
                                invoice.paper.isEnable &&
                                  invoice.paper.paperType?.includes(
                                    'triplicate',
                                  ),
                              ),
                            },
                          },
                      electronic: !invoice.electronic
                        ? null
                        : {
                            isDelay: invoice.electronic.isDelay === 1,
                            delayDays: invoice.electronic.delayDays,
                            type: invoice.electronic.type,
                            ecpay:
                              !invoice.electronic.isEnable ||
                              invoice.electronic.type === 'MANUAL'
                                ? null
                                : invoice.electronic.ecpay,
                            triplicate: {
                              isEnabled: Boolean(
                                invoice.electronic.isEnable &&
                                  invoice.electronic.electronicType?.includes(
                                    'triplicate',
                                  ),
                              ),
                            },
                            membershipCarrier: {
                              isEnabled: Boolean(
                                invoice.electronic.isEnable &&
                                  invoice.electronic.electronicType?.includes(
                                    'membershipCarrier',
                                  ),
                              ),
                            },
                            citizenDigitalCertificateCarrier: {
                              isEnabled: Boolean(
                                invoice.electronic.isEnable &&
                                  invoice.electronic.electronicType?.includes(
                                    'citizenDigitalCertificateCarrier',
                                  ),
                              ),
                            },
                            mobileBarCodeCarrier: {
                              isEnabled: Boolean(
                                invoice.electronic.isEnable &&
                                  invoice.electronic.electronicType?.includes(
                                    'mobileBarCodeCarrier',
                                  ),
                              ),
                            },
                            donation: {
                              isEnabled: Boolean(
                                invoice.electronic.isEnable &&
                                  invoice.electronic.electronicType?.includes(
                                    'donation',
                                  ),
                              ),
                            },
                          },
                    },
                order: {
                  ...otherSetting.order,
                  afterPaymentFail: otherSetting.order?.afterPaymentFail
                    ? 3
                    : 1,
                },
                rewardPointReminder: {
                  ...otherSetting.rewardPointReminder,
                  daysPrior:
                    otherSetting.rewardPointReminder.isEnabled &&
                    otherSetting.rewardPointReminder.daysPrior
                      ? otherSetting.rewardPointReminder.daysPrior
                      : 7,
                },
              }),
            );
          }

          await Promise.all(mutations);
          message.success(t('success'));
        } catch (error) {
          message.error(error.message);
        }
      },
      [apps, initialValues, store, t, updateStoreAppList, updateStoreList],
    ),
  };
};
