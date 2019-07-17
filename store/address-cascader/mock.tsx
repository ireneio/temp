import React, { useState } from 'react';

import AddressCascader from './src';

export default React.memo(() => {
  const [emptyArray, onChangeEmptyArray] = useState([]);
  const [value, onChange] = useState(['台灣', '臺北市', '信義區']);
  const [notFound, onChangeNotFound] = useState(['台灣', '台北市', '信義區']);

  return (
    <>
      <AddressCascader />

      <AddressCascader lockedCountry={['Taiwan']} />

      <AddressCascader
        value={emptyArray}
        onChange={newValue => onChangeEmptyArray(newValue)}
      />

      <AddressCascader
        value={value}
        onChange={newValue => onChange(newValue)}
      />

      <AddressCascader
        value={notFound}
        onChange={newValue => onChangeNotFound(newValue)}
      />
    </>
  );
});
