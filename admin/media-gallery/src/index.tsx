// import
import React, { useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { uploadPicture_w100 as uploadPicture } from '@meepshop/images';

import Card from './Card';
import ImageUpload from './ImageUpload';
import useLoadMoreImages from './hooks/useLoadMoreImages';
import styles from './styles/index.less';

// graphql typescript
import {
  getImages as getImagesType,
  getImagesVariables as getImagesVariablesType,
  getImages_viewer_images_edges_node as getImagesViewerImagesEdgesNode,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getImages } from './gqls/index';
import { useLoadMoreImagesFragment } from './gqls/useLoadMoreImages';
import { useUploadImagesUserFragment } from './gqls/useUploadImages';

// typescript definition
export type ImageNodeType = getImagesViewerImagesEdgesNode;
export interface PropsType {
  buttons?: React.ReactNode;
  value?: null | ImageNodeType | ImageNodeType[];
  onChange?: (imgs: ImageNodeType | ImageNodeType[]) => void;
  buttonText?: string;
  multiple?: boolean;
}

// definition
export default React.memo(
  ({ buttons, value, onChange, buttonText, multiple }: PropsType) => {
    const { t } = useTranslation('media-gallery');
    const { error, data, variables, refetch, fetchMore } = useQuery<
      getImagesType,
      getImagesVariablesType
    >(getImages, {
      variables: {
        search: {
          filter: {
            and: [
              {
                type: 'exact',
                field: 'type',
                query: 'file',
              },
            ],
          },
        },
        first: 100,
      },
    });

    const [selectedImgs, setSelectedImgs] = useState<
      getImagesViewerImagesEdgesNode[]
    >(
      value instanceof Array
        ? value
        : ([value].filter(Boolean) as getImagesViewerImagesEdgesNode[]),
    );

    const imageUploadRef = useRef<HTMLInputElement>(null);
    const loadMoreImages = useLoadMoreImages(
      fetchMore,
      filter(useLoadMoreImagesFragment, data?.viewer?.images?.pageInfo || null),
    );
    const tagList = variables.filter?.tagList || [];

    if (error || !data) return <Spin indicator={<LoadingOutlined spin />} />;

    const images = data.viewer?.images?.edges || [];

    return (
      <div className={styles.root}>
        <div className={styles.sidebar}>
          <h4>{t('tag')}</h4>

          {data.getTagList?.data?.[0]?.tags?.map(tag => (
            <div
              key={tag || '' /** SHOULD_NOT_BE_NULL */}
              className={`${styles.tag} ${
                !tagList.includes(tag) ? '' : styles.selected
              }`}
              onClick={() => {
                const newTagList = tagList.includes(tag)
                  ? tagList.filter(name => name !== tag)
                  : [...tagList, tag];

                refetch({
                  ...variables,
                  filter: {
                    ...variables?.filter,
                    tagList: newTagList.length === 0 ? undefined : newTagList,
                  },
                });
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            {t('title')}

            <div className={styles.buttons}>
              {buttons}

              <ImageUpload
                ref={imageUploadRef}
                variables={variables}
                multiple={multiple}
                viewer={filter(
                  useUploadImagesUserFragment,
                  data.viewer || null,
                )}
              />

              <Button onClick={() => imageUploadRef.current?.click()}>
                {t('upload')}
              </Button>

              {selectedImgs.length === 0 ? null : (
                <Button
                  onClick={() =>
                    onChange?.(multiple ? selectedImgs : selectedImgs[0])
                  }
                  type="primary"
                >
                  {buttonText || t('save')}
                </Button>
              )}
            </div>
          </div>

          {!images.length ? (
            <div className={styles.noPicture}>
              <img src={uploadPicture} alt="uploadPicture" />
              <div>{t('no-pictures')}</div>
              <Button
                onClick={() => imageUploadRef.current?.click()}
                type="primary"
                size="large"
              >
                {t('add-pictures')}
              </Button>

              <div>{t('suggestion')}</div>
            </div>
          ) : (
            <>
              <div className={styles.suggestion}>{t('suggestion')}</div>
              <div className={styles.body} onScroll={loadMoreImages}>
                {images.map(({ node }) => (
                  <Card
                    key={node.id || 'id' /** SHOULD_NOT_BE_NULL */}
                    node={node}
                    selectedImgs={selectedImgs}
                    setSelectedImgs={imgs => {
                      setSelectedImgs(multiple ? imgs : imgs.slice(-1));
                    }}
                    multiple={multiple}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  },
);
