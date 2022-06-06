// typescript import
import { TagType, OptionType, RefetchType } from '../constants';

// import
import { useState, useMemo, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';

// graphql typescript
import {
  getTags as getTagsType,
  getTagsVariables as getTagsVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getTags } from '../gqls/useGetTags';

// defnition
export default (
  orderIds: string[],
): {
  refetch: RefetchType;
  tags: TagType[];
  setTags: (value: TagType[]) => void;
  options: OptionType[];
} => {
  const { data, refetch } = useQuery<getTagsType, getTagsVariablesType>(
    getTags,
    {
      variables: {
        orderIds,
        input: {
          orderIds,
        },
      },
    },
  );
  const [tags, setTags] = useState<TagType[]>([]);
  const isInitialDataLoaded = useRef(false);

  useEffect(() => {
    const mutualOrderTagsForOrders = (
      data?.mutualOrderTagsForOrders || []
    ).reduce(
      (results, tag) =>
        !tag ? results : [...results, { id: tag.id, value: tag.name }],
      [] as TagType[],
    );
    if (data && !isInitialDataLoaded.current) {
      setTags(mutualOrderTagsForOrders);
      isInitialDataLoaded.current = true;
    }
  }, [data]);

  return {
    refetch,
    tags,
    setTags,
    options: useMemo(
      () =>
        (data?.availableOrderTagsToAddToOrders || []).reduce(
          (results, tag) =>
            !tag ? results : [...results, { value: tag.name }],
          [] as OptionType[],
        ),
      [data],
    ),
  };
};
