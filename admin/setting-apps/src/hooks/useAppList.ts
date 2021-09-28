// import
import { useMemo, useContext } from 'react';

import { Apps as AppsContext } from '@meepshop/context';
import {
  adminSettingAppsAnalytics,
  adminSettingAppsBulkDiscount,
  adminSettingAppsCoupon,
  adminSettingAppsFreeGift,
  adminSettingAppsFreeShipping,
  adminSettingAppsGroupDiscount,
  adminSettingAppsMemberGroup,
  adminSettingAppsMemberGroupCode,
  adminSettingAppsNewsletters,
  adminSettingAppsPoints,
  adminSettingAppsProductAuthority,
  adminSettingAppsProductDiscount,
  adminSettingAppsProductMassUpdate,
  adminSettingAppsTagDiscount,
  adminSettingAppsWebTrack,
} from '@meepshop/images';

// typescript definition
interface AppDetail {
  title:
    | 'analytics'
    | 'webTrack'
    | 'bulkdiscount'
    | 'freeGift'
    | 'freeShipping'
    | 'tagDiscount'
    | 'productDiscount'
    | 'groupDiscount'
    | 'points'
    | 'coupon'
    | 'newsletters'
    | 'memberGroup'
    | 'memberGroupCode'
    | 'productMassUpdate'
    | 'productAuthority';
  img: string;
  link?: string;
}

export interface AppListType extends AppDetail {
  id: string;
  isInstalled: boolean;
}

// definition
const appDetail: AppDetail[] = [
  {
    title: 'analytics',
    img: adminSettingAppsAnalytics,
  },
  {
    title: 'webTrack',
    img: adminSettingAppsWebTrack,
    link:
      'https://supportmeepshop.com/kb/%e6%95%b8%e6%93%9a%e5%bb%a3%e5%91%8a%e5%88%86%e6%9e%90%e8%a8%ad%e5%ae%9a/',
  },
  {
    title: 'bulkdiscount',
    img: adminSettingAppsBulkDiscount,
    link:
      'https://supportmeepshop.com/knowledgebase/%e8%a8%82%e5%96%ae%e6%bb%bf%e9%a1%8d%e6%8a%98%e6%89%a3/',
  },
  {
    title: 'freeGift',
    img: adminSettingAppsFreeGift,
    link:
      'https://supportmeepshop.com/knowledgebase/%e8%a8%82%e5%96%ae%e6%bb%bf%e9%a1%8d%e8%b4%88/',
  },
  {
    title: 'freeShipping',
    img: adminSettingAppsFreeShipping,
    link:
      'https://supportmeepshop.com/knowledgebase/%e8%a8%82%e5%96%ae%e6%bb%bf%e9%a1%8d%e5%85%8d%e9%81%8b/',
  },
  {
    title: 'tagDiscount',
    img: adminSettingAppsTagDiscount,
    link:
      'https://supportmeepshop.com/knowledgebase/%e5%95%86%e5%93%81%e6%bb%bf%e9%a1%8d%e6%8a%98%e6%89%a3/',
  },
  {
    title: 'productDiscount',
    img: adminSettingAppsProductDiscount,
    link:
      'https://supportmeepshop.com/knowledgebase/%e5%95%86%e5%93%81%e6%8a%98%e6%89%a3/',
  },
  {
    title: 'groupDiscount',
    img: adminSettingAppsGroupDiscount,
    link:
      'https://supportmeepshop.com/knowledgebase/%e5%95%86%e5%93%81%e9%81%b8%e9%81%b8%e6%a8%82/',
  },
  {
    title: 'points',
    img: adminSettingAppsPoints,
    link: 'https://supportmeepshop.com/kb/%e8%b3%bc%e7%89%a9%e9%87%91/',
  },
  {
    title: 'coupon',
    img: adminSettingAppsCoupon,
    link: 'https://supportmeepshop.com/kb/%e5%84%aa%e6%83%a0%e7%a2%bc/',
  },
  {
    title: 'newsletters',
    img: adminSettingAppsNewsletters,
    link:
      'https://supportmeepshop.com/knowledgebase/%E9%9B%BB%E5%AD%90%E5%A0%B1/',
  },
  {
    title: 'memberGroup',
    img: adminSettingAppsMemberGroup,
    link:
      'https://supportmeepshop.com/knowledgebase/%E6%9C%83%E5%93%A1%E7%AD%89%E7%B4%9A%E8%A8%AD%E5%AE%9A/',
  },
  {
    title: 'memberGroupCode',
    img: adminSettingAppsMemberGroupCode,
    link:
      'https://supportmeepshop.com/knowledgebase/%E6%9C%83%E5%93%A1%E7%BE%A4%E7%B5%84%E4%BB%A3%E7%A2%BC%E8%A8%AD%E5%AE%9A/',
  },
  {
    title: 'productMassUpdate',
    img: adminSettingAppsProductMassUpdate,
    link:
      'https://supportmeepshop.com/knowledgebase/%e5%95%86%e5%93%81%e5%a4%a7%e9%87%8f%e6%9b%b4%e6%96%b0/',
  },
  {
    title: 'productAuthority',
    img: adminSettingAppsProductAuthority,
    link:
      'https://supportmeepshop.com/knowledgebase/%e5%95%86%e5%93%81%e6%ac%8a%e9%99%90%e8%a8%ad%e5%ae%9a/',
  },
];

export default (): AppListType[] => {
  const apps = useContext(AppsContext);

  return useMemo(
    () =>
      appDetail.map(({ title, ...detail }) => ({
        ...detail,
        title,
        id: apps[title].storeAppId || 'none-id' /** SHOULD_NOT_BE_NULL */,
        isInstalled: apps[title].isInstalled,
      })),
    [apps],
  );
};
