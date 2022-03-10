// typescript import
import { NextPage } from 'next';

import { PropsType as EditPropsType } from './Edit';

// import
import React from 'react';

import Edit from './Edit';

// typescript definition
interface PropsType extends EditPropsType {
  namespacesRequired: string[];
}

// definition
const AffiliateProgram: NextPage<PropsType> = React.memo(
  ({ affiliateProgramId, type }) =>
    // TODO: detail page
    !['add', 'edit'].includes(type) ? null : (
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
  if (typeof type !== 'string' || !['add', 'edit'].includes(type))
    throw new Error('[FIXME] type is not right');

  return {
    namespacesRequired: ['@meepshop/locales/namespacesRequired'],
    affiliateProgramId,
    type: type as EditPropsType['type'],
  };
};

export default AffiliateProgram;
