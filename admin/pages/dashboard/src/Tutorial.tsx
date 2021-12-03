// import
import React, { useState, useLayoutEffect } from 'react';
import { useMutation } from '@apollo/client';
import {
  InfoCircleOutlined,
  CloseCircleOutlined,
  RightCircleOutlined,
} from '@ant-design/icons';
import { Tabs, List } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { meepshopLogo } from '@meepshop/images';
import Link from '@meepshop/link';

import styles from './styles/tutorial.less';
import { TUTORIAL } from './constants';

// graphql typescript
import {
  tutorialSettingObjectTypeFragment as tutorialSettingObjectTypeFragmentType,
  adminSetIsTutorialEnabled as adminSetIsTutorialEnabledType,
  adminSetIsTutorialEnabledVariables,
  tutorialStoreFragment as tutorialStoreFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  adminSetIsTutorialEnabled,
  tutorialStoreFragment,
} from './gqls/tutorial';

// typescript definition
interface PropsType {
  name?: string | null;
  id: string;
  setting?: tutorialSettingObjectTypeFragmentType | null;
}

// definition
const Tutorial = ({ name, id, setting }: PropsType): React.ReactElement => {
  const { t } = useTranslation('dashboard');
  const isTutorialEnabled = setting?.isTutorialEnabled ?? true;
  const [isInitial, setInitial] = useState(true);
  const [activeKey, setActiveKey] = useState('store');
  const [setIsTutorialEnabled] = useMutation<
    adminSetIsTutorialEnabledType,
    adminSetIsTutorialEnabledVariables
  >(adminSetIsTutorialEnabled, {
    update: (cache, { data }) => {
      if (!data?.setIsTutorialEnabled.success) return;

      cache.writeFragment<tutorialStoreFragmentType>({
        id,
        fragment: tutorialStoreFragment,
        data: {
          __typename: 'Store',
          id,
          setting: {
            __typename: 'SettingObjectType',
            isTutorialEnabled: !isTutorialEnabled,
          },
        },
      });
    },
  });

  useLayoutEffect(() => {
    setActiveKey(localStorage.getItem(`${id}-tutorial`) || 'store');
    setInitial(false);
  }, [id]);

  return (
    <div className={styles.welcome}>
      <div className={isTutorialEnabled ? styles.isTutorialEnabled : ''}>
        <img src={meepshopLogo} className={styles.logo} alt="meepshop" />

        <div className={styles.text}>
          {!isTutorialEnabled ? (
            <h1>{t('welcome-back', { name })}</h1>
          ) : (
            <h1>
              {t('welcome')}
              <br />
              {t('meepshop')}
            </h1>
          )}
          {!isTutorialEnabled ? null : <p>{t('steps')}</p>}
          <p
            onClick={() => {
              setIsTutorialEnabled({
                variables: { input: { enable: !isTutorialEnabled } },
              });
            }}
          >
            <span>
              {!isTutorialEnabled ? (
                <>
                  <InfoCircleOutlined className={styles.icon} />

                  {t('open-tutorial')}
                </>
              ) : (
                <>
                  <CloseCircleOutlined className={styles.icon} />

                  {t('close-tutorial')}
                </>
              )}
            </span>
          </p>
        </div>
      </div>
      {!isTutorialEnabled ? null : (
        <div
          className={`${styles.tutorial} ${isInitial ? styles.initial : ''}`}
        >
          <Tabs
            tabPosition="left"
            activeKey={activeKey}
            onTabClick={(tab: string) => {
              setActiveKey(tab);
              localStorage.setItem(`${id}-tutorial`, tab);
            }}
          >
            {TUTORIAL.map(tab => (
              <Tabs.TabPane
                tab={
                  <>
                    <tab.Icon className={styles.icon} />
                    {t(`tutorial.${tab.key}.tab`)}
                  </>
                }
                key={tab.key}
              >
                <h1>{t(`tutorial.${tab.key}.title`)}</h1>
                <p>{t(`tutorial.${tab.key}.content`)}</p>
                {!tab.items ? null : (
                  <List
                    itemLayout="horizontal"
                    split={false}
                    dataSource={tab.items}
                    renderItem={(Item, index) => (
                      <List.Item key={index}>
                        <Item />
                        {t(`tutorial.${tab.key}.items.${index}`)}
                      </List.Item>
                    )}
                  />
                )}
                <Link href={tab.link}>
                  <a href={tab.link}>
                    <RightCircleOutlined className={styles.link} />
                  </a>
                </Link>
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
