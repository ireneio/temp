// import
import React, { useMemo } from 'react';

import { useTranslation } from '@meepshop/locales';
import {
  ProductCarouselIcon,
  ProductInfoIcon,
  ProductCollectionsIcon,
  ProductDraftTextIcon,
  ProductVideoIcon,
  ProductQaIcon,
  ProductIframeIcon,
  ImageIcon,
  ImageTextIcon,
  CarouselIcon,
  DraftTextIcon,
  MenuIcon,
  ProductsIcon,
  ActivityIcon,
  LandingPageIcon,
  VideoIcon,
  GoogleMapIcon,
  IframeIcon,
  DividerIcon,
  GroupIcon,
  FacebookWallIcon,
  SocialThumbsIcon,
  SocialMediaIcon,
  ViewTrackingIcon,
  SmartConversionComponentIcon,
} from '@meepshop/icons';

// typescript definition
interface SectionType {
  title: string;
  modules: {
    title: string;
    icon: React.ReactNode;
  }[];
}

// definition
export default (): SectionType[] => {
  const { t } = useTranslation('page-editor');

  return useMemo(
    () => [
      {
        title: t('template'),
        modules: [
          {
            title: t('modules.ProductCarouselModule'),
            icon: <ProductCarouselIcon />,
          },
          {
            title: t('modules.ProductInfoModule'),
            icon: <ProductInfoIcon />,
          },
          {
            title: t('modules.ProductCollectionsModule'),
            icon: <ProductCollectionsIcon />,
          },
          {
            title: t('modules.ProductDraftTextModule'),
            icon: <ProductDraftTextIcon />,
          },
          {
            title: t('modules.ProductVideoModule'),
            icon: <ProductVideoIcon />,
          },
          {
            title: t('modules.ProductQaModule'),
            icon: <ProductQaIcon />,
          },
          {
            title: t('modules.ProductIframeModule'),
            icon: <ProductIframeIcon />,
          },
        ],
      },
      {
        title: t('image-text'),
        modules: [
          {
            title: t('modules.ImageModule'),
            icon: <ImageIcon />,
          },
          {
            title: t('modules.ImageTextModule'),
            icon: <ImageTextIcon />,
          },
          {
            title: t('modules.CarouselModule'),
            icon: <CarouselIcon />,
          },
          {
            title: t('modules.DraftTextModule'),
            icon: <DraftTextIcon />,
          },
        ],
      },
      {
        title: t('menu'),
        modules: [
          {
            title: t('modules.MenuModule'),
            icon: <MenuIcon />,
          },
        ],
      },
      {
        title: t('product'),
        modules: [
          {
            title: t('modules.ProductsModule'),
            icon: <ProductsIcon />,
          },
          {
            title: t('modules.ActivityModule'),
            icon: <ActivityIcon />,
          },
          {
            title: t('modules.LandingPageModule'),
            icon: <LandingPageIcon />,
          },
        ],
      },
      {
        title: t('iframe'),
        modules: [
          {
            title: t('modules.VideoModule'),
            icon: <VideoIcon />,
          },
          {
            title: t('modules.GoogleMapModule'),
            icon: <GoogleMapIcon />,
          },
          {
            title: t('modules.IframeModule'),
            icon: <IframeIcon />,
          },
        ],
      },
      {
        title: t('layout'),
        modules: [
          {
            title: t('modules.DividerModule'),
            icon: <DividerIcon />,
          },
          {
            title: t('modules.GroupModule'),
            icon: <GroupIcon />,
          },
        ],
      },
      {
        title: t('social-media'),
        modules: [
          {
            title: t('modules.FacebookWallModule'),
            icon: <FacebookWallIcon />,
          },
          {
            title: t('modules.SocialThumbsModule'),
            icon: <SocialThumbsIcon />,
          },
          {
            title: t('modules.SocialMediaModule'),
            icon: <SocialMediaIcon />,
          },
        ],
      },
      {
        title: t('analysis'),
        modules: [
          {
            title: t('modules.ViewTrackingModule'),
            icon: <ViewTrackingIcon />,
          },
          {
            title: t('modules.SmartConversionModule'),
            icon: <SmartConversionComponentIcon />,
          },
        ],
      },
    ],
    [t],
  );
};
