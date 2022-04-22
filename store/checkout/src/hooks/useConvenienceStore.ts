// import
import { useMemo } from 'react';
import { useQuery } from '@apollo/client';

// graphql typescript
import {
  ConvenienceStoreShipmentTypeEnum as ConvenienceStoreShipmentTypeEnumType,
  ConvenienceStoreTypeEnum as ConvenienceStoreTypeEnumType,
  useConvenienceStoreFragment as useConvenienceStoreFragmentType,
  getEcpayShipmentInfo as getEcpayShipmentInfoType,
  getEcpayShipmentInfoVariables as getEcpayShipmentInfoVariablesType,
} from '@meepshop/types/gqls/store';

// graphql import
import { getEcpayShipmentInfo } from '../gqls/useConvenienceStore';

// typescript definition
interface ReturnType {
  shipmentType: ConvenienceStoreShipmentTypeEnumType;
  storeTypes: ConvenienceStoreTypeEnumType[];
}

// definition
export default (
  shipment: useConvenienceStoreFragmentType | null,
): ReturnType => {
  const { data } = useQuery<
    getEcpayShipmentInfoType,
    getEcpayShipmentInfoVariablesType
  >(getEcpayShipmentInfo, {
    skip: !shipment?.id,
    variables: { storeShipmentId: shipment?.id || '' },
  });

  const ecpayLogisticsSubType =
    data?.viewer?.store?.storeShipment?.accountInfo?.allpay?.logisticsSubType ||
    '';

  return {
    shipmentType: useMemo(() => {
      switch (shipment?.template) {
        case 'allpay':
          if (/C2C/.test(ecpayLogisticsSubType))
            return 'ECPAY_C2C' as ConvenienceStoreShipmentTypeEnumType;
          return 'ECPAY_B2C' as ConvenienceStoreShipmentTypeEnumType;
        case 'ezship':
          return 'EZSHIP' as ConvenienceStoreShipmentTypeEnumType;
        case 'presco':
          return 'ECPAY_B2C' as ConvenienceStoreShipmentTypeEnumType;
        default:
          return 'ECPAY' as ConvenienceStoreShipmentTypeEnumType;
      }
    }, [shipment, ecpayLogisticsSubType]),
    storeTypes: useMemo(() => {
      switch (shipment?.template) {
        case 'allpay':
          if (/UNIMART/.test(ecpayLogisticsSubType))
            return ['UNIMART'] as ConvenienceStoreTypeEnumType[];
          if (/FAMI/.test(ecpayLogisticsSubType))
            return ['FAMI'] as ConvenienceStoreTypeEnumType[];
          if (/HILIFE/.test(ecpayLogisticsSubType))
            return ['HILIFE'] as ConvenienceStoreTypeEnumType[];
          return [];
        case 'ezship':
          return ['FAMI', 'HILIFE', 'OK'] as ConvenienceStoreTypeEnumType[];
        case 'presco':
          return ['UNIMART'] as ConvenienceStoreTypeEnumType[];
        default:
          return ['UNIMART'] as ConvenienceStoreTypeEnumType[];
      }
    }, [shipment, ecpayLogisticsSubType]),
  };
};
