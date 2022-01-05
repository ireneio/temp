// import
import { useMemo } from 'react';

import { useTranslation } from '@meepshop/locales';

import { ModuleIcons } from '../../constants';

// graphql typescript
import { useSectionsFragment as useSectionsFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
export interface SectionType {
  title: string;
  modules: (keyof typeof ModuleIcons)[];
}

// definition
export default (store: useSectionsFragmentType): SectionType[] => {
  const { t } = useTranslation('page-editor');
  const { isLandingPageModuleEnabled, page } = store;
  const isProductPage = ['product', 'template'].includes(page?.pageType || ''); // SHOULD_NOT_BE_NULL

  return useMemo(
    () => [
      ...(isProductPage
        ? [
            {
              title: t('template'),
              modules: [
                'ProductCarouselModule',
                'ProductInfoModule',
                'ProductCollectionsModule',
                'ProductDraftTextModule',
                'ProductVideoModule',
                'ProductQaModule',
                'ProductIframeModule',
              ] as SectionType['modules'],
            },
          ]
        : []),
      {
        title: t('image-text'),
        modules: [
          'ImageModule',
          'ImageTextModule',
          'CarouselModule',
          'DraftTextModule',
        ] as SectionType['modules'],
      },
      {
        title: t('menu'),
        modules: ['MenuModule'],
      },
      {
        title: t('product'),
        modules: [
          'ProductsModule',
          ...(!isProductPage
            ? [
                'ActivityModule',
                ...(isLandingPageModuleEnabled ? ['LandingPageModule'] : []),
              ]
            : []),
        ] as SectionType['modules'],
      },
      {
        title: t('iframe'),
        modules: [
          'VideoModule',
          'GoogleMapModule',
          'IframeModule',
        ] as SectionType['modules'],
      },
      {
        title: t('layout'),
        modules: ['DividerModule', 'GroupModule'] as SectionType['modules'],
      },
      {
        title: t('social-media'),
        modules: [
          'FacebookWallModule',
          'SocialThumbsModule',
          'SocialMediaModule',
        ] as SectionType['modules'],
      },
      {
        title: t('analysis'),
        modules: [
          'ViewTrackingModule',
          ...(page?.pageType !== 'template' ? ['SmartConversionModule'] : []),
        ] as SectionType['modules'],
      },
    ],
    [isLandingPageModuleEnabled, isProductPage, page, t],
  );
};
