declare module 'money' {
  interface Property {
    from: (currency: string) => Property;
    to: (currency: string) => number;
  }

  const fx: {
    (input: number): Property;
    base: string;
    rates: string[];
    timestamp: string;
  };

  export default fx;
}
