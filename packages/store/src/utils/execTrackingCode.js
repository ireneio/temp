const getSpecsName = specs => {
  let specsName = '';
  if (specs && specs.length > 0) {
    specsName = specs.reduce(
      (name, spec, idx) =>
        idx === 0
          ? `${name}${spec.title.zh_TW}`
          : `${name}/${spec.title.zh_TW}`,
      '',
    );
  }
  return specsName;
};

export default function(eventName, options = {}) {
  switch (eventName) {
    case 'AddToCart-EC': {
      const { cart, payload, pageAdTrackIDs } = options;
      const { products } = cart.categories;
      const { productId, variantId, quantity } = payload.items[0];
      /* FB Pixel */
      if (window.fbq && pageAdTrackIDs.fbPixelId) {
        window.fbq('track', 'AddToCart', {
          content_ids: [productId],
          content_type: 'product',
        });
      }
      /* Google Enhanced Ecommerce */
      if (window.gtag && pageAdTrackIDs.gaID) {
        const theProduct = products.find(
          product =>
            product.productId === productId && product.variantId === variantId,
        );
        const specsName = getSpecsName(theProduct.specs);
        window.gtag('event', 'add_to_cart', {
          items: [
            {
              id: theProduct.sku,
              name: `${theProduct.title.zh_TW} ${specsName}`,
              variant: `${specsName}`,
              quantity,
              price: theProduct.retailPrice,
            },
          ],
        });
      }
      break;
    }
    case 'AddToCart-LP': {
      const {
        id: productId,
        title,
        quantity = 1, // if not fill quantity in 5 mins
        variant,
        pageAdTrackIDs,
      } = options;
      /* FB Pixel */
      if (window.fbq && pageAdTrackIDs.fbPixelId) {
        window.fbq('track', 'AddToCart', {
          content_ids: [productId],
          content_type: 'product',
        });
      }
      /* Google Enhanced Ecommerce */
      if (window.gtag && pageAdTrackIDs.gaID) {
        const specsName = getSpecsName(variant.specs);
        window.gtag('event', 'add_to_cart', {
          items: [
            {
              id: variant.sku,
              name: `${title.zh_TW} ${specsName}`,
              variant: `${specsName}`,
              quantity,
              price: variant.retailPrice,
            },
          ],
        });
      }
      break;
    }
    case 'ViewProduct': {
      const { pageAdTrackIDs, product } = options;
      /* FB Pixel */
      if (window.fbq && pageAdTrackIDs.fbPixelId) {
        window.fbq('track', 'ViewContent', {
          content_ids: [product.id],
          content_type: 'product',
        });
      }
      /* Google Enhanced Ecommerce */
      if (window.gtag && pageAdTrackIDs.gaID) {
        window.gtag('event', 'view_item', {
          items: [
            {
              id: product.id,
              name: product.title.zh_TW,
            },
          ],
        });
      }
      break;
    }
    case 'Search': {
      const { products, pageAdTrackIDs, searchString } = options;
      /* FB Pixel */
      if (window.fbq && pageAdTrackIDs.fbPixelId && !products) {
        window.fbq('track', 'Search', { search_string: searchString });
      }
      /* Google Enhanced Ecommerce */
      if (window.gtag && pageAdTrackIDs.gaID && products) {
        const items = products.data.map(product => ({
          id: product.id,
          name: product.title.zh_TW,
          list_name: `${searchString}`,
        }));
        window.gtag('event', 'view_item_list', { items });
      }
      break;
    }
    case 'AddToWishlist': {
      const { pageAdTrackIDs } = options;
      /* FB Pixel */
      if (window.fbq && pageAdTrackIDs.fbPixelId) {
        window.fbq('track', 'AddToWishlist');
      }
      /* No corresponding Google Enhanced Ecommerce */
      break;
    }
    case 'CompleteRegistration': {
      const { pageAdTrackIDs } = options;
      if (window.fbq && pageAdTrackIDs.fbPixelId) {
        window.fbq('track', 'CompleteRegistration');
      }
      /* No corresponding Google Enhanced Ecommerce */
      /* Adwords conversion */
      if (
        window.gtag &&
        pageAdTrackIDs.googleAdsConversionID &&
        pageAdTrackIDs.googleAdsSignupLabel
      ) {
        window.gtag('event', 'conversion', {
          send_to: `${pageAdTrackIDs.googleAdsSignupLabel}`,
        });
      }
      break;
    }
    case 'BeginCheckout': {
      const { pageAdTrackIDs } = options;
      /* FB Pixel */
      if (window.fbq && pageAdTrackIDs.fbPixelId) {
        window.fbq('track', 'InitiateCheckout');
      }
      /* Google Enhanced Ecommerce */
      if (window.gtag && pageAdTrackIDs.gaID) {
        window.gtag('event', 'set_checkout_option', {
          checkout_step: 1,
          checkout_option: 'visa',
        });
      }
      /* Adwords conversion */
      if (
        window.gtag &&
        pageAdTrackIDs.googleAdsConversionID &&
        pageAdTrackIDs.googleAdsCheckoutLabel
      ) {
        window.gtag('event', 'conversion', {
          send_to: `${pageAdTrackIDs.googleAdsCheckoutLabel}`,
        });
      }
      break;
    }
    case 'AddPaymentInfo': {
      const { pageAdTrackIDs } = options;
      /* FB Pixel */
      if (window.fbq && pageAdTrackIDs.fbPixelId) {
        window.fbq('track', 'AddPaymentInfo');
      }
      /* Google Enhanced Ecommerce */
      if (window.gtag && pageAdTrackIDs.gaID) {
        window.gtag('event', 'set_checkout_option', {
          checkout_step: 2,
          checkout_option: 'visa',
        });
      }
      break;
    }
    case 'Purchase': {
      const {
        products,
        priceInfo: { total, shipmentFee, paymentFee, currency },
        pageAdTrackIDs,
      } = options;
      /* FB Pixel */
      if (window.fbq && pageAdTrackIDs.fbPixelId) {
        const productIds = products.map(product => product.productId);
        window.fbq('track', 'Purchase', {
          content_ids: productIds,
          content_type: 'product',
          value: total, // fb pixel record total of order different from GA EC
          currency,
        });
      }
      /* Google Enhanced Ecommerce */
      if (window.gtag && pageAdTrackIDs.gaID) {
        const { orderNo, cname } = options;
        const items = products
          .filter(product => product.type === 'product')
          .map(product => {
            const specsName = getSpecsName(product.specs);
            return {
              id: product.sku,
              name: `${product.title.zh_TW}`,
              variant: specsName,
              price: product.totalPrice / product.quantity,
              quantity: product.quantity,
            };
          });
        window.gtag('event', 'purchase', {
          transaction_id: orderNo,
          affiliation: cname,
          value: total - shipmentFee - paymentFee,
          shipping: shipmentFee,
          items,
        });
      }
      /* Adwords conversion */
      if (
        window.gtag &&
        pageAdTrackIDs.googleAdsConversionID &&
        pageAdTrackIDs.googleAdsCompleteOrderLabel
      ) {
        window.gtag('event', 'conversion', {
          send_to: `${pageAdTrackIDs.googleAdsCompleteOrderLabel}`,
        });
      }
      break;
    }
    default:
      break;
  }
}
