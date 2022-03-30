// typescript import
import { ComponentProps } from './constants';

// import
import React, { useRef } from 'react';
import { Input, Select, Button, Popover, Radio, Space } from 'antd';
import { SearchOutlined, TagFilled } from '@ant-design/icons';

import { useTranslation } from '@meepshop/locales';
import { FilterIcon } from '@meepshop/icons';

import styles from './styles/header.less';

// graphql typescript
import { headerFragment as headerFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType extends Omit<ComponentProps, 'fetchMore'> {
  productTags: headerFragmentType | null;
}

// definition
const { Search } = Input;

export default React.memo(
  ({ variables, refetch, step, productTags }: PropsType) => {
    const { t } = useTranslation('products-selector');
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    return (
      <div className={styles.root}>
        <div>{t(`title.${step}`)}</div>

        <div className={`${styles.filter} ${styles[step]}`}>
          <Search
            className={styles.searchInput}
            onChange={({ target: { value } }) => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);

              timeoutRef.current = setTimeout(async () => {
                await refetch({
                  ...variables,
                  filter: {
                    ...variables?.filter,
                    searchTerm: value,
                  },
                });
                timeoutRef.current = null;
              }, 500);
            }}
            placeholder={t('search-placeholder')}
            onSearch={value => {
              refetch({
                ...variables,
                filter: {
                  ...variables?.filter,
                  searchTerm: value,
                },
              });
            }}
          />

          <div className={styles.select}>
            <TagFilled />

            <Select
              dropdownClassName={styles.dropdown}
              mode="multiple"
              placeholder={t('select-placeholder')}
              disabled={!productTags?.tags}
              options={
                // SHOULD_NOT_BE_NULL
                productTags?.tags?.map(tag => ({
                  label: tag || '',
                  value: tag || '',
                })) || []
              }
              onChange={(value: string[]) => {
                refetch({
                  ...variables,
                  filter: {
                    ...variables?.filter,
                    tags: value,
                  },
                });
              }}
              notFoundContent={
                <div className={styles.notFound}>
                  <SearchOutlined /> {t('notFound')}
                </div>
              }
              defaultActiveFirstOption={false}
              allowClear
              maxTagCount="responsive"
              maxTagPlaceholder={omittedValues => `+${omittedValues.length}`}
            />

            <Popover
              placement="bottomRight"
              overlayClassName={styles.overlay}
              content={
                <>
                  <div>{t('tag-condition')}</div>
                  <Radio.Group
                    defaultValue={false}
                    onChange={({ target: { value } }) => {
                      refetch({
                        ...variables,
                        filter: {
                          ...variables?.filter,
                          isSearchTagStrictMode: value,
                        },
                      });
                    }}
                  >
                    <Space direction="vertical">
                      <Radio value={false}>{t('non-strict')}</Radio>
                      <Radio value>{t('strict')}</Radio>
                    </Space>
                  </Radio.Group>
                </>
              }
              trigger="click"
            >
              <Button type="text" icon={<FilterIcon />} />
            </Popover>
          </div>
        </div>
      </div>
    );
  },
);
