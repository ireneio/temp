// import
import dynamic from 'next/dynamic';

// definition
export default {
  GroupModule: () => {
    throw new Error('Can not use GroupModule');
  },
  LayoutModule: () => {
    throw new Error('Can not use LayoutModule');
  },
  ActivityModule: () => {
    throw new Error('Can not use ActivityModule');
  },
  CarouselModule: dynamic(() => import('@meepshop/carousel')),
  DividerModule: dynamic(() => import('@meepshop/divider')),
  DraftTextModule: dynamic(() => import('@meepshop/draft-text')),
  FacebookWallModule: dynamic(() => import('@meepshop/facebook-wall')),
  GoogleMapModule: dynamic(() => import('@meepshop/google-map')),
  IframeModule: dynamic(() => import('@meepshop/iframe')),
  ImageModule: dynamic(() => import('@meepshop/image')),
  ImageTextModule: dynamic(() => import('@meepshop/image-text')),
  LandingPageModule: () => {
    throw new Error('Can not use LandingPageModule');
  },
  MenuModule: dynamic(() => import('@meepshop/menu')),
  ProductCarouselModule: dynamic(() => import('@meepshop/product-carousel')),
  ProductCollectionsModule: dynamic(() =>
    import('@meepshop/product-collections'),
  ),
  ProductDraftTextModule: dynamic(() => import('@meepshop/product-draft-text')),
  ProductIframeModule: dynamic(() => import('@meepshop/product-iframe')),
  ProductInfoModule: () => {
    throw new Error('Can not use ProductInfoModule');
  },
  ProductQaModule: dynamic(() => import('@meepshop/product-qa')),
  ProductVideoModule: dynamic(() => import('@meepshop/product-video')),
  ProductsModule: () => {
    throw new Error('Can not use ProductsModule');
  },
  SmartConversionModule: dynamic(() => import('@meepshop/smart-conversion')),
  SocialMediaModule: dynamic(() => import('@meepshop/social-media')),
  SocialThumbsModule: dynamic(() => import('@meepshop/social-thumbs')),
  UnavailableModule: dynamic(() => import('@meepshop/unavailable')),
  VideoModule: dynamic(() => import('@meepshop/video')),
  ViewTrackingModule: dynamic(() => import('@meepshop/view-tracking')),
};
