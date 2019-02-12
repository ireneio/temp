const getKeys = pages =>
  (pages || []).reduce(
    (result, { id: pageId, pages: subPages }) => [
      ...result,
      ...getKeys(subPages),
      pageId,
    ],
    [],
  );

export default getKeys;
