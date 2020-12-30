// typescript import
import { TableProps } from 'antd/lib/table';

import { PropsType as PaginationPropsType } from './Pagination';

// import
import React from 'react';
import { Table, Empty } from 'antd';

import Pagination from './Pagination';
import styles from './styles/index.less';

// typescript definition
export interface PropsType<T>
  extends TableProps<T>,
    Pick<PaginationPropsType, 'optional'> {
  children?: React.ReactNode;
}

// definition
export default React.memo(
  ({
    optional,
    pagination,
    children,
    locale,
    dataSource,
    ...props
  }: PropsType<{}>) => (
    <div className={styles.root}>
      {children}
      <Table
        {...props}
        dataSource={dataSource}
        className={styles.table}
        locale={{
          ...locale,
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={locale?.emptyText}
            />
          ),
        }}
        pagination={false}
      />
      {(dataSource || []).length === 0 ? null : (
        <Pagination {...pagination} optional={optional} />
      )}
    </div>
  ),
);
