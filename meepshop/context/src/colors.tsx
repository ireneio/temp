// import
import React, { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Spin, Icon } from 'antd';

// graphql typescript
import { getColors } from './__generated__/getColors';

// typescript definition
export type ColorsType = string[];

// definition
const ColorsContext = React.createContext<ColorsType>([]);

const query = gql`
  query getColors {
    getColorList {
      data {
        id
        selected
        themes {
          id
          colors
        }
      }
    }
  }
`;

export const ColorsProvider = React.memo(({ children }) => {
  const { data } = useQuery<getColors>(query);
  const colors = useMemo(() => {
    const { selected = null, themes = null } =
      data?.getColorList?.data?.[0] || {};

    return themes?.[parseInt(selected || '0', 10)]?.colors || [];
  }, [data]);

  if (!data) return <Spin indicator={<Icon type="loading" spin />} />;

  return (
    <ColorsContext.Provider value={colors as ColorsType}>
      {children}
    </ColorsContext.Provider>
  );
});

export default ColorsContext;
