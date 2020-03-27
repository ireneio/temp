// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';

import useAddRecipientAddress from './useAddRecipientAddress';
import useUpdateRecipientAddress from './useUpdateRecipientAddress';

// definition
export default (
  validateFields: FormComponentProps['form']['validateFields'],
  id: string | undefined,
  cancel: () => void,
): ((e: React.FormEvent<HTMLElement>) => void) => {
  const addRecipientAddress = useAddRecipientAddress();
  const updateRecipientAddress = useUpdateRecipientAddress();

  return useCallback(
    (e: React.FormEvent<HTMLElement>) => {
      validateFields(
        (
          err,
          { name, mobile, addressAndZipCode: { address, zipCode }, street },
        ) => {
          e.preventDefault();

          if (err) return;

          const input = {
            name,
            mobile,
            countryId: address[0],
            cityId: address[1],
            areaId: address[2],
            street,
            zipCode,
          };

          if (!id)
            addRecipientAddress({
              variables: {
                input,
              },
            });
          else
            updateRecipientAddress({
              variables: {
                input: {
                  ...input,
                  id,
                },
              },
            }).then(() => cancel());
        },
      );
    },
    [validateFields, id, cancel, addRecipientAddress, updateRecipientAddress],
  );
};
