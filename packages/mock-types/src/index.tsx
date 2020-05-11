// import typescript
import { Resolvers } from 'apollo-client/lib/core/types';
import { IntrospectionResultData } from 'apollo-cache-inmemory';

// import
import React, { useState } from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-components';
import { Drawer, Button, Divider } from 'antd';
import i18n from 'i18next';

import MockData from './MockData';
import useApollo from './hooks/useApollo';
import styles from './styles/index.less';

// typescript definition
export interface PropsType {
  initializeCache: (cache: InMemoryCache) => void;
  introspectionQueryResultDataType: IntrospectionResultData['__schema']['types'];
  default: Resolvers;
}

// definition
const { Group: ButtonGroup } = Button;

export default React.memo(
  ({
    children,
    ...props
  }: PropsType & {
    children: React.ReactNode;
  }) => {
    const { mockTypes, client } = useApollo(props);
    const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);

    return (
      <ApolloProvider client={client}>
        {children}

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
              <MockData client={client} type={type} typeIndex={typeIndex} />
            </div>
          ))}
        </Drawer>
      </ApolloProvider>
    );
  },
);
