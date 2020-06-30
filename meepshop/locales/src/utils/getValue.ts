// typescript import
import { DataType } from './walker';

// definition
const getValue = (data: DataType, keys: string[]): string =>
  keys.length === 1
    ? (data[keys[0]] as string)
    : getValue(data[keys[0]] as DataType, keys.slice(1));

export default getValue;
