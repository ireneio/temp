declare module 'fbjs' {
  // eslint-disable-next-line import/export
  export function emptyFunction(): void;
  // eslint-disable-next-line import/export
  export namespace emptyFunction {
    export function thatReturnsTrue(): true;
  }

  export function areEqual(a: unknown, b: unknown): boolean;
}
