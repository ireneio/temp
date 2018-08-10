import * as R from 'ramda';

import getIn from './getIn';
import modifyWidgetDataInServer from './modifyWidgetDataInServer';

export default async function(page, XMeepshopDomain, query, cookie) {
  // 整理data為了符合Layout Component結構，未來有可能在api server就幫前端整理好
  let blocks = getIn(['blocks'])(page).filter(
    ({ releaseDateTime }) =>
      !releaseDateTime ||
      parseInt(releaseDateTime, 10) * 1000 <= new Date().getTime(),
  );
  blocks = await Promise.all(
    blocks.map(async ({ width, componentWidth, widgets, ...block }) => ({
      ...block,
      width: [0, null, undefined].includes(width) ? 100 : width,
      componentWidth: componentWidth || 0,
      // 整理及過濾Server-side rendering時的module資料，未來有可能在api server就幫前端整理好
      widgets: await modifyWidgetDataInServer(
        widgets,
        XMeepshopDomain,
        query,
        cookie,
      ),
    })),
  );
  return R.assocPath(['blocks'], blocks, page);
}
