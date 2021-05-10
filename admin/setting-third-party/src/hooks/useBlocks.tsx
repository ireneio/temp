// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React, { useMemo } from 'react';
import { filter } from 'graphql-anywhere';

import {
  adminSettingThirdPartyEcfit,
  adminSettingThirdPartyFacebook,
  adminSettingThirdPartyGoodDeal,
  webTrackGoogleAnalytics_w224 as webTrackGoogleAnalytics,
} from '@meepshop/images';

import FaceBook from '../Facebook';
import Ecfit from '../Ecfit';
import GoodDeal from '../GoodDeal';
import GoogleAnalytics from '../GaViewId';

// graphql typescript
import { useBlocksFragment as useBlocksFragmentType } from '@meepshop/types/gqls/admin';

// graphql import
import { facebookFragment } from '../gqls/facebook';
import { ecfitFragment } from '../gqls/ecfit';
import { goodDealFragment } from '../gqls/goodDeal';

// typescript definition
interface BlockType {
  key: string;
  src: string;
  useToggle: boolean;
  initialValue?: boolean;
  useToggleDescription?: boolean;
  component: React.ReactNode;
}

// definition

export default (
  form: FormComponentProps['form'],
  store: useBlocksFragmentType | null,
): BlockType[] =>
  useMemo(
    () =>
      [
        {
          key: 'facebook',
          src: adminSettingThirdPartyFacebook,
          useToggle: true,
          initialValue: Boolean(store?.facebookSetting?.isLoginEnabled),
          useToggleDescription: true,
          component: !store?.facebookSetting ? null : (
            <FaceBook
              form={form}
              facebookSetting={filter(facebookFragment, store.facebookSetting)}
            />
          ),
        },
        !store?.experiment?.ecfitEnabled
          ? null
          : {
              key: 'ecfit',
              src: adminSettingThirdPartyEcfit,
              useToggle: true,
              initialValue: Boolean(store?.storeEcfitSettings?.isEnabled),
              useToggleDescription: false,
              component: !store?.storeEcfitSettings ? null : (
                <Ecfit
                  form={form}
                  storeEcfitSettings={filter(
                    ecfitFragment,
                    store.storeEcfitSettings,
                  )}
                />
              ),
            },
        !store?.experiment?.isGoodDealEnabled
          ? null
          : {
              key: 'goodDeal',
              src: adminSettingThirdPartyGoodDeal,
              useToggle: true,
              initialValue: store?.setting?.storeGoodDealSettings?.status === 1,
              useToggleDescription: false,
              component: !store?.setting?.storeGoodDealSettings ? null : (
                <GoodDeal
                  form={form}
                  storeGoodDealSettings={filter(
                    goodDealFragment,
                    store.setting.storeGoodDealSettings,
                  )}
                />
              ),
            },
        {
          key: 'gaViewId',
          src: webTrackGoogleAnalytics,
          useToggle: false,
          component: (
            <GoogleAnalytics form={form} gaViewId={store?.gaViewId || null} />
          ),
        },
      ].filter(Boolean) as BlockType[],
    [form, store],
  );
