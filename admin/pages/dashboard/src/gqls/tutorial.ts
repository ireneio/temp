// import
import gql from 'graphql-tag';

// definition
export const tutorialSettingObjectTypeFragment = gql`
  fragment tutorialSettingObjectTypeFragment on SettingObjectType {
    isTutorialEnabled
  }
`;

export const tutorialStoreFragment = gql`
  fragment tutorialStoreFragment on Store {
    id
    setting {
      isTutorialEnabled
    }
  }
`;

export const adminSetIsTutorialEnabled = gql`
  mutation adminSetIsTutorialEnabled($input: SetIsTutorialEnabledInput!) {
    setIsTutorialEnabled(input: $input) {
      success
    }
  }
`;
