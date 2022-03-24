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
type SizeType = 56 | 64 | 72 | 80 | 84 | 90 | 100 | 136 | 168;

interface PropsType {
  image: thumbnailFragmentType | null;
  size: SizeType;
  mobileSize: SizeType;
  className?: string;
  source?: keyof thumbnailFragmentScaledSrcType;
  disableShadow?: boolean;
  disableRound?: boolean;
  onClick?: () => void;
}

// definition
export default ({
  image,
  className,
  source,
  mobileSize,
  size,
  disableRound,
  disableShadow,
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
                width: ${size}px;
                height: ${size}px;
                border-radius: ${disableRound ? 0 : 5}px;
                outline: ${
                  disableShadow
                    ? 'none'
                    : `1px solid ${transformColor(colors[3])
                        .alpha(0.1)
                        .toString()}`
                };
                box-shadow: ${
                  disableShadow
                    ? 'none'
                    : `0px 1px 3px ${transformColor(colors[3])
                        .alpha(0.08)
                        .toString()}`
                }
              }

              @media (max-width: ${styles.screenSmMax}) {
                .${styles.wrapper} {
                  width: ${mobileSize}px;
                  height: ${mobileSize}px;
                }
              }
            `,
        }}
      />
    </>
  );
};
