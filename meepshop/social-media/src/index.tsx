// import
import React from 'react';

import useIconStyle from './hooks/useIconStyle';
import useSocialMedias from './hooks/useSocialMedias';
import styles from './styles/index.less';

// graphql typescript
import { socialMediaFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default React.memo(
  ({
    justifyContent,
    socialMediaType,
    color,
    showFacebook,
    showLine,
    showTwitter,
    showWechat,
  }: socialMediaFragment) => {
    const iconStyle = useIconStyle(color, socialMediaType);
    const socialMedias = useSocialMedias(
      socialMediaType,
      showFacebook,
      showLine,
      showTwitter,
      showWechat,
    );

    return (
      <div className={`${styles.root} ${styles[justifyContent]}`}>
        {socialMedias.map(({ key, url, Icon }) => (
          <a key={key} target="_blank" rel="noopener noreferrer" href={url}>
            <Icon
              className={`${styles[key]} ${styles[socialMediaType]}`}
              style={iconStyle}
            />
          </a>
        ))}
      </div>
    );
  },
);
