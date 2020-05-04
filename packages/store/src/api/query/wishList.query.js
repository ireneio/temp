export default `
  viewer {
    wishlist {
      id
      productId
      createdAt
      title {
        zh_TW
      }
      coverImage {
        scaledSrc {
          w60
          w120
          w240
          w480
          w720
          w960
          w1200
          w1440
          w1680
          w1920
        }
      }
      isAvailableForSale
    }
  }
`;
