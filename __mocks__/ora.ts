// definition
const ora = {
  start: () => ora,
  succeed: () => ora,
};

export default jest.fn().mockReturnValue(ora);
