// import
import React, { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

// graphql typescript
import { getColors as getColorsType } from '@meepshop/types/gqls/meepshop';

// graphql import
import { getColors } from './gqls/colors';

// typescript definition
export type ColorsType = string[];

// definition
const ColorsContext = React.createContext<ColorsType>([]);

export const ColorsProvider = React.memo(({ children }) => {
  const { data } = useQuery<getColorsType>(getColors);
  const colors = useMemo(() => {
    const { selected = null, themes = null } =
      data?.getColorList?.data?.[0] || {};

    return themes?.[parseInt(selected || '0', 10)]?.colors || [];
  }, [data]);

  if (!data) return <Spin indicator={<LoadingOutlined spin />} />;

  return (
    <ColorsContext.Provider value={colors as ColorsType}>
      {children}
    </ColorsContext.Provider>
  );
});

export default ColorsContext;
