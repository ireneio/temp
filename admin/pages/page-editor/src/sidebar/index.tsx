// import
import React from 'react';
import { Tabs } from 'antd';
import { filter } from 'graphql-anywhere';

import { ModulesIcon, SettingIcon } from '@meepshop/icons';

import ModuleTab from './ModuleTab';
import styles from './styles/index.less';

// graphql typescript
import { sidebarFragment as sidebarFragmentType } from '@meepshop/types/gqls/admin';

// graphql import
import { moduleTabFragment } from './gqls/moduleTab';

// definition
const { TabPane } = Tabs;

export default React.memo(({ Store }: { Store: sidebarFragmentType }) => {
  return (
    <Tabs
      defaultActiveKey="module"
      className={styles.root}
      centered
      animated={false}
    >
      <TabPane tab={<ModulesIcon />} key="module">
        <ModuleTab Store={filter(moduleTabFragment, Store)} />
      </TabPane>
      <TabPane tab={<SettingIcon />} key="setting">
        setting
      </TabPane>
    </Tabs>
  );
});
