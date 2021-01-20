// typescript import
import { HierarchyNode } from 'd3-hierarchy';
import { CascaderOptionType } from 'antd/lib/cascader';

// import
import { useMemo } from 'react';
import { stratify } from 'd3-hierarchy';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  useVariantOptionsFragment,
  useVariantOptionsFragment_variants as useVariantOptionsFragmentVariants,
  useVariantOptionsFragment_specs_title as useVariantOptionsFragmentSpecsTitle,
} from '@meepshop/types/gqls/meepshop';

// typescript definition
interface Leaf {
  key: string;
  parent: string;
  title: useVariantOptionsFragmentSpecsTitle | null;
  variant?: useVariantOptionsFragmentVariants;
}

// definition
const treemap = stratify<Leaf>()
  .id(d => d.key)
  .parentId(d => d.parent);

const generateKey = (
  title: useVariantOptionsFragmentSpecsTitle | null,
): string =>
  title
    ? Object.keys(title)
        .map((key: keyof typeof title) => title[key])
        .join('-')
    : '';

const getVariantOptions = (
  children: HierarchyNode<Leaf>[] | undefined,
  language: keyof useVariantOptionsFragmentSpecsTitle,
): CascaderOptionType[] | undefined =>
  children?.map(({ children: child, data }) => {
    const { title, variant } = data;

    const disabled = (variant?.stock || 0) < (variant?.minPurchaseItems || 0);

    return {
      value:
        (child ? title?.[language] || title?.zh_TW : variant?.id) || undefined,
      label: title?.[language] || title?.zh_TW,
      disabled,
      ...(!child
        ? {}
        : {
            children: getVariantOptions(child, language),
          }),
    };
  });

export default (
  product: useVariantOptionsFragment | null,
): CascaderOptionType[] | undefined => {
  const {
    i18n: { language },
  } = useTranslation('landing-page');

  return useMemo(() => {
    if (!product?.variants) return undefined;

    const { specs, variants } = product;

    if (!specs || variants.length === 1) {
      const variant = variants[0];

      return [
        {
          value: variants[0]?.id || 'null-id',
          label: '',
          disabled: (variant?.stock || 0) < (variant?.minPurchaseItems || 0),
        },
      ];
    }

    const specsStore: {
      [id: string]: string[];
    } = specs.reduce(
      (result, spec) => (spec?.id ? { ...result, [spec.id]: [] } : result),
      {},
    );

    const leaves = variants.reduce(
      (variantsResult, variant) => {
        let preKey = 'root';

        if (!variant?.specs) return variantsResult;

        const variantSpecs = variant.specs;

        return (
          variantSpecs.reduce((specsResult, spec, index) => {
            if (!spec?.specId) return specsResult;

            const { title, specId } = spec;
            const key = `${preKey}_${generateKey(title)}`;
            const parent = preKey;

            preKey = key;

            if (
              specsStore[specId].includes(key) &&
              index !== (variantSpecs.length || 0) - 1
            )
              return specsResult;

            specsStore[specId].push(key);

            return [
              ...specsResult,
              {
                ...(index !== (variantSpecs.length || 0) - 1
                  ? null
                  : { variant }),
                key,
                parent,
                title,
              },
            ];
          }, variantsResult) || []
        );
      },
      [{ key: 'root' }] as Leaf[],
    );

    return getVariantOptions(
      treemap(leaves).children,
      language as keyof useVariantOptionsFragmentSpecsTitle,
    );
  }, [product, language]);
};
