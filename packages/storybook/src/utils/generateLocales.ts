// import
import path from 'path';

import outputFileSync from 'output-file-sync';

// typescript definition
interface LocalesType {
  [key: string]: {
    [key: string]: string | null;
    ley: string;
  }[];
}

// definition
export default (locales: LocalesType): void => {
  const keys = Object.keys(Object.values(locales)[0][0])
    .filter(key => key !== 'key')
    .sort(a => (a === 'zh_TW' ? -1 : 1));
  const workspaces = Object.keys(locales).reduce(
    (result: string[], key: string) => {
      const [workspace] = key.split(/\//);

      return result.includes(workspace) ? result : [...result, workspace];
    },
    [],
  );
  const localesFolder = path.resolve(__dirname, '../../src/cache/locales');

  workspaces.forEach(workspace => {
    const localeStories = Object.keys(locales).filter(key =>
      key.includes(workspace),
    );

    outputFileSync(
      path.resolve(localesFolder, `${workspace}.tsx`),
      `/* eslint-disable */
// typescript import
import { ColumnProps } from 'antd/lib/table';
import { Story } from '@storybook/react/types-6-0';

// import
import React, { useState, useMemo } from 'react';
import { Table, Input, Icon } from 'antd';
import LinkTo from '@storybook/addon-links/react';

import locales from '../../../locales.json';
import styles from '../../styles/locales.less';

// definition
const { Search } = Input;

const columns: ColumnProps<{
  [key: string]: string;
}>[] = ${JSON.stringify(keys)}
  .map(key => ({
    title: key,
    dataIndex: key,
    width: 200,
    sorter: (a, b) => a[key].length - b[key].length,
    sortDirections: ['descend', 'ascend'],
    filterIcon: filtered => (
      <Icon
        className={\`$\{styles.filter} $\{filtered ? styles.filtered : ''}\`}
        type="search"
      />
    ),
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <Input
        className={styles.input}
        placeholder={\`Search $\{key}\`}
        value={selectedKeys?.[0]}
        onChange={e =>
          setSelectedKeys?.(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => confirm?.()}
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
const Locale: Story<{ key: keyof typeof locales }> = ({ key }) => (
  <div className={styles.root}>
    <Table
      columns={columns}
      dataSource={locales[key]}
      scroll={{ x: 1200 }}
      pagination={false}
      bordered
    />
  </div>
);

export const all = () => {
  const [searchKey, setSearchKey] = useState('');
  const allLocales = useMemo(() =>
    ${JSON.stringify(localeStories)}.reduce(
      (result, name: keyof typeof locales) => [
        ...result,
        ...locales[name].map(locale => ({
          ...locale,
          name,
        })),
      ],
      [],
    ),
    [],
  );
  const filteredLocales = useMemo(
    () =>
      !searchKey
        ? []
        : allLocales.filter(locales =>
            Object.values(locales).some(key =>
              key?.toLowerCase().includes(searchKey.toLowerCase()),
            ),
          ),
    [searchKey, allLocales],
  );
  const searchColumns: ColumnProps<{
    [key: string]: string;
  }>[] = useMemo(
    () => [
      ...columns,
      {
        dataIndex: 'name',
        fixed: 'right',
        render: value => {
          const [story] = value.split(/\\//g).slice(1);

          return (
            <LinkTo story={story.replace(/-/g, '_')}>
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
        dataSource={filteredLocales}
        scroll={{ x: 1200 }}
        pagination={false}
        bordered
      />
    </div>
  );
};

${localeStories
  .map(key => {
    const storyName = key.replace(`${workspace}/`, '').replace(/[/-]/g, '_');

    return `export const ${storyName} = Locale.bind({});

${storyName}.args = { key: '${key}' };`;
  })
  .join('\n\n')}

export default {
  title: '@meepshop/locales/${workspace}',
};`,
    );
  });
};
