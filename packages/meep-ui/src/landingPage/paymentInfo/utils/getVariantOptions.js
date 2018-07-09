const getVariantOptions = (children, { transformLocale }) =>
  children.map(({ children: child, data }) => {
    const { title, variant = {} } = data;
    const { id, stock, minPurchaseItems } = variant;
    const disabled = stock && minPurchaseItems && stock < minPurchaseItems;

    return {
      value: child ? transformLocale(title) : id,
      label: transformLocale(title),
      disabled,
      ...(!child
        ? {}
        : {
            children: getVariantOptions(child, { transformLocale }),
          }),
    };
  });

export default getVariantOptions;
