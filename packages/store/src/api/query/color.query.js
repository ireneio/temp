const colorQuery = `
id,
selected,
themes {
  no,
  colors
},
pageInfo {
  opacity,
  image {
    used
  }
},
imgInfo {
  used,
  repeat,
  size,
  files {
    href,
    image,
    path
  }
}
`;

export default colorQuery;
