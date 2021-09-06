import divider from '@meepshop/divider';
import draftText from '@meepshop/draft-text';
import facebookWall from '@meepshop/facebook-wall';
import googleMap from '@meepshop/google-map';
import iframe from '@meepshop/iframe';
import productDraftText from '@meepshop/product-draft-text';
import productIframe from '@meepshop/product-iframe';
import productVideo from '@meepshop/product-video';
import smartConversion from '@meepshop/smart-conversion';
import socialMedia from '@meepshop/social-media';
import socialThumbs from '@meepshop/social-thumbs';
import unavailable from '@meepshop/unavailable';
import video from '@meepshop/video';

import image from 'image';
import carousel from 'carousel';
import landingPage from 'landingPage';
import imagetext from 'imageText';
import productCollections from 'productCollection';
import productCarousell from 'productCarousel';
import productInfo from 'productInfo';
import productList from 'productList';
import productQA from 'productQA';
import activity from 'activity';
import checkout from 'checkout';
import menu, { handleModuleData } from 'menu';
import viewTracking from 'viewTracking';

export default {
  image,
  iframe,
  googlemap: googleMap,
  carousel,
  divider,
  'facebook-wall': facebookWall,
  'landing-page': landingPage,
  'live-video': unavailable,
  'live-video-comments': unavailable,
  'product-html': productIframe,
  'social-thumbs': socialThumbs,
  imagetext,
  'social-media': socialMedia,
  'video-core': video,
  'product-collections': productCollections,
  'product-carousell': productCarousell,
  'product-draftText': productDraftText,
  'product-info': productInfo,
  products: productList.Default,
  'products-controlled': productList.Controlled,
  'product-service': productQA,
  'product-video': productVideo,
  'draft-text': draftText,
  activity,
  checkout,
  menu: handleModuleData(menu),
  viewTracking,
  'smart-conversion': smartConversion,
};
