const getVariantOptions = (children, i18n) =>
  children.map(({ children: child, data }) => {
    const { title, variant = {} } = data;
    const { id, stock, minPurchaseItems } = variant;
    const disabled = stock && minPurchaseItems && stock < minPurchaseItems;

    return {
      value: child ? title[i18n.language] || title.zh_TW : id,
      label: title[i18n.language] || title.zh_TW,
      disabled,
      ...(!child
        ? {}
        : {
            children: getVariantOptions(child, i18n),
          }),
    };
  });

export default getVariantOptions;
