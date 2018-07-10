const wishListQuery = `
  id
  list {
    id
    createdOn
    title {
      zh_TW
    }
    galleryInfo {
      media
    }
    status
  }
`;

export default wishListQuery;
