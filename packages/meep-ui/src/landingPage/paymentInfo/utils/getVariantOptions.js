const getVariantOptions = (children, t, i18n) =>
  children.map(({ children: child, data }) => {
    const { title, variant = {} } = data;
    const { id, currentMinPurchasableQty } = variant;
    const disabled = currentMinPurchasableQty === 0;

    return {
      value: child ? title[i18n.language] || title.zh_TW : id,
      label: `${title[i18n.language] || title.zh_TW}${
        !disabled ? '' : ` (${t('no-variant')})`
      }`,
      disabled,
      ...(!child
        ? {}
        : {
            children: getVariantOptions(child, t, i18n),
          }),
    };
  });

export default getVariantOptions;
