import image from '@meepshop/meep-ui/lib/image';
import iframe from '@meepshop/meep-ui/lib/iframe';
import googlemap from '@meepshop/meep-ui/lib/googleMap';
import carousel from '@meepshop/meep-ui/lib/carousel';
import divider from '@meepshop/meep-ui/lib/divider';
import facebookWall from '@meepshop/meep-ui/lib/facebookWall';
import landingPage from '@meepshop/meep-ui/lib/landingPage';
// import liveVideo from '@meepshop/meep-ui/lib/liveVideo';
// import liveVideoComment from '@meepshop/meep-ui/lib/liveVideoComments';
import socialThumbs from '@meepshop/meep-ui/lib/socialThumbs';
// import memberOrderApply from '@meepshop/meep-ui/lib/memberOrderApply';
import imagetext from '@meepshop/meep-ui/lib/imageText';
// import memberOrderApplyList from '@meepshop/meep-ui/lib/memberOrderApplyList';
import socailMedia from '@meepshop/meep-ui/lib/socialMedia';
import thankYouPage from '@meepshop/meep-ui/lib/thankYouPage';
import videoCore from '@meepshop/meep-ui/lib/videoCore';
// import memberOrders from '@meepshop/meep-ui/lib/memberOrderList';
import productCollections from '@meepshop/meep-ui/lib/productCollection';
import productCarousell from '@meepshop/meep-ui/lib/productCarousel';
import productInfo from '@meepshop/meep-ui/lib/productInfo';
import fixedTop from '@meepshop/meep-ui/lib/fixedTop';
import secondTop from '@meepshop/meep-ui/lib/secondTop';
import products from '@meepshop/meep-ui/lib/productList';
import productQA from '@meepshop/meep-ui/lib/productQA';
import draftText from '@meepshop/meep-ui/lib/draftText';
// import memberOrderDetails from '@meepshop/meep-ui/lib/memberOrderDetails';
// import memberOrderPayNotification from '@meepshop/meep-ui/lib/memberOrderPayNotification';
import activity from '@meepshop/meep-ui/lib/activity';
import checkout from '@meepshop/meep-ui/lib/checkout';
import menu from '@meepshop/meep-ui/lib/menu';
// import memberSettings from '@meepshop/meep-ui/lib/memberInfo';
import productSet from '@meepshop/meep-ui/lib/productSet';
// import memberOrderQA from '@meepshop/meep-ui/lib/memberOrderQA';
// import memberRecipients from '@meepshop/meep-ui/lib/memberRecipients';
// import memberPoints from '@meepshop/meep-ui/lib/memberPoints';
// import memberWishlist from '@meepshop/meep-ui/lib/memberWishList';
// import memberPassword from '@meepshop/meep-ui/lib/memberPassword';
import forgotPassword from '@meepshop/meep-ui/lib/forgotPassword';
import UnavailableComp from 'components/UnavailableComp';

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
  // 'member-order-apply': memberOrderApply,
  imagetext,
  // 'member-order-apply-list': memberOrderApplyList,
  'social-media': socailMedia,
  'thank-you-page': thankYouPage,
  'video-core': videoCore,
  // 'member-orders': memberOrders,
  'product-collections': productCollections,
  'product-carousell': productCarousell,
  'product-info': productInfo,
  'fixed-top': fixedTop,
  'second-top': secondTop,
  products,
  'product-service': productQA,
  'draft-text': draftText,
  // 'member-order-details': memberOrderDetails,
  // 'member-order-pay-noti': memberOrderPayNotification,
  activity,
  checkout,
  menu,
  // 'member-settings': memberSettings,
  product: productSet,
  // 'member-order-qa': memberOrderQA,
  // 'member-recipients': memberRecipients,
  // 'member-points': memberPoints,
  // 'member-wishList': memberWishlist,
  // 'member-change-password': memberPassword,
  'forgot-password': forgotPassword,
};
