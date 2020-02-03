// import
import React from 'react';

import useFilesOnChange from './hooks/useFilesOnChange';
import styles from './styles/imageUpload.less';
import { IMAGE_TYPES } from './constants';

// graphql typescript
import { getImagesVariables } from './__generated__/getImages';

// typescript definition
interface PropsType {
  forwardedRef: React.Ref<HTMLInputElement>;
  variables: getImagesVariables;
  multiple?: boolean;
}

// definition
const ImageUpload = React.memo(
  ({ forwardedRef, variables, multiple }: PropsType) => {
    const filesOnChange = useFilesOnChange(variables);

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
