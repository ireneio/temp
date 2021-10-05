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
  onLoad?: () => void;
}

// definition
export default React.memo(
  ({
    id,
    image,
    link,
    width,
    justifyContent,
    alt,
    children,
    onLoad: propsOnLoad,
  }: PropsType) => {
    const { href, trackLink } = useLink(filter(useLinkFragment, link));
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
              onChange={isVisible => {
                if (isVisible) setActive(false);
              }}
              partialVisibility
            >
              <img
                alt={alt || ''}
                className={`
                  ${styles.image}
                  ${isClear ? '' : styles.blur}
                  ${!isPlaceholder ? '' : styles.placeholder}
                `}
                src={imageURL}
                onLoad={() => {
                  if (propsOnLoad) propsOnLoad();

                  onLoad();
                }}
                onError={() => setActive(false)}
                onClick={trackLink}
              />
            </VisibilitySensor>

            {!children
              ? null
              : React.cloneElement(children, { onClick: trackLink })}
          </div>
        </Link>
      </div>
    );
  },
);
