// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React, { useMemo } from 'react';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';

import {
  adminSettingThirdPartyEcfit,
  adminSettingThirdPartyFacebook,
  adminSettingThirdPartyGoodDeal,
} from '@meepshop/images';

import FaceBook from '../Facebook';
import Ecfit from '../Ecfit';
import GoodDeal from '../GoodDeal';

// graphql typescript
import { useBlocksFragment as useBlocksFragmentType } from './__generated__/useBlocksFragment';

// graphql import
import { facebookFragment } from '../Facebook';
import { ecfitFragment } from '../Ecfit';
import { goodDealFragment } from '../GoodDeal';

// typescript definition
interface BlockType {
  key: string;
  src: string;
  initialValue: boolean;
  useToggleDescription: boolean;
  component: React.ReactNode;
}

// definition
export const useBlocksFragment = gql`
  fragment useBlocksFragment on Store {
    experiment {
      ecfitEnabled
      isGoodDealEnabled
    }

    facebookSetting {
      ...facebookFragment
      isLoginEnabled
    }

    storeEcfitSettings {
      ...ecfitFragment
      isEnabled
    }

    setting {
      storeGoodDealSettings: gooddeal {
        ...goodDealFragment
        status
      }
    }
  }

  ${facebookFragment}
  ${ecfitFragment}
  ${goodDealFragment}
`;

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
      ].filter(Boolean) as BlockType[],
    [form, store],
  );
