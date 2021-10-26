// import
import mergewith from 'lodash.mergewith';

// definition
const customizer = (objValue: unknown, sourceVal: unknown): unknown =>
  Array.isArray(objValue) ? sourceVal : undefined;

export default <TObject, TSource>(
  objectSetting: TObject,
  sourceSetting: TSource,
): TObject & TSource =>
  mergewith<TObject, TSource>(objectSetting, sourceSetting, customizer);
