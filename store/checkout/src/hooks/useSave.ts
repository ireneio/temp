// import
import { useCallback, useRef, useState, useContext } from 'react';
import uuid from 'uuid/v4';
import { notification, Modal } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
import { formatGmo } from '@meepshop/gmo-credit-card-form';
import FormDataContext from '@meepshop/form-data';
import filter from '@meepshop/utils/lib/filter';

import useFirstPurchase from './useFirstPurchase';
import useCreateOrder from './useCreateOrder';
import useUpdateUser from './useUpdateUser';

// graphql typescript
import {
  useSaveUserFragment as useSaveUserFragmentType,
  ConvenienceStoreTypeEnum as ConvenienceStoreTypeEnumType,
  InvoiceMethodEnum as InvoiceMethodEnumType,
  InvoiceTypeEnum as InvoiceTypeEnumType,
  EInvoiceCarrierTypeEnum as EInvoiceCarrierTypeEnumType,
} from '@meepshop/types/gqls/store';

// graphql import
import { useCreateOrderFragment } from '../gqls/useCreateOrder';
import { useUpdateUserFragment } from '../gqls/useUpdateUser';

// typescript definition
interface PropsType {
  isLogin: boolean;
  computeOrderListLoading: boolean;
  viewer: useSaveUserFragmentType | null;
}

export interface ValuesType {
  userEmail: string;
  userPassword: string;
  isPayment: boolean;
  products: {
    type: string;
    productId: string;
    variantId: string;
    quantity: number;
  }[];
  coupon: string;
  points: number;
  addressAndZipCode: {
    zipCode: string;
    address: string[];
  };
  street: string;
  paymentId: string;
  payment: {
    template: string;
    accountInfo: {
      gmo: {
        paymentType: string;
      };
    };
  };
  isRememberCard: boolean;
  cardHolderName: string;
  cardNumber: string;
  expire: string;
  securityCode: string;
  installmentCode: string[] | string;
  shipment: {
    id: string;
  };
  isSaveAsReceiverTemplate: boolean;
  name: string;
  mobile: string;
  notes: string;
  CVSStoreID: string;
  CVSStoreName: string;
  CVSAddress: string;
  cvsType: ConvenienceStoreTypeEnumType;
  cvsCode: string;
  userName: string;
  userMobile: string;
  invoice: [
    InvoiceTypeEnumType,
    EInvoiceCarrierTypeEnumType | InvoiceMethodEnumType,
  ];
  invoiceEInvoiceNumber: string;
  invoiceAddress: string;
  invoiceTitle: string;
  invoiceVAT: string;
  invoiceDonate: string;
  userAddressAndZipCode: {
    zipCode: string;
    address: string[];
  };
  userStreet: string;
}

// definition
export default ({
  isLogin,
  computeOrderListLoading,
  viewer,
}: PropsType): {
  loading: boolean;
  save: (values: ValuesType) => void;
} => {
  const { t } = useTranslation('checkout');
  const { domain, push } = useRouter();
  const setFormData = useContext(FormDataContext);
  const firstPurchase = useFirstPurchase();
  const createOrder = useCreateOrder(filter(useCreateOrderFragment, viewer));
  const updateUser = useUpdateUser(filter(useUpdateUserFragment, viewer));
  const idempotentKeyRef = useRef(uuid());
  const [loading, setLoading] = useState<boolean>(false);
  const clearSession = useCallback(() => {
    if (typeof window !== 'undefined') window.sessionStorage.clear();
  }, []);

  return {
    loading,
    save: useCallback(
      async values => {
        if (computeOrderListLoading || loading) return;

        setLoading(true);

        const {
          userEmail,
          userPassword,
          isPayment,
          products,
          coupon,
          points,
          addressAndZipCode,
          street,
          paymentId,
          payment,
          isRememberCard,
          cardHolderName,
          cardNumber,
          securityCode,
          expire,
          installmentCode,
          shipment,
          isSaveAsReceiverTemplate,
          name,
          mobile,
          notes,
          CVSStoreID,
          CVSStoreName,
          CVSAddress,
          cvsType,
          cvsCode,
          userName,
          userMobile,
          invoice,
          invoiceEInvoiceNumber,
          invoiceAddress,
          invoiceTitle,
          invoiceVAT,
          invoiceDonate,
          userAddressAndZipCode,
          userStreet,
        } = values;

        if (!isLogin && userEmail && userPassword) {
          const firstPurchaseSuccess = await firstPurchase({
            userEmail,
            userPassword,
          });

          if (!firstPurchaseSuccess) return;
        }

        const { data, errors } = await createOrder({
          variables: {
            input: {
              idempotentKey: idempotentKeyRef.current,
              environment: {
                domain,
              },
              isPayment,
              products,
              coupon,
              points,
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
              payment: {
                paymentId,
                redirectUrl: ['allpay', 'ecpay2'].includes(payment.template)
                  ? `https://${domain}/api/redirect/checkout/thank-you-page/[orderId]`
                  : `https://${domain}/checkout/thank-you-page/[orderId]`,
                ...(payment.template !== 'gmo' ||
                payment.accountInfo.gmo.paymentType !== 'Credit'
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
              shipment: {
                shipmentId: shipment.id,
                recipient: {
                  saveRecipient: isSaveAsReceiverTemplate,
                  name,
                  email: userEmail || viewer?.email,
                  mobile,
                  comment: notes,
                  receiverStoreID: CVSStoreID,
                  receiverStoreName: CVSStoreName,
                  receiverStoreAddress: CVSAddress,
                },
              },
              cvsType,
              cvsCode,
              userInfo: {
                name: userName || viewer?.name,
                email: userEmail || viewer?.email,
                mobile: userMobile || viewer?.additionalInfo?.mobile,
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
                            method: 'CARRIER' as InvoiceMethodEnumType,
                            carrier: {
                              type: invoice[1],
                              code: invoiceEInvoiceNumber,
                            },
                          }
                        : {
                            method: invoice[1] as InvoiceMethodEnumType,
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
          },
        });

        const {
          id,
          error: createOrderError,
          formData,
          paymentServiceTradeToken,
        } = data?.createOrder.order || {};

        if (errors || createOrderError || !id) {
          const errorMessage = errors?.[0]?.message || createOrderError || '';

          idempotentKeyRef.current = uuid();

          setLoading(false);

          if (
            [
              'DISCONTINUED',
              'NOT_AVAILABLE',
              'OUT_OF_STOCK',
              'LIMIT_EXCEEDED',
              'MINIMUM_NOT_REACHED',
              'EXCEED_LIMIT_PER_ORDER',
            ].includes(errorMessage)
          ) {
            Modal.warning({
              title: t('products-error'),
              content: t('choose-products'),
              okText: t('go-back-to-cart'),
              onOk: () => push('/cart'),
            });

            return;
          }

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

        await updateUser({
          userName,
          userMobile,
          userAddressAndZipCode,
          userStreet,
        });

        if (formData?.url) {
          if (!formData.url?.startsWith('line')) {
            setFormData(formData);
            clearSession();
            return;
          }

          // hack for linepay in mobile devices
          window.location.href = formData.url;
        }

        // ecpay 2.0
        if (paymentServiceTradeToken) {
          await push(`/ecpay/${paymentServiceTradeToken}/${id}`);
          clearSession();
          return;
        }

        await push(`/checkout/thank-you-page/${id}`);
        clearSession();
      },
      [
        t,
        push,
        isLogin,
        firstPurchase,
        createOrder,
        updateUser,
        domain,
        viewer,
        computeOrderListLoading,
        loading,
        setFormData,
        clearSession,
      ],
    ),
  };
};
