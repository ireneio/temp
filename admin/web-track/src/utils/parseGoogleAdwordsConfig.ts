// definition
export default (value: string | null): string | null =>
  value?.match(/['"](AW-[0-9]+)['"]/)?.[1] ||
  value?.match(/^(AW-[0-9]+)$/)?.[1] ||
  null;
