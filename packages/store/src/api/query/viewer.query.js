const viewer = `
  viewer {
    id
    role
    name
    gender
    email
    locale
    groupId
    group {
      startDate
      expireDate
      unlimitedDate
    }
    additionalInfo {
      mobile
      tel
    }
    address {
      country {
        id
      }
      city {
        id
      }
      area {
        id
      }
      street
      zipCode
    }
    birthday {
      year
      month
      day
    }

    notification {
      newsletters {
        cancelEmail
      }
    }

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

    rewardPoint {
      expiringPoints(expireBy: $expireBy) {
        total
      }
    }

    store {
      id
      setting {
        locale
      }
    }
  }
`;

export default viewer;
