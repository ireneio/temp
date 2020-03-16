// import
import React from 'react';

// typescript definition
interface PropsType {
  isTrue: boolean;
  render: (
    children: React.ReactElement | React.ReactElement[] | undefined,
    props: {},
  ) => React.ReactElement;
  children: React.ReactElement | React.ReactElement[] | undefined;
}

// definition
export const switchRender = ({
  isTrue,
  render,
  children,
  ...props
}: PropsType): React.ReactElement | React.ReactElement[] | undefined =>
  isTrue ? render(children, props) : children;

export default React.memo((props: PropsType) => {
  const children = switchRender(props);

  if (!children) return null;

  if (children instanceof Array) return <>{children}</>;

  return children;
});
