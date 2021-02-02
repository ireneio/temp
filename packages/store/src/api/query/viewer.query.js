const viewer = `
  viewer {
    id
    role
    name
    gender
    email
    locale
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
