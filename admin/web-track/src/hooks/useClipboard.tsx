// import
import React, { useEffect } from 'react';
import { Icon, message } from 'antd';
import Clipboard from 'clipboard';

// definition
export default (text: string, target: string, content: string): void => {
  useEffect(() => {
    const clipboard = new Clipboard(target, {
      text: () => text,
    }).on('success', () => {
      message.success({
        content,
        duration: 2,
        icon: <Icon type="check-circle" />,
      });
    });

    return () => {
      clipboard.destroy();
    };
  }, [text, target, content]);
};
