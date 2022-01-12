// import
import React, { useContext } from 'react';

import * as icons from '@meepshop/utils/lib/icons';
import { Colors as ColorsContext } from '@meepshop/context';

import useGoToButton from './hooks/useGoToButton';
import styles from './styles/goToButton.less';

// graphql typescript
import { goToButtonFragment_goToButton as goToButtonFragmentGoToButton } from '@meepshop/types/gqls/meepshop';

// typescript definition
export interface PropsType {
  goToButton: goToButtonFragmentGoToButton | null;
}

// definition
export default React.memo(({ goToButton }: PropsType) => {
  const colors = useContext(ColorsContext);
  const goTo = useGoToButton(goToButton);

  if (!goToButton?.isEnabled) return null;

  const DefaultIcon =
    goToButton.icon?.__typename !== 'DefaultIcon'
      ? () => null
      : icons[goToButton.icon.icon];

  return (
    <div
      className={styles.root}
      style={{
        background: colors[4],
        boxShadow: `0 2px 10px 0 ${colors[3]}`,
      }}
      onClick={() => goTo()}
    >
      {goToButton.icon?.__typename !== 'DefaultIcon' ? null : (
        <DefaultIcon className={styles.icon} style={{ fill: colors[3] }} />
      )}

      {goToButton.icon?.__typename !== 'Image' ? null : (
        <img
          className={styles.icon}
          src={goToButton.icon.scaledSrc?.w60 || ''}
          alt={goToButton.icon.id}
        />
      )}
    </div>
  );
});
