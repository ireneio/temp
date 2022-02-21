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
export default (shipment: useConvenienceStoreFragmentType): ReturnType => {
  const { data } = useQuery<
    getEcpayShipmentInfoType,
    getEcpayShipmentInfoVariablesType
  >(getEcpayShipmentInfo, {
    skip: !shipment?.shipmentId,
    variables: { storeShipmentId: shipment?.shipmentId || '' },
  });

  const ecpayLogisticsSubType =
    data?.viewer?.store?.storeShipment?.accountInfo?.allpay?.logisticsSubType ||
    '';

  return {
    shipmentType: useMemo(() => {
      if (shipment?.template) {
        if (/C2C/.test(ecpayLogisticsSubType))
          return 'ECPAY_C2C' as ConvenienceStoreShipmentTypeEnumType;
        return 'ECPAY_B2C' as ConvenienceStoreShipmentTypeEnumType;
      }

      return 'EZSHIP' as ConvenienceStoreShipmentTypeEnumType;
    }, [shipment, ecpayLogisticsSubType]),
    storeTypes: useMemo(() => {
      if (shipment?.template) {
        if (/UNIMART/.test(ecpayLogisticsSubType))
          return ['UNIMART'] as ConvenienceStoreTypeEnumType[];
        if (/FAMI/.test(ecpayLogisticsSubType))
          return ['FAMI'] as ConvenienceStoreTypeEnumType[];
        if (/HILIFE/.test(ecpayLogisticsSubType))
          return ['HILIFE'] as ConvenienceStoreTypeEnumType[];
      }

      return ['FAMI', 'HILIFE', 'OK'] as ConvenienceStoreTypeEnumType[];
    }, [shipment, ecpayLogisticsSubType]),
  };
};
