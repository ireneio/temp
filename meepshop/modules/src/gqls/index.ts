// import
import gql from 'graphql-tag';

// graphql import
import { carouselFragment } from '@meepshop/carousel/gqls';
import { dividerFragment } from '@meepshop/divider/gqls';
import { draftTextFragment } from '@meepshop/draft-text/gqls';
import { facebookWallFragment } from '@meepshop/facebook-wall/gqls';
import { googleMapFragment } from '@meepshop/google-map/gqls';
import { iframeFragment } from '@meepshop/iframe/gqls';
import { imageFragment } from '@meepshop/image/gqls';
import { imageTextFragment } from '@meepshop/image-text/gqls';
import { landingPageLandingPageModuleFragment } from '@meepshop/landing-page/gqls';
import { menuMenuModuleFragment } from '@meepshop/menu/gqls';
import { productCarouselFragment } from '@meepshop/product-carousel/gqls';
import { productCollectionsFragment } from '@meepshop/product-collections/gqls';
import { productDraftTextFragment } from '@meepshop/product-draft-text/gqls';
import { productIframeFragment } from '@meepshop/product-iframe/gqls';
import { productQaFragment } from '@meepshop/product-qa/gqls';
import { productVideoFragment } from '@meepshop/product-video/gqls';
import { smartConversionFragment } from '@meepshop/smart-conversion/gqls';
import { socialMediaFragment } from '@meepshop/social-media/gqls';
import { socialThumbsFragment } from '@meepshop/social-thumbs/gqls';
import { unavailableFragment } from '@meepshop/unavailable/gqls';
import { videoFragment } from '@meepshop/video/gqls';
import { viewTrackingFragment } from '@meepshop/view-tracking/gqls';

// definition
export const modulesFragment = gql`
  fragment modulesFragment on PageModule {
    ... on GroupModule {
      __typename
      id
      parentId
      percentWidth
      componentWidth
      padding
      background
      backgroundImage {
        image {
          id
          scaledSrc {
            w1920
          }
        }
        cover
        repeat
      }
    }

    ... on LayoutModule {
      __typename
      id
      parentId
    }

    ... on ActivityModule {
      __typename
      id
      parentId
    }

    ... on CarouselModule {
      __typename
      id
      parentId
      ...carouselFragment
    }

    ... on DividerModule {
      __typename
      id
      parentId
      ...dividerFragment
    }

    ... on DraftTextModule {
      __typename
      id
      parentId
      ...draftTextFragment
    }

    ... on FacebookWallModule {
      __typename
      id
      parentId
      ...facebookWallFragment
    }

    ... on GoogleMapModule {
      __typename
      id
      parentId
      ...googleMapFragment
    }

    ... on IframeModule {
      __typename
      id
      parentId
      ...iframeFragment
    }

    ... on ImageModule {
      __typename
      id
      parentId
      ...imageFragment
    }

    ... on ImageTextModule {
      __typename
      id
      parentId
      ...imageTextFragment
    }

    ... on LandingPageModule {
      __typename
      id
      parentId
      ...landingPageLandingPageModuleFragment
    }

    ... on MenuModule {
      __typename
      id
      parentId
      ...menuMenuModuleFragment
    }

    ... on ProductCarouselModule {
      __typename
      id
      parentId
      ...productCarouselFragment
    }

    ... on ProductCollectionsModule {
      __typename
      id
      parentId
      ...productCollectionsFragment
    }

    ... on ProductDraftTextModule {
      __typename
      id
      parentId
      ...productDraftTextFragment
    }

    ... on ProductIframeModule {
      __typename
      id
      parentId
      ...productIframeFragment
    }

    ... on ProductInfoModule {
      __typename
      id
      parentId
    }

    ... on ProductQaModule {
      __typename
      id
      parentId
      ...productQaFragment
    }

    ... on ProductVideoModule {
      __typename
      id
      parentId
      ...productVideoFragment
    }

    ... on ProductsModule {
      __typename
      id
      parentId
    }

    ... on SmartConversionModule {
      __typename
      id
      parentId
      ...smartConversionFragment
    }

    ... on SocialMediaModule {
      __typename
      id
      parentId
      ...socialMediaFragment
    }

    ... on SocialThumbsModule {
      __typename
      id
      parentId
      ...socialThumbsFragment
    }

    ... on UnavailableModule {
      __typename
      id
      parentId
      ...unavailableFragment
    }

    ... on VideoModule {
      __typename
      id
      parentId
      ...videoFragment
    }

    ... on ViewTrackingModule {
      __typename
      id
      parentId
      ...viewTrackingFragment
    }
  }

  ${carouselFragment}
  ${dividerFragment}
  ${draftTextFragment}
  ${facebookWallFragment}
  ${googleMapFragment}
  ${iframeFragment}
  ${imageFragment}
  ${imageTextFragment}
  ${landingPageLandingPageModuleFragment}
  ${menuMenuModuleFragment}
  ${productCarouselFragment}
  ${productCollectionsFragment}
  ${productDraftTextFragment}
  ${productIframeFragment}
  ${productQaFragment}
  ${productVideoFragment}
  ${smartConversionFragment}
  ${socialMediaFragment}
  ${socialThumbsFragment}
  ${unavailableFragment}
  ${videoFragment}
  ${viewTrackingFragment}
`;
