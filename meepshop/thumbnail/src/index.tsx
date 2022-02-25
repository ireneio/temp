// import
import React, { useContext } from 'react';
import transformColor from 'color';

import { Colors as ColorsContext } from '@meepshop/context';
import { placeholderThumbnail_w120 as placeholderThumbnail } from '@meepshop/images';

import styles from './styles/index.less';

// graphql typescript
import {
  thumbnailFragment as thumbnailFragmentType,
  thumbnailFragment_scaledSrc as thumbnailFragmentScaledSrcType,
} from '@meepshop/types/gqls/meepshop';

// typescript definition
interface PropsType {
  image: thumbnailFragmentType | null;
  className?: string;
  source?: keyof thumbnailFragmentScaledSrcType;
  onClick?: () => void;
}

// definition
export default ({
  image,
  className,
  source,
  onClick,
}: PropsType): React.ReactElement => {
  const colors = useContext(ColorsContext);

  return (
    <>
      <div className={`${styles.wrapper} ${className || ''}`} onClick={onClick}>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${image?.scaledSrc?.[source || 'w120'] ||
              placeholderThumbnail})`,
          }}
        />
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
              .${styles.wrapper} {
                border: 1px solid ${transformColor(colors[3]).alpha(0.1)};
                box-shadow: 0px 1px 3px ${transformColor(colors[3]).alpha(
                  0.08,
                )};
              }
            `,
        }}
      />
    </>
  );
};
