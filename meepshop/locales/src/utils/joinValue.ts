// typescript import
import { DataType } from './walker';

// definition
const joinValue = (
  data: DataType,
  keys: string[],
  value: string | null,
): DataType => ({
  ...data,
  [keys[0]]:
    keys.length !== 1
      ? joinValue((data[keys[0]] as DataType) || {}, keys.slice(1), value)
      : value,
});

export default joinValue;
