// import
import { gql } from '@apollo/client';

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
