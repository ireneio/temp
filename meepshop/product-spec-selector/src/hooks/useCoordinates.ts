// typescript import
import { HierarchyNode } from 'd3-hierarchy';

import { DefaultLeaf } from '@meepshop/hooks/lib/useVariantsTree';

// import
import { useRef, useState, useEffect, useMemo, useCallback } from 'react';

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

export interface CoordinatesArguType {
  product: useCoordinatesFragment;
  value?: useCoordinatesFragmentVariants | null;
  onChange?: (value: CoordinatesArguType['value']) => void;
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
): useCoordinatesFragmentVariants | null =>
  coordinate === undefined
    ? null
    : variantsTree?.[coordinate].data.variant ||
      findVariant(variantsTree?.[coordinate].children, coordinates);

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
  const isMountedRef = useRef(false);
  const variantsTree = useVariantsTree<Leaf>(product);
  const [coordinatesInState, setCoordinatesInState] = useState<
    CoordinatesReturnType['coordinates']
  >([]);
  const coordinatesFromProps = useMemo(() => {
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
  const setCoordinatesFromProps = useCallback(
    (coordinates: CoordinatesReturnType['coordinates']) => {
      if (onChange)
        onChange(
          !variantsTree
            ? product?.variants?.[0]
            : findVariant(variantsTree, coordinates),
        );
    },
    [product, onChange, variantsTree],
  );
  const [coordinates, setCoordinates] = !onChange
    ? [coordinatesInState, setCoordinatesInState]
    : [coordinatesFromProps, setCoordinatesFromProps];

  useEffect(() => {
    if (!isMountedRef.current && onChange) setCoordinates(coordinates);

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
            ({ data: { variant } }) => (variant?.stock || 0) > 0,
          ) || variantsLeaves[0],
        ),
      );
    }

    isMountedRef.current = true;
  }, [value, onChange, variantsTree, coordinates, setCoordinates]);

  return {
    variantsTree,
    coordinates,
    setCoordinates,
  };
};
