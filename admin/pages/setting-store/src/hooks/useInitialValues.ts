// typescript import
import { FormInstance } from 'antd/lib/form';

import { ImageNodeType } from '@admin/media-gallery';

// import
import { useMemo, useEffect } from 'react';
import { usePrevious } from 'react-use';
import { areEqual } from 'fbjs';

// graphql typescript
import {
  useInitialValuesFragment as useInitialValuesFragmentType,
  StoreStatusEnum,
} from '@meepshop/types/gqls/admin';

// typescript definition
export interface ValuesType {
  locale: string | null;
  timezone: string | null;
  domain: [string | null];
  description: {
    name: string;
    introduction: string | null;
  };
  setting: {
    senderInfo: {
      name: string | null;
      phoneNumber: string | null;
      streetAddress: string | null;
    };
  };
  logoImage: ImageNodeType | null;
  mobileLogoImage: ImageNodeType | null;
  faviconImage: ImageNodeType | null;
  storeStatus: StoreStatusEnum;
}

// definition
export default (
  { resetFields }: FormInstance,
  store: useInitialValuesFragmentType | null,
): ValuesType | undefined => {
  const initialValues = useMemo(() => {
    if (!store) return undefined;

    return {
      locale: store.locale || null,
      timezone: store.timezone || null,
      domain: [store.domain?.[0] || null] as ValuesType['domain'],
      description: {
        name: store.description?.name || '', // SHOULD_NOT_BE_NULL
        introduction: store.description?.introduction || null,
      },
      setting: {
        senderInfo: {
          name: store.setting?.senderInfo?.name || null,
          phoneNumber: store.setting?.senderInfo?.phoneNumber || null,
          streetAddress: store.setting?.senderInfo?.streetAddress || null,
        },
      },
      logoImage: !store.logoImage?.scaledSrc
        ? null
        : {
            ...store.logoImage,
            __typename: 'Image' as const,
            scaledSrc: store.logoImage.scaledSrc,
          },
      mobileLogoImage: !store.mobileLogoImage?.scaledSrc
        ? null
        : {
            ...store.mobileLogoImage,
            __typename: 'Image' as const,
            scaledSrc: store.mobileLogoImage.scaledSrc,
          },
      faviconImage: !store.faviconImage?.scaledSrc
        ? null
        : {
            ...store.faviconImage,
            __typename: 'Image' as const,
            scaledSrc: store.faviconImage.scaledSrc,
          },
      storeStatus: store.metaData?.storeStatus || ('OPEN' as StoreStatusEnum), // SHOULD_NOT_BE_NULL
    };
  }, [store]);

  const prevInitialValues = usePrevious(initialValues);

  useEffect(() => {
    if (prevInitialValues && !areEqual(prevInitialValues, initialValues))
      resetFields();
  }, [resetFields, initialValues, prevInitialValues]);

  return initialValues;
};
