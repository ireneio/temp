// import
import React, { useMemo } from 'react';
import { filter } from 'graphql-anywhere';

import {
  adminSettingThirdPartyKoolive,
  adminSettingThirdPartyEcfit,
  adminSettingThirdPartyFacebook,
  adminSettingThirdPartyLine,
  webTrackGoogleAnalytics_w224 as webTrackGoogleAnalytics,
} from '@meepshop/images';

import FaceBook from '../Facebook';
import Line from '../Line';
import Ecfit from '../Ecfit';
import GoogleAnalytics from '../GaViewId';
import KooLive from '../KooLive';

// graphql typescript
import { useBlocksFragment as useBlocksFragmentType } from '@meepshop/types/gqls/admin';

// graphql import
import { facebookFragment } from '../gqls/facebook';
import { lineLineLoginSettingFragment } from '../gqls/line';
import { ecfitFragment } from '../gqls/ecfit';

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
export default (store: useBlocksFragmentType | null): BlockType[] =>
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
              facebookSetting={filter(facebookFragment, store.facebookSetting)}
            />
          ),
        },
        !store?.kooLiveEnabled
          ? null
          : {
              key: 'koodata',
              src: adminSettingThirdPartyKoolive,
              useToggle: false,
              component: <KooLive cname={store.cname} />,
            },
        {
          key: 'line',
          src: adminSettingThirdPartyLine,
          useToggle: true,
          initialValue: Boolean(store?.lineLoginSetting.isLoginEnabled),
          useToggleDescription: true,
          component: !store?.lineLoginSetting ? null : (
            <Line
              lineSetting={filter(
                lineLineLoginSettingFragment,
                store.lineLoginSetting,
              )}
            />
          ),
        },
        !store?.ecfitEnabled
          ? null
          : {
              key: 'ecfit',
              src: adminSettingThirdPartyEcfit,
              useToggle: true,
              initialValue: Boolean(store?.storeEcfitSettings?.isEnabled),
              useToggleDescription: false,
              component: !store?.storeEcfitSettings ? null : (
                <Ecfit
                  storeEcfitSettings={filter(
                    ecfitFragment,
                    store.storeEcfitSettings,
                  )}
                />
              ),
            },
        {
          key: 'gaViewId',
          src: webTrackGoogleAnalytics,
          useToggle: false,
          component: <GoogleAnalytics gaViewId={store?.gaViewId || null} />,
        },
      ].filter(Boolean) as BlockType[],
    [store],
  );
