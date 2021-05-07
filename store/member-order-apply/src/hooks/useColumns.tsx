// typescript import
import { ColumnProps } from 'antd/lib/table';
import { FormComponentProps } from 'antd/lib/form/Form';

import { languageType } from '@meepshop/locales';

// import
import React, { useMemo, useContext } from 'react';
import { filter } from 'graphql-anywhere';
import { Select } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { Currency as CurrencyContext } from '@meepshop/context';
import Thumbnail from '@meepshop/thumbnail';

import Reason from '../Reason';

// graphql typescript
import { useColumnsProductsObjectTypeMemberOrderApplyFragment as useColumnsProductsObjectTypeMemberOrderApplyFragmentType } from '@meepshop/types/gqls/store';

// graphql import
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';

// definition
const { Option } = Select;
export default (
  { getFieldDecorator, getFieldValue }: FormComponentProps['form'],
  checking: boolean,
): ColumnProps<useColumnsProductsObjectTypeMemberOrderApplyFragmentType>[] => {
  const {
    t,
    i18n: { language },
  } = useTranslation('member-order-apply');
  const { c } = useContext(CurrencyContext);

  return useMemo(
    () => [
      {
        dataIndex: 'coverImage',
        render: (
          value: useColumnsProductsObjectTypeMemberOrderApplyFragmentType['coverImage'],
        ) => <Thumbnail image={filter(thumbnailFragment, value)} />,
      },
      {
        title: t('product.title'),
        dataIndex: 'title',
        width: '50%',
        render: (
          value: useColumnsProductsObjectTypeMemberOrderApplyFragmentType['title'],
          {
            specs,
            retailPrice,
          }: useColumnsProductsObjectTypeMemberOrderApplyFragmentType,
        ) => (
          <>
            {value?.[language as languageType] || value?.zh_TW}

            <div>
              {(specs || [])
                .map(
                  spect =>
                    spect?.title?.[language as languageType] ||
                    spect?.title?.zh_TW,
                )
                .filter(Boolean)
                .join(' / ')}
            </div>

            <div>{c(retailPrice || 0)}</div>
          </>
        ),
      },
      {
        title: t('product.spec'),
        dataIndex: 'specs',
        width: '50%',
        render: (
          value: useColumnsProductsObjectTypeMemberOrderApplyFragmentType['specs'],
        ) =>
          (value || [])
            .map(
              spec =>
                spec?.title?.[language as languageType] || spec?.title?.zh_TW,
            )
            .filter(Boolean)
            .join(' / '),
      },
      {
        title: t('product.quantity'),
        dataIndex: 'availableQuantity',
        align: 'center',
        render: (
          value: useColumnsProductsObjectTypeMemberOrderApplyFragmentType['availableQuantity'],
          {
            availableQuantity,
            id,
          }: useColumnsProductsObjectTypeMemberOrderApplyFragmentType,
        ) => {
          if (checking) return getFieldValue(`quantitySelected.${id}`);

          return getFieldDecorator(`quantitySelected.${id}`, {
            initialValue: value || 0,
            preserve: true,
          })(
            <Select>
              {[].constructor
                .apply({}, new Array(availableQuantity))
                .map((_: unknown, selectedIndex: number) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Option key={selectedIndex} value={selectedIndex + 1}>
                    {selectedIndex + 1}
                  </Option>
                ))}
            </Select>,
          );
        },
      },
      {
        title: t('product.price'),
        dataIndex: 'retailPrice',
        align: 'right',
        render: (
          value: useColumnsProductsObjectTypeMemberOrderApplyFragmentType['retailPrice'],
        ) => c(value || 0),
      },
      {
        title: t('product.subtotal'),
        dataIndex: 'retailPrice',
        key: 'subTotal',
        align: 'right',
        render: (
          value: useColumnsProductsObjectTypeMemberOrderApplyFragmentType['retailPrice'],
          { id }: useColumnsProductsObjectTypeMemberOrderApplyFragmentType,
        ) => c((value || 0) * getFieldValue(`quantitySelected.${id}`)),
      },
      {
        title: t('reason'),
        dataIndex: 'id',
        width: '10%',
        render: (
          id: useColumnsProductsObjectTypeMemberOrderApplyFragmentType['id'],
        ) =>
          getFieldDecorator(`reason.${id}`)(
            <Reason key={id} checking={checking} />,
          ),
      },
    ],
    [c, checking, getFieldDecorator, getFieldValue, language, t],
  );
};
