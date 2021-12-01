// typescript import
import {
  ConvenienceStoreTypeEnum as ConvenienceStoreTypeEnumType,
  ConvenienceStoreShipmentTypeEnum as ConvenienceStoreShipmentTypeEnumType,
} from '@meepshop/types/gqls/meepshop';

// definition
export interface ConvenienceStorePropsType {
  shipmentType: ConvenienceStoreShipmentTypeEnumType;
  storeTypes: ConvenienceStoreTypeEnumType[];
  confirmStore: (store: {}) => void;
}
