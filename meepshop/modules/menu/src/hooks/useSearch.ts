// import
import { useRef, useContext, useCallback } from 'react';

import { AdTrack as AdTrackContext } from '@meepshop/context';
import { useRouter } from '@meepshop/link';

// definition
export default (): ((
  e: React.KeyboardEvent<HTMLInputElement> & { target: { value: string } },
) => void) => {
  const searchKeyRef = useRef('');
  const router = useRouter();
  const adTrack = useContext(AdTrackContext);

  return useCallback(
    ({ target: { value } }) => {
      if (searchKeyRef.current === value) return;

      const query: { [key: string]: string } = {
        ...router.query,
        search: value,
      };

      router.replace(
        `/products?${Object.keys(query)
          .map(key => `${key}=${query[key]}`)
          .join('&')}`,
      );
      adTrack.search({ searchString: value, products: [] });
      searchKeyRef.current = value;
    },
    [router, adTrack],
  );
};
