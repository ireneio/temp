import divider from '@meepshop/divider';
import draftText from '@meepshop/draft-text';
import facebookWall from '@meepshop/facebook-wall';
import googleMap from '@meepshop/google-map';
import iframe from '@meepshop/iframe';
import productCarousel from '@meepshop/product-carousel';
import productCollections from '@meepshop/product-collections';
import productDraftText from '@meepshop/product-draft-text';
import productIframe from '@meepshop/product-iframe';
import productQA from '@meepshop/product-qa';
import productVideo from '@meepshop/product-video';
import smartConversion from '@meepshop/smart-conversion';
import socialMedia from '@meepshop/social-media';
import socialThumbs from '@meepshop/social-thumbs';
import unavailable from '@meepshop/unavailable';
import video from '@meepshop/video';
import viewTracking from '@meepshop/view-tracking';

import image from 'image';
import carousel from 'carousel';
import landingPage from 'landingPage';
import imagetext from 'imageText';
import productInfo from 'productInfo';
import productList from 'productList';
import activity from 'activity';
import menu, { handleModuleData } from 'menu';

import handleProductQA from './utils/handleProductQA';

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
  'product-carousell': productCarousel,
  'product-draftText': productDraftText,
  'product-info': productInfo,
  products: productList.Default,
  'products-controlled': productList.Controlled,
  'product-service': handleProductQA(productQA),
  'product-video': productVideo,
  'draft-text': draftText,
  activity,
  menu: handleModuleData(menu),
  viewTracking,
  'smart-conversion': smartConversion,
};
