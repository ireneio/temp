// import
import { useEffect } from 'react';
import Clipboard from 'clipboard';

// typescript definition
interface PropsType {
  target: string;
  text: (e: Element) => string;
  success: ({ text }: { text?: string }) => void;
}

// definition
export default ({ target, text, success }: PropsType): void => {
  useEffect((): (() => void) => {
    const clipboard = new Clipboard(target, {
      text,
    }).on('success', success);

    return () => {
      clipboard.destroy();
    };
  }, [target, text, success]);
};
