declare module 'braft-extensions/dist/color-picker' {
  export default function({
    includeEditors,
    excludeEditors,
    theme,
  }: {
    includeEditors?: string[];
    excludeEditors?: string[];
    theme?: 'light' | 'dark';
  }): object;
}
