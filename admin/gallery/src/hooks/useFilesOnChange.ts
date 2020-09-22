// import
import { notification } from 'antd';
import fileType from 'file-type/browser';
import uuid from 'uuid/v4';

import { useTranslation } from '@meepshop/utils/lib/i18n';

import useUploadImages from './useUploadImages';
import { IMAGE_TYPES } from '../constants';

// graphql typescript
import { getImagesVariables } from '../__generated__/getImages';

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

const readBufferAsDataUrl = (
  buffer: ArrayBuffer,
  type: string,
): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = e => {
      if (typeof e.target?.result === 'string') resolve(e.target.result);
      else reject(new Error('can not read file data url'));
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
  variables: getImagesVariables,
): ((e: React.ChangeEvent<HTMLInputElement>) => Promise<void>) => {
  const uploadImage = useUploadImages(variables);
  const { t } = useTranslation('gallery');

  return async ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
    if (!files) return;

    try {
      const data = await Promise.all(
        Array.from(files).map(async file => {
          const imageBuffer = await readImageBuffer(file);
          const imageType = await fileType.fromBuffer(imageBuffer);

          if (!imageType || !IMAGE_TYPES.includes(imageType.mime))
            throw new Error('file type is not accepted');

          const type = file.name.split('.').pop();

          return {
            name: file.name,
            type,
            id: await uploadImageToGcd(file, type),
            image: await readBufferAsDataUrl(imageBuffer, file.type),
          };
        }),
      );

      await uploadImage({
        variables: {
          createFileList: data.map(({ id, name, type }) => ({
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
          createFileList: data.map(({ image }) => ({
            __typename: 'File',
            id: uuid(),
            scaledSrc: {
              __typename: 'ScaledURLs',
              w480: image,
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
