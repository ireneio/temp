// typescript import
import { DragSourceMonitor } from 'react-dnd';

import { DragObjectType } from '../constants';

// import
import React, { useEffect, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { useTranslation } from '@meepshop/locales';

import styles from './styles/module.less';
import { ModuleIcons } from '../constants';

// typescript definition
interface PropsType {
  module: keyof typeof ModuleIcons;
}

// definition
export default React.memo(({ module }: PropsType) => {
  const { t } = useTranslation('page-editor');
  const [{ isDragging }, dragRef, preview] = useDrag<
    DragObjectType,
    void,
    { isDragging: boolean }
  >({
    item: {
      type: module === 'GroupModule' ? 'GROUP' : 'MODULE',
      module,
    },
    collect: useCallback(
      (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
      [],
    ),
  });

  useEffect(() => {
    preview(getEmptyImage());
  }, [preview]);
  const Icon = ModuleIcons[module];

  return (
    <div
      className={`${styles.root} ${isDragging ? styles.isDragging : ''}`}
      ref={dragRef}
    >
      <div>
        <Icon />
      </div>
      <div>{t(`modules.${module}`)}</div>
    </div>
  );
});
