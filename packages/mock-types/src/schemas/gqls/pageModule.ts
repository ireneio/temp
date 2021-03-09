// import
import gql from 'graphql-tag';

// definition
export const pageModuleMockFragment = gql`
  fragment pageModuleMockFragment on PageModule {
    ... on GroupModule {
      id
      parentId
    }

    ... on LayoutModule {
      id
      parentId
    }

    ... on CarouselModule {
      id
      parentId
    }

    ... on DividerModule {
      id
      parentId
    }

    ... on FacebookWallModule {
      id
      parentId
    }

    ... on DraftTextModule {
      id
      parentId
    }

    ... on GoogleMapModule {
      id
      parentId
    }

    ... on IframeModule {
      id
      parentId
    }

    ... on ImageModule {
      id
      parentId
    }

    ... on ImageTextModule {
      id
      parentId
    }

    ... on MenuModule {
      id
      parentId
    }

    ... on ProductCarouselModule {
      id
      parentId
    }

    ... on ProductCollectionsModule {
      id
      parentId
    }

    ... on ProductDraftTextModule {
      id
      parentId
    }

    ... on ProductIframeModule {
      id
      parentId
    }

    ... on ProductInfoModule {
      id
      parentId
    }

    ... on ProductQaModule {
      id
      parentId
    }

    ... on ProductVideoModule {
      id
      parentId
    }

    ... on SocialMediaModule {
      id
      parentId
    }

    ... on SocialThumbsModule {
      id
      parentId
    }

    ... on UnavailableModule {
      id
      parentId
    }

    ... on VideoModule {
      id
      parentId
    }

    ... on ViewTrackingModule {
      id
      parentId
    }
  }
`;
