// import
import gql from 'graphql-tag';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
const useSmartConversionModuleFragment = gql`
  fragment useSmartConversionModuleFragment on SmartConversionModule {
    id
    status
    startAt
    endAt
    actualEndAt
    durationDays
    lastGAUpdatedAt
    samples {
      eventName
      image {
        id
        scaledSrc {
          w480
        }
      }
      transactionCount
      transactionPercentage
      conversionRate
    }
    page {
      id
      title {
        ...localeFragment
      }
    }
  }

  ${localeFragment}
`;

export const fetchSmartConversionModuleGAData = gql`
  mutation fetchSmartConversionModuleGAData($pageId: ID!) {
    fetchSmartConversionModuleGAData(pageId: $pageId) {
      status
      smartConversionModule {
        ...useSmartConversionModuleFragment
      }
    }
  }

  ${useSmartConversionModuleFragment}
`;

export const getSmartConversionModuleGAData = gql`
  query getSmartConversionModuleGAData($pageId: ID) {
    viewer {
      id
      store {
        id
        page(input: { pageId: $pageId }) {
          smartConversionModule {
            ...useSmartConversionModuleFragment
          }
        }
      }
    }
  }

  ${useSmartConversionModuleFragment}
`;

export const getStoreTimeZone = gql`
  query getStoreTimeZone {
    viewer {
      id
      store {
        id
        timezone
      }
    }
  }
`;
