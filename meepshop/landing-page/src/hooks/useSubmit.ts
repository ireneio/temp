// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';
import { MutationFunction } from '@apollo/react-common';

import { UseComputeOrderType } from './useComputeOrder';

// import
import React, { useCallback, useContext } from 'react';
import uuid from 'uuid/v4';
import { notification } from 'antd';
import { filter } from 'graphql-anywhere';

import FormDataContext from '@meepshop/form-data';
import useLink from '@meepshop/hooks/lib/useLink';
import { useRouter } from '@meepshop/link';
import { useTranslation } from '@meepshop/utils/lib/i18n';
import { AdTrack as AdTrackContext } from '@meepshop/context';

// graphql typescript
import {
  landingPageLandingPageModuleFragment,
  landingPageLandingPageModuleFragment_product as landingPageLandingPageModuleFragmentProduct,
  landingPageLandingPageModuleFragment_redirectPage as landingPageLandingPageModuleFragmentRedirectPage,
} from '../gqls/__generated__/landingPageLandingPageModuleFragment';
import {
  createOrderInLandingPage as createOrderInLandingPageType,
  createOrderInLandingPageVariables,
} from '../gqls/__generated__/createOrderInLandingPage';
import { useSubmitFragment } from '../gqls/__generated__/useSubmitFragment';
import {
  InvoiceMethodEnum,
  SourcePageTypeEnum,
} from '../../../../__generated__/meepshop';

// graphql import
import { useLinkFragment } from '@meepshop/hooks/lib/gqls/useLink';

// graphql definition
interface PropsType {
  viewer: landingPageLandingPageModuleFragment['viewer'];
  product: landingPageLandingPageModuleFragmentProduct | null;
  redirectPage: landingPageLandingPageModuleFragmentRedirectPage | null;
  form: FormComponentProps['form'];
  createOrderInLandingPage: MutationFunction<
    createOrderInLandingPageType,
    createOrderInLandingPageVariables
  >;
  isCreatingOrder: boolean;
  order: useSubmitFragment | null;
  payment: UseComputeOrderType['payment'];
}

// definition
export default ({
  viewer,
  product,
  redirectPage,
  form,
  createOrderInLandingPage,
  isCreatingOrder,
  order,
  payment,
}: PropsType): ((e: React.FormEvent<HTMLFormElement>) => void) => {
  const { t } = useTranslation('landing-page');
  const { domain, pathname, push } = useRouter();
  const adTrack = useContext(AdTrackContext);
  const setFormData = useContext(FormDataContext);
  const { href } = useLink(filter(useLinkFragment, redirectPage));
  const { validateFields } = form;

  return useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
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
          if (!err) {
            if (isCreatingOrder) return;

            const [variantId] = variant.slice(-1);
            const { data, errors } = await createOrderInLandingPage({
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
                              gmo: {
                                isRememberCard,
                                cardHolderName,
                                cardNumber: cardNumber?.join(''),
                                securityCode,
                                expireYear: expire?.format('YYYY'),
                                expireMonth: expire?.format('M'),
                                ...(!installmentCode
                                  ? {}
                                  : {
                                      installmentCode:
                                        installmentCode instanceof Array
                                          ? installmentCode[
                                              installmentCode.length - 1
                                            ]
                                          : installmentCode,
                                    }),
                              },
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
            } else {
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

              if (formData) {
                setFormData(formData);
                return;
              }

              if (pathname === href) window.scrollTo(0, 0);
              else push(href || '/');
            }
          }
        },
      );
    },
    [
      adTrack,
      createOrderInLandingPage,
      domain,
      href,
      isCreatingOrder,
      order,
      pathname,
      payment,
      product,
      push,
      t,
      viewer,
      validateFields,
      setFormData,
    ],
  );
};
