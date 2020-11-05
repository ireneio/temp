declare module '@storybook/addon-links/react' {
  import React from 'react';

  const LinkTo: React.SFC<{ story: string; kind?: string }>;

  export default LinkTo;
}
