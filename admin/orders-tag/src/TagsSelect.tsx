// typescript import
import { AutoCompleteProps } from 'antd/lib/auto-complete';

import { RefetchType } from './constants';

// import
import React from 'react';
import { AutoComplete, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';

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

    return (
      <AutoComplete
        {...props}
        className={styles.autoComplete}
        onSearch={searchTerm =>
          refetch({
            input: {
              orderIds,
              searchTerm,
            },
          })
        }
        onSelect={onSelect}
        placeholder={t('placeholder')}
      >
        <Input onPressEnter={onSelect} />
      </AutoComplete>
    );
  },
);
