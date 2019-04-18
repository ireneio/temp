// definition
class Mock {
  public schemas: {
    [key: string]: ((
      arg0: { [key: string]: unknown },
      arg1: { [key: string]: unknown },
    ) => {
      [other: string]: unknown;
    })[];
  } = {};

  public tracking: string[] = [];

  public trackingIndex: number[] = [];

  public init = () => {
    this.tracking = [];
    this.trackingIndex = [];
  };

  public add = <T extends { [key: string]: unknown }>(
    schemaName: string,
    mockData: ((
      arg0: { [key: string]: unknown },
      arg1: { [key: string]: unknown },
    ) => T)[],
  ) => {
    this.schemas[schemaName] = mockData;

    return (
      ...args: [{ [key: string]: unknown }, { [key: string]: unknown }]
    ) => {
      const index = this.tracking.indexOf(schemaName);

      if (index !== -1) return mockData[this.trackingIndex[index]](...args);

      this.tracking.push(schemaName);
      this.trackingIndex.push(0);

      return mockData[0](...args);
    };
  };
}

export default new Mock();
