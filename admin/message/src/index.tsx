// typescript import
import { ArgsProps } from 'antd/lib/message';

// import
import React from 'react';
import { message } from 'antd';

import { icons } from './constants';

// definition
export default {
  ...message,
  ...Object.keys(icons).reduce((actions, key: keyof typeof icons) => {
    const Icon = icons[key];
    return {
      ...actions,
      [key]: (
        content: string | React.ReactNode | ArgsProps,
        duration?: number,
        onClose?: () => void,
      ) => {
        message[key](
          {
            ...(typeof content !== 'string' && !!(content as ArgsProps).content
              ? content
              : {
                  content,
                }),
            icon: <Icon />,
          },
          duration,
          onClose,
        );
      },
    };
  }, {} as typeof message),
};
