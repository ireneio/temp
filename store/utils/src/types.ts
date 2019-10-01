export type Subtract<T, K> = { [P in Exclude<keyof T, keyof K>]: T[P] };
export type MaybeType<T> = { [P in keyof T]?: T[P] };
