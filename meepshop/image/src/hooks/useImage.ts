// import
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';

import { placeholderImage } from '@meepshop/images';

// graphql typescript
import {
  useImageImageFragment,
  useImageImageFragment_scaledSrc as useImageImageFragmentScaledSrc,
} from '../gqls/__generated__/useImageImageFragment';

// definition
const IMAGE_SUITABLE_WIDTHS = [120, 240, 480, 720, 960, 1200, 1440, 1680, 1920];

const imageCache: string[] = [];

export default (
  image: useImageImageFragment | null,
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

    const imageScaledSrc =
      image?.scaledSrc?.[imageWidth as keyof useImageImageFragmentScaledSrc];

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
    if (isPlaceholder || imageCache.includes(imageURL)) {
      setActive(false);
      setIsClear(true);
    }
  }, [isPlaceholder, imageURL]);

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
