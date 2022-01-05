// typescript import
import { ModulesType } from '../constants';

// import
import React from 'react';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/locales';
import { UpDownIcon, SettingIcon, DeleteOutlineIcon } from '@meepshop/icons';
import { emptyGroup } from '@meepshop/images';

import Layout from './Layout';
import useGroupDnd from './hooks/useGroupDnd';
import styles from './styles/group.less';
import moduleStyles from './styles/module.less';

// graphql typescript
import { editorFragment_modules_GroupModule as editorFragmentModulesGroupModule } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  data: editorFragmentModulesGroupModule;
  childModules?: ModulesType['children'];
  isOnlyGroup: boolean;
}

// definition
export default React.memo(({ data, childModules, isOnlyGroup }: PropsType) => {
  const { t } = useTranslation('page-editor');
  const [
    { isOver, isGroupOver, isDragging },
    dropRef,
    dragRef,
    preview,
  ] = useGroupDnd({
    data,
    childModules,
  });
  const { id, percentWidth, componentWidth, padding, __typename } = data;
  const minWidth = `${componentWidth?.replace('WIDTH', '') || 0}px`;
  const isEmpty = !childModules;

  return (
    <>
      <div
        id={id}
        className={`${styles.group} ${isOver ? styles.isOver : ''} ${
          isGroupOver ? styles.isGroupOver : ''
        } ${isEmpty ? styles.isEmpty : ''} ${
          isDragging ? styles.isDragging : ''
        }`}
        style={{
          width: percentWidth.replace(/^WIDTH(.*)$/, '$1%'),
          minWidth,
        }}
        ref={dropRef}
      >
        <div className={styles.handler} ref={preview}>
          <UpDownIcon ref={dragRef} />

          <div>{t(`modules.${__typename}`)}</div>

          <Tooltip title={t('setting')}>
            <SettingIcon />
          </Tooltip>

          {isOnlyGroup ? null : (
            <Tooltip title={t('delete')}>
              <DeleteOutlineIcon />
            </Tooltip>
          )}
        </div>

        <div>
          {!childModules ? (
            <div>
              <img src={emptyGroup} alt="" />
              <div>{t('empty')}</div>
            </div>
          ) : (
            childModules.map(({ data: childData, children, parent }) => (
              <Layout
                key={childData.id}
                data={childData}
                childModules={children}
                parentNode={parent}
                settings={{
                  level: 1,
                  minWidth,
                }}
              />
            ))
          )}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            #${id},
            #${id} .${moduleStyles.root} {
              padding: calc(${padding?.replace(/^PADDING(.*)$/, '$1px') ||
                '0px'} / 2);
            }

            @media (max-width: ${styles.screenSmMax}) {
              #${id},
              #${id} .${moduleStyles.root} {
                padding: calc(${padding?.replace(/^PADDING(.*)$/, '$1px') ||
                  '0px'} / 4);
              }
            }
          `,
        }}
      />
    </>
  );
});
