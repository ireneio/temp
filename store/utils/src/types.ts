export type OmitType<T, K> = Pick<T, Exclude<keyof T, K>>;
export type MaybeType<T> = { [P in keyof T]?: T[P] };
