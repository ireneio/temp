// import
import React, { useState, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Spin, Icon, Button } from 'antd';

import { useTranslation } from '@admin/utils/lib/i18n';

import Card from './Card';
import ImageUpload from './ImageUpload';
import styles from './styles/index.less';

// graphql typescript
import { getImages, getImagesVariables } from './__generated__/getImages';

// typescript definition
interface PropsType {
  buttons?: React.ReactNode;
  onSubmit?: (ids: string[]) => void;
  submitText?: string;
  multiple?: boolean;
}

// definition
const query = gql`
  query getImages(
    $search: searchInputObjectType
    $first: PositiveInt
    $after: String
    $filter: FileFilterInput
  ) {
    viewer {
      id
      files(first: $first, after: $after, filter: $filter) {
        edges {
          node {
            id
            image
          }
        }

        pageInfo {
          hasNextPage
          endCursor
        }

        total
      }
    }

    getTagList(search: $search) {
      data {
        id
        tags
      }
    }
  }
`;

export default React.memo(
  ({ buttons, onSubmit, submitText, multiple }: PropsType) => {
    const { t } = useTranslation('gallery');
    const { error, data, variables } = useQuery<getImages, getImagesVariables>(
      query,
      {
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
      },
    );
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const imageUploadRef = useRef<HTMLInputElement>(null);

    if (error || !data)
      return <Spin indicator={<Icon type="loading" spin />} />;

    return (
      <div className={styles.root}>
        <div className={styles.sidebar}>
          <h4>{t('tag')}</h4>

          {data.getTagList?.data?.[0]?.tags?.map(tag => (
            <div
              key={tag || '' /** TODO should not be null */}
              className={styles.tag}
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
              />

              <Button onClick={() => imageUploadRef.current?.click()}>
                {t('upload')}
              </Button>

              {selectedIds.length === 0 ? null : (
                <Button onClick={() => onSubmit?.(selectedIds)} type="primary">
                  {submitText || t('save')}
                </Button>
              )}
            </div>
          </div>

          <div className={styles.body}>
            {data.viewer?.files?.edges.map(({ node: { id, image } }) => (
              <Card
                key={id || 'id' /** TODO should not be null */}
                id={id || 'id' /** TODO should not be null */}
                image={image || '' /** TODO should not be null */}
                selectedIds={selectedIds}
                setSelectedIds={ids =>
                  setSelectedIds(multiple ? ids : ids.slice(-1))
                }
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
);
