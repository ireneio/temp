// typescript import
import { GraphQLResolveInfo } from 'graphql';

// import
import { isNonNullType, isListType } from 'graphql';

// typescript definition
export interface ContextType {
  isList: boolean;
}

export type fieldsType<
  T,
  R extends { [key: string]: unknown } = { [key: string]: unknown },
  A extends { [key: string]: unknown } = { [key: string]: unknown }
> = Record<
  keyof T,
  (
    arg0: R,
    arg1: A,
    context?: ContextType,
    info?: GraphQLResolveInfo,
  ) => T[keyof T]
>;

type resolverType<
  T,
  R extends { [key: string]: unknown } = { [key: string]: unknown },
  A extends { [key: string]: unknown } = { [key: string]: unknown }
> = (
  arg0: R,
  arg1: A,
  context?: ContextType,
  info?: GraphQLResolveInfo,
) => T | fieldsType<T, R, A>;

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

  public init = (): void => {
    this.tracking = [];
    this.trackingIndex = [];
  };

  public add = <
    T,
    R extends { [key: string]: unknown } = { [key: string]: unknown },
    A extends { [key: string]: unknown } = { [key: string]: unknown }
  >(
    schemaName: string,
    mockData: resolverType<T, R, A>[],
  ): resolverType<T, R, A> => {
    this.schemas[schemaName] = mockData;

    return (root: R, arg: A, _: unknown, info: GraphQLResolveInfo) => {
      try {
        const index = this.tracking.indexOf(schemaName);

        if (index !== -1)
          return mockData[this.trackingIndex[index]](
            root,
            arg,
            this.getContext(info),
            info,
          );

        this.tracking.push(schemaName);
        this.trackingIndex.push(0);

        return mockData[0](root, arg, this.getContext(info), info);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);

        throw e;
      }
    };
  };

  private getContext = (info: GraphQLResolveInfo): ContextType => ({
    isList: isListType(
      isNonNullType(info.returnType) ? info.returnType.ofType : info.returnType,
    ),
  });
}

export default new Mock();
