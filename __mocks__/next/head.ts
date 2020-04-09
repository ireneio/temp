// definition
export default <T extends unknown>({ children }: { children: T }): T =>
  children;
