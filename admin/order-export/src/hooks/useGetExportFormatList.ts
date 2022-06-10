// import
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';

// graphql typescript
import {
  getExportFormatList as getExportFormatListType,
  getExportFormatListVariables as getExportFormatListVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getExportFormatList } from '../gqls/useGetExportFormatList';

// typescript definition
interface ReturnType {
  id: string;
  name: string | null;
}

// definition
export default (): ReturnType[] => {
  const { data } = useQuery<
    getExportFormatListType,
    getExportFormatListVariablesType
  >(getExportFormatList, {
    variables: {
      search: {
        filter: {
          or: [
            {
              type: 'exact',
              field: 'type',
              query: 'order_custom',
            },
            {
              type: 'exact',
              field: 'type',
              query: 'order_system_default',
            },
          ],
        },
      },
    },
  });

  return useMemo(() => {
    return [
      ...(data?.orderDefaultExportFormats || []),
      { id: 'ECPAY_ORDER', name: '綠界超取訂單上傳格式' },
      { id: 'TCAT_ORDER', name: '黑貓託運訂單上傳格式' },
      ...(data?.getExportFormatList?.data || []),
    ].map(list => ({
      id: list?.id || 'none-id' /** SHOULD_NOT_BE_NULL */,
      name: list?.name || '',
    }));
  }, [data]);
};
