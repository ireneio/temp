// import
import React from 'react';
import { Icon } from 'antd';

import useHeight from './hooks/useHeight';
import styles from './styles/card.less';

// graphql typescript
import { getImages_viewer_files_edges_node as getImagesViewerFilesEdgesNodeType } from './gqls/__generated__/getImages';

// typescript definition
interface PropsType {
  node: getImagesViewerFilesEdgesNodeType;
  selectedImgs: getImagesViewerFilesEdgesNodeType[];
  setSelectedImgs: (selectedImgs: getImagesViewerFilesEdgesNodeType[]) => void;
}

// definition
export default ({
  node,
  selectedImgs,
  setSelectedImgs,
}: PropsType): React.ReactElement => {
  const { rootRef, height } = useHeight();
  const selected = selectedImgs.some(img => img?.id === node.id);

  return (
    <div
      ref={rootRef}
      className={styles.root}
      style={{
        height: `${height}px`,
        backgroundImage: `url("${node.scaledSrc.w480}")`,
      }}
      onClick={() => {
        setSelectedImgs(
          !selected
            ? [...selectedImgs, node]
            : selectedImgs.filter(existingIds => existingIds.id !== node.id),
        );
      }}
    >
      {!selected ? null : (
        <div className={styles.selected}>
          <Icon type="check-circle" theme="filled" />
        </div>
      )}
    </div>
  );
};
