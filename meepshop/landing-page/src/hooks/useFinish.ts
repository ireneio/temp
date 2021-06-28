// typescript import
import { FormInstance } from 'antd/lib/form';

import { UseComputeOrderType } from './useComputeOrder';

// import
import { useCallback, useContext } from 'react';
import uuid from 'uuid/v4';
import { notification } from 'antd';
import { filter } from 'graphql-anywhere';

import FormDataContext from '@meepshop/form-data';
import useLink from '@meepshop/hooks/lib/useLink';
import { useRouter } from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';
import { AdTrack as AdTrackContext } from '@meepshop/context';
import { formatGmo } from '@meepshop/gmo-credit-card-form';

import useCreateOrder from './useCreateOrder';

// graphql typescript
import {
  useFinishOrderFragment,
  useFinishLandingPageModuleFragment,
  InvoiceMethodEnum,
  SourcePageTypeEnum,
  ConvenienceStoreTypeEnum,
  InvoiceTypeEnum,
  EInvoiceCarrierTypeEnum,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { useLinkFragment } from '@meepshop/hooks/lib/gqls/useLink';

import { useCreateOrderFragment } from '../gqls/useCreateOrder';

// graphql definition
interface FinishOptionsType {
  landingPageModule: useFinishLandingPageModuleFragment;
  order: useFinishOrderFragment | null;
  payment: UseComputeOrderType['payment'];
  form: FormInstance;
}

interface ValuesType {
  quantity: number;
  variant: string[];

  paymentId: string;
  shipmentId: string;
  coupon: string;

  userEmail: string;
  userName: string;
  userMobile: string;

  name: string;
  mobile: string;
  notes: string;

  // convenience-store or address
  addressAndZipCode: {
    address: string[];
    zipCode: string;
  };
  street: string;
  CVSStoreID: string;
  CVSStoreName: string;
  CVSAddress: string;
  cvsType: ConvenienceStoreTypeEnum;
  cvsCode: string;

  // invoice
  invoice: [InvoiceTypeEnum, EInvoiceCarrierTypeEnum];
  invoiceTitle: string;
  invoiceVAT: string;
  invoiceAddress: string;
  invoiceEInvoiceNumber: string;
  invoiceDonate: string;

  // gmo payment
  isRememberCard: boolean;
  cardHolderName: string;
  cardNumber: string;
  securityCode: string;
  expire: string;
  installmentCode: string;
}

// definition
export default ({
  landingPageModule: { product, redirectPage, viewer },
  order,
  payment,
  form: { resetFields },
}: FinishOptionsType): {
  loading: boolean;
  onFinish: (values: ValuesType) => void;
} => {
  const [mutation, { loading, client }] = useCreateOrder(
    filter(useCreateOrderFragment, viewer),
  );
  const { t } = useTranslation('landing-page');
  const router = useRouter();
  const adTrack = useContext(AdTrackContext);
  const setFormData = useContext(FormDataContext);
  const { href } = useLink(filter(useLinkFragment, redirectPage));

  return {
    loading,
    onFinish: useCallback(
      async ({
        quantity = 1,
        variant,

        paymentId,
        shipmentId,
        coupon,

        userEmail,
        userName,
        userMobile,

        name,
        mobile,
        notes,

        // convenience-store or address
        addressAndZipCode,
        street,
        CVSStoreID,
        CVSStoreName,
        CVSAddress,
        cvsType,
        cvsCode,

        // invoice
        invoice,
        invoiceTitle,
        invoiceVAT,
        invoiceAddress,
        invoiceEInvoiceNumber,
        invoiceDonate,

        // gmo payment
        isRememberCard,
        cardHolderName,
        cardNumber,
        securityCode,
        expire,
        installmentCode,
      }) => {
        if (loading) return;

        const { domain, asPath, push } = router;
        const [variantId] = variant.slice(-1);
        const { data, errors } = await mutation({
          variables: {
            createOrderList: [
              {
                idempotentKey: uuid(),
                environment: {
                  domain,
                  sourcePage: 'lp' as SourcePageTypeEnum,
                },
                isPayment: true,
                products: [
                  {
                    productId: product?.id,
                    variantId,
                    quantity,
                  },
                ],
                coupon,
                ...(!addressAndZipCode
                  ? {}
                  : {
                      address: {
                        zipCode: addressAndZipCode.zipCode,
                        countryId: addressAndZipCode.address[0],
                        cityId: addressAndZipCode.address[1],
                        areaId: addressAndZipCode.address[2],
                        street,
                      },
                    }),
                payments: [
                  {
                    paymentId,
                    ...(!href
                      ? {}
                      : {
                          redirectUrl: `https://${domain}${href}`,
                        }),
                    ...(payment?.template !== 'gmo' ||
                    payment.accountInfo?.gmo?.paymentType !== 'Credit'
                      ? {}
                      : {
                          gmo: formatGmo({
                            isRememberCard,
                            cardHolderName,
                            cardNumber,
                            securityCode,
                            expire,
                            installmentCode,
                          }),
                        }),
                  },
                ],
                shipments: [
                  {
                    shipmentId,
                    recipient: {
                      name,
                      email: userEmail || viewer?.email,
                      mobile,
                      comment: notes,
                      receiverStoreID: CVSStoreID,
                      receiverStoreName: CVSStoreName,
                      receiverStoreAddress: CVSAddress,
                    },
                  },
                ],
                cvsType,
                cvsCode,
                userId: viewer?.id,
                userInfo: {
                  name: userName || name,
                  email: userEmail || viewer?.email,
                  mobile: userMobile || mobile,
                },
                ...(!invoice
                  ? {}
                  : {
                      invoice: {
                        type: invoice[0],
                        ...(invoice[1] === 'MEMBERSHIP' ||
                        invoice[1] === 'MOBILE_BARCODE' ||
                        invoice[1] === 'CITIZEN_DIGITAL_CERTIFICATE'
                          ? {
                              method: 'CARRIER' as InvoiceMethodEnum,
                              carrier: {
                                type: invoice[1],
                                code: invoiceEInvoiceNumber,
                              },
                            }
                          : {
                              method: invoice[1],
                            }),

                        // method = TRIPLICATE
                        address: invoiceAddress,
                        title: invoiceTitle,
                        ban: invoiceVAT,

                        // method = DONATION
                        loveCode: invoiceDonate,
                      },
                    }),
              },
            ],
          },
        });

        const { id, orderNo, error: createOrderError, formData } =
          data?.createOrderList?.[0] || {};

        if (errors || createOrderError || !id) {
          const errorMessage = errors?.[0]?.message || createOrderError || '';

          notification.error({
            message: t('pay-fail'),
            description: /(<st_code>|七天後關|門市不存在|門市關轉店或為外島|取貨門市店代碼)/.test(
              errorMessage,
            )
              ? '原取件門市暫停服務，請重新選擇！'
              : errorMessage,
          });
          return;
        }

        notification.success({
          message: t('pay-success'),
        });

        // SHOULD_NOT_BE_NULL
        adTrack.purchase({
          orderNo: orderNo || '',
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          products: order?.categories?.[0]?.products,
          total: order?.priceInfo?.total || 0,
          currency: order?.priceInfo?.currency || '',
          shipmentFee: order?.priceInfo?.shipmentFee || 0,
          paymentFee: order?.priceInfo?.paymentFee || 0,
        });

        if (formData?.url) {
          if (!formData.url?.startsWith('line')) {
            if (client) client.stop();

            setFormData(formData);
            return;
          }

          // hack for linepay in mobile devices
          push(formData.url);
        }

        if (asPath === href) {
          window.scrollTo(0, 0);
          resetFields();
        } else push(href || '/');
      },
      [
        viewer,
        product,
        resetFields,
        order,
        payment,
        mutation,
        loading,
        client,
        t,
        router,
        adTrack,
        setFormData,
        href,
      ],
    ),
  };
};
