// import
import carousel from '@meepshop/carousel';
import divider from '@meepshop/divider';
import draftText from '@meepshop/draft-text';
import facebookWall from '@meepshop/facebook-wall';
import googleMap from '@meepshop/google-map';
import iframe from '@meepshop/iframe';
import image from '@meepshop/image';
import imageText from '@meepshop/image-text';
import productCarousel from '@meepshop/product-carousel';
import productCollections from '@meepshop/product-collections';
import productDraftText from '@meepshop/product-draft-text';
import productIframe from '@meepshop/product-iframe';
import productInfo from '@meepshop/product-info';
import productQa from '@meepshop/product-qa';
import productvideo from '@meepshop/product-video';
import smartConversion from '@meepshop/smart-conversion';
import socialMedia from '@meepshop/social-media';
import socialThumbs from '@meepshop/social-thumbs';
import unavailable from '@meepshop/unavailable';
import video from '@meepshop/video';
import viewTracking from '@meepshop/view-tracking';

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
  CarouselModule: carousel,
  DividerModule: divider,
  DraftTextModule: draftText,
  FacebookWallModule: facebookWall,
  GoogleMapModule: googleMap,
  IframeModule: iframe,
  ImageModule: image,
  ImageTextModule: imageText,
  LandingPageModule: () => {
    // TODO import '@meepshop/landing-page'
    throw new Error('Should remove @ant-design/compatible');
  },
  MenuModule: () => {
    // TODO import '@meepshop/menu'
    throw new Error('Can not use MenuModule');
  },
  ProductCarouselModule: productCarousel,
  ProductCollectionsModule: productCollections,
  ProductDraftTextModule: productDraftText,
  ProductIframeModule: productIframe,
  ProductInfoModule: productInfo,
  ProductQaModule: productQa,
  ProductVideoModule: productvideo,
  ProductsModule: () => {
    throw new Error('Can not use ProductsModule');
  },
  SmartConversionModule: smartConversion,
  SocialMediaModule: socialMedia,
  SocialThumbsModule: socialThumbs,
  UnavailableModule: unavailable,
  VideoModule: video,
  ViewTrackingModule: viewTracking,
};
