export default <T extends unknown[]>(values: T): T | undefined =>
  values.length === 0 ? undefined : values;
