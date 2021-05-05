// import
import React from 'react';
import { Modal, Popover, Button, notification } from 'antd';
import fileType from 'file-type/browser';
import uuid from 'uuid/v4';

import { useTranslation } from '@meepshop/locales';

import useUploadImages from './useUploadImages';
import { IMAGE_TYPES } from '../constants';
import styles from '../styles/useFilesOnChange.less';

// graphql typescript
import { getImagesVariables as getImagesVariablesType } from '@meepshop/types/gqls/admin';

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
): Promise<{ dataUrl: string; width: number; height: number }> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = e => {
      if (typeof e.target?.result === 'string') {
        const image = new Image();

        image.src = e.target.result;
        image.onload = () => {
          resolve({
            dataUrl: e.target?.result as string,
            width: image.width,
            height: image.height,
          });
        };
      } else reject(new Error('can not read file data url'));
    };
    reader.readAsDataURL(new Blob([buffer], { type }));
  });

const uploadImageToGcd = async (file: File, type?: string): Promise<string> => {
  const id = uuid();
  const { gcloud } = await fetch('/api/upload', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ key: `/files/${id}.${type}` }),
  }).then(res => res.json());

  if (!gcloud) throw new Error('Can not get gcloud');

  const formData = new FormData();

  Object.keys(gcloud.data).forEach(key => {
    formData.append(key, gcloud.data[key]);
  });
  formData.append('file', file);

  await fetch(gcloud.url, {
    method: 'POST',
    body: formData,
  });

  return id;
};

export default (
  variables: getImagesVariablesType,
): ((e: React.ChangeEvent<HTMLInputElement>) => Promise<void>) => {
  const uploadImage = useUploadImages(variables);
  const { t } = useTranslation('gallery');

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

          const { dataUrl, width, height } = await readImageData(
            imageBuffer,
            file.type,
          );

          if (width > 16000 || height > 16000 || width * height > 50000000)
            return { name };

          const type = name.split('.').pop();

          return {
            id: await uploadImageToGcd(file, type),
            legal: true,
            image: dataUrl,
            name,
            type,
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

      await uploadImage({
        variables: {
          createFileList: data
            .filter(file => file.legal)
            .reverse()
            .map(({ id, name, type }) => ({
              id,
              name,
              type,
              description: {
                // eslint-disable-next-line @typescript-eslint/camelcase
                zh_TW: '',
              },
              tags: [],
            })),
        },
        optimisticResponse: {
          createFileList: data
            .filter(file => file.legal)
            .map(({ image }) => ({
              __typename: 'File',
              id: uuid(),
              scaledSrc: {
                __typename: 'ScaledURLs',
                h200: image,
                w60: image,
                w120: image,
                w240: image,
                w250: image,
                w480: image,
                w720: image,
                w960: image,
                w1200: image,
                w1440: image,
                w1680: image,
                w1920: image,
              },
            })),
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
