// import
import React, { useContext } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import Link from '@meepshop/link';
import { adTrack as adTrackContext } from '@meepshop/context';

import useLink from './hooks/useLink';
import useImage from './hooks/useImage';
import styles from './styles/index.less';

// graphql typescript
import { imageFragment } from './__generated__/imageFragment';

// definition
export default React.memo(
  ({ image, link, width, justifyContent, alt }: imageFragment) => {
    const href = useLink(link);
    const { imageRef, imageURL, active, setActive, isClear, onLoad } = useImage(
      image,
    );
    const adTrack = useContext(adTrackContext);

    return (
      <div className={`${styles.root} ${styles[justifyContent]}`}>
        <Link
          href={href || ''}
          disabled={!href}
          target={link?.newWindow ? '_blank' : ''}
        >
          <div ref={imageRef} style={{ width: `${width}%` }}>
            <VisibilitySensor
              active={active}
              offset={{ bottom: -600 }}
              partialVisibility
              onChange={isVisible => {
                if (isVisible) setActive(false);
              }}
            >
              <img
                alt={alt}
                className={`
                  ${styles.image}
                  ${isClear ? '' : styles.blur}
                  ${!href ? '' : styles.link}
                  ${image?.id ? '' : styles.placeholder}
                `}
                src={imageURL}
                onLoad={() => onLoad()}
                onError={() => setActive(false)}
                onClick={() => {
                  if (link?.tracking)
                    adTrack.custom(
                      'meepShop_click',
                      link?.tracking?.name || '',
                      link?.tracking?.category || null,
                    );
                }}
              />
            </VisibilitySensor>
          </div>
        </Link>
      </div>
    );
  },
);
