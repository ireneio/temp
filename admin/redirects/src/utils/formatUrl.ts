// definition
export default (url: string): string => {
  if (!url?.trim()) return '';

  if (/^https?:\/\//gi.test(url)) return new URL(url).pathname; // http or https開頭
  if (/^\//.test(url)) return url.trim(); // 斜線開頭

  return new URL(`https://${url}`).pathname;
};
