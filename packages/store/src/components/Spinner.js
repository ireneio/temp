import React from 'react';

import { useTranslation } from '@meepshop/locales';
import { spinner_w100 as spinner } from '@meepshop/images';

export default ({ loading, loadingTip }) => {
  const { t } = useTranslation('spinner');

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
};
