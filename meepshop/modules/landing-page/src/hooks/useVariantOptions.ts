// typescript import
import { HierarchyNode } from 'd3-hierarchy';
import { CascaderOptionType } from 'antd/lib/cascader';

import { DefaultLeaf } from '@meepshop/hooks/lib/useVariantsTree';

// import
import { useMemo } from 'react';

import useVariantsTree from '@meepshop/hooks/lib/useVariantsTree';
import { useTranslation, useGetLanguage } from '@meepshop/locales';

// graphql typescript
import {
  useVariantOptionsFragment,
  useVariantOptionsFragment_variants as useVariantOptionsFragmentVariants,
  useVariantOptionsFragment_variants_specs_title as useVariantOptionsFragmentVariantsSpecsTitle,
} from '@meepshop/types/gqls/meepshop';

// typescript definition
interface Leaf extends DefaultLeaf {
  variant?: useVariantOptionsFragmentVariants;
}

// definition
const generateVariantOptions = (
  children: HierarchyNode<Leaf>[] | undefined,
  language: keyof useVariantOptionsFragmentVariantsSpecsTitle,
): CascaderOptionType[] | undefined =>
  children?.map(({ children: child, data }) => {
    const getLanguage = useGetLanguage();
    const { title, variant } = data;
    const currentMinPurchasableQty = variant?.currentMinPurchasableQty || 0;

    return {
      value: (child ? getLanguage(title) : variant?.id) || undefined,
      label: getLanguage(title),
      disabled: currentMinPurchasableQty === 0,
      ...(!child
        ? {}
        : {
            children: generateVariantOptions(child, language),
          }),
    };
  });

export default (
  product: useVariantOptionsFragment,
): CascaderOptionType[] | undefined => {
  const {
    i18n: { language },
  } = useTranslation('landing-page');
  const variantsTree = useVariantsTree<Leaf>(product);

  return useMemo(() => {
    if (!product.variants) return undefined;

    if (!variantsTree) {
      const variant = product.variants[0];
      const currentMinPurchasableQty = variant?.currentMinPurchasableQty || 0;

      return [
        {
          value: variant?.id || 'null-id',
          label: '',
          disabled: currentMinPurchasableQty === 0,
        },
      ];
    }

    return generateVariantOptions(
      variantsTree,
      language as keyof useVariantOptionsFragmentVariantsSpecsTitle,
    );
  }, [product, language, variantsTree]);
};
