// import
import { useRef, useEffect } from 'react';

// definition
export default <InputType>(value: InputType): InputType => {
  const ref = useRef<InputType>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
