const userQuery = `
  id
  name
  groupId
  group {
    startDate
    expireDate
    unlimitedDate
  }
  email
  gender
  birthday {
    year
    month
    day
  }
  additionalInfo {
    mobile
    tel
    address {
      yahooCode {
        country
        city
        county
        street
      }
    }
  }
  recipientData {
    id
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
`;

export default userQuery;
