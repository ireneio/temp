// definition
export default (value: string | null): string | null =>
  value?.match(/['"](AW-[\w/-]+)['"]/)?.[1] ||
  value?.match(/^(AW-[\w/-]+)$/)?.[1] ||
  null;
