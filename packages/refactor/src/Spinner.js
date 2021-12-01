import React, { useRef, useEffect } from 'react';
import { emptyFunction } from 'fbjs';

import { useTranslation } from '@meepshop/locales';
import { spinner_w100 as spinner } from '@meepshop/images';
import { useRouter } from '@meepshop/link';

export default React.memo(({ loading, loadingTip }) => {
  const { t } = useTranslation('spinner');
  const router = useRouter();
  const reloadTimeoutRef = useRef(setTimeout(emptyFunction, 0));

  // FIXME: remove after apollo-client upgrade
  useEffect(() => {
    clearTimeout(reloadTimeoutRef.current);

    if (loading) reloadTimeoutRef.current = setTimeout(router.reload, 5000);
  }, [loading, router]);

  return (
    <div
      id="spinner"
      style={{
        zIndex: 9999,
        position: 'fixed',
        backgroundColor: '#5161698a',
        height: '100%',
        width: '100%',
        display: loading ? 'flex' : 'none',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src={spinner}
        alt="spinner"
        style={{ borderRadius: 8, width: 100 }}
      />

      <div style={{ color: '#eee' }}>
        {t(loadingTip.toLowerCase().replace(/_/g, '-'))}
      </div>
    </div>
  );
});
