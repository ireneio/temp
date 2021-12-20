const getVariantOptions = (children, t, getLanguage) =>
  children.map(({ children: child, data }) => {
    const { title, variant = {} } = data;
    const { id, currentMinPurchasableQty } = variant;
    const disabled = currentMinPurchasableQty === 0;

    return {
      value: child ? getLanguage(title) : id,
      label: `${getLanguage(title)}${!disabled ? '' : ` (${t('no-variant')})`}`,
      disabled,
      ...(!child
        ? {}
        : {
            children: getVariantOptions(child, t, getLanguage),
          }),
    };
  });

export default getVariantOptions;
