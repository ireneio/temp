import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { BackTop, Icon } from 'antd';

import { Colors as ColorsContext } from '@meepshop/context';

import './styles/backToTop.less';

const query = gql`
  query getBackToTopSetting {
    viewer {
      id
      store {
        id
        setting {
          backToTopButtonEnabled
        }
      }
    }
  }
`;

export default React.memo(() => {
  const colors = useContext(ColorsContext);
  const { data } = useQuery(query);
  const backToTopButtonEnabled =
    data?.viewer?.store?.setting.backToTopButtonEnabled || false;

  if (!backToTopButtonEnabled) return null;

  return (
    <BackTop
      visibilityHeight={typeof window === 'undefined' ? 0 : window.innerHeight}
      className="backToTop"
    >
      <Icon
        style={{
          background: colors[0],
          color: colors[3],
          boxShadow: `0 2px 10px 0 ${colors[3]}`,
        }}
        type="up"
      />
    </BackTop>
  );
});
