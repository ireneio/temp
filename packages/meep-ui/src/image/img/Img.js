import React, { useEffect } from 'react';

export default React.memo(({ useLarge, src, onLoad, alt, ...props }) => {
  useEffect(() => {
    if (useLarge && (/w:60/.test(src) || /w=60/.test(src))) onLoad();
  }, [useLarge, src, onLoad]);

  return <img {...props} src={src} onLoad={onLoad} alt={alt} />;
});
