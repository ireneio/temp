// import
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Spin } from 'antd';
import {
  DeleteOutlined,
  CopyOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { useCopyToClipboard } from 'react-use';
import { format } from 'date-fns';

import { useTranslation } from '@meepshop/locales';
import { ChartIcon } from '@meepshop/icons';
import Link from '@meepshop/link';
import filter from '@meepshop/utils/lib/filter';
import Header from '@admin/header';
import Tooltip from '@admin/tooltip';
import message from '@admin/message';
import ProductsSelector from '@admin/products-selector';

import PromoCodeExample from './PromoCodeExample';
import styles from './styles/detail.less';
import useDeleteAffiliateProgram from './hooks/useDeleteAffiliateProgram';

// graphql typescript
import {
  getProgramDetail as getProgramDetailType,
  getProgramDetailVariables as getProgramDetailVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getProgramDetail } from './gqls/detail';
import { promoCodeExampleFragment } from './gqls/promoCodeExample';
import { useDeleteAffiliateProgramFragment } from './gqls/useDeleteAffiliateProgram';

// typescript definition
export interface PropsType {
  affiliateProgramId: string;
}

// definition
export default React.memo(({ affiliateProgramId }: PropsType) => {
  const { t } = useTranslation('affiliate-program');
  const { data, loading } = useQuery<
    getProgramDetailType,
    getProgramDetailVariablesType
  >(getProgramDetail, {
    variables: {
      id: affiliateProgramId,
    },
  });
  const viewer = data?.viewer || null;
  const affiliateProgram = viewer?.affiliateProgram || null;
  const [copied, copyToClipboard] = useCopyToClipboard();
  const deleteProgram = useDeleteAffiliateProgram(
    affiliateProgramId,
    filter(useDeleteAffiliateProgramFragment, viewer),
  );
  const [visible, setVisible] = useState(false);
  const productsAmount = (affiliateProgram?.products || []).length;

  useEffect(() => {
    if (copied.value)
      message.success(t('promoCode.copied', { promoCode: copied.value }));
  }, [t, copied]);

  return (
    <Header
      title={t('title.detail')}
      prevTitle={t('prev-title')}
      backTo="/affiliate/programs"
      buttons={
        <div>
          <Link href={`/affiliate/programs/${affiliateProgramId}/statistics`}>
            <Button className={styles.programs} icon={<ChartIcon />}>
              {t('buttons.programs')}
            </Button>
          </Link>

          {affiliateProgram?.status === 'ENDED' ? null : (
            <Link href={`/affiliate/programs/${affiliateProgramId}/edit`}>
              <Button type="primary">{t('buttons.edit')}</Button>
            </Link>
          )}
        </div>
      }
    >
      <Spin
        wrapperClassName={styles.root}
        indicator={<LoadingOutlined spin />}
        spinning={loading}
      >
        <div className={styles.block}>
          <div>{t('program-title.title')}</div>

          <div>{affiliateProgram?.title}</div>

          <div>{t('period.title')}</div>

          <div>
            {!affiliateProgram?.startAt
              ? null
              : format(
                  new Date(affiliateProgram.startAt),
                  'yyyy/MM/dd HH:mm',
                )}{' '}
            ~{' '}
            {!affiliateProgram?.endAt
              ? t('period.never-end')
              : format(new Date(affiliateProgram.endAt), 'yyyy/MM/dd HH:mm')}
            <span
              className={`${styles.tag} ${
                styles[affiliateProgram?.status || '']
              }`}
            >
              {t(`period.${affiliateProgram?.status}`)}
            </span>
          </div>

          <div>{t('partner.title')}</div>

          <div>{affiliateProgram?.affiliatePartner.name}</div>

          <div>{t('commissionRate.title')}</div>

          <div>{affiliateProgram?.commissionRate}%</div>

          <div>{t('products.title')}</div>

          <div>
            {affiliateProgram?.allProducts ? (
              t('products.all-products')
            ) : (
              <>
                <div>
                  <span className={productsAmount !== 0 ? '' : styles.empty}>
                    {productsAmount}{' '}
                  </span>

                  {t('products.specify-products')}

                  {productsAmount !== 0 ? null : (
                    <span className={styles.empty}>
                      <ExclamationCircleOutlined />

                      {t('products.empty')}
                    </span>
                  )}
                </div>

                <Button onClick={() => setVisible(true)}>
                  {t('products.check-products')}
                </Button>

                {!visible ? null : (
                  <ProductsSelector
                    products={affiliateProgram?.products}
                    onCancel={() => setVisible(false)}
                    limit={200}
                    visible
                    sortDisabled
                    searchDisabled
                  />
                )}
              </>
            )}
          </div>
        </div>

        <div className={styles.block}>
          <div>{t('promoCode.title')}</div>

          <div>
            ?promoCode={affiliateProgram?.promoCode}
            <Tooltip title={t('promoCode.tooltip')}>
              <CopyOutlined
                className={styles.copy}
                onClick={() => {
                  copyToClipboard(`?promoCode=${affiliateProgram?.promoCode}`);
                }}
              />
            </Tooltip>
          </div>

          <div className={styles.example}>
            <PromoCodeExample
              promoCode={affiliateProgram?.promoCode}
              store={filter(
                promoCodeExampleFragment,
                data?.viewer?.store || null,
              )}
            />
          </div>
        </div>

        {affiliateProgram?.status !== 'NOT_STARTED' ? null : (
          <div className={styles.delete}>
            <Button icon={<DeleteOutlined />} onClick={deleteProgram}>
              {t('buttons.delete')}
            </Button>
          </div>
        )}
      </Spin>
    </Header>
  );
});
