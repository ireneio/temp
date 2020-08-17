// import
import { useMemo, useContext, useCallback } from 'react';

import { AdTrack as AdTrackContext } from '@meepshop/context';

// graphql typescript
import {
  imageFragment_link as imageFragmentLink,
  imageFragment_link_EmailLink as imageFragmentLinkEmailLink,
  imageFragment_link_PhoneLink as imageFragmentLinkPhoneLink,
  imageFragment_link_GroupLink as imageFragmentLinkGroupLink,
  imageFragment_link_PageLink as imageFragmentLinkPageLink,
  imageFragment_link_ProductLink as imageFragmentLinkProductLink,
  imageFragment_link_ProductsLink as imageFragmentLinkProductsLink,
  imageFragment_link_CustomLink as imageFragmentLinkCustomLink,
} from '../__generated__/imageFragment';

// typescript definition
type SortType = 'LATEST' | 'NAME' | 'PRICE_ASC' | 'PRICE_DESC';

// definition
const generateProductsUrl = (link: imageFragmentLinkProductsLink): string =>
  `/products?sort=${
    {
      LATEST: 'createdOn-desc',
      NAME: 'title.zh_TW-asc',
      PRICE_ASC: 'variantInfo.firstRetailPrice-asc',
      PRICE_DESC: 'variantInfo.firstRetailPrice-desc',
    }[link.sort as SortType]
  }&price=${link.minPrice},${link.maxPrice}${
    link.searchKey ? `&search=${link.searchKey}` : ''
  }${link.tags ? `&tags=${link.tags.join(',')}` : ''}`;

export default (
  link: imageFragmentLink | null,
): { href: string | null; setAdTrack: () => void } => {
  const adTrack = useContext(AdTrackContext);

  return {
    href: useMemo(
      () =>
        !link
          ? null
          : {
              EmailLink: `mailTo:${(link as imageFragmentLinkEmailLink).email}`,
              PhoneLink: `tel:${(link as imageFragmentLinkPhoneLink).phone}`,
              GroupLink: `#${(link as imageFragmentLinkGroupLink).group?.id}`,
              PageLink: `/pages/${
                (link as imageFragmentLinkPageLink).page?.id
              }`,
              ProductLink: `/product/${
                (link as imageFragmentLinkProductLink).product?.id
              }`,
              ProductsLink: generateProductsUrl(
                link as imageFragmentLinkProductsLink,
              ),
              CustomLink: (link as imageFragmentLinkCustomLink).href,
            }[link.__typename],
      [link],
    ),
    setAdTrack: useCallback(() => {
      if (link?.tracking)
        adTrack.custom(
          'meepShop_click',
          link?.tracking?.name || '',
          link?.tracking?.category || null,
        );
    }, [link, adTrack]),
  };
};
