export default [
  {},
  {
    value: ['日本'],
  },
  {
    value: ['台灣', '新北市', '永和區'],
  },
  {
    value: ['台灣', '新北市', '永和區'],
    lockedCountry: ['台灣'],
  },
  {
    // test: not found address, reset value to first element
    value: ['台灣', '南海諸島', '東沙'],
  },
  {
    // test: locale different, reset value
    value: ['Taiwan', '新北市', '永和區'],
  },
];
