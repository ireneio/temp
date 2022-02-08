// import
import { useCallback } from 'react';
import { move } from 'ramda';

// graphql typescript
import { useProductsColumnsFragment as useProductsColumnsFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  selected: useProductsColumnsFragmentType[];
  setSelected: (products: useProductsColumnsFragmentType[]) => void;
}

// definition
export default ({
  selected,
  setSelected,
}: PropsType): (({
  oldIndex,
  newIndex,
}: {
  oldIndex: number;
  newIndex: number;
}) => void) =>
  useCallback(
    ({ oldIndex, newIndex }) => {
      if (oldIndex !== newIndex)
        setSelected(move(oldIndex, newIndex, selected));
    },
    [selected, setSelected],
  );
