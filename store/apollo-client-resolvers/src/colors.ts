// definition
export const resolver = {
  Query: {},
  ColorList: {
    colors: ({
      data: [{ selected, themes }],
    }: {
      data: {
        selected: string;
        themes: {
          colors: string[];
        }[];
      }[];
    }) => themes[parseInt(selected, 10)].colors,
  },
};
