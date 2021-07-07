// import
import React, { useEffect } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import Clipboard from 'clipboard';

import message from '@admin/message';

// definition
export default (text: string, target: string, content: string): void => {
  useEffect(() => {
    const clipboard = new Clipboard(target, {
      text: () => text,
    }).on('success', () => {
      message.success({
        content,
        duration: 2,
        icon: <CheckCircleOutlined />,
      });
    });

    return () => {
      clipboard.destroy();
    };
  }, [text, target, content]);
};
