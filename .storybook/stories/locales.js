import React, { useState, useMemo } from 'react';
import { storiesOf } from '@storybook/react';
import LinkTo from '@storybook/addon-links/react';
import { Table, Input, Icon } from 'antd';

import styles from './styles/locales.less';

const { Search } = Input;
const getAllData = data =>
  Object.keys(data).reduce(
    (result, name) => [
      ...result,
      ...data[name].map(({ key, ...locale }) => ({
        ...locale,
        key: `${name}/${key}`,
      })),
    ],
    [],
  );

(async () => {
  const data = await fetch('/locales.json').then(res => res.json());
  const columns = Object.keys(Object.values(data)[0][0])
    .filter(key => key !== 'key')
    .sort(a => (a === 'zh_TW' ? -1 : 1))
    .map(key => ({
      title: key,
      dataIndex: key,
      width: 200,
      sorter: (a, b) => a[key].length - b[key].length,
      sortDirections: ['descend', 'ascend'],
      filterIcon: filtered => (
        <Icon
          className={`${styles.filter} ${filtered ? styles.filtered : ''}`}
          type="search"
        />
      ),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <Input
          className={styles.input}
          placeholder={`Search ${key}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
        />
      ),
      onFilter: (value, record) =>
        record[key]?.toLowerCase().includes(value.toLowerCase()),
      ...(key !== 'zh_TW'
        ? {}
        : {
            fixed: 'left',
          }),
    }));
  const SearchTable = React.memo(() => {
    const [searchKey, setSearchKey] = useState('');
    const allData = useMemo(() => getAllData(data), []);
    const filteredData = useMemo(
      () =>
        !searchKey
          ? []
          : allData.filter(locales =>
              Object.values(locales).some(key =>
                key?.toLowerCase().includes(searchKey.toLowerCase()),
              ),
            ),
      [searchKey, allData],
    );
    const searchColumns = useMemo(
      () => [
        ...columns,
        {
          dataIndex: 'key',
          fixed: 'right',
          render: value => {
            const [kind, story] = value.split(/\//g);

            return (
              <LinkTo kind={`@meepshop/locales/${kind}`} story={story}>
                Go
              </LinkTo>
            );
          },
        },
      ],
      [],
    );

    return (
      <div className={styles.root}>
        <Search
          className={styles.search}
          onSearch={value => setSearchKey(value)}
        />
        <Table
          columns={searchColumns}
          dataSource={filteredData}
          scroll={{ x: 1200 }}
          pagination={false}
          bordered
        />
      </div>
    );
  });

  storiesOf('@meepshop/locales', module).add('all', () => <SearchTable />);
  Object.keys(data).forEach(key => {
    const [name, packageName] = key.split(/\//);

    storiesOf(`@meepshop/locales/${name}`, module).add(packageName, () => (
      <div className={styles.root}>
        <Table
          columns={columns}
          dataSource={data[key]}
          scroll={{ x: 1200 }}
          pagination={false}
          bordered
        />
      </div>
    ));
  });
})();
