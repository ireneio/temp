export default ({ amount, currency }) =>
  (price => {
    switch (currency) {
      case 'TWD':
        return `$ ${price.toFixed(0)}`;
      case 'CNY':
        return `￥${price.toFixed(2)}`;
      case 'USD':
        return `$ ${price.toFixed(2)}`;
      case 'JPY':
        return `￥${price.toFixed(0)}`;
      case 'EUR':
        return `€ ${price.toFixed(2)}`;
      case 'VND':
        return `₫ ${price.toFixed(0)}`;
      case 'KRW':
        return `₩ ${price.toFixed(0)}`;
      case 'HKD':
        return `$ ${price.toFixed(1)}`;
      case 'MYR':
        return `RM ${price.toFixed(2)}`;
      default:
        return price;
    }
  })(parseFloat(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
