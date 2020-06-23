// import
import React, { useState, useLayoutEffect } from 'react';
import { Icon, Tabs, List } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import getImage, { meepshopLogo } from '@meepshop/images';
import Link from '@meepshop/link';

import styles from './styles/tutorial.less';
import { TUTORIAL } from './constants';

// graphql typescript
import { tutorialSettingObjectTypeFragment as tutorialSettingObjectTypeFragmentType } from './__generated__/tutorialSettingObjectTypeFragment';
import {
  adminSetIsTutorialEnabled,
  adminSetIsTutorialEnabledVariables,
} from './__generated__/adminSetIsTutorialEnabled';
import { tutorialStoreFragment } from './__generated__/tutorialStoreFragment';

// typescript definition
interface PropsType {
  name?: string | null;
  id: string;
  setting?: tutorialSettingObjectTypeFragmentType | null;
}

// definition
export const tutorialSettingObjectTypeFragment = gql`
  fragment tutorialSettingObjectTypeFragment on SettingObjectType {
    isTutorialEnabled
  }
`;

const Tutorial = ({ name, id, setting }: PropsType): React.ReactElement => {
  const { t } = useTranslation('dashboard');
  const isTutorialEnabled = setting?.isTutorialEnabled ?? true;
  const [isInitial, setInitial] = useState(true);
  const [activeKey, setActiveKey] = useState('store');
  const [setIsTutorialEnabled] = useMutation<
    adminSetIsTutorialEnabled,
    adminSetIsTutorialEnabledVariables
  >(
    gql`
      mutation adminSetIsTutorialEnabled($input: SetIsTutorialEnabledInput!) {
        setIsTutorialEnabled(input: $input) {
          success
        }
      }
    `,
    {
      update: (cache, { data }) => {
        if (!data?.setIsTutorialEnabled.success) return;

        cache.writeFragment<tutorialStoreFragment>({
          id,
          fragment: gql`
            fragment tutorialStoreFragment on Store {
              setting {
                isTutorialEnabled
              }
            }
          `,
          data: {
            __typename: 'Store',
            setting: {
              __typename: 'SettingObjectType',
              isTutorialEnabled: !isTutorialEnabled,
            },
          },
        });
      },
    },
  );

  useLayoutEffect(() => {
    setActiveKey(localStorage.getItem(`${id}-tutorial`) || 'store');
    setInitial(false);
  }, [id]);

  return (
    <div className={styles.welcome}>
      <div className={isTutorialEnabled ? styles.isTutorialEnabled : ''}>
        <img
          src={getImage(meepshopLogo)}
          className={styles.logo}
          alt="meepshop"
        />

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
              <Icon
                type={!isTutorialEnabled ? 'info-circle' : 'close-circle'}
                className={styles.icon}
              />
              {!isTutorialEnabled ? t('open-tutorial') : t('close-tutorial')}
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
                    <Icon type="right-circle" className={styles.link} />
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
