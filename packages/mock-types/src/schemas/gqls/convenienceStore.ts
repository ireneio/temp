// import
import gql from 'graphql-tag';

// definition
export const convenienceStoreMockFragment = gql`
  fragment convenienceStoreMockFragment on ConvenienceStore {
    storeNumber
    famiServiceNumber
    name
    address
    phones
    ecpayStoreNumber
    ezshipStoreNumber
  }
`;
