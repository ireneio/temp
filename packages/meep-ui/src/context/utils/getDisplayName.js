export default (types, Component) =>
  `Enhancer([${types.join(',')}])(${Component.displayName || Component.name})`;
