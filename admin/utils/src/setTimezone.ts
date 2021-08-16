// definition
export default (date: string, timezone: number): number => {
  const toDate = new Date(date);
  return toDate.setHours(timezone + toDate.getUTCHours());
};
