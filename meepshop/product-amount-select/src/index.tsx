// typescript import
import { SelectProps } from 'antd/lib/select';

// import
import React from 'react';
import { filter } from 'graphql-anywhere';
import { Select } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

import useOptions from './hooks/useOptions';
import styles from './styles/index.less';

// graphql typescript
import { useOptionsVariantFragment as useOptionsVariantFragmentType } from './hooks/__generated__/useOptionsVariantFragment';

// graphql import
import { useOptionsVariantFragment } from './hooks/useOptions';

// typescript definition
export interface PropsType
  extends Omit<
    SelectProps,
    | 'notFoundContent'
    | 'dropdownMatchSelectWidth'
    | 'showSearch'
    | 'onSearch'
    | 'children'
  > {
  forwardedRef: React.Ref<Select>;
  variant: useOptionsVariantFragmentType | null;
}

// definition
export { useOptionsVariantFragment };

const { Option } = Select;

const ProductAmountSelect = React.memo(
  ({ forwardedRef, variant, onChange, className, ...props }: PropsType) => {
    const { t } = useTranslation('product-amount-select');
    const { options, onSearch, setSearchValue } = useOptions(
      filter(useOptionsVariantFragment, variant),
    );

    return (
      <Select
        {...props}
        className={`${styles.root} ${className || ''}`}
        ref={forwardedRef}
        onChange={(
          ...argu: Parameters<NonNullable<SelectProps['onChange']>>
        ) => {
          if (onChange) onChange(...argu);

          setSearchValue(null);
        }}
        onSearch={onSearch}
        notFoundContent={t('not-found-content')}
        dropdownMatchSelectWidth={false}
        showSearch
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
    <ProductAmountSelect {...props} forwardedRef={ref} />
  ),
);
