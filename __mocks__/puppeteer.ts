// definition
export const result = jest.fn();

export default {
  launch: jest.fn().mockResolvedValue({
    newPage: jest.fn().mockResolvedValue({
      goto: jest.fn(),
      type: jest.fn(),
      $: jest.fn().mockResolvedValue(true),
      $eval: result,
    }),
    close: jest.fn().mockResolvedValue(),
  }),
};
