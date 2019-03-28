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
    address {
      yahooCode {
        county
        city
        country
        street
      }
    }
  }
  birthday {
    year
    month
    day
  }
  recipientData {
    name
    mobile
    address {
      postalCode
      yahooCode {
        country
        city
        county
        street
      }
    }
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
    productImage {
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
