// typescript import
import { PropsType as GalleryPropsType } from '@admin/gallery';

// import
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { usePortalTarget } from '@admin/hooks';
import { uploadImage_w56 as uploadImage } from '@meepshop/images';
import Gallery from '@admin/gallery';

import useFindImage from './hooks/useFindImage';
import styles from './styles/uploadImage.less';

// typescript definition
interface PropsType {
  value?: string | null;
  onChange?: (value: PropsType['value']) => void;
  forwardedRef: React.Ref<HTMLDivElement>;
}

// definition
const UploadImage = React.memo(
  ({ forwardedRef, value, onChange }: PropsType) => {
    const { t } = useTranslation('page-manager');
    const portalTarget = usePortalTarget();
    const findImage = useFindImage(value || null);
    const [visible, setVisible] = useState(false);

    return (
      <div ref={forwardedRef}>
        {!value ? null : (
          <div className={styles.root} onClick={() => onChange?.(null)}>
            <CloseCircleOutlined />

            <img className={styles.image} src={value} alt="previewer" />
          </div>
        )}

        <img
          className={styles.image}
          onClick={() => setVisible(true)}
          src={uploadImage}
          alt="upload"
        />

        {!visible || !portalTarget
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
                  value={findImage}
                  onChange={(node: GalleryPropsType['value']) => {
                    if (onChange && !Array.isArray(node))
                      onChange(node?.scaledSrc?.w480 || null);
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
