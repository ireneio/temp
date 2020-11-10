// import
import gql from 'graphql-tag';

// definition
export const fetchSmartConversionModuleGAData = gql`
  mutation fetchSmartConversionModuleGAData($pageId: ID!) {
    fetchSmartConversionModuleGAData(pageId: $pageId) {
      status
      smartConversionModule {
        id
        status
        startAt
        endAt
        actualEndAt
        durationDays
        lastGAUpdatedAt
        pageTitle
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
      }
    }
  }
`;
