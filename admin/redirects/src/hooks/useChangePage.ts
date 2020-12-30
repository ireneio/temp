// import
import { useCallback, useState } from 'react';

// definition
export default (): {
  loading: boolean;
  pageSize: number;
  current: number;
  changePage: (newCurrent: number, newPageSize: number) => void;
} => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [current, setCurrent] = useState<number>(0);

  return {
    loading,
    pageSize,
    current,
    changePage: useCallback(
      (newCurrent: number, newPageSize: number): void => {
        if (loading) return;

        setLoading(true);

        if (newPageSize !== pageSize) {
          setPageSize(newPageSize);
          setLoading(false);
          setCurrent(0);
          return;
        }

        setLoading(false);
        setCurrent(newCurrent);
      },
      [pageSize, loading],
    ),
  };
};
