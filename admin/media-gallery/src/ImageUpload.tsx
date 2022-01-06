// import
import React from 'react';

import useFilesOnChange from './hooks/useFilesOnChange';
import styles from './styles/imageUpload.less';
import { IMAGE_TYPES } from './constants';

// graphql typescript
import { useUploadImagesUserFragment as useUploadImagesUserFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  forwardedRef: React.Ref<HTMLInputElement>;
  multiple?: boolean;
  viewer: useUploadImagesUserFragmentType | null;
}

// definition
const ImageUpload = React.memo(
  ({ forwardedRef, multiple, viewer }: PropsType) => {
    const filesOnChange = useFilesOnChange(viewer);

    return (
      <input
        ref={forwardedRef}
        className={styles.root}
        onChange={filesOnChange}
        accept={IMAGE_TYPES.join(',')}
        multiple={multiple}
        type="file"
      />
    );
  },
);

export default React.forwardRef(
  (props: Omit<PropsType, 'forwardedRef'>, ref: PropsType['forwardedRef']) => (
    <ImageUpload {...props} forwardedRef={ref} />
  ),
);
