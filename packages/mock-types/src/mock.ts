// definition
class Mock {
  public schemas: {
    [key: string]: ((
      arg0: { [key: string]: unknown },
      arg1: { [key: string]: unknown },
    ) => unknown)[];
  } = {};

  public tracking: string[] = [];

  public trackingIndex: number[] = [];

  public init = () => {
    this.tracking = [];
    this.trackingIndex = [];
  };

  public add = <
    T,
    P extends { [key: string]: unknown } = { [key: string]: unknown },
    A extends { [key: string]: unknown } = { [key: string]: unknown }
  >(
    schemaName: string,
    mockData: ((arg0: P, arg1: A) => T)[],
  ) => {
    this.schemas[schemaName] = mockData;

    return (...args: [P, A]) => {
      try {
        const index = this.tracking.indexOf(schemaName);

        if (index !== -1) return mockData[this.trackingIndex[index]](...args);

        this.tracking.push(schemaName);
        this.trackingIndex.push(0);

        return mockData[0](...args);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);

        throw e;
      }
    };
  };
}

export default new Mock();
