const iframeRegExp = /src=['"]([^ '"]*)/;

const handleSpecificUrl = href => {
  if (
    href ===
    '<iframe width =“560”height =“315”src =“https://www.youtube.com/embed/la0qsF02HPc”frameborder =“0”allow =“accelerometer; autoplay; encrypted-media; gyroscope ;畫中畫“allowfullscreen> </ iframe>'
  )
    return 'https://www.youtube.com/embed/la0qsF02HPc';

  if (['GSHC07628*1', '滋晶雪瀅系列'].includes(href)) return null;

  if (/^youtube\.com\//.test(href)) return `https://${href}`;

  if (href === '聽專案講解 👉 https://youtu.be/yY4R3p5zr0k')
    return 'https://youtu.be/yY4R3p5zr0k';

  if (href === '//www.facebook.com/ronny0824.liang/videos/1318236895036844/')
    return `https:${href}`;

  return href;
};

export default url => {
  const href = handleSpecificUrl(url);

  if (!/<iframe/.test(href)) return href;

  const matchUrl = href.match(iframeRegExp);

  return !matchUrl ? href : matchUrl[0].replace(iframeRegExp, '$1');
};
