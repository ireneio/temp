import productDraftText from '@meepshop/product-draft-text';
import productVideo from '@meepshop/product-video';

import image from 'image';
import iframe from 'iframe';
import googlemap from 'googleMap';
import carousel from 'carousel';
import divider from 'divider';
import facebookWall from 'facebookWall';
import landingPage from 'landingPage';
import socialThumbs from 'socialThumbs';
import imagetext from 'imageText';
import socailMedia from 'socialMedia';
import videoCore from 'videoCore';
import productCollections from 'productCollection';
import productCarousell from 'productCarousel';
import productInfo from 'productInfo';
import productList from 'productList';
import productQA from 'productQA';
import draftText from 'draftText';
import activity from 'activity';
import checkout from 'checkout';
import menu, { handleModuleData } from 'menu';
import productSet from 'productSet';
import UnavailableComp from 'unavailableComp';
import viewTracking from 'viewTracking';

export default {
  image,
  iframe,
  googlemap,
  carousel,
  divider,
  'facebook-wall': facebookWall,
  'landing-page': landingPage,
  'live-video': UnavailableComp,
  'live-video-comments': UnavailableComp,
  'product-html': iframe, // data of `htmlCode` from `componentProdutList -> info -> zh_TW`
  'social-thumbs': socialThumbs,
  imagetext,
  'social-media': socailMedia,
  'video-core': videoCore,
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
  product: productSet,
  viewTracking,
};
