// typescript import
import { TagType, OptionType, RefetchType } from '../constants';

// import
import { useCallback, useState, useMemo } from 'react';
import useGetTags from './useGetTags';
import useSaveTags from './useSaveTags';

// typescript definition
interface ReturnType {
  tags: TagType[];
  options: OptionType[];
  ableToSaveTags: boolean;
  refetch: RefetchType;
  addTag: (values: { tag: string }) => void;
  removeTag: (value: TagType) => void;
  saveTags: () => void;
}

// definition
export default (
  orderIds: string[],
  resetFields: () => void,
  onClose: () => void,
): ReturnType => {
  const [orderTagNamesToAdd, setOrderTagNamesToAdd] = useState<string[]>([]);
  const [orderTagIdsToRemove, setOrderTagIdsToRemove] = useState<TagType[]>([]);
  const { tags, setTags, refetch, options } = useGetTags(orderIds);
  const saveTags = useSaveTags({
    orderIds,
    onClose,
    orderTagNamesToAdd,
    orderTagIdsToRemove,
  });

  return {
    tags,
    options: useMemo(
      () => [
        ...orderTagIdsToRemove.map(tag => ({ value: tag.value })),
        ...options.filter(
          option => !tags.some(tag => option.value === tag.value),
        ),
      ],
      [options, orderTagIdsToRemove, tags],
    ),
    ableToSaveTags: useMemo(
      () => !orderTagIdsToRemove.length && !orderTagNamesToAdd.length,
      [orderTagIdsToRemove.length, orderTagNamesToAdd.length],
    ),
    refetch,
    saveTags,
    addTag: useCallback(
      ({ tag }) => {
        const removeIndex = orderTagIdsToRemove.findIndex(
          removeTag => removeTag.value === tag,
        );

        if (removeIndex !== -1) {
          const newOrderTagIdsToRemove = [...orderTagIdsToRemove];
          const removeTag = newOrderTagIdsToRemove.splice(removeIndex, 1);

          setOrderTagIdsToRemove(newOrderTagIdsToRemove);
          setTags([...tags, removeTag[0]]);
        } else {
          setOrderTagNamesToAdd([...orderTagNamesToAdd, tag]);
          setTags([...tags, { id: tag, value: tag }]);
        }

        resetFields();
      },
      [orderTagIdsToRemove, orderTagNamesToAdd, resetFields, setTags, tags],
    ),
    removeTag: useCallback(
      tag => {
        const addIndex = orderTagNamesToAdd.findIndex(
          tagName => tagName === tag.value,
        );

        if (addIndex !== -1) {
          setOrderTagNamesToAdd([...orderTagNamesToAdd].splice(addIndex, 1));
        } else {
          setOrderTagIdsToRemove([...orderTagIdsToRemove, tag]);
        }

        setTags(tags.filter(oldTag => oldTag.value !== tag.value));
      },
      [orderTagIdsToRemove, orderTagNamesToAdd, setTags, tags],
    ),
  };
};
