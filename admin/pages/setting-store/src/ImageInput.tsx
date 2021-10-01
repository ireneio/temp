// typescript import
import { ImageNodeType } from '@admin/media-gallery';

// import
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';

import {
  adminSettingStoreUploadImageIcon,
  adminSettingStoreProductDetailsRemove,
} from '@meepshop/images';
import Gallery from '@admin/media-gallery';
import { usePortalTarget } from '@admin/hooks';
import { useTranslation } from '@meepshop/locales';

import styles from './styles/imageInput.less';

// typescript definition
interface PropsType {
  value?: ImageNodeType;
  onChange?: (node: null | ImageNodeType) => void;
  forwardedRef: React.Ref<HTMLDivElement>;
}

// definition
const ImageInput = React.memo(
  ({ forwardedRef, value, onChange }: PropsType) => {
    const { t } = useTranslation('setting-store');
    const [visible, setVisible] = useState<boolean>(false);

    const portalTarget = usePortalTarget();

    return (
      <div ref={forwardedRef} className={styles.root}>
        {!value?.scaledSrc ? (
          <div className={styles.defaultImage} onClick={() => setVisible(true)}>
            <img src={adminSettingStoreUploadImageIcon} alt="default" />
          </div>
        ) : (
          <div
            style={{
              backgroundImage: `url(${value.scaledSrc?.w250})`,
            }}
            className={styles.image}
          >
            <div
              className={styles.removeImage}
              onClick={() => onChange?.(null)}
            >
              <img src={adminSettingStoreProductDetailsRemove} alt="remove" />
            </div>
          </div>
        )}

        {!visible
          ? null
          : ReactDOM.createPortal(
              <div className={styles.gallery}>
                <Gallery
                  buttons={
                    <Button onClick={() => setVisible(false)}>
                      {t('back')}
                    </Button>
                  }
                  value={value}
                  buttonText={t('selected')}
                  onChange={(node: ImageNodeType) => {
                    if (onChange) onChange(node);
                    setVisible(false);
                  }}
                />
              </div>,
              portalTarget as HTMLDivElement,
            )}
      </div>
    );
  },
);

export default React.forwardRef(
  (props: Omit<PropsType, 'forwardedRef'>, ref: PropsType['forwardedRef']) => (
    <ImageInput {...props} forwardedRef={ref} />
  ),
);
