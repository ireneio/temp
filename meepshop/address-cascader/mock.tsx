// import
import React, { useState } from 'react';

import AddressCascader from './src';

// definition
export default React.memo(() => {
  const [emptyValue, onChangeEmptyValue] = useState(undefined);
  const [existingValue, onChangeExistingValue] = useState({
    address: [
      'a1e4aa6c-5a52-408a-9ede-471b10b1e265',
      '804df1c0-b99d-482b-9014-1fa49dc9b428',
      '4d0e80e7-23da-43d5-856d-50dce23bff89',
    ],
    zipCode: '199',
  });
  const [lockedValue, onChangeLockedValue] = useState(undefined);
  const [lockedExistingValue, onChangeLockedExistingValue] = useState({
    address: ['6cd709bd-3d05-47a4-b86d-b54e64af0538'],
    zipCode: '123',
  });

  return (
    <>
      <AddressCascader
        value={emptyValue}
        onChange={newValue => onChangeEmptyValue(newValue)}
        shippableCountries={[]}
        placeholder={['', '']}
      />

      <AddressCascader
        value={existingValue}
        onChange={newValue => onChangeExistingValue(newValue)}
        shippableCountries={[]}
        placeholder={['', '']}
      />

      <AddressCascader
        value={lockedValue}
        onChange={newValue => onChangeLockedValue(newValue)}
        shippableCountries={[{ id: 'a1e4aa6c-5a52-408a-9ede-471b10b1e265' }]}
        placeholder={['', '']}
      />

      <AddressCascader
        value={lockedExistingValue}
        onChange={newValue => onChangeLockedExistingValue(newValue)}
        shippableCountries={[{ id: '6cd709bd-3d05-47a4-b86d-b54e64af0538' }]}
        placeholder={['', '']}
      />
    </>
  );
});
