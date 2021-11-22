// import
import React from 'react';
import { Modal, Popover, Button, notification } from 'antd';
import fileType from 'file-type/browser';

import { useTranslation } from '@meepshop/locales';

import useUploadImages from './useUploadImages';
import { IMAGE_TYPES } from '../constants';
import styles from '../styles/useFilesOnChange.less';

// graphql typescript
import {
  getImagesVariables as getImagesVariablesType,
  useUploadImagesUserFragment as useUploadImagesUserFragmentType,
} from '@meepshop/types/gqls/admin';

// definition
const readImageBuffer = (file: File): Promise<ArrayBuffer> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = e => {
      if (e.target?.result instanceof ArrayBuffer) resolve(e.target.result);
      else reject(new Error('can not read file buffer'));
    };
    reader.readAsArrayBuffer(file);
  });

const readImageData = (
  buffer: ArrayBuffer,
  type: string,
): Promise<{ width: number; height: number }> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = e => {
      if (typeof e.target?.result === 'string') {
        const image = new Image();

        image.src = e.target.result;
        image.onload = () => {
          resolve({
            width: image.width,
            height: image.height,
          });
        };
      } else reject(new Error('can not read file data url'));
    };
    reader.readAsDataURL(new Blob([buffer], { type }));
  });

export default (
  variables: getImagesVariablesType,
  viewer: useUploadImagesUserFragmentType | null,
): ((e: React.ChangeEvent<HTMLInputElement>) => Promise<void>) => {
  const uploadImage = useUploadImages(variables, viewer);
  const { t } = useTranslation('media-gallery');

  return async ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
    if (!files) return;

    try {
      const data = await Promise.all(
        Array.from(files).map(async file => {
          const { name, size } = file;

          if (size / 1024 / 1024 > 19) return { name };

          const imageBuffer = await readImageBuffer(file);
          const imageType = await fileType.fromBuffer(imageBuffer);

          if (!imageType || !IMAGE_TYPES.includes(imageType.mime))
            return { name };

          const { width, height } = await readImageData(imageBuffer, file.type);

          if (width > 16000 || height > 16000 || width * height > 50000000)
            return { name };

          return {
            file,
            legal: true,
          };
        }),
      );

      const illegalFiles = data.filter(file => !file.legal);

      if (illegalFiles.length)
        Modal.error({
          title: t('upload-failed'),
          okText: t('confirm'),
          centered: true,
          content: (
            <div className={styles.root}>
              <div>{t('please-check-files')}</div>
              <ul>
                <li>{t('acceptable.type')}</li>
                <li>{t('acceptable.size')}</li>
                <li>{t('acceptable.length')}</li>
                <li>{t('acceptable.resolution')}</li>
              </ul>
              <Popover
                overlayClassName={styles.list}
                placement="bottom"
                content={
                  <ul>
                    {illegalFiles.map(({ name }) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                }
                trigger="click"
              >
                <Button>{t('check-failed-files')}</Button>
              </Popover>
            </div>
          ),
          width: 'auto',
        });

      const images = data.reduceRight((result, { file, legal }) => {
        if (!legal || !file) return result;

        return [...result, file];
      }, [] as File[]);

      if (images.length === 0) return;

      await uploadImage({
        variables: {
          input: {
            images,
          },
        },
      });
    } catch (e) {
      notification.error({
        message: t('fail'),
        description: e.message,
      });
    }
  };
};
