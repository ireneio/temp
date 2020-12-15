// import
import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import { useApolloClient } from '@apollo/react-hooks';

import mock from './mock';
import styles from './styles/mockData.less';

// definition
const { Group: ButtonGroup } = Button;

export default React.memo(
  ({
    setLoading,
    type,
    typeIndex,
  }: {
    setLoading: (loading: boolean) => void;
    type: string;
    typeIndex: number;
  }) => {
    const client = useApolloClient();
    const [currentIndex, changeMockData] = useState<number>(
      mock.trackingIndex[typeIndex],
    );

    return (
      <ButtonGroup>
        {mock.schemas[type].map((mockData, mockIndex) => (
          <Tooltip
            key={
              // eslint-disable-next-line react/no-array-index-key
              mockIndex
            }
            overlayClassName={styles.tooltip}
            title={JSON.stringify(mockData({}, {}, { isList: false }), null, 2)}
            placement="left"
          >
            <Button
              disabled={currentIndex === mockIndex}
              onClick={async () => {
                mock.trackingIndex[typeIndex] = mockIndex;
                setLoading(true);
                await client.resetStore();
                changeMockData(mockIndex);
                setLoading(false);
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
