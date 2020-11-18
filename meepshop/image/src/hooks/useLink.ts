// import
import { useMemo, useContext, useCallback } from 'react';

import { AdTrack as AdTrackContext } from '@meepshop/context';

// graphql typescript
import {
  useLinkFragment as useLinkFragmentLink,
  useLinkFragment_EmailLink as useLinkFragmentLinkEmailLink,
  useLinkFragment_PhoneLink as useLinkFragmentLinkPhoneLink,
  useLinkFragment_GroupLink as useLinkFragmentLinkGroupLink,
  useLinkFragment_PageLink as useLinkFragmentLinkPageLink,
  useLinkFragment_ProductLink as useLinkFragmentLinkProductLink,
  useLinkFragment_ProductsLink as useLinkFragmentLinkProductsLink,
  useLinkFragment_CustomLink as useLinkFragmentLinkCustomLink,
} from '../gqls/__generated__/useLinkFragment';

// typescript definition
type SortType = 'LATEST' | 'NAME' | 'PRICE_ASC' | 'PRICE_DESC';

// definition
const generateProductsUrl = (link: useLinkFragmentLinkProductsLink): string =>
  `/products?sort=${
    {
      LATEST: 'createdAt-desc',
      NAME: 'title.zh_TW-asc',
      PRICE_ASC: 'variantInfo.firstRetailPrice-asc',
      PRICE_DESC: 'variantInfo.firstRetailPrice-desc',
    }[link.sort as SortType]
  }&price=${link.minPrice},${link.maxPrice}${
    link.searchKey ? `&search=${link.searchKey}` : ''
  }${link.tags ? `&tags=${link.tags.join(',')}` : ''}`;

export default (
  link: useLinkFragmentLink | null,
): { href: string | null; setAdTrack: () => void } => {
  const adTrack = useContext(AdTrackContext);

  return {
    href: useMemo(
      () =>
        !link
          ? null
          : {
              EmailLink: `mailTo:${
                (link as useLinkFragmentLinkEmailLink).email
              }`,
              PhoneLink: `tel:${(link as useLinkFragmentLinkPhoneLink).phone}`,
              GroupLink: `#${(link as useLinkFragmentLinkGroupLink).group?.id}`,
              HomeLink: '/',
              PageLink: `/pages/${
                (link as useLinkFragmentLinkPageLink).page?.id
              }`,
              ProductLink: `/product/${
                (link as useLinkFragmentLinkProductLink).product?.id
              }`,
              ProductsLink: generateProductsUrl(
                link as useLinkFragmentLinkProductsLink,
              ),
              CustomLink: (link as useLinkFragmentLinkCustomLink).href,
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
