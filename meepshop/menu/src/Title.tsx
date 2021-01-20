// import
import React, { useState, useMemo } from 'react';
import { filter } from 'graphql-anywhere';

import Link from '@meepshop/link';
import Switch from '@meepshop/switch';
import { menuIconsPerson_scaledSrc as menuIconsPerson } from '@meepshop/images';

import SearchBar from './SearchBar';
import useTitle from './hooks/useTitle';
import useHref from './hooks/useHref';
import useIcon from './hooks/useIcon';
import styles from './styles/title.less';
import { ACION_TYPES } from './constants';

// graphql typescript
import {
  titleMenuPageObjectTypeFragment as titleMenuPageObjectTypeFragmentType,
  titleMenuPageObjectTypeFragment_image_Image as titleMenuPageObjectTypeFragmentImageImageType,
  titleMenuPageObjectTypeFragment_image_DefaultIcon as titleMenuPageObjectTypeFragmentDefaultIconDefaultIconType,
  titleUserFragment as titleUserFragmentType,
  titleMenuDesignObjectTypeFragment as titleMenuDesignObjectTypeFragmentType,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import {
  useTitleUserFragment,
  useTitleMenuPageObjectTypeFragment,
} from './gqls/useTitle';
import {
  useHrefUserFragment,
  useHrefMenuPageObjectTypeFragment,
} from './gqls/useHref';

// typescript definition
interface PropsType {
  user: titleUserFragmentType | null;
  page: titleMenuPageObjectTypeFragmentType;
  design: titleMenuDesignObjectTypeFragmentType | null;
}

// definition
export default React.memo(
  ({
    user,
    page: { action, imagePosition, newWindow, ...page },
    design,
  }: PropsType) => {
    const [visible, setVisible] = useState(false);
    const title = useTitle(
      filter(useTitleUserFragment, user),
      filter(useTitleMenuPageObjectTypeFragment, { ...page, action }),
    );
    const image = useMemo(
      () =>
        ACION_TYPES[action || 0] !== 'MEMBER' || user?.role !== 'SHOPPER'
          ? page.image
          : page.image || {
              scaledSrc: menuIconsPerson,
            },
      [user, page, action],
    );
    const href = useHref(
      filter(useHrefUserFragment, user),
      filter(useHrefMenuPageObjectTypeFragment, { ...page, action }),
    );
    const Icon = useIcon(
      (image as titleMenuPageObjectTypeFragmentDefaultIconDefaultIconType)
        ?.icon,
    );

    return (
      <Link
        href={href || ''}
        target={newWindow ? '_blank' : '_self'}
        disabled={!href}
      >
        <Switch
          isTrue={Boolean(href)}
          render={children => (
            <a className={styles.link} href={href || ''}>
              {children}
            </a>
          )}
        >
          <Switch
            isTrue={Boolean(image)}
            render={children => (
              <div
                className={`${styles.root} ${styles[imagePosition || 'LEFT']}`}
              >
                {(image as titleMenuPageObjectTypeFragmentImageImageType)
                  ?.__typename !== 'Image' ? null : (
                  <img
                    className={styles.img}
                    style={{
                      fontSize: `${design?.iconSize || 24}px`,
                    }}
                    src={
                      (image as titleMenuPageObjectTypeFragmentImageImageType)
                        .scaledSrc?.w60
                    }
                    srcSet={`${
                      (image as titleMenuPageObjectTypeFragmentImageImageType)
                        .scaledSrc?.w60
                    } 1x, ${
                      (image as titleMenuPageObjectTypeFragmentImageImageType)
                        .scaledSrc?.w120
                    } 2x, ${
                      (image as titleMenuPageObjectTypeFragmentImageImageType)
                        .scaledSrc?.w240
                    } 3x`}
                    alt={title || ''}
                  />
                )}

                {(image as titleMenuPageObjectTypeFragmentDefaultIconDefaultIconType)
                  ?.__typename !== 'DefaultIcon' ? null : (
                  <Icon
                    style={{ fontSize: `${design?.iconSize || 24}px` }}
                    onClick={() => {
                      if (ACION_TYPES[action || 0] === 'SEARCH_BAR')
                        setVisible(!visible);
                    }}
                  />
                )}

                {imagePosition === 'ONLY' ? null : children}
              </div>
            )}
          >
            {ACION_TYPES[action || 0] !== 'SEARCH_BAR' ? (
              <>{title}</>
            ) : (
              <SearchBar visible={visible} />
            )}
          </Switch>
        </Switch>
      </Link>
    );
  },
);
