const pointsQuery = `
  id
  points
  endTime
  startTime
  activityId
  note
  class
  status
  activity {
    zh_TW
  }
  title {
    zh_TW
  }
  unlimitedDate
`;

export default pointsQuery;
