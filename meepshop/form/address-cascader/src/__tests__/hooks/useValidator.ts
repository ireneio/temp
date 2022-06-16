// import
import { renderHook, act } from '@testing-library/react-hooks';
import { emptyFunction } from 'fbjs';

import useValidator from '../../hooks/useValidator';

// definition
test.each([
  null,
  {
    address: null,
    zipCode: '1922',
  },
  {
    address: ['a', 'b'],
    zipCode: null,
  },
])('validator to throw', value => {
  const { result } = renderHook(() => useValidator('error'));

  expect(() => {
    act(() => {
      result.current({}, value, emptyFunction);
    });
  }).toThrow('error');
});
