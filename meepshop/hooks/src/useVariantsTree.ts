// typescript import
import { HierarchyNode } from 'd3-hierarchy';

// import
import { useMemo } from 'react';
import { stratify } from 'd3-hierarchy';

// graphql typescript
import {
  useVariantsTreeFragment,
  useVariantsTreeFragment_specs as useVariantsTreeFragmentSpecs,
  useVariantsTreeFragment_variants as useVariantsTreeFragmentVariants,
  useVariantsTreeFragment_variants_specs_title as useVariantsTreeFragmentVariantsSpecsTitle,
} from '@meepshop/types/gqls/meepshop';

// typescript definition
export interface DefaultLeaf {
  key: string;
  parent: string;
  title: useVariantsTreeFragmentVariantsSpecsTitle | null;
  category: useVariantsTreeFragmentSpecs;
  variant?: useVariantsTreeFragmentVariants;
}

// definition
export default <Leaf extends DefaultLeaf>(
  product: useVariantsTreeFragment | null,
): HierarchyNode<Leaf>[] | undefined => {
  if (!product) return undefined;

  const { specs, variants } = product;

  if (!specs || !specs.length || !variants) return undefined;

  return useMemo(() => {
    const specsStore: {
      [id: string]: {
        keys: string[];
      } & useVariantsTreeFragmentSpecs;
    } = specs.reduce(
      (result, spec) =>
        spec?.id
          ? {
              ...result,
              [spec.id]: {
                ...spec,
                keys: [],
              },
            }
          : result,
      {},
    );

    const leaves = variants.reduce(
      (variantsResult, variant) => {
        let preKey = 'root';

        if (!variant?.specs) return variantsResult;

        const variantSpecs = variant.specs;

        return variantSpecs.reduce((specsResult, spec, index) => {
          if (!spec?.specId) return specsResult;

          const { title, specId } = spec;
          const { keys, ...category } = specsStore[specId];
          const key = `${preKey}-${title?.zh_TW}`;
          const parent = preKey;

          preKey = key;

          if (keys.includes(key) && index !== variantSpecs.length - 1)
            return specsResult;

          keys.push(key);

          return [
            ...specsResult,
            {
              ...(index === variantSpecs.length - 1 && { variant }),
              key,
              parent,
              title,
              category,
            },
          ];
        }, variantsResult);
      },
      [{ key: 'root' }] as Leaf[],
    );

    return stratify<Leaf>()
      .id(d => d.key)
      .parentId(d => d.parent)(leaves as Leaf[]).children;
  }, [specs, variants]);
};
