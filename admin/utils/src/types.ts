// typescript definition
export type initializeValuesType<V, E = null> = {
  [K in keyof V]: K extends E ? V[K] : V[K] | null;
};
