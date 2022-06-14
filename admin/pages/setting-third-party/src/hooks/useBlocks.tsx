// import
import React, { useMemo } from 'react';

import {
  adminSettingThirdPartyKoolive,
  adminSettingThirdPartyEcfit,
  adminSettingThirdPartyFacebook,
  adminSettingThirdPartyLine,
  webTrackGoogleAnalytics_w224 as webTrackGoogleAnalytics,
} from '@meepshop/images';
import filter from '@meepshop/utils/lib/filter';
import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/locales';

import FaceBook from '../Facebook';
import Line from '../Line';
import Ecfit from '../Ecfit';
import GoogleAnalytics from '../GaViewId';
import KooLive from '../KooLive';
import styles from '../styles/useBlock.less';

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
  titleTooltip?: React.ReactNode;
  useToggleDescription?: boolean;
  descriptionLink?: React.ReactNode;
  component: React.ReactNode;
}

// definition
export default (store: useBlocksFragmentType | null): BlockType[] => {
  const { t } = useTranslation('setting-third-party');

  return useMemo(
    () =>
      [
        {
          key: 'facebook',
          src: adminSettingThirdPartyFacebook,
          useToggle: true,
          initialValue: Boolean(store?.facebookSetting?.isLoginEnabled),
          useToggleDescription: true,
          titleTooltip: (
            <Tooltip
              title={
                <>
                  <div>{t('facebook.sub-title.tip')}</div>
                  <a
                    href="https://supportmeepshop.com/knowledgebase/%e7%ac%ac%e4%b8%89%e6%96%b9%e8%a8%ad%e5%ae%9a/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('facebook.toggle.tooltip')}
                  </a>
                </>
              }
              iconClassName={styles.tip}
            />
          ),
          descriptionLink: (
            <a
              className={styles.descriptionLink}
              href="https://supportmeepshop.com/knowledgebase/%e7%ac%ac%e4%b8%89%e6%96%b9%e8%a8%ad%e5%ae%9a/#3_Facebook_deng_ru_wei_he_wu_fa_shi_yong"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('facebook.description-link')}
            </a>
          ),
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
    [store, t],
  );
};
