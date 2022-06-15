// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import React, { useMemo, useContext } from 'react';
import { Form } from 'antd';

import { useTranslation, useGetLanguage } from '@meepshop/locales';
import { Currency as CurrencyContext } from '@meepshop/context';
import Select, { Option } from '@meepshop/select';
import Thumbnail from '@meepshop/thumbnail';
import filter from '@meepshop/utils/lib/filter';

import Reason from '../Reason';

// graphql typescript
import { useColumnsProductsObjectTypeMemberOrderApplyFragment as useColumnsProductsObjectTypeMemberOrderApplyFragmentType } from '@meepshop/types/gqls/store';

// graphql import
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';

// definition
const { Item: FormItem } = Form;

export default (
  checking: boolean,
): ColumnProps<useColumnsProductsObjectTypeMemberOrderApplyFragmentType>[] => {
  const { t } = useTranslation('member-order-apply');
  const getLanguage = useGetLanguage();
  const { c } = useContext(CurrencyContext);

  return useMemo(
    () => [
      {
        dataIndex: 'coverImage',
        render: (
          value: useColumnsProductsObjectTypeMemberOrderApplyFragmentType['coverImage'],
        ) => (
          <Thumbnail
            size={80}
            mobileSize={64}
            image={filter(thumbnailFragment, value)}
          />
        ),
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
            {getLanguage(value)}

            <div>
              {(specs || [])
                .map(spec => getLanguage(spec?.title))
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
            .map(spec => getLanguage(spec?.title))
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
          const name = [
            'quantitySelected',
            id || 'null id' /** SHOULD_NOT_BE_NULL */,
          ];

          return (
            <>
              <FormItem
                initialValue={value || 0}
                name={name}
                hidden={checking}
                noStyle
              >
                <Select>
                  {[].constructor
                    .apply({}, new Array(availableQuantity))
                    .map((_: unknown, selectedIndex: number) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Option key={selectedIndex} value={selectedIndex + 1}>
                        {selectedIndex + 1}
                      </Option>
                    ))}
                </Select>
              </FormItem>

              {!checking ? null : (
                <FormItem shouldUpdate noStyle>
                  {({ getFieldValue }) => getFieldValue(name)}
                </FormItem>
              )}
            </>
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
        ) => (
          <FormItem
            dependencies={[
              ['quantitySelected', id || 'null id' /** SHOULD_NOT_BE_NULL */],
            ]}
            noStyle
          >
            {({ getFieldValue }) =>
              c(
                (value || 0) *
                  getFieldValue([
                    'quantitySelected',
                    id || 'null id' /** SHOULD_NOT_BE_NULL */,
                  ]),
              )
            }
          </FormItem>
        ),
      },
      {
        title: t('reason'),
        dataIndex: 'id',
        width: '10%',
        render: (
          id: useColumnsProductsObjectTypeMemberOrderApplyFragmentType['id'],
        ) => (
          <Reason
            key={id}
            id={id || 'null id' /** SHOULD_NOT_BE_NULL */}
            checking={checking}
          />
        ),
      },
    ],
    [c, checking, getLanguage, t],
  );
};
