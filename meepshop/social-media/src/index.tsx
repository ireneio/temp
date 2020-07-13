// import
import React from 'react';

import { useRouter } from '@meepshop/link';

import useSocialMedias from './hooks/useSocialMedias';

import styles from './styles/index.less';

// graphql typescript
import { socialMediaFragment } from './__generated__/socialMediaFragment';

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
    const { domain, pathname } = useRouter();
    const url = `https://${domain}/${pathname}`;
    const socialMedias = useSocialMedias(
      socialMediaType,
      color,
      showFacebook,
      showLine,
      showTwitter,
      showWechat,
      url,
    );

    return (
      <div className={`${styles.root} ${styles[justifyContent]}`}>
        {socialMedias.map(socialMedia => (
          <a
            key={socialMedia?.key}
            target="_blank"
            rel="noopener noreferrer"
            href={socialMedia?.url}
          >
            {socialMedia?.icon}
          </a>
        ))}
      </div>
    );
  },
);
