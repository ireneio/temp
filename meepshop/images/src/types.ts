// import
import getImage from './getImage';

// definition
// Only for typescript, do not import
const mockData = { stage: 'stage', production: 'production' };
const mockScaledSrc = {
  w60: mockData,
  w120: mockData,
  w240: mockData,
  w480: mockData,
  w720: mockData,
  w960: mockData,
  w1200: mockData,
  w1440: mockData,
  w1680: mockData,
  w1920: mockData,
};

/* eslint-disable @typescript-eslint/camelcase */
export const dashboardCost = mockData;
export const meepshopLogo = mockData;
export const dashboardCost_scaledSrc = mockScaledSrc;
export const pageManagerEmpty = mockData;
export const pageManagerTopMenu = mockData;
export const pageManagerTopAndSideMenu = mockData;
export const pageManagerDoubleTopMenu = mockData;
export const pageManagerAllMenu = mockData;
export const pageManagerPageTipPath_w200 = mockData;
export const pageManagerPageTipTab_w200 = mockData;
export const uploadImage_w56 = mockData;
export const storeClose = mockData;

export default getImage;
