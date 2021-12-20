// import
import React from 'react';
import { Tabs } from 'antd';

import { ModulesIcon, SettingIcon } from '@meepshop/icons';

import Modules from './Modules';
import styles from './styles/index.less';

// definition
const { TabPane } = Tabs;

export default React.memo(() => {
  return (
    <Tabs
      defaultActiveKey="modules"
      className={styles.root}
      centered
      animated={false}
    >
      <TabPane tab={<ModulesIcon />} key="modules">
        <Modules />
      </TabPane>
      <TabPane tab={<SettingIcon />} key="setting">
        setting
      </TabPane>
    </Tabs>
  );
});
