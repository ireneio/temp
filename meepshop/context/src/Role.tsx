// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

// graphql typescript
import {
  getRole as getRoleType,
  ViewerTypeEnum,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { getRole } from './gqls/role';

// definition
const RoleContext = React.createContext<ViewerTypeEnum>(
  'GUEST' as ViewerTypeEnum,
);

export const RoleProvider = React.memo(({ children }) => {
  const { data } = useQuery<getRoleType>(getRole);
  const role = data?.viewer?.role;

  if (!role) return <Spin indicator={<LoadingOutlined spin />} />;

  return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>;
});

export default RoleContext;
