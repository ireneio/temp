// import
import React, { useContext } from 'react';

import { useTranslation, useGetLanguage } from '@meepshop/locales';
import {
  Apps as AppsContext,
  Currency as CurrencyContext,
} from '@meepshop/context';
import DraftText from '@meepshop/draft-text';

// graphql typescript
import {
  descriptionProductFragment,
  descriptionVariantFragment,
  descriptionUserFragment,
} from '@meepshop/types/gqls/meepshop';

// typescript definition
interface PropsType {
  product: descriptionProductFragment | null;
  variant: descriptionVariantFragment | null;
  viewer: descriptionUserFragment | null;
}

// definition
export default React.memo(({ product, variant, viewer }: PropsType) => {
  const { t } = useTranslation('product-info');
  const getLanguage = useGetLanguage();
  const { c } = useContext(CurrencyContext);
  const apps = useContext(AppsContext);
  const description = getLanguage(product?.description);
  const applicableActivities = product?.applicableActivities || [];

  return (
    <div>
      {!product?.title ? null : <h1>{getLanguage(product.title)}</h1>}

      {!variant?.sku ? null : <div>{variant.sku}</div>}

      {!description || !product ? null : (
        <DraftText
          id={product.id || 'null-id' /* SHOULD_NOT_BE_NULL */}
          content={description}
          __typename="DraftTextModule"
        />
      )}

      {applicableActivities.length === 0 ? null : (
        <div>
          {applicableActivities.map(activity => {
            const title = getLanguage(activity?.title);

            return !title ? null : <div key={title}>{title}</div>;
          })}
        </div>
      )}

      {apps.memberSeePrice.isInstalled && viewer?.role !== 'SHOPPER' ? null : (
        <div>
          {!product?.showUserPrice?.showListPrice ||
          !variant?.listPrice ? null : (
            <div>
              {t('list-price')}

              {c(variant.listPrice)}
            </div>
          )}

          {!product?.showUserPrice?.showSuggestedPrice ||
          !variant?.suggestedPrice ? null : (
            <div>
              {t('suggested-price')}

              {c(variant.suggestedPrice)}
            </div>
          )}
        </div>
      )}

      {!variant?.totalPrice ? null : (
        <div>
          {apps.memberSeePrice.isInstalled && viewer?.role !== 'SHOPPER'
            ? t('member-see-price')
            : c(variant.totalPrice)}
        </div>
      )}
    </div>
  );
});
