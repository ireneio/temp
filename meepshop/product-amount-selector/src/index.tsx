// typescript import
import { SelectProps, RefSelectProps } from 'antd/lib/select';

// import
import React from 'react';
import { filter } from 'graphql-anywhere';
import { Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { useTranslation } from '@meepshop/locales';

import useOptions from './hooks/useOptions';
import styles from './styles/index.less';

// graphql typescript
import { productAmountSelectorFragment as productAmountSelectorFragmentType } from '@meepshop/types/gqls/meepshop';

// graphql import
import { useOptionsVariantFragment } from './gqls/useOptions';

// typescript definition
export interface PropsType
  extends Omit<
    SelectProps<number>,
    | 'notFoundContent'
    | 'dropdownMatchSelectWidth'
    | 'showSearch'
    | 'onSearch'
    | 'children'
  > {
  forwardedRef: React.Ref<RefSelectProps>;
  variant: productAmountSelectorFragmentType | null;
}

// definition
const { Option } = Select;

const ProductAmountSelector = React.memo(
  ({ forwardedRef, variant, onChange, className, ...props }: PropsType) => {
    const { t } = useTranslation('product-amount-selector');
    const { options, onSearch, setSearchValue } = useOptions(
      filter(useOptionsVariantFragment, variant),
    );

    return (
      <Select
        {...props}
        className={`${styles.root} ${className || ''}`}
        ref={forwardedRef}
        onChange={(
          ...argu: Parameters<NonNullable<SelectProps<number>['onChange']>>
        ) => {
          if (onChange) onChange(...argu);

          setSearchValue(null);
        }}
        onSearch={onSearch}
        notFoundContent={t('not-found-content')}
        dropdownMatchSelectWidth={false}
        showSearch
        suffixIcon={<DownOutlined />}
      >
        {options.map(({ value, disabled, text }) => (
          <Option key={value} value={value} disabled={disabled}>
            {text}
          </Option>
        ))}
      </Select>
    );
  },
);

export default React.forwardRef(
  (props: Omit<PropsType, 'forwardedRef'>, ref: PropsType['forwardedRef']) => (
    <ProductAmountSelector {...props} forwardedRef={ref} />
  ),
);
