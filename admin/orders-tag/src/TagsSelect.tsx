// typescript import
import { AutoCompleteProps } from 'antd/lib/auto-complete';

import { RefetchType } from './constants';

// import
import React, { useEffect, useState } from 'react';
import { AutoComplete, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';
import useDebouncedValue from './hooks/useDebouncedValue';

import styles from './styles/tagsSelect.less';

// typescript definition
interface PropsType extends AutoCompleteProps {
  orderIds: string[];
  refetch: RefetchType;
  onSelect: () => void;
}

// definition
export default React.memo(
  ({ orderIds, refetch, onSelect, ...props }: PropsType) => {
    const { t } = useTranslation('orders-tag');

    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebouncedValue<string>(searchValue, 166);

    useEffect(() => {
      refetch({
        input: {
          orderIds,
          searchTerm: debouncedValue,
        },
      });
    }, [debouncedValue, orderIds, refetch]);

    return (
      <AutoComplete
        {...props}
        className={styles.autoComplete}
        onSearch={searchTerm => setSearchValue(searchTerm)}
        onSelect={onSelect}
        placeholder={t('placeholder')}
      >
        <Input onPressEnter={onSelect} />
      </AutoComplete>
    );
  },
);
