// import
import React from 'react';

import styles from './styles/index.less';

// graphql typescript
import { dividerFragment } from './fragments/__generated__/dividerFragment';

// definition
export default React.memo(
  ({
    id,
    width,
    height,
    justifyContent,
    borderRadius,
    background,
  }: dividerFragment) => (
    <div
      id={`divider-${id}`}
      className={`${styles.root} ${styles[justifyContent]}`}
    >
      <div
        style={{
          background: background || 'transparent',
          width: `${width}%`,
          borderRadius,
        }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            #divider-${id} > div {
              height: ${height}px;
            }

            @media (max-width: ${styles.screenSmMax}) {
              #divider-${id} > div {
                height: ${height / 2}px;
              }
            }
          `,
        }}
      />
    </div>
  ),
);
