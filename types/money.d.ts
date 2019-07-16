declare module 'money' {
  interface Property {
    from: (currency: string) => Property;
    to: (currency: string) => number;
  }

  export default function fx(input: number): Property;
}
