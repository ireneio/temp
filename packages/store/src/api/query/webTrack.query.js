const webTrackQuery = `
  trackId
  trackType
  trackPage {
    status
    trackCode
    codeInfo {
      id
    }
  }
`;

export default webTrackQuery;
