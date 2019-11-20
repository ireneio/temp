import React from 'react';

import { withTranslation } from '@store/utils/lib/i18n';

const CloseView = ({ t }) => (
  <div
    style={{
      fontSize: 18,
      color: '#666',
      borderRadius: 3,
      letterSpacing: 1,
      textAlign: 'center',
      whiteSpace: 'nowrap',
      padding: '50px 120px',
      background: '#f2f2f2',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    ...{t('close')}...
  </div>
);

export default withTranslation('common')(CloseView);
