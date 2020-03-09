// typescript import
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

// import
import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import { ApolloClient } from 'apollo-client';

import mock from './mock';
import styles from './styles/mockData.less';

// definition
const { Group: ButtonGroup } = Button;

export default React.memo(
  ({
    client,
    type,
    typeIndex,
  }: {
    client: ApolloClient<NormalizedCacheObject>;
    type: string;
    typeIndex: number;
  }) => {
    const [currentIndex, changeMockData] = useState<number>(0);

    return (
      <ButtonGroup>
        {mock.schemas[type].map((mockData, mockIndex) => (
          <Tooltip
            key={
              // eslint-disable-next-line react/no-array-index-key
              mockIndex
            }
            overlayClassName={styles.tooltip}
            title={JSON.stringify(mockData({}, {}), null, 2)}
            autoAdjustOverflow={false}
            placement="bottom"
          >
            <Button
              disabled={currentIndex === mockIndex}
              onClick={() => {
                mock.trackingIndex[typeIndex] = mockIndex;
                client.resetStore();
                changeMockData(mockIndex);
              }}
            >
              data {mockIndex + 1}
            </Button>
          </Tooltip>
        ))}
      </ButtonGroup>
    );
  },
);
