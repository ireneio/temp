// import
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

// typescript definition
interface OffsetCacheType {
  previousOffset: number;
  currentOffset: number | null;
}

// definition
export default (): string => {
  const offsetCacheRef = useRef<OffsetCacheType>({
    previousOffset: 0,
    currentOffset: null,
  });
  const [routeCache, setRouteCache] = useState<string>('/');
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string): void => {
      if (url !== router?.asPath) {
        setRouteCache(router?.asPath || '/');
      }

      offsetCacheRef.current.previousOffset = window.pageYOffset;
    };

    const handleComplete = (): void => {
      if (offsetCacheRef.current.currentOffset !== null) {
        window.scrollTo(0, offsetCacheRef.current.currentOffset);
        offsetCacheRef.current.currentOffset = null;
      }
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.beforePopState(() => {
      offsetCacheRef.current.currentOffset =
        offsetCacheRef.current.previousOffset;

      return true;
    });

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
    };
  }, [routeCache, router]);

  return routeCache;
};
