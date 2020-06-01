// import
import React, { useContext } from 'react';
import { Icon as AntdIcon } from 'antd';

import { useTranslation } from '@admin/utils/lib/i18n';
import ImagesContext, {
  pageManagerEmpty,
  pageManagerTopMenu,
  pageManagerTopAndSideMenu,
  pageManagerDoubleTopMenu,
  pageManagerAllMenu,
} from '@meepshop/images';

import styles from './styles/containerSelect.less';

// typescript definition
interface PropsType {
  forwardedRef: React.Ref<HTMLDivElement>;
  value?: string;
  onChange?: (value: string) => void;
}

// definition
const ContainerSelect = React.memo(
  ({ forwardedRef, value, onChange }: PropsType) => {
    const { t } = useTranslation('page-manager');
    const getUrl = useContext(ImagesContext);

    return (
      <div ref={forwardedRef}>
        {[
          {
            value: 'DEFAULT',
            src: pageManagerEmpty,
          },
          {
            value: 'FIXED_TOP',
            src: pageManagerTopMenu,
          },
          {
            value: 'FIXED_TOP_WITH_SIDEBAR',
            src: pageManagerTopAndSideMenu,
          },
          {
            value: 'TWO_TOPS',
            src: pageManagerDoubleTopMenu,
          },
          {
            value: 'TWO_TOPS_WITH_SIDEBAR',
            src: pageManagerAllMenu,
          },
        ].map(({ value: itemValue, src }) => (
          <div
            key={itemValue}
            className={`${styles.root} ${
              value !== itemValue ? '' : styles.selected
            }`}
            onClick={() => onChange?.(itemValue)}
          >
            {value !== itemValue ? null : (
              <AntdIcon type="check-circle" theme="filled" />
            )}

            <img className={styles.icon} src={getUrl(src)} alt={itemValue} />

            <span className={styles.text}>{t(`template.${itemValue}`)}</span>
          </div>
        ))}
      </div>
    );
  },
);

export default React.forwardRef(
  (props: Omit<PropsType, 'forwardedRef'>, ref: PropsType['forwardedRef']) => (
    <ContainerSelect {...props} forwardedRef={ref} />
  ),
);
