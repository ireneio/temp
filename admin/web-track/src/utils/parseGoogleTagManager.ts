// definition
export default (value: string | null): string | null =>
  value?.match(/id=(GTM-[\w/-]+)[&'"]/)?.[1] ||
  value?.match(/^(GTM-[\w/-]+)$/)?.[1] ||
  null;
