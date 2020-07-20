// import
import React, { useState, useEffect } from 'react';
import { Drawer, Button, Divider } from 'antd';

import { i18n } from '@meepshop/utils/lib/i18n';

import MockData from './MockData';
import mock from './mock';
import styles from './styles/index.less';

// definition
const { Group: ButtonGroup } = Button;

export default React.memo(({ children }) => {
  const [mockTypes, setMockTypes] = useState<string[]>([]);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) setMockTypes(mock.tracking);
  }, [loading]);

  return (
    <>
      {loading ? null : children}

      <Button
        className={styles.button}
        onClick={() => setVisibleDrawer(!visibleDrawer)}
        type="primary"
        ghost
      >
        Settings
      </Button>

      <Drawer
        onClose={() => setVisibleDrawer(false)}
        visible={visibleDrawer}
        width="30%"
        title="Settings"
        placement="right"
      >
        <div className={styles.buttons}>
          Change language:{' '}
          <ButtonGroup>
            {[
              'zh_TW',
              'en_US',
              'ja_JP',
              'vi_VN',
              'fr_FR',
              'es_ES',
              'th_TH',
              'id_ID',
            ].map(language => (
              <Button
                key={language}
                onClick={() => i18n.changeLanguage(language)}
              >
                {language}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        <Divider />

        {mockTypes.map((type, typeIndex) => (
          <div key={type} className={styles.buttons}>
            {type}:{' '}
            <MockData
              setLoading={setLoading}
              type={type}
              typeIndex={typeIndex}
            />
          </div>
        ))}
      </Drawer>
    </>
  );
});
