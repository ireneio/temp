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

export const requestFetchSmartConversionModuleGAData = gql`
  mutation requestFetchSmartConversionModuleGAData($pageId: ID!) {
    requestFetchSmartConversionModuleGAData(pageId: $pageId) {
      status
      queryId
    }
  }
`;

export const smartConversionModuleProcessorService = gql`
  query smartConversionModuleProcessorService($pageId: ID!, $queryId: ID!) {
    smartConversionModuleProcessorService(
      input: { pageId: $pageId, queryId: $queryId }
    ) {
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
        timezone
        page(input: { pageId: $pageId }) {
          id
          smartConversionModule {
            ...useSmartConversionModuleFragment
          }
        }
      }
    }
  }

  ${useSmartConversionModuleFragment}
`;
