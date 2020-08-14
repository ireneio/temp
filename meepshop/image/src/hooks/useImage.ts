// import
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';

import { placeholderImage } from '@meepshop/images';

// graphql typescript
import { imageFragment_image as imageFragmentImage } from '../__generated__/imageFragment';

// typescript definition
type WidthType =
  | 'w60'
  | 'w120'
  | 'w240'
  | 'w480'
  | 'w720'
  | 'w960'
  | 'w1200'
  | 'w1440'
  | 'w1680'
  | 'w1920';

// definition
const IMAGE_SUITABLE_WIDTHS = [
  60,
  120,
  240,
  480,
  720,
  960,
  1200,
  1440,
  1680,
  1920,
];

const imageCache: string[] = [];

export default (
  image: imageFragmentImage | null,
): {
  imageRef: React.Ref<HTMLDivElement>;
  imageURL: string;
  active: boolean;
  setActive: (active: boolean) => void;
  isClear: boolean;
  isPlaceholder: boolean;
  onLoad: () => void;
} => {
  const [currentWidth, setCurrentWidth] = useState(0);
  const [active, setActive] = useState(true);
  const [isClear, setIsClear] = useState(false);

  const imageRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef(false);

  const { imageURL, isPlaceholder } = useMemo(() => {
    const imageWidth = active
      ? 'w60'
      : `w${IMAGE_SUITABLE_WIDTHS.find(
          suitableWidth =>
            suitableWidth > currentWidth * window.devicePixelRatio,
        ) || IMAGE_SUITABLE_WIDTHS.slice(-1)[0]}`;

    const imageScaledSrc = image?.scaledSrc?.[imageWidth as WidthType];

    return {
      imageURL: imageScaledSrc || placeholderImage,
      isPlaceholder: !imageScaledSrc,
    };
  }, [active, currentWidth, image]);

  useEffect((): (() => void) => {
    const resize = (): void => {
      if (!imageRef.current) return;

      const { offsetWidth } = imageRef.current;

      setCurrentWidth(offsetWidth);
    };

    if (!isMountedRef.current) resize();

    window.addEventListener('resize', resize);
    isMountedRef.current = true;

    return () => window.removeEventListener('resize', resize);
  });

  useEffect(() => {
    if (imageCache.includes(imageURL)) {
      setActive(false);
      setIsClear(true);
    }
  }, [imageURL]);

  return {
    imageRef,
    imageURL,
    active,
    setActive,
    isClear,
    isPlaceholder,
    onLoad: useCallback(() => {
      if (!active) {
        setIsClear(true);
        if (!imageCache.includes(imageURL)) imageCache.push(imageURL);
      }
    }, [active, imageURL]),
  };
};
