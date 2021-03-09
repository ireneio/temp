// typescript import
import { PropsType as SpecsPropsType } from './Specs';
import { CoordinatesArguType } from './hooks/useCoordinates';

// import
import React from 'react';

import Specs from './Specs';
import useCoordinates from './hooks/useCoordinates';

// typescript definition
export interface PropsType
  extends Pick<SpecsPropsType, 'unfoldedVariants'>,
    CoordinatesArguType {}

// definition
export default React.memo(
  ({ product, value, onChange, ...props }: PropsType) => {
    const { variantsTree, coordinates, setCoordinates } = useCoordinates({
      product,
      value,
      onChange,
    });

    return !variantsTree || coordinates.length === 0 ? null : (
      <Specs
        {...props}
        nodes={variantsTree}
        coordinates={coordinates}
        setCoordinates={setCoordinates}
      />
    );
  },
);
