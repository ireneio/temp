// import
import React, { useState } from 'react';
import { Popover } from 'antd';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/locales';
import { QuestionIcon, BookIcon } from '@meepshop/icons';

import styles from './styles/instruction.less';

// definition
export default React.memo(() => {
  const { t } = useTranslation('page-manager');
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover
      overlayClassName={styles.popover}
      trigger="click"
      placement="topRight"
      visible={open}
      onVisibleChange={() => setOpen(!open)}
      content={
        <>
          <div>{t('instruction.title')}</div>

          {[
            'https://supportmeepshop.com/knowledgebase/%E6%9E%B6%E6%A7%8B%E8%A6%8F%E5%8A%83/',
            'https://supportmeepshop.com/kb/%e9%a0%81%e9%9d%a2%e5%85%83%e4%bb%b6%e4%bd%bf%e7%94%a8%e8%88%87%e8%a8%ad%e8%a8%88/',
            'https://supportmeepshop.com/knowledgebase/%e6%96%b0%e5%a2%9e%e5%88%86%e9%a0%81/',
            'https://supportmeepshop.com/kb/%e4%b8%80%e9%a0%81%e5%bc%8f%e5%95%86%e5%ba%97/',
            'https://supportmeepshop.com/knowledgebase/%e6%8a%98%e6%89%a3%e6%b4%bb%e5%8b%95%e9%a0%81%e8%a8%ad%e5%ae%9a/',
          ].map((url, index) => (
            <a
              key={url}
              className={styles.item}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookIcon />
              <div>{t(`instruction.${index}`)}</div>
            </a>
          ))}
        </>
      }
    >
      <Tooltip title={t('instruction.title')}>
        <div className={styles.icon} onClick={() => setOpen(!open)}>
          <QuestionIcon />
        </div>
      </Tooltip>
    </Popover>
  );
});
