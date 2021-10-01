// import
import React from 'react';
import { CheckOutlined } from '@ant-design/icons';

import useHeight from './hooks/useHeight';
import styles from './styles/card.less';

// graphql typescript
import { getImages_viewer_files_edges_node as getImagesViewerFilesEdgesNodeType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  node: getImagesViewerFilesEdgesNodeType;
  selectedImgs: getImagesViewerFilesEdgesNodeType[];
  setSelectedImgs: (selectedImgs: getImagesViewerFilesEdgesNodeType[]) => void;
  multiple?: boolean;
}

// definition
export default ({
  node,
  selectedImgs,
  setSelectedImgs,
  multiple,
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
            : selectedImgs.filter(img => img.id !== node.id),
        );
      }}
    >
      {!selected ? null : (
        <div className={styles.selected}>
          <div className={styles.icon}>
            {!multiple ? (
              <CheckOutlined />
            ) : (
              selectedImgs.findIndex(img => img.id === node.id) + 1
            )}
          </div>
        </div>
      )}
    </div>
  );
};
