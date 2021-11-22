// import
import { useQuery } from '@apollo/react-hooks';

// graphql typescript
import {
  getImage as getImageType,
  getImageVariables as getImageVariablesType,
  getImage_viewer_image as getImageViewerImageType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getImage } from '../gqls/useFindImage';

// definition
export default (url: string | null): getImageViewerImageType | null => {
  const id = url
    ? atob(
        url
          .replace(/\.[\w]+$/, '')
          .split('/')
          .slice(-1)[0],
      )
        .replace('gs://img.meepcloud.com/', 'https://gc.meepcloud.com/')
        .replace(/\.[\w+]+$/, '')
        .split('/')
        .slice(-1)[0]
    : null;

  const { data } = useQuery<getImageType, getImageVariablesType>(getImage, {
    skip: !id,
    variables: { id: id as string },
  });

  return data?.viewer?.image || null;
};
