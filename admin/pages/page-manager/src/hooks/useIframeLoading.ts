// import
import { useEffect, useState, useRef, useCallback } from 'react';
import { getElementPosition } from 'fbjs';

// definition
export default (
  id: string | null,
): {
  loading: boolean;
  scale: number;
  iframeRef: React.Ref<HTMLIFrameElement>;
  onLoad: (
    e: React.SyntheticEvent<HTMLIFrameElement> & {
      target: { parentNode: HTMLElement };
    },
  ) => void;
} => {
  const [{ loading, scale }, setLoading] = useState({
    loading: false,
    scale: 0,
  });
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setLoading({ loading: true, scale });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setLoading]);
  useEffect((): (() => void) => {
    const resize = (): void => {
      const parentNode = iframeRef.current?.parentNode;

      if (loading || !parentNode) return;

      const { width } = getElementPosition(parentNode as HTMLElement);

      setLoading({ loading: false, scale: width / 1920 });
    };

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [loading, setLoading]);

  return {
    loading,
    scale,
    iframeRef,
    onLoad: useCallback(
      (
        e: React.SyntheticEvent<HTMLIFrameElement> & {
          target: { parentNode: HTMLElement };
        },
      ) => {
        const { width } = getElementPosition(e.target.parentNode);

        setLoading({ loading: false, scale: width / 1920 });
      },
      [],
    ),
  };
};
