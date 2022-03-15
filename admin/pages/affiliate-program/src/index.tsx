// typescript import
import { NextPage } from 'next';

import { PropsType as DetailPropsType } from './Detail';
import { PropsType as EditPropsType } from './Edit';

// import
import React from 'react';

// Use to copy mixin.less
import './styles/mixin.less';

import Detail from './Detail';
import Edit from './Edit';

// typescript definition
interface PropsType extends DetailPropsType, Omit<EditPropsType, 'type'> {
  namespacesRequired: string[];
  type?: EditPropsType['type'];
}

// definition
const AffiliateProgram: NextPage<PropsType> = React.memo(
  ({ affiliateProgramId, type }) =>
    !type ? (
      <Detail affiliateProgramId={affiliateProgramId} />
    ) : (
      <Edit affiliateProgramId={affiliateProgramId} type={type} />
    ),
);

AffiliateProgram.getInitialProps = async ({
  query: { affiliateProgramId, type },
}) => {
  // FIXME: should use get getServerSideProps return notFound
  if (typeof affiliateProgramId !== 'string')
    throw new Error('[FIXME] affiliateProgramId is undefined');

  // FIXME: should use get getServerSideProps return notFound
  if (type && type !== 'edit') throw new Error('[FIXME] type is not right');

  return {
    namespacesRequired: ['@meepshop/locales/namespacesRequired'],
    affiliateProgramId,
    type: (affiliateProgramId === 'add'
      ? 'add'
      : type) as EditPropsType['type'],
  };
};

export default AffiliateProgram;
