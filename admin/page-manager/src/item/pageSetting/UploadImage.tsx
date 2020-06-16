// import
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, Icon } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import getImage, { uploadImage_w56 as uploadImage } from '@meepshop/images';
import usePortalTarget from '@admin/utils/lib/hooks/usePortalTarget';
import Gallery from '@admin/gallery';

import useFindImage from './hooks/useFindImage';
import styles from './styles/uploadImage.less';

// typescript definition
interface PropsType {
  value?: string;
  onChange?: (value: string | null) => void;
  forwardedRef: React.Ref<HTMLDivElement>;
}

// definition
const UploadImage = React.memo(
  ({ forwardedRef, value, onChange }: PropsType) => {
    const { t } = useTranslation('page-manager');
    const portalTarget = usePortalTarget();
    const findImage = useFindImage();
    const [visible, setVisible] = useState(false);

    return (
      <div ref={forwardedRef}>
        {!value ? null : (
          <div className={styles.root} onClick={() => onChange?.(null)}>
            <Icon type="close-circle" />

            <img className={styles.image} src={`//${value}`} alt="previewer" />
          </div>
        )}

        <img
          className={styles.image}
          onClick={() => setVisible(true)}
          src={getImage(uploadImage)}
          alt="upload"
        />

        {!visible
          ? null
          : ReactDOM.createPortal(
              <div className={styles.gallery}>
                <Gallery
                  buttons={
                    <Button onClick={() => setVisible(false)}>
                      {t('seo.back')}
                    </Button>
                  }
                  buttonText={t('seo.select')}
                  value={value}
                  onChange={(id: string) => {
                    if (onChange)
                      onChange(
                        findImage(
                          id,
                        ) /** TODO should remove, should use id to save */ ||
                          '',
                      );

                    setVisible(false);
                  }}
                />
              </div>,
              portalTarget,
            )}
      </div>
    );
  },
);

export default React.forwardRef(
  (props: Omit<PropsType, 'forwardedRef'>, ref: PropsType['forwardedRef']) => (
    <UploadImage {...props} forwardedRef={ref} />
  ),
);
