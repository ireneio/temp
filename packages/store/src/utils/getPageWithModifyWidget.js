import * as R from 'ramda';
import * as Utils from 'utils';
import { modifyWidgetDataInServer } from 'lib';

export default async function(page, XMeepshopDomain, query, cookie) {
  // 整理data為了符合Layout Component結構，未來有可能在api server就幫前端整理好
  let blocks = Utils.getIn(['blocks'])(page).filter(
    ({ releaseDateTime }) =>
      !releaseDateTime ||
      parseInt(releaseDateTime, 10) * 1000 <= new Date().getTime(),
  );
  blocks = await Promise.all(
    blocks.map(async ({ width, componentWidth, widgets, ...block }) => ({
      ...block,
      width: [0, null].includes(width) ? 100 : width,
      componentWidth: componentWidth === null ? 0 : componentWidth,
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
