// definition
const { default: dynamic } = jest.requireActual('next/dynamic');

export default jest.fn().mockImplementation(loader => dynamic(loader));
