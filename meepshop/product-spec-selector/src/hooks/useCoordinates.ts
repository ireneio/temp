// typescript import
import { HierarchyNode } from 'd3-hierarchy';

import { DefaultLeaf } from '@meepshop/hooks/lib/useVariantsTree';

// import
import { useEffect, useMemo, useCallback } from 'react';

import useVariantsTree from '@meepshop/hooks/lib/useVariantsTree';

// graphql typescript
import {
  useCoordinatesFragment,
  useCoordinatesFragment_variants as useCoordinatesFragmentVariants,
} from '@meepshop/types/gqls/meepshop';

// typescript definition
export interface Leaf extends DefaultLeaf {
  variant?: useCoordinatesFragmentVariants;
}

export interface CoordinatesArguType<
  P extends useCoordinatesFragment = useCoordinatesFragment
> {
  product: P;
  value?: NonNullable<NonNullable<P['variants']>[number]> | null;
  onChange?: (
    value: NonNullable<NonNullable<P['variants']>[number]> | null,
  ) => void;
}

export interface CoordinatesReturnType {
  variantsTree: HierarchyNode<Leaf>[] | undefined;
  coordinates: number[];
  setCoordinates: (coordinates: CoordinatesReturnType['coordinates']) => void;
}

// definition
const findVariant = (
  variantsTree: HierarchyNode<Leaf>[] | undefined,
  [coordinate, ...coordinates]: CoordinatesReturnType['coordinates'],
): useCoordinatesFragmentVariants | null => {
  if (coordinate === undefined) return null;

  if (coordinate > (variantsTree?.length || 0) - 1)
    return variantsTree?.[0].data.variant || null;

  return (
    variantsTree?.[coordinate].data.variant ||
    findVariant(variantsTree?.[coordinate].children, coordinates)
  );
};

const findCoordinates = (
  variantNode: HierarchyNode<Leaf> | null,
): CoordinatesReturnType['coordinates'] =>
  !variantNode?.parent?.children
    ? []
    : [
        ...findCoordinates(variantNode.parent),
        variantNode.parent.children.findIndex(node => node === variantNode),
      ];

export default ({
  product,
  value,
  onChange,
}: CoordinatesArguType): CoordinatesReturnType => {
  const variantsTree = useVariantsTree<Leaf>(product);
  const coordinates = useMemo(() => {
    if (!value || !onChange || !variantsTree) return [];

    const variantsLeaves = variantsTree.reduce(
      (result, variantsNode) => [...result, ...variantsNode.leaves()],
      [],
    );

    return findCoordinates(
      variantsLeaves.find(
        ({ data: { variant } }) => variant?.id === value?.id,
      ) || variantsLeaves[0],
    );
  }, [value, onChange, variantsTree]);
  const setCoordinates = useCallback(
    (values: CoordinatesReturnType['coordinates']) => {
      if (onChange)
        onChange(
          (!variantsTree
            ? product?.variants?.[0]
            : findVariant(variantsTree, values)) || null,
        );
    },
    [product, onChange, variantsTree],
  );

  useEffect(() => {
    if (!variantsTree) {
      if (coordinates.length !== 0) setCoordinates([]);
    } else if (coordinates.length === 0) {
      const variantsLeaves = variantsTree.reduce(
        (result, variantsNode) => [...result, ...variantsNode.leaves()],
        [],
      );

      setCoordinates(
        findCoordinates(
          variantsLeaves.find(
            ({ data: { variant } }) =>
              (variant?.currentMinPurchasableQty || 0) > 0,
          ) || variantsLeaves[0],
        ),
      );
    }
  }, [value, onChange, variantsTree, coordinates, setCoordinates]);

  return {
    variantsTree,
    coordinates,
    setCoordinates,
  };
};
