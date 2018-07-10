import localeQuery from './locale.query';

const fixedtopQuery = `
module
height
alignment
showTitle
showLogo
title {
  ${localeQuery}
}
color
background
activeColor
hoverColor
menuId
opacity
fontSize
`;

const secondtopQuery = `
module
height
alignment
title {
  ${localeQuery}
}
showTitle
showLogo
menuId
color
background
fontSize
`;

const sidebarQuery = `
module
width
alignment
color
background
title {
  ${localeQuery}
}
showTitle
menuId
fontSize
`;

const fixedbottomQuery = `
module
title {
  ${localeQuery}
}
menuId
color
background
fontSize
`;

const pageQuery = `
id
title {
  ${localeQuery}
}
fixedtop {
  ${fixedtopQuery}
}
secondtop {
  ${secondtopQuery}
}
sidebar {
  ${sidebarQuery}
}
fixedbottom {
  ${fixedbottomQuery}
}
notBeDeleted
isProductDefault
path
pageType
useExternalLink
openNewWindow
addressTitle
seo {
  keywords
  description
  image
}
container
width
useBottom
background
blocks:blocksRaw
`;

export default pageQuery;
