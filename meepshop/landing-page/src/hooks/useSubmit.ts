// typescript import
import { FormComponentProps } from '@ant-design/compatible/lib/form/Form';

import { UseComputeOrderType } from './useComputeOrder';

// import
import React, { useCallback, useContext } from 'react';
import uuid from 'uuid/v4';
import { notification } from 'antd';
import { filter } from 'graphql-anywhere';

import FormDataContext from '@meepshop/form-data';
import useLink from '@meepshop/hooks/lib/useLink';
import { useValidateEmail } from '@meepshop/validator';
import { useRouter } from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';
import { AdTrack as AdTrackContext } from '@meepshop/context';
import { formatGmo } from '@meepshop/gmo-credit-card-form';

import useCreateOrder from './useCreateOrder';

// graphql typescript
import {
  useSubmitOrderFragment,
  useSubmitLandingPageModuleFragment,
  InvoiceMethodEnum,
  SourcePageTypeEnum,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { useLinkFragment } from '@meepshop/hooks/lib/gqls/useLink';

import { useCreateOrderFragment } from '../gqls/useCreateOrder';

// graphql definition
interface SubmitArguType {
  landingPageModule: useSubmitLandingPageModuleFragment;
  order: useSubmitOrderFragment | null;
  payment: UseComputeOrderType['payment'];
  form: FormComponentProps['form'];
  setShowLogin: (showLogin: boolean) => void;
}

interface SubmitReturnType {
  loading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

// definition
export default ({
  landingPageModule: { product, redirectPage, viewer },
  order,
  payment,
  form,
  setShowLogin,
}: SubmitArguType): SubmitReturnType => {
  const [mutation, { loading, client }] = useCreateOrder(
    filter(useCreateOrderFragment, viewer),
  );
  const { t } = useTranslation('landing-page');
  const router = useRouter();
  const adTrack = useContext(AdTrackContext);
  const setFormData = useContext(FormDataContext);
  const { href } = useLink(filter(useLinkFragment, redirectPage));
  const validateEmail = useValidateEmail(message => {
    setShowLogin(true);

    return message;
  });

  return {
    loading,
    onSubmit: useCallback(
      (e: React.FormEvent<HTMLFormElement>): void => {
        const { validateFields, resetFields } = form;

        e.preventDefault();
        validateFields(
          async (
            err,
            {
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
            },
          ) => {
            const validateEmailResult = await new Promise(resolve =>
              validateEmail.validator?.({}, userEmail, resolve),
            );

            if (err || loading || validateEmailResult) return;

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
              const errorMessage =
                errors?.[0]?.message || createOrderError || '';

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
        );
      },
      [
        viewer,
        product,
        form,
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
        validateEmail,
      ],
    ),
  };
};
