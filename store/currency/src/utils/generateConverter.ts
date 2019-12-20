import fx from 'money';

export default (storeCurrency: string, customerCurrency: string) => (
  price: number,
) =>
  (transformPrice => {
    switch (customerCurrency) {
      case 'TWD':
        return `NT$ ${transformPrice.toFixed()}`;
      case 'CNY':
        return `RMB￥${parseFloat(transformPrice.toFixed(2))}`;
      case 'USD':
        return `US$ ${parseFloat(transformPrice.toFixed(2))}`;
      case 'JPY':
        return `JPY￥${transformPrice.toFixed()}`;
      case 'EUR':
        return `€ ${parseFloat(transformPrice.toFixed(2))}`;
      case 'VND':
        return `₫ ${transformPrice.toFixed()}`;
      case 'KRW':
        return `₩ ${transformPrice.toFixed()}`;
      case 'HKD':
        return `HK$ ${parseFloat(transformPrice.toFixed(1))}`;
      case 'MYR':
        return `RM ${parseFloat(transformPrice.toFixed(2))}`;
      default:
        return price.toFixed();
    }
  })(
    fx(price)
      .from(storeCurrency)
      .to(customerCurrency),
  ).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
