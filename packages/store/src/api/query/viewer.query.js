const viewer = `
viewer {
  id
  role
  name
  gender
  email
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
}
`;

export default viewer;
