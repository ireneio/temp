export default href => {
  if (
    /^(www\.)?(google|facebook)\.com/.test(href) ||
    href === 'www.mayashop.com.tw'
  )
    return `https://${href}`;

  if (/^\/\/(www\.)?(google|facebook)\.com/.test(href)) return `https:${href}`;

  if (href === 'https://reurl.cc/jdxNKL')
    return 'https://www.facebook.com/Seline-%E5%8D%A1%E9%A6%AC%E7%B2%BE%E5%93%81%E7%B2%89%E7%B5%B2%E5%9C%98-109460033914180';

  if (
    ['離開拍賣更有未來', '1fc84103-1c4c-47a3-b091-17fe0fa1fd7b'].includes(href)
  )
    return null;

  if (
    [
      'https://www.letoii.com.tw/',
      'http://www.sycycles.com//sycycles/syca/',
      'https://www.instagram.com/winnie_____yu/',
    ].includes(href)
  )
    return null;

  return href;
};
