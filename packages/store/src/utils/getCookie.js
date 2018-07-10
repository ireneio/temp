export default function(key, cookieStr) {
  if (cookieStr == null) return null;
  const cookies = cookieStr.split('; ');
  const value = cookies.reduce((_value, cookie) => {
    const part = cookie.split('=');
    if (part && part[0] === key) {
      return decodeURI(part[1]);
    }
    return _value;
  }, null);
  return value;
}
