// import
import React, { useState } from 'react';
import { Input, Button } from 'antd';

import { useTranslation } from '@meepshop/locales';

import styles from './styles/searchInput.less';

// typescript definition
interface PropsType {
  label: string;
  setVariables: (value: string) => void;
}

// definition
export default React.memo(({ label, setVariables }: PropsType) => {
  const { t } = useTranslation('convenience-store-map');
  const [inputContent, setInputContent] = useState<string>('');

  return (
    <div className={styles.root}>
      <div>{label}</div>
      <Input
        value={inputContent}
        onChange={e => setInputContent(e.target.value)}
      />
      <Button type="primary" onClick={() => setVariables(inputContent)}>
        {t('searchStore')}
      </Button>
    </div>
  );
});
