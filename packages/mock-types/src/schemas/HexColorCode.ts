// import
import mock from '../mock';

// definition
export default mock.add<string | null>('HexColorCode', [
  () => null,
  () => '#000000',
  () => '#FFFFFF',
]);
