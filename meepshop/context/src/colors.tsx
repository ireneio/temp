// import
import React from 'react';
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

  if (!data) return <Spin indicator={<Icon type="loading" spin />} />;

  const { selected = null, themes = null } = data.getColorList?.data?.[0] || {};
  const colors = themes?.[parseInt(selected || '0', 10)]?.colors || [];

  return (
    <ColorsContext.Provider value={colors as ColorsType}>
      {children}
    </ColorsContext.Provider>
  );
});

export default ColorsContext;
