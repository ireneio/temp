// definition
export default ({
  isRememberCard,
  cardHolderName,
  cardNumber,
  securityCode,
  expire,
  installmentCode,
}: {
  isRememberCard: boolean;
  cardHolderName: string;
  cardNumber: string;
  expire: string;
  securityCode: string;
  installmentCode: string[] | string;
}): {
  isRememberCard: boolean;
  cardHolderName: string;
  cardNumber: string;
  expireYear: string;
  expireMonth: string;
  securityCode: string;
  installmentCode?: string;
} => {
  const [expireMonth, expireYear] = expire.split(' / ');

  return {
    isRememberCard,
    cardHolderName,
    cardNumber: cardNumber.replace(/ - /g, ''),
    securityCode,
    expireYear: `20${expireYear}`,
    expireMonth,
    ...(!installmentCode
      ? {}
      : {
          installmentCode:
            installmentCode instanceof Array
              ? installmentCode[installmentCode.length - 1]
              : installmentCode,
        }),
  };
};
