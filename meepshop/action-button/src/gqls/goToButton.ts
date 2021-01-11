// import
import gql from 'graphql-tag';

// definition
export const goToButtonFragment = gql`
  fragment goToButtonFragment on Page {
    id
    goToButton {
      isEnabled
      icon {
        ... on DefaultIcon {
          icon
        }

        ... on Image {
          id
          scaledSrc {
            w60
          }
        }
      }
      link {
        group {
          id
        }
        tracking {
          name
          category
        }
      }
    }
  }
`;
