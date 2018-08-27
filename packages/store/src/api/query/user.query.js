const userQuery = `
  id
  name
  groupId
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
    name
    mobile
    address {
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
