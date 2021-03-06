// import
import React from 'react';
import transformColor from 'color';

import Image from '@meepshop/image';
import filter from '@meepshop/utils/lib/filter';

import styles from './styles/index.less';

// graphql typescript
import {
  JustifyContent,
  imageTextFragment,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { imageFragment } from '@meepshop/image/gqls';

// definition
export default React.memo(
  ({
    id,
    title,
    description,
    button,
    titleBold,
    color,
    hoverColor,
    buttonHoverColor,
    position,
    ...props
  }: imageTextFragment) => (
    <>
      <Image
        {...filter(imageFragment, {
          ...props,
          __typename: 'ImageModule',
          id: `image-text-${id}`,
          justifyContent: 'CENTER' as JustifyContent,
        })}
      >
        <div className={`${styles.root} ${styles[position]}`}>
          <div className={styles.wrapper} style={{ color }}>
            {!title?.content ? null : (
              <div
                className={styles.title}
                style={{ fontWeight: titleBold ? 600 : 'normal' }}
              >
                {title.content}
              </div>
            )}

            {!description?.content ? null : (
              <div className={styles.description}>{description.content}</div>
            )}

            {!button?.content ? null : (
              <div
                className={styles.button}
                style={{ border: `1px solid ${color}` }}
              >
                {button.content}
              </div>
            )}
          </div>
        </div>
      </Image>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            #image-text-${id} .${styles.root}:hover {
              background: ${
                hoverColor ? transformColor(hoverColor).alpha(0.5) : 'none'
              };
            }

            #image-text-${id} .${styles.title} {
              font-size: ${title?.fontSize}px;
            }

            @media (max-width: ${styles.screenSmMax}) {
              #image-text-${id} .${styles.title} {
                font-size: ${
                  title && title.fontSize * 0.6 >= 12
                    ? title.fontSize * 0.6
                    : 12
                }px;
              }
            }

            #image-text-${id} .${styles.description} {
              font-size: ${description?.fontSize}px;
            }

            @media (max-width: ${styles.screenSmMax}) {
              #image-text-${id} .${styles.description} {
                font-size: ${
                  description && description.fontSize * 0.6 >= 12
                    ? description.fontSize * 0.6
                    : 12
                }px;
              }
            }

            #image-text-${id} .${styles.button} {
              font-size: ${button?.fontSize}px;
            }

            @media (max-width: ${styles.screenSmMax}) {
              #image-text-${id} .${styles.button} {
                font-size: ${
                  button && button.fontSize * 0.6 >= 12
                    ? button.fontSize * 0.6
                    : 12
                }px;
              }
            }

            #image-text-${id} .${styles.button}:hover {
              background: ${color};
              color: ${buttonHoverColor};
            }
          `,
        }}
      />
    </>
  ),
);
