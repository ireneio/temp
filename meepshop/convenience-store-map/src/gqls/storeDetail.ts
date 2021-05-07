// import
import gql from 'graphql-tag';

// definition
export const storeDetailFragment = gql`
  fragment storeDetailFragment on ConvenienceStore {
    type
    storeNumber
    famiServiceNumber
    name
    address
    phones
    ecpayStoreNumber
    ezshipStoreNumber
  }
`;
