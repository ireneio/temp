import fx from 'money';

export default (storeCurrency, customerCurrency) => price =>
  (transformPrice => {
    switch (customerCurrency) {
      case 'TWD':
        return `NT$ ${transformPrice.toFixed(0)}`;
      case 'CNY':
        return `RMB￥${transformPrice.toFixed(2)}`;
      case 'USD':
        return `US$ ${transformPrice.toFixed(2)}`;
      case 'JPY':
        return `JPY￥${transformPrice.toFixed(0)}`;
      case 'EUR':
        return `€ ${transformPrice.toFixed(2)}`;
      case 'VND':
        return `₫ ${transformPrice.toFixed(0)}`;
      case 'KRW':
        return `₩ ${transformPrice.toFixed(0)}`;
      case 'HKD':
        return `HK$ ${transformPrice.toFixed(1)}`;
      case 'MYR':
        return `RM ${transformPrice.toFixed(2)}`;
      /**
       * ignore reason:
       * other currency will not pass propTypes
       */
      /* istanbul ignore next */
      default:
        return price;
    }
  })(
    fx(parseFloat(price))
      .from(storeCurrency)
      .to(customerCurrency),
  ).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
