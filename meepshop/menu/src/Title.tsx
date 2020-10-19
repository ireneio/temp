// import
import React, { useState, useMemo } from 'react';
import { filter } from 'graphql-anywhere';

import Link from '@meepshop/link';
import Switch from '@meepshop/switch';
import { menuIconsPerson_scaledSrc as menuIconsPerson } from '@meepshop/images';

import SearchBar from './SearchBar';
import { ACION_TYPES } from './constants';
import useTitle from './hooks/useTitle';
import useHref from './hooks/useHref';
import useIcon from './hooks/useIcon';

// graphql typescript
import {
  titleMenuPageObjectTypeFragment as titleMenuPageObjectTypeFragmentType,
  titleMenuPageObjectTypeFragment_image_Image as titleMenuPageObjectTypeFragmentImageImageType,
  titleMenuPageObjectTypeFragment_image_DefaultIcon as titleMenuPageObjectTypeFragmentDefaultIconDefaultIconType,
} from './gqls/__generated__/titleMenuPageObjectTypeFragment';
import { titleMenuDesignObjectTypeFragment as titleMenuDesignObjectTypeFragmentType } from './gqls/__generated__/titleMenuDesignObjectTypeFragment';
import { titleUserFragment as titleUserFragmentType } from './gqls/__generated__/titleUserFragment';

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
      !user ? null : filter(useTitleUserFragment, user),
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
      !user ? null : filter(useHrefUserFragment, user),
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
          render={children => <a href={href || ''}>{children}</a>}
        >
          <Switch
            isTrue={Boolean(image)}
            render={children => (
              <div className={imagePosition ? 'TODO' : ''}>
                {(image as titleMenuPageObjectTypeFragmentImageImageType)
                  ?.__typename !== 'Image' ? null : (
                  <img
                    style={{
                      width: `${design?.fontSize}px`,
                      height: `${design?.fontSize}px`,
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
                    style={{ fontSize: `${design?.fontSize}px` }}
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
