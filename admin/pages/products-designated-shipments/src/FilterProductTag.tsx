// typescript import
import { QueryResult } from '@apollo/client';

// import
import React, { useState } from 'react';
import { Input } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

import { useTranslation } from '@meepshop/locales';

import styles from './styles/filterProductTag.less';

// graphql typescript
import {
  getAdminProducts as getAdminProductsType,
  getAdminProductsVariables as getAdminProductsVariablesType,
  filterProductTagFragment as filterProductTagFragmentType,
} from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType
  extends Pick<
    QueryResult<getAdminProductsType, getAdminProductsVariablesType>,
    'variables' | 'refetch'
  > {
  productTags: filterProductTagFragmentType | null;
  selectedProductTags: string[];
  setSelectedProductTags: (tags: string[]) => void;
}

// definition
const { Search } = Input;

export default React.memo(
  ({
    productTags,
    selectedProductTags,
    variables,
    setSelectedProductTags,
    refetch,
  }: PropsType) => {
    const { t } = useTranslation('products-designated-shipments');
    const [productTagOptions, setProductTagOptions] = useState<
      (string | null)[]
    >(productTags?.tags || []);

    return (
      <div className={styles.root}>
        <Search
          className={styles.filterSearch}
          placeholder={t('filter-tag')}
          onSearch={newSearchTerm => {
            if (!newSearchTerm) {
              setProductTagOptions(productTags?.tags || []);
              return;
            }

            setProductTagOptions(
              (productTags?.tags || []).reduce((result, tag) => {
                if (!tag) return result;

                return tag.includes(newSearchTerm) &&
                  !selectedProductTags.includes(tag)
                  ? [...result, tag]
                  : result;
              }, []),
            );
          }}
        />
        <div className={styles.filterList}>
          {(productTagOptions.filter(Boolean) as string[]).map(tag => (
            <div
              key={tag}
              className={`${
                selectedProductTags.includes(tag) ? styles.selected : ''
              }`}
              onClick={() => {
                const findTag = selectedProductTags.findIndex(
                  selected => selected === tag,
                );

                if (findTag === -1) {
                  const selectedTags = [...selectedProductTags, tag];

                  setSelectedProductTags(selectedTags);
                  refetch({
                    filter: {
                      ...variables?.filter,
                      tags: selectedTags,
                    },
                  });
                } else {
                  const filterTag = selectedProductTags.filter(
                    selected => selected !== tag,
                  );

                  setSelectedProductTags(filterTag);
                  refetch({
                    filter: {
                      ...variables?.filter,
                      tags: filterTag,
                    },
                  });
                }
              }}
            >
              {tag}
              <CheckOutlined className={styles.check} />
            </div>
          ))}
        </div>
      </div>
    );
  },
);
