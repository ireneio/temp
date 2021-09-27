// import
import React from 'react';
import { filter } from 'graphql-anywhere';
import VisibilitySensor from 'react-visibility-sensor';

import Link from '@meepshop/link';
import useLink from '@meepshop/hooks/lib/useLink';

import useImage from './hooks/useImage';
import styles from './styles/index.less';

// graphql typescript
import { imageFragment } from '@meepshop/types/gqls/meepshop';

// graphql import
import { useLinkFragment } from '@meepshop/hooks/lib/gqls/useLink';

import { useImageImageFragment } from './gqls/useImage';

// typescript definition
interface PropsType extends imageFragment {
  children?: React.ReactElement;
}

// definition
export default React.memo(
  ({ id, image, link, width, justifyContent, alt, children }: PropsType) => {
    const { href, setAdTrack } = useLink(filter(useLinkFragment, link));
    const {
      imageRef,
      imageURL,
      active,
      setActive,
      isClear,
      isPlaceholder,
      onLoad,
    } = useImage(filter(useImageImageFragment, image));

    return (
      <div id={id} className={`${styles.root} ${styles[justifyContent]}`}>
        <Link
          href={href || ''}
          disabled={!href}
          target={link?.newWindow ? '_blank' : ''}
        >
          <div
            ref={imageRef}
            className={`${styles.wrapper} ${!href ? '' : styles.link}`}
            style={{ width: `${width}%` }}
          >
            <VisibilitySensor
              active={active}
              offset={{ bottom: -600 }}
              partialVisibility
              onChange={isVisible => {
                if (isVisible) setActive(false);
              }}
            >
              <img
                alt={alt || ''}
                className={`
                  ${styles.image}
                  ${isClear ? '' : styles.blur}
                  ${!isPlaceholder ? '' : styles.placeholder}
                `}
                src={imageURL}
                onLoad={() => onLoad()}
                onError={() => setActive(false)}
                onClick={() => setAdTrack()}
              />
            </VisibilitySensor>

            {!children
              ? null
              : React.cloneElement(children, { onClick: () => setAdTrack() })}
          </div>
        </Link>
      </div>
    );
  },
);