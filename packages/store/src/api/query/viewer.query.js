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
      src
    }
    isAvailableForSale
  }

  rewardPoint {
    currentBalance
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
