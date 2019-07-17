// import
import React from 'react';

import generateConverter from './utils/generateConverter';

// definition
export default React.createContext({
  convertCurrency: generateConverter('TWD', 'TWD'),
  setCurrency: (_: string) => {},
  currency: 'TWD',
});
