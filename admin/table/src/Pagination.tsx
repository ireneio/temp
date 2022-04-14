// typescript import
import { PaginationProps } from 'antd/lib/pagination';

// import
import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { emptyFunction } from 'fbjs';

import { useTranslation } from '@meepshop/locales';

import styles from './styles/pagination.less';

// typescript definition
export interface PropsType extends PaginationProps {
  optional?: React.ReactNode;
}

// definition
const { Option } = Select;

export default React.memo(
  ({
    optional,
    onChange = emptyFunction,
    total = 0,
    current = 0,
    pageSize = 10,
    pageSizeOptions = ['10', '20', '50', '100'],
  }: PropsType) => {
    const { t } = useTranslation('table');
    const endPage = Math.ceil(total / pageSize);

    return (
      <div className={styles.root}>
        <div>
          {t('total', { total })}

          {optional}
        </div>

        <div className={styles.pagination}>
          <LeftOutlined
            className={current === 0 ? styles.disabled : ''}
            onClick={
              current === 0
                ? emptyFunction
                : () => onChange(current - 1, pageSize)
            }
          />

          {current + 1}
          <span className={styles.slash}>/</span>
          {endPage}

          <RightOutlined
            className={current === endPage - 1 ? styles.disabled : ''}
            onClick={
              current === endPage - 1
                ? emptyFunction
                : () => onChange(current + 1, pageSize)
            }
          />
          {pageSizeOptions.length === 0 ? null : (
            <Select
              className={styles.pageSize}
              value={pageSize}
              onChange={(newPageSize: number) => onChange(current, newPageSize)}
            >
              {pageSizeOptions.map((value: string) => (
                <Option key={value} value={Number(value)}>
                  {value}
                  {t('page-size')}
                </Option>
              ))}
            </Select>
          )}
        </div>
      </div>
    );
  },
);
