// import
import React from 'react';
import { Modal } from 'antd';

import ConvenienceStoreMap, {
  ConvenienceStorePropsType,
} from '@meepshop/convenience-store-map';
import { useTranslation } from '@meepshop/locales';

import styles from './styles/index.less';

// typescript definition
interface PropsType extends ConvenienceStorePropsType {
  close: () => void;
}

// definition
export default React.memo(({ close, ...props }: PropsType) => {
  const { t } = useTranslation('form-convenience-store-map');

  return (
    <Modal
      wrapClassName={`${styles.root} `}
      width={720}
      visible
      title={t('chooseConvenienceStore')}
      onCancel={close}
      maskClosable={false}
      footer={null}
    >
      {/* FIXME:fix ios body overflow: hidden bug */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
              @media (max-width: ${styles.screenSmMax}) {
                body { position: fixed; }
              }
            `,
        }}
      />

      <ConvenienceStoreMap {...props} />
    </Modal>
  );
});
