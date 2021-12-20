// typescript import
import { ModulesType } from './hooks/useModules';

// import
import React from 'react';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/locales';
import { CopyOutlineIcon, DeleteOutlineIcon } from '@meepshop/icons';
import Switch from '@meepshop/switch';
import modules from '@meepshop/modules';

import Indicator from './Indicator';
import useCustomDrop from './hooks/useCustomDrop';
import useCustomDrag from './hooks/useCustomDrag';
import styles from './styles/module.less';

// typescript definition
interface PropsType {
  data: ModulesType['data'];
  parentNode: ModulesType['parentNode'];
  settings: {
    minWidth: string;
    level: number;
  };
}

// definition
export default React.memo(
  ({ data, parentNode, settings: { level } }: PropsType) => {
    const { t } = useTranslation('page-editor');
    const { __typename } = data;
    const Module = modules[__typename];
    const [{ isOver, direction }, dropRef] = useCustomDrop({
      data,
      parentNode,
      level,
    });
    const [{ isDragging }, dragRef] = useCustomDrag({
      data,
      parentNode,
      level,
    });

    return (
      <div
        className={`${styles.root} ${isOver ? styles.isOver : ''} ${
          direction ? styles[direction.toward] : ''
        } ${direction?.isBorderline ? styles.isBorderline : ''} ${
          isDragging ? styles.isDragging : ''
        }`}
        ref={dragRef}
      >
        <div>
          <div className={styles.mask} ref={dropRef} />

          <div className={styles.handler}>
            <Switch
              isTrue={__typename === 'IframeModule'}
              render={children => (
                <Tooltip title={t('iframe-tip')}>
                  <>{children}</>
                </Tooltip>
              )}
            >
              <div>{t(`modules.${__typename}`)}</div>
            </Switch>

            <Tooltip title={t('copy')}>
              <CopyOutlineIcon />
            </Tooltip>

            <Tooltip title={t('delete')}>
              <DeleteOutlineIcon />
            </Tooltip>
          </div>

          <div className={styles.module}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Module {...(data as any)} />
          </div>

          {!isOver ? null : <Indicator toward={direction?.toward} />}
        </div>
      </div>
    );
  },
);
