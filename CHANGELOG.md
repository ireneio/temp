# CHANGELOG

## 0.80.48 (2021-09-17)

#### :boom: Breaking Change

- Other
  - [#1751](https://github.com/meepshop/meep-lerna/pull/1751) 內部開單 - 搬 modules 到新位置 ([@happycat6323](https://github.com/happycat6323))
- `storybook`
  - [#1750](https://github.com/meepshop/meep-lerna/pull/1750) 內部開單 - 搬 modules 到新位置 - modules 和 divider ([@happycat6323](https://github.com/happycat6323))

#### :rocket: New Feature

- `meep-ui`
  - [#1713](https://github.com/meepshop/meep-lerna/pull/1713) 內部開單 - 搬移 GlobalStyles 至 color context ([@piovischioh](https://github.com/piovischioh))
- `store`
  - [#1743](https://github.com/meepshop/meep-lerna/pull/1743) 內部開單 - logToServer 改用新的 logger ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#1740](https://github.com/meepshop/meep-lerna/pull/1740) 【BUG】前台 input 輸入文字 - 色彩配置#4 網頁文字色 ([@happycat6323](https://github.com/happycat6323))
- `store`
  - [#1752](https://github.com/meepshop/meep-lerna/pull/1752) T9266 - 內部開單 - 修正 logger log level 以及 code style ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `meep-ui`
  - [#1713](https://github.com/meepshop/meep-lerna/pull/1713) 內部開單 - 搬移 GlobalStyles 至 color context ([@piovischioh](https://github.com/piovischioh))
- `store`
  - [#1738](https://github.com/meepshop/meep-lerna/pull/1738) 在 /sitemaps/v1 底下埋 logger ([@piovischioh](https://github.com/piovischioh))
- Other
  - [#1751](https://github.com/meepshop/meep-lerna/pull/1751) 內部開單 - 搬 modules 到新位置 ([@happycat6323](https://github.com/happycat6323))
- `storybook`
  - [#1750](https://github.com/meepshop/meep-lerna/pull/1750) 內部開單 - 搬 modules 到新位置 - modules 和 divider ([@happycat6323](https://github.com/happycat6323))

#### Committers: 3

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.80.47 (2021-09-15)

#### :bug: Bug Fix

- [#1744](https://github.com/meepshop/meep-lerna/pull/1744) 【BUG】一般分頁/快速滑動按鈕：前台未顯示 ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- [#1742](https://github.com/meepshop/meep-lerna/pull/1742) T9220 - 內部開單 - 移除 @meepshop/utils/lib/logger ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.80.46 (2021-09-14)

#### :bug: Bug Fix

- `store`
  - [#1741](https://github.com/meepshop/meep-lerna/pull/1741) 【BUG】 獨立編輯商品頁 - 後台點選預覽，頁面顯示 404 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.45 (2021-09-14)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#1724](https://github.com/meepshop/meep-lerna/pull/1724) 內部開單 - 商品輪播圖、商品圖片集元件、商品問答元件、瀏覽追蹤元件 使用新元件 ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `store`
  - [#1728](https://github.com/meepshop/meep-lerna/pull/1728) 內部開單 - 將 404.js, 500.js 從 \_error.js 拆出來 ([@Lexiwu](https://github.com/Lexiwu))
- `meep-ui`, `store`
  - [#1735](https://github.com/meepshop/meep-lerna/pull/1735) 內部開單 - 統一前端 logger message ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `store`
  - [#1728](https://github.com/meepshop/meep-lerna/pull/1728) 內部開單 - 將 404.js, 500.js 從 \_error.js 拆出來 ([@Lexiwu](https://github.com/Lexiwu))

#### Committers: 2

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.44 (2021-09-13)

#### :rocket: New Feature

- `store`
  - [#1721](https://github.com/meepshop/meep-lerna/pull/1721) 內部開單 - 在部分頁面裡面不再從 redux 拿資料 - part2 ([@HsuTing](https://github.com/HsuTing))
  - [#1720](https://github.com/meepshop/meep-lerna/pull/1720) 內部開單 - 改用 apollo-client 拿所有頁面資料 ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`
  - [#1725](https://github.com/meepshop/meep-lerna/pull/1725) 【優化】 結帳頁金流說明 - 深色系背景文字顯示 ([@happycat6323](https://github.com/happycat6323))

#### :house: Internal

- `store`
  - [#1718](https://github.com/meepshop/meep-lerna/pull/1718) 內部開單 - 搬移 pages 檔案位置 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 3

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.80.43 (2021-09-10)

#### :bug: Bug Fix

- [#1723](https://github.com/meepshop/meep-lerna/pull/1723) 內部開單 - 修正 draft-js warning ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.42 (2021-09-10)

#### :bug: Bug Fix

- [#1732](https://github.com/meepshop/meep-lerna/pull/1732) 【BUG】 後台未登入狀態沒有自動跳轉至登入頁 ([@piovischioh](https://github.com/piovischioh))
- [#1730](https://github.com/meepshop/meep-lerna/pull/1730) (@meepshop/product-carousel) Fix style error ([@HsuTing](https://github.com/HsuTing))
- [#1731](https://github.com/meepshop/meep-lerna/pull/1731) (@meepshop/product-qa) Fix role error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.80.41 (2021-09-08)

#### :bug: Bug Fix

- `store`
  - [#1727](https://github.com/meepshop/meep-lerna/pull/1727) 【BUG】Ecpay sdk not found ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- Cate Wang ([@happycat6323](https://github.com/happycat6323))

## 0.80.40 (2021-09-07)

#### :bug: Bug Fix

- `storybook`
  - [#1722](https://github.com/meepshop/meep-lerna/pull/1722) internal - (@meepshop/icons) Remove icons mock ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- Cate Wang ([@happycat6323](https://github.com/happycat6323))

## 0.80.39 (2021-09-07)

#### :rocket: New Feature

- `meep-ui`
  - [#1675](https://github.com/meepshop/meep-lerna/pull/1675) 【功能】串接綠界站內付 2.0 - 前端 ([@happycat6323](https://github.com/happycat6323))
- `store`
  - [#1712](https://github.com/meepshop/meep-lerna/pull/1712) T9111 - 內部開單 - client side schema 使用新的 logger ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.38 (2021-09-06)

#### :boom: Breaking Change

- `store`
  - [#1706](https://github.com/meepshop/meep-lerna/pull/1706) T9083 - 內部開單 - 在 我的收藏 頁面裡面不再從 redux 拿資料 ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#1708](https://github.com/meepshop/meep-lerna/pull/1708) 內部開單 - 臉書牆、臉書按讚元件、地圖元件 使用新元件 ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#1710](https://github.com/meepshop/meep-lerna/pull/1710) 內部開單 - 改用 apollo-client 拿首頁頁面資料 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#1717](https://github.com/meepshop/meep-lerna/pull/1717) 【BUG】前台 - 國泰世華虛擬帳號付款 - thank-you-page 顯示空白 ([@piovischioh](https://github.com/piovischioh))
- [#1715](https://github.com/meepshop/meep-lerna/pull/1715) chore(deps): bump tar from 4.4.15 to 4.4.19 ([@dependabot[bot]](https://github.com/apps/dependabot))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.80.37 (2021-09-01)

#### :bug: Bug Fix

- [#1690](https://github.com/meepshop/meep-lerna/pull/1690) 內部開單 - 統一 validator version ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#1593](https://github.com/meepshop/meep-lerna/pull/1593) Internal - 重新命名 redirects package name ([@Lexiwu](https://github.com/Lexiwu))

#### Committers: 2

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.36 (2021-08-31)

#### :boom: Breaking Change

- `store`
  - [#1704](https://github.com/meepshop/meep-lerna/pull/1704) T9089 - 內部開單 - 新的 logger ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- [#1677](https://github.com/meepshop/meep-lerna/pull/1677) 內部開單 - 修正 rc-picker bundle size 過大 ([@Lexiwu](https://github.com/Lexiwu))
- [#1703](https://github.com/meepshop/meep-lerna/pull/1703) 新增 @store/cart-previewer ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- Other
  - [#1677](https://github.com/meepshop/meep-lerna/pull/1677) 內部開單 - 修正 rc-picker bundle size 過大 ([@Lexiwu](https://github.com/Lexiwu))
- `store`
  - [#1704](https://github.com/meepshop/meep-lerna/pull/1704) T9089 - 內部開單 - 新的 logger ([@HsuTing](https://github.com/HsuTing))
  - [#1705](https://github.com/meepshop/meep-lerna/pull/1705) (@meepshop/next-store) Remove unused code in server ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.80.35 (2021-08-26)

#### :bug: Bug Fix

- [#1698](https://github.com/meepshop/meep-lerna/pull/1698) 內部開單 - 修正 draft-js OOM 問題 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.34 (2021-08-25)

#### :rocket: New Feature

- `meep-ui`
  - [#1602](https://github.com/meepshop/meep-lerna/pull/1602) 前端 - 改用 createOrder ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `meep-ui`
  - [#1680](https://github.com/meepshop/meep-lerna/pull/1680) 前端 - getProducts sort method ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.33 (2021-08-24)

#### :bug: Bug Fix

- [#1700](https://github.com/meepshop/meep-lerna/pull/1700) 【BUG】 購物車數量調整箭頭按鈕 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.80.32 (2021-08-24)

#### :boom: Breaking Change

- `meep-ui`
  - [#1651](https://github.com/meepshop/meep-lerna/pull/1651) 內部開單 - 移除 meep-ui 內使用的 getData ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- Other
  - [#1638](https://github.com/meepshop/meep-lerna/pull/1638) 內部開單 - 前台會員資料改用 @meepshop/date-picker ([@Lexiwu](https://github.com/Lexiwu))
  - [#1682](https://github.com/meepshop/meep-lerna/pull/1682) 內部開單 - 額外檢查 recaptcha 是否有被 render ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`, `mock-types`
  - [#1685](https://github.com/meepshop/meep-lerna/pull/1685) 新增 @store/cart ([@piovischioh](https://github.com/piovischioh))
- `store`
  - [#1697](https://github.com/meepshop/meep-lerna/pull/1697) (@meepshop/frontend) Add more process handler ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#1673](https://github.com/meepshop/meep-lerna/pull/1673) 內部開單 - 修正第三方套件 dynamic import ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#1696](https://github.com/meepshop/meep-lerna/pull/1696) internal - 增加 code owner ([@Lexiwu](https://github.com/Lexiwu))

#### Committers: 3

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.80.31 (2021-08-23)

#### :bug: Bug Fix

- `meep-ui`
  - [#1672](https://github.com/meepshop/meep-lerna/pull/1672) 修改 currentMinPurchasableQty - 前端 ([@piovischioh](https://github.com/piovischioh))
- `store`
  - [#1671](https://github.com/meepshop/meep-lerna/pull/1671) 【BUG】前台 - Page not found 頁面異常 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `meep-ui`
  - [#1672](https://github.com/meepshop/meep-lerna/pull/1672) 修改 currentMinPurchasableQty - 前端 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.80.30 (2021-08-23)

#### :rocket: New Feature

- [#1692](https://github.com/meepshop/meep-lerna/pull/1692) internal - 修改 @admin/block 分隔線 ([@Lexiwu](https://github.com/Lexiwu))
- [#1691](https://github.com/meepshop/meep-lerna/pull/1691) internal - 新增購物設定 package ([@Lexiwu](https://github.com/Lexiwu))

#### :bug: Bug Fix

- `meep-ui`
  - [#1695](https://github.com/meepshop/meep-lerna/pull/1695) 【BUG】 選單目錄 - 第三層選單消失 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `mock-types`
  - [#1689](https://github.com/meepshop/meep-lerna/pull/1689) (@meepshop/mock-types): add mock store ([@piovischioh](https://github.com/piovischioh))

#### Committers: 3

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.80.29 (2021-08-20)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#1686](https://github.com/meepshop/meep-lerna/pull/1686) Revert 內部開單 - 簡化 menu, activities query ([@meepshop-bot](https://github.com/meepshop-bot))

#### :rocket: New Feature

- [#1681](https://github.com/meepshop/meep-lerna/pull/1681) (@meepshop/frontend) Add pull request template ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#1683](https://github.com/meepshop/meep-lerna/pull/1683) 【BUG】部分商店前台 500 error ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#1684](https://github.com/meepshop/meep-lerna/pull/1684) (@meepshop/frontend) Add more information in pull request template ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@meepshop-bot](https://github.com/meepshop-bot)

## 0.80.28 (2021-08-17)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#1663](https://github.com/meepshop/meep-lerna/pull/1663) 內部開單 - 簡化 menu, activities query ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.27 (2021-08-16)

#### :rocket: New Feature

- `meep-ui`
  - [#1645](https://github.com/meepshop/meep-lerna/pull/1645) 內部開單 - landing page 改用 @meephsop/date-picker ([@Lexiwu](https://github.com/Lexiwu))
- Other
  - [#1654](https://github.com/meepshop/meep-lerna/pull/1654) 內部開單 - next-admin 改用 date-fns ([@Lexiwu](https://github.com/Lexiwu))
  - [#1659](https://github.com/meepshop/meep-lerna/pull/1659) 內部開單 - next-store 改用 date-fns 2 ([@Lexiwu](https://github.com/Lexiwu))
  - [#1666](https://github.com/meepshop/meep-lerna/pull/1666) 新增 @store/checkout-steps ([@piovischioh](https://github.com/piovischioh))
- `meep-ui`, `mock-types`, `store`
  - [#1658](https://github.com/meepshop/meep-lerna/pull/1658) 內部開單 - next-store 改用 date-fns ([@Lexiwu](https://github.com/Lexiwu))
- `store`
  - [#1628](https://github.com/meepshop/meep-lerna/pull/1628) internal - (@store/ecpay) Add ecpay page ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `meep-ui`
  - [#1678](https://github.com/meepshop/meep-lerna/pull/1678) (@meepshop/frontend) Remove not used ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#1676](https://github.com/meepshop/meep-lerna/pull/1676) (@meepshop/next-store) Remove not used env ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#1664](https://github.com/meepshop/meep-lerna/pull/1664) (URL) 內部開單 - 導入 graphql scalar typescript type ([@HsuTing](https://github.com/HsuTing))

#### Committers: 4

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.80.26 (2021-08-06)

#### :bug: Bug Fix

- `meep-ui`
  - [#1669](https://github.com/meepshop/meep-lerna/pull/1669) 【BUG】 結帳頁面 - 舊有會員姓名無法刪除 ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#1668](https://github.com/meepshop/meep-lerna/pull/1668) (@meepshop/frontend) Fix testing error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.25 (2021-08-05)

Update cache

## 0.80.24 (2021-08-05)

#### :bug: Bug Fix

- [#1667](https://github.com/meepshop/meep-lerna/pull/1667) (@meepshop/frontend) Fix circleci cache ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.23 (2021-08-05)

#### :boom: Breaking Change

- `meep-ui`
  - [#1640](https://github.com/meepshop/meep-lerna/pull/1640) T8750 - 內部開單 - 修改元件的 dynamic import 寫法 ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- [#1636](https://github.com/meepshop/meep-lerna/pull/1636) 內部開單 - @admin/date-picker 改用 @meepshop/date-picker ([@Lexiwu](https://github.com/Lexiwu))

#### :bug: Bug Fix

- `storybook`
  - [#1646](https://github.com/meepshop/meep-lerna/pull/1646) 內部開單 - 修正 menu icons dynamic import ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#1665](https://github.com/meepshop/meep-lerna/pull/1665) chore(deps): bump tar from 4.4.10 to 4.4.15 ([@dependabot[bot]](https://github.com/apps/dependabot))

#### Committers: 2

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.22 (2021-08-04)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#1653](https://github.com/meepshop/meep-lerna/pull/1653) 內部開單 - 移除 storeSetting ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.21 (2021-08-02)

#### :bug: Bug Fix

- [#1649](https://github.com/meepshop/meep-lerna/pull/1649) 【BUG】後台 - 付款設定頁面，顯示儲存反饋訊息後，右上取消＆儲存按鈕未消失 ([@happycat6323](https://github.com/happycat6323))
- [#1661](https://github.com/meepshop/meep-lerna/pull/1661) 【BUG】 GA 商品價格抓取參數不同 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- [@piovischioh](https://github.com/piovischioh)

## 0.80.20 (2021-07-30)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#1635](https://github.com/meepshop/meep-lerna/pull/1635) 【優化】結帳頁首次購買/一頁式 - 輸入已註冊的會員信箱時，展開視窗讓會員登入 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.80.19 (2021-07-28)

#### :bug: Bug Fix

- [#1660](https://github.com/meepshop/meep-lerna/pull/1660) 【BUG】 ＧＭＯ金流 前台使用信用卡付款無法選分期 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.80.18 (2021-07-27)

#### :rocket: New Feature

- [#1655](https://github.com/meepshop/meep-lerna/pull/1655) 內部開單 - 導入 graphql scalar typescript type ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- Other
  - [#1648](https://github.com/meepshop/meep-lerna/pull/1648) 【BUG】商品在有庫存的狀態下，前台應顯示可購買之規格 ([@happycat6323](https://github.com/happycat6323))
- `mock-types`
  - [#1656](https://github.com/meepshop/meep-lerna/pull/1656) (@meepshop/types) Fix meepshopPositiveInt types error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.17 (2021-07-23)

#### :bug: Bug Fix

- `meep-ui`
  - [#1627](https://github.com/meepshop/meep-lerna/pull/1627) 內部開單 - 統一 draft-js version ([@HsuTing](https://github.com/HsuTing))
  - [#1641](https://github.com/meepshop/meep-lerna/pull/1641) 【BUG】前台 - 購物車 - 商品金額底下出現「超出可購買數量」提醒文字 ([@Lexiwu](https://github.com/Lexiwu))
- Other
  - [#1643](https://github.com/meepshop/meep-lerna/pull/1643) 【個別店家】 首頁 seo 設定 - 錯誤訊息 ([@HsuTing](https://github.com/HsuTing))
  - [#1642](https://github.com/meepshop/meep-lerna/pull/1642) 【BUG】後台 - 頁面設計，進入編輯頁面，按返回，預覽頁面跑版 ([@HsuTing](https://github.com/HsuTing))
  - [#1647](https://github.com/meepshop/meep-lerna/pull/1647) (@meepshop/frontend) Fix dynamic import path ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.16 (2021-07-20)

#### :bug: Bug Fix

- [#1644](https://github.com/meepshop/meep-lerna/pull/1644) 【BUG】prod 測試商店 bella53 帳單與付款頁跟付款設定頁不停切換 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- Cate Wang ([@happycat6323](https://github.com/happycat6323))

## 0.80.15 (2021-07-20)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#1629](https://github.com/meepshop/meep-lerna/pull/1629) 內部開單 - 簡化 activities query ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `meep-ui`
  - [#1588](https://github.com/meepshop/meep-lerna/pull/1588) Merchant/Helper 帳號輸入 email 時，即時轉換全小寫顯示，與移除阻擋警示 - 前端 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.14 (2021-07-19)

#### :rocket: New Feature

- [#1591](https://github.com/meepshop/meep-lerna/pull/1591) 前端 - 一頁式改用 createOrder ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- [#1632](https://github.com/meepshop/meep-lerna/pull/1632) 【BUG】後台 - 帳戶設定 - 顯示儲存反饋訊息後，右上取消＆儲存按鈕未消失 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- Cate Wang ([@happycat6323](https://github.com/happycat6323))

## 0.80.13 (2021-07-16)

#### :rocket: New Feature

- [#1302](https://github.com/meepshop/meep-lerna/pull/1302) 【功能】月租 - 後台付款設定 - 前端 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- [#1637](https://github.com/meepshop/meep-lerna/pull/1637) (@meepshop/apollo) Fix circular dependency ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.12 (2021-07-14)

#### :bug: Bug Fix

- `meep-ui`
  - [#1634](https://github.com/meepshop/meep-lerna/pull/1634) 【個別店家】前台 - 會員登入後，購物車顯示一片空白 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.11 (2021-07-14)

#### :bug: Bug Fix

- `meep-ui`
  - [#1633](https://github.com/meepshop/meep-lerna/pull/1633) 【BUG】 前台 - 最大商品購買量為 1 時無法下訂單 ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#1630](https://github.com/meepshop/meep-lerna/pull/1630) 內部開單 - 修正 next.js dynamic import ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.10 (2021-07-13)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#1606](https://github.com/meepshop/meep-lerna/pull/1606) 商品選數量改用新欄位 currentMinPurchasableQty / currentMaxPurchasableQty - 前端 ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `store`
  - [#1589](https://github.com/meepshop/meep-lerna/pull/1589) Internal - 簡化前端 @admin/server ([@Lexiwu](https://github.com/Lexiwu))

#### :bug: Bug Fix

- `meep-ui`
  - [#1613](https://github.com/meepshop/meep-lerna/pull/1613) 內部開單 - input 欄位 error 的背景顏色 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `meep-ui`, `store`
  - [#1608](https://github.com/meepshop/meep-lerna/pull/1608) 內部開單 - 移除沒有再用的 product 元件 ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#1589](https://github.com/meepshop/meep-lerna/pull/1589) Internal - 簡化前端 @admin/server ([@Lexiwu](https://github.com/Lexiwu))

#### Committers: 2

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.9 (2021-07-12)

#### :rocket: New Feature

- [#1623](https://github.com/meepshop/meep-lerna/pull/1623) (@meepshop/frontend) Add source map ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#1626](https://github.com/meepshop/meep-lerna/pull/1626) 【BUG】結帳頁 - 收件人資料選擇收件人範本，未帶出資料 ([@HsuTing](https://github.com/HsuTing))
  - [#1619](https://github.com/meepshop/meep-lerna/pull/1619) 【BUG】側邊選單樣式主題示意圖與實際顯示不同 ([@Lexiwu](https://github.com/Lexiwu))

#### Committers: 2

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.8 (2021-07-07)

#### :rocket: New Feature

- [#1335](https://github.com/meepshop/meep-lerna/pull/1335) 【優化】後台 - Message 全局提示樣式 ([@piovischioh](https://github.com/piovischioh))
- [#1622](https://github.com/meepshop/meep-lerna/pull/1622) (root) Update @meepshop/meep-cli ([@meepshop-bot](https://github.com/meepshop-bot))
- [#1620](https://github.com/meepshop/meep-lerna/pull/1620) (circleci) Update circleci config ([@meepshop-bot](https://github.com/meepshop-bot))
- [#1621](https://github.com/meepshop/meep-lerna/pull/1621) (root) Update @meepshop/meep-cli ([@meepshop-bot](https://github.com/meepshop-bot))

#### :bug: Bug Fix

- `store`
  - [#1618](https://github.com/meepshop/meep-lerna/pull/1618) 內部開單 - 減少 SSR 拿 page 的量 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@meepshop-bot](https://github.com/meepshop-bot)
- [@piovischioh](https://github.com/piovischioh)

## 0.80.7 (2021-07-06)

#### :bug: Bug Fix

- `meep-ui`
  - [#1616](https://github.com/meepshop/meep-lerna/pull/1616) 【BUG】 商品細節元件－前台與後台顯示顏色不一樣 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.80.6 (2021-07-05)

#### :bug: Bug Fix

- `meep-ui`
  - [#1617](https://github.com/meepshop/meep-lerna/pull/1617) 【個別店家】Checkout 重新選擇金流時，會跳轉到白色畫面 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.5 (2021-07-05)

#### :rocket: New Feature

- [#1424](https://github.com/meepshop/meep-lerna/pull/1424) 【功能】訂單歷程 - 階段一 - 前端 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.4 (2021-07-02)

#### :bug: Bug Fix

- `meep-ui`
  - [#1615](https://github.com/meepshop/meep-lerna/pull/1615) 【BUG】一頁式元件 - 無規格商品，前台無法選擇商品。 ([@piovischioh](https://github.com/piovischioh))
  - [#1614](https://github.com/meepshop/meep-lerna/pull/1614) 【個別店家】一頁式購物車元件 - 輸入 email 會跳空白 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.80.3 (2021-07-02)

#### :bug: Bug Fix

- `meep-ui`
  - [#1609](https://github.com/meepshop/meep-lerna/pull/1609) 內部開單 - 前台 - 會員資料生日欄位，input 背景顏色 ([@HsuTing](https://github.com/HsuTing))
  - [#1610](https://github.com/meepshop/meep-lerna/pull/1610) 【BUG】前台 - 結帳頁面，清空購物金欄位，購物車 panel 顯示錯誤 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.80.2 (2021-07-01)

#### :rocket: New Feature

- [#1605](https://github.com/meepshop/meep-lerna/pull/1605) 【優化】移除隔離金流相關文字 ([@piovischioh](https://github.com/piovischioh))
- [#1385](https://github.com/meepshop/meep-lerna/pull/1385) 【功能】 開放 User 自行註冊 - 試用期報價 api 調整 ([@happycat6323](https://github.com/happycat6323))

#### :house: Internal

- [#1607](https://github.com/meepshop/meep-lerna/pull/1607) (@meepshop/frontend) Remove code migration ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.80.1 (2021-06-30)

#### :rocket: New Feature

- [#1595](https://github.com/meepshop/meep-lerna/pull/1595) 【功能】 訂單 - 新增「綠界物流編號」欄位 - 前端 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.80.0 (2021-06-28)

#### :boom: Breaking Change

- `meep-ui`, `mock-types`, `store`
  - [#1481](https://github.com/meepshop/meep-lerna/pull/1481) T8192 - 內部開單 - antd 升級 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.55 (2021-06-25)

#### :rocket: New Feature

- [#1586](https://github.com/meepshop/meep-lerna/pull/1586) 訂單退換貨 -- GraphQL API 格式優化/重構 - 前端 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- Cate Wang ([@happycat6323](https://github.com/happycat6323))

## 0.79.54 (2021-06-22)

#### :rocket: New Feature

- [#1598](https://github.com/meepshop/meep-lerna/pull/1598) Add graphql version ([@HsuTing](https://github.com/HsuTing))
- [#1596](https://github.com/meepshop/meep-lerna/pull/1596) (root) Update @meepshop/meep-cli ([@meepshop-bot](https://github.com/meepshop-bot))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@meepshop-bot](https://github.com/meepshop-bot)

## 0.79.53 (2021-06-15)

#### :boom: Breaking Change

- [#1433](https://github.com/meepshop/meep-lerna/pull/1433) T7485 - 重構改用新 api - 消費者對訂單發出匯款通知 - 前端 ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- [#1590](https://github.com/meepshop/meep-lerna/pull/1590) (root) Update @meepshop/meep-cli ([@meepshop-bot](https://github.com/meepshop-bot))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@meepshop-bot](https://github.com/meepshop-bot)

## 0.79.52 (2021-06-08)

#### :boom: Breaking Change

- [#1463](https://github.com/meepshop/meep-lerna/pull/1463) 【功能】 綠界超商 - 大量手動拋單 ([@piovischioh](https://github.com/piovischioh))

#### :rocket: New Feature

- [#1469](https://github.com/meepshop/meep-lerna/pull/1469) 【優化】後台/訂單明細新增 & 同步：綠界物流編號、配送單號 ([@piovischioh](https://github.com/piovischioh))
- [#1463](https://github.com/meepshop/meep-lerna/pull/1463) 【功能】 綠界超商 - 大量手動拋單 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.79.51 (2021-06-02)

#### :bug: Bug Fix

- [#1528](https://github.com/meepshop/meep-lerna/pull/1528) 【BUG】@meepshop/recipients 列表 hover 未按照色彩計畫 ([@Lexiwu](https://github.com/Lexiwu))

#### Committers: 1

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))

## 0.79.50 (2021-05-28)

#### :rocket: New Feature

- [#1571](https://github.com/meepshop/meep-lerna/pull/1571) 【優化】修改後台設定自訂網域 - 文字說明 ([@Lexiwu](https://github.com/Lexiwu))

#### Committers: 1

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))

## 0.79.49 (2021-05-25)

#### :rocket: New Feature

- `meep-ui`
  - [#1545](https://github.com/meepshop/meep-lerna/pull/1545) 【功能】新增幣別：新加坡幣 SGD ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#1567](https://github.com/meepshop/meep-lerna/pull/1567) 【個別店家】 產品頁 - 500 Internal Server Error. ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.48 (2021-05-21)

#### :rocket: New Feature

- [#1557](https://github.com/meepshop/meep-lerna/pull/1557) 【優化】小幫手修改營運設定的錯誤訊息文字 - Design / 前端 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- Cate Wang ([@happycat6323](https://github.com/happycat6323))

## 0.79.47 (2021-05-17)

#### :bug: Bug Fix

- Other
  - [#1548](https://github.com/meepshop/meep-lerna/pull/1548) 【BUG】 規格無法正常選擇 ([@happycat6323](https://github.com/happycat6323))
- `meep-ui`
  - [#1546](https://github.com/meepshop/meep-lerna/pull/1546) 【BUG】前台 - 購物車 panel 商品數量位置跑版 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- [@piovischioh](https://github.com/piovischioh)

## 0.79.46 (2021-05-13)

#### :rocket: New Feature

- [#1524](https://github.com/meepshop/meep-lerna/pull/1524) 【優化】@admin/orders Remove readFragment ([@Lexiwu](https://github.com/Lexiwu))
- [#1517](https://github.com/meepshop/meep-lerna/pull/1517) 【優化】fragment 搬到 fragments folder - 1 ([@Lexiwu](https://github.com/Lexiwu))

#### :bug: Bug Fix

- `meep-ui`
  - [#1540](https://github.com/meepshop/meep-lerna/pull/1540) 【BUG】 有商品權限的頁面在未登入狀態，商品會顯示範例商品列表 ([@piovischioh](https://github.com/piovischioh))
  - [#1506](https://github.com/meepshop/meep-lerna/pull/1506) 【BUG】 商品上架未填最小/最大購買量，商品頁購買量應要顯示庫存的數量 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- [@piovischioh](https://github.com/piovischioh)

## 0.79.45 (2021-05-07)

#### :boom: Breaking Change

- `store`
  - [#1514](https://github.com/meepshop/meep-lerna/pull/1514) 內部開單 - conversion api 不經過 proxy ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- [#1489](https://github.com/meepshop/meep-lerna/pull/1489) 【優化】@meepshop/convenience-store-map 改成 function component ([@Lexiwu](https://github.com/Lexiwu))
- [#1376](https://github.com/meepshop/meep-lerna/pull/1376) 【優化】member-order 改成 function component ([@Lexiwu](https://github.com/Lexiwu))
- [#1452](https://github.com/meepshop/meep-lerna/pull/1452) 【優化】member-order-apply 改成 function component ([@Lexiwu](https://github.com/Lexiwu))

#### Committers: 2

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.44 (2021-05-06)

#### :bug: Bug Fix

- [#1525](https://github.com/meepshop/meep-lerna/pull/1525) 【BUG】結帳頁填國外地址，填完地址及郵遞區號，仍顯示紅字必填 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.43 (2021-05-05)

#### :rocket: New Feature

- [#1526](https://github.com/meepshop/meep-lerna/pull/1526) (root) Update @meepshop/meep-cli ([@meepshop-bot](https://github.com/meepshop-bot))

#### :bug: Bug Fix

- [#1527](https://github.com/meepshop/meep-lerna/pull/1527) internal - (@admin/page-manager) Fix query input ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- [@meepshop-bot](https://github.com/meepshop-bot)

## 0.79.42 (2021-05-05)

#### :rocket: New Feature

- [#1500](https://github.com/meepshop/meep-lerna/pull/1500) 前端 - implement client side 大小檢查 ([@piovischioh](https://github.com/piovischioh))
- [#1421](https://github.com/meepshop/meep-lerna/pull/1421) 頁面設計 page loading 數量限制 - Design/前端 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- [@piovischioh](https://github.com/piovischioh)

## 0.79.41 (2021-05-04)

#### :rocket: New Feature

- Other
  - [#1437](https://github.com/meepshop/meep-lerna/pull/1437) 內部開單 - 研究 apollo-client retry 機制 ([@happycat6323](https://github.com/happycat6323))
  - [#1430](https://github.com/meepshop/meep-lerna/pull/1430) 【優化】member-order-applications 改成 function component ([@Lexiwu](https://github.com/Lexiwu))
- `meep-ui`
  - [#1496](https://github.com/meepshop/meep-lerna/pull/1496) 前台 - 商品加入購物車反饋優化 ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- [#1521](https://github.com/meepshop/meep-lerna/pull/1521) Fix 【功能】訂單歷程 - 階段一 - 前端 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 4

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.79.40 (2021-05-03)

#### :bug: Bug Fix

- [#1513](https://github.com/meepshop/meep-lerna/pull/1513) 【BUG】 社群分享元件 - 404 Page not found ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.39 (2021-04-29)

#### :bug: Bug Fix

- `store`
  - [#1518](https://github.com/meepshop/meep-lerna/pull/1518) 【個別店家】 綠界信用卡刷卡資訊送出後，出現 SSL is not supported ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.38 (2021-04-29)

#### :bug: Bug Fix

- `store`
  - [#1515](https://github.com/meepshop/meep-lerna/pull/1515) 【BUG】 in app browser(FB / IG / Line) FB 登入異常 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.37 (2021-04-28)

#### :rocket: New Feature

- `meep-ui`
  - [#1351](https://github.com/meepshop/meep-lerna/pull/1351) T7406 - 內部開單 - 改用 withHook ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#1372](https://github.com/meepshop/meep-lerna/pull/1372) 【優化】member-password-change 改成 function component ([@Lexiwu](https://github.com/Lexiwu))

#### :bug: Bug Fix

- [#1510](https://github.com/meepshop/meep-lerna/pull/1510) 【BUG】 結帳頁會員資料欄位 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.36 (2021-04-27)

#### :bug: Bug Fix

- `store`
  - [#1512](https://github.com/meepshop/meep-lerna/pull/1512) (@meepshop/next-store, @meepshop/next-admin) Should remove lib after building server ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#1505](https://github.com/meepshop/meep-lerna/pull/1505) 【功能】 智慧轉換元件 - 移除白名單 toggle / 修改 ga view id 儲存 ([@meepshop-bot](https://github.com/meepshop-bot))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@meepshop-bot](https://github.com/meepshop-bot)

## 0.79.35 (2021-04-26)

#### :bug: Bug Fix

- `meep-ui`
  - [#1511](https://github.com/meepshop/meep-lerna/pull/1511) 【BUG】前台 - 頁面自動跳至 productList 異常（cname：nihow） ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.34 (2021-04-26)

#### :boom: Breaking Change

- `store`
  - [#1508](https://github.com/meepshop/meep-lerna/pull/1508) next-store to storefront-reverse-proxy ([@nukr](https://github.com/nukr))

#### Committers: 1

- nukr ([@nukr](https://github.com/nukr))

## 0.79.33 (2021-04-23)

#### :boom: Breaking Change

- [#1477](https://github.com/meepshop/meep-lerna/pull/1477) 【功能】Facebook Conversions API 串接 - 前端 ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#1473](https://github.com/meepshop/meep-lerna/pull/1473) 內部開單 - 前台 - Facebook Conversions API 串接 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.32 (2021-04-23)

#### :bug: Bug Fix

- `meep-ui`
  - [#1509](https://github.com/meepshop/meep-lerna/pull/1509) T8096 -【BUG】前台 - 頁面自動跳至 productList ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.31 (2021-04-22)

#### :rocket: New Feature

- [#1443](https://github.com/meepshop/meep-lerna/pull/1443) 前端 - ECFIT 訂單列表篩選建立時間，改使用 EcfitOrderFilterInput.createdAtRange ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- Other
  - [#1499](https://github.com/meepshop/meep-lerna/pull/1499) 後台 - 網址重新導向，操作按鈕顏色有誤 ([@Lexiwu](https://github.com/Lexiwu))
  - [#1501](https://github.com/meepshop/meep-lerna/pull/1501) 【BUG】 IE 瀏覽器 - 前台無法會員登入 ([@happycat6323](https://github.com/happycat6323))
- `meep-ui`
  - [#1503](https://github.com/meepshop/meep-lerna/pull/1503) 【BUG】 商品列表跳第二頁，跑到別的元件 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `store`
  - [#1406](https://github.com/meepshop/meep-lerna/pull/1406) 內部開單 - express 升級 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 3

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.30 (2021-04-22)

#### :bug: Bug Fix

- `meep-ui`
  - [#1507](https://github.com/meepshop/meep-lerna/pull/1507) 【BUG】贈品庫存不足，前台無法建立訂單 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.79.29 (2021-04-21)

#### :rocket: New Feature

- `meep-ui`
  - [#1444](https://github.com/meepshop/meep-lerna/pull/1444) 新增：手機版結帳頁 /checkout，無法結帳商品的明顯提示 ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#1299](https://github.com/meepshop/meep-lerna/pull/1299) T6897 - 【重構】商店設定 ([@Lexiwu](https://github.com/Lexiwu))
  - [#1487](https://github.com/meepshop/meep-lerna/pull/1487) 【優化】媒體櫃選取圖片順序的數字顯示 - 前端 ([@HsuTing](https://github.com/HsuTing))
  - [#1485](https://github.com/meepshop/meep-lerna/pull/1485) 【功能】Google Merchant Center 網域驗證 - 前端 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#1504](https://github.com/meepshop/meep-lerna/pull/1504) Revert 【功能】 智慧轉換元件 - 移除白名單 toggle / 修改 ga view id 儲存 ([@meepshop-bot](https://github.com/meepshop-bot))

#### Committers: 3

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@meepshop-bot](https://github.com/meepshop-bot)

## 0.79.28 (2021-04-19)

#### :rocket: New Feature

- [#1502](https://github.com/meepshop/meep-lerna/pull/1502) (root) Update @meepshop/meep-cli ([@meepshop-bot](https://github.com/meepshop-bot))

#### :house: Internal

- [#1448](https://github.com/meepshop/meep-lerna/pull/1448) 【功能】 智慧轉換元件 - 移除白名單 toggle / 修改 ga view id 儲存 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- [@meepshop-bot](https://github.com/meepshop-bot)
- [@piovischioh](https://github.com/piovischioh)

## 0.79.27 (2021-04-16)

#### :rocket: New Feature

- `meep-ui`
  - [#1486](https://github.com/meepshop/meep-lerna/pull/1486) 結帳頁-付款方式說明、運送方式說明預設展開 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.26 (2021-04-15)

#### :boom: Breaking Change

- `store`
  - [#1493](https://github.com/meepshop/meep-lerna/pull/1493) (@meepshop/frontend) Update circleci config ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#1498](https://github.com/meepshop/meep-lerna/pull/1498) 【個別店家】分隔線背景色關閉，前台會呈現白色 ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`
  - [#1497](https://github.com/meepshop/meep-lerna/pull/1497) 【BUG】 商品搜尋出現範例商品 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.24 (2021-04-12)

#### :bug: Bug Fix

- `meep-ui`
  - [#1495](https://github.com/meepshop/meep-lerna/pull/1495) (@meepshop/next-store, @meepshop/next-admin) Hotfix locales link fail ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.23 (2021-04-12)

#### :bug: Bug Fix

- `store`
  - [#1494](https://github.com/meepshop/meep-lerna/pull/1494) (@meepshop/frontend) Hotfix release fail ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.22 (2021-04-12)

#### :boom: Breaking Change

- `generate`, `storybook`
  - [#1490](https://github.com/meepshop/meep-lerna/pull/1490) (@meepshop/frontend) Use meep-cli locales command ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `meep-ui`
  - [#1369](https://github.com/meepshop/meep-lerna/pull/1369) 【功能】結帳頁 - 會員資料 - 欄位管理 - 前端 ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#1361](https://github.com/meepshop/meep-lerna/pull/1361) T6870 - 【功能】網址管理工具 - 前端 ([@Lexiwu](https://github.com/Lexiwu))

#### Committers: 2

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.21 (2021-04-09)

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#1491](https://github.com/meepshop/meep-lerna/pull/1491) (@meepshop/frontend) Hotfix C389 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.20 (2021-04-09)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#1472](https://github.com/meepshop/meep-lerna/pull/1472) 內部開單 - 部分套用新元件 ([@HsuTing](https://github.com/HsuTing))
  - [#1467](https://github.com/meepshop/meep-lerna/pull/1467) 內部開單 - productList 改用 apollo-client && SSR ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#1441](https://github.com/meepshop/meep-lerna/pull/1441) 前端 - 避免使用 orderproduct 多餘的欄位 ([@HsuTing](https://github.com/HsuTing))
  - [#1462](https://github.com/meepshop/meep-lerna/pull/1462) 【BUG】 手機版－選單的會員功能及購物車功能，無法收縮於左側選單 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.19 (2021-04-07)

#### :bug: Bug Fix

- `meep-ui`
  - [#1488](https://github.com/meepshop/meep-lerna/pull/1488) 【BUG】 手機版，使用 Chrome 開啟前台「前往結帳」的按鍵會被遮蔽 ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- `meep-ui`
  - [#1488](https://github.com/meepshop/meep-lerna/pull/1488) 【BUG】 手機版，使用 Chrome 開啟前台「前往結帳」的按鍵會被遮蔽 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.79.18 (2021-04-01)

#### :rocket: New Feature

- [#1484](https://github.com/meepshop/meep-lerna/pull/1484) (@admin/login, @store/fb) Add removeEventListener ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#1483](https://github.com/meepshop/meep-lerna/pull/1483) 【BUG】 從媒體櫃將圖片選入影像 1＆影像 2 內，圖片排序有 bug - 前端 ([@meepshop-bot](https://github.com/meepshop-bot))
- [#1482](https://github.com/meepshop/meep-lerna/pull/1482) Revert 【BUG】 從媒體櫃將圖片選入影像 1＆影像 2 內，圖片排序有 bug - 前端 ([@meepshop-bot](https://github.com/meepshop-bot))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@meepshop-bot](https://github.com/meepshop-bot)

## 0.79.17 (2021-03-30)

#### :rocket: New Feature

- [#1474](https://github.com/meepshop/meep-lerna/pull/1474) (circleci) Update circleci config ([@meepshop-bot](https://github.com/meepshop-bot))

#### :bug: Bug Fix

- [#1447](https://github.com/meepshop/meep-lerna/pull/1447) 【BUG】 從媒體櫃將圖片選入影像 1＆影像 2 內，圖片排序有 bug - 前端 ([@happycat6323](https://github.com/happycat6323))
- [#1478](https://github.com/meepshop/meep-lerna/pull/1478) (@meepshop/frontend) Fix build error ([@HsuTing](https://github.com/HsuTing))
- [#1476](https://github.com/meepshop/meep-lerna/pull/1476) (@meepshop/frontend) Fix component name error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@meepshop-bot](https://github.com/meepshop-bot)

## 0.79.16 (2021-03-24)

#### :bug: Bug Fix

- `meep-ui`
  - [#1470](https://github.com/meepshop/meep-lerna/pull/1470) 【BUG】前台 - 商品頁「可訂購時通知我」按鈕，點選之後，一直 loading ([@happycat6323](https://github.com/happycat6323))
- Other
  - [#1471](https://github.com/meepshop/meep-lerna/pull/1471) (@meepshop/locales) Fix testing error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.15 (2021-03-22)

#### :rocket: New Feature

- `meep-ui`
  - [#1407](https://github.com/meepshop/meep-lerna/pull/1407) 內部開單 - 優化前台已售完按鈕樣式 ([@Lexiwu](https://github.com/Lexiwu))
  - [#1454](https://github.com/meepshop/meep-lerna/pull/1454) 【優化】 選選樂的商品顯示會員可見價 ([@happycat6323](https://github.com/happycat6323))
- `store`
  - [#1456](https://github.com/meepshop/meep-lerna/pull/1456) 內部開單 - 補齊 next-i18next namespacesRequired ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`, `store`
  - [#1461](https://github.com/meepshop/meep-lerna/pull/1461) 內部開單 - component 自動加上 component name ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#1468](https://github.com/meepshop/meep-lerna/pull/1468) Revert 【優化】後台/訂單明細新增 & 同步：綠界物流編號、配送單號 ([@meepshop-bot](https://github.com/meepshop-bot))

#### Committers: 4

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@meepshop-bot](https://github.com/meepshop-bot)

## 0.79.14 (2021-03-19)

#### :rocket: New Feature

- [#1460](https://github.com/meepshop/meep-lerna/pull/1460) 【優化】後台/訂單明細新增 & 同步：綠界物流編號、配送單號 ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- [#1465](https://github.com/meepshop/meep-lerna/pull/1465) Internal - (@admin/smart-conversion-analysis): fix gqls ([@piovischioh](https://github.com/piovischioh))
- [#1464](https://github.com/meepshop/meep-lerna/pull/1464) (@meepshop/frontend) Remove pre-release schema ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#1465](https://github.com/meepshop/meep-lerna/pull/1465) Internal - (@admin/smart-conversion-analysis): fix gqls ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.79.13 (2021-03-16)

#### :rocket: New Feature

- `meep-ui`, `mock-types`, `store`
  - [#1455](https://github.com/meepshop/meep-lerna/pull/1455) (@meepshop/frontend) Move i18n to locales ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- Other
  - [#1439](https://github.com/meepshop/meep-lerna/pull/1439) 【BUG】訂單管理列表 hover 顏色未按照色彩計畫 ([@Lexiwu](https://github.com/Lexiwu))
  - [#1450](https://github.com/meepshop/meep-lerna/pull/1450) 第三方服務延後載入 ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`
  - [#1453](https://github.com/meepshop/meep-lerna/pull/1453) 【BUG】 商品頁開啟或重整會出現一秒庫存不足，才恢復正常 ([@HsuTing](https://github.com/HsuTing))
  - [#1445](https://github.com/meepshop/meep-lerna/pull/1445) 【BUG】前台未觸發的 StoreAdTrack ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.79.12 (2021-03-11)

#### :rocket: New Feature

- [#1322](https://github.com/meepshop/meep-lerna/pull/1322) 【優化】後台/訂單明細新增 & 同步：綠界物流編號、配送單號 ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- `meep-ui`
  - [#1451](https://github.com/meepshop/meep-lerna/pull/1451) (@meepshop/product-amount-selector) Rename package name ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.79.11 (2021-03-09)

#### :boom: Breaking Change

- `meep-ui`, `mock-types`
  - [#1435](https://github.com/meepshop/meep-lerna/pull/1435) T7763 - 內部開單 - 共用 @meepshop/product-spec-selector ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#1446](https://github.com/meepshop/meep-lerna/pull/1446) 【BUG】後台 - 登入頁面警示訊息出現 email.error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.10 (2021-03-05)

#### :rocket: New Feature

- `mock-types`
  - [#1391](https://github.com/meepshop/meep-lerna/pull/1391) 前端 - 改用 at timestamp 欄位 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- Cate Wang ([@happycat6323](https://github.com/happycat6323))

## 0.79.9 (2021-03-04)

#### :rocket: New Feature

- [#1387](https://github.com/meepshop/meep-lerna/pull/1387) 第三方服務延後載入 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#1415](https://github.com/meepshop/meep-lerna/pull/1415) 新增 @admin/orders ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.79.8 (2021-03-03)

#### :bug: Bug Fix

- `meep-ui`
  - [#1440](https://github.com/meepshop/meep-lerna/pull/1440) 【BUG】購物車流程 - 下架商品無顯示相對應提示訊息 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.7 (2021-03-02)

#### :rocket: New Feature

- `meep-ui`
  - [#1400](https://github.com/meepshop/meep-lerna/pull/1400) 前端 - createOrderList input 加上 userId ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `store`
  - [#1432](https://github.com/meepshop/meep-lerna/pull/1432) 移除不必要的 checkEmail query ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.6 (2021-02-25)

#### :bug: Bug Fix

- Other
  - [#1426](https://github.com/meepshop/meep-lerna/pull/1426) 智慧轉換元件 - 後台/信件數據顯示 ([@piovischioh](https://github.com/piovischioh))
- `mock-types`
  - [#1438](https://github.com/meepshop/meep-lerna/pull/1438) (@meepshop/frontend) Fix testing error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.79.5 (2021-02-24)

#### :rocket: New Feature

- [#1436](https://github.com/meepshop/meep-lerna/pull/1436) (circleci) Update circleci config ([@meepshop-bot](https://github.com/meepshop-bot))

#### Committers: 1

- [@meepshop-bot](https://github.com/meepshop-bot)

## 0.79.4 (2021-02-24)

#### :rocket: New Feature

- `generate`, `meep-ui`, `mock-types`, `store`, `storybook`
  - [#1377](https://github.com/meepshop/meep-lerna/pull/1377) T7321 - 內部開單 - 前端專案管理工具 @meepshop/meep-cli - 前端 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.3 (2021-02-22)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#1354](https://github.com/meepshop/meep-lerna/pull/1354) T7301 - 前端 - Change to use Color.imgInfo.image (Get/Update) ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- [#1375](https://github.com/meepshop/meep-lerna/pull/1375) 前端 - 改用 UserPoints.start/endAt ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- Other
  - [#1431](https://github.com/meepshop/meep-lerna/pull/1431) 【BUG】 商品加入購物車後，顯示「超出可購買數量」，但後台庫存足夠 ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#1425](https://github.com/meepshop/meep-lerna/pull/1425) skip - Fix pino logger bind ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.1 (2021-02-19)

#### :bug: Bug Fix

- Other
  - [#1429](https://github.com/meepshop/meep-lerna/pull/1429) 內部開單 - menu logo 點擊無法回到首頁 ([@HsuTing](https://github.com/HsuTing))
- `mock-types`
  - [#1428](https://github.com/meepshop/meep-lerna/pull/1428) (@admin/order-history-records) Fix schema types ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.79.0 (2021-02-18)

#### :rocket: New Feature

- [#1356](https://github.com/meepshop/meep-lerna/pull/1356) 【功能】月租 - 後台廣告事件追蹤 - 前端 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- Cate Wang ([@happycat6323](https://github.com/happycat6323))

## 0.78.0 (2021-02-17)

#### :rocket: New Feature

- `store`
  - [#1420](https://github.com/meepshop/meep-lerna/pull/1420) 內部開單 - PROD k8s 資源調整 - 前端 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#1427](https://github.com/meepshop/meep-lerna/pull/1427) (@meepshop/frontend) Remove not used schemas ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.77.0 (2021-02-09)

#### :boom: Breaking Change

- `mock-types`
  - [#1402](https://github.com/meepshop/meep-lerna/pull/1402) (@admin/order-history-records) Modify schemas ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `meep-ui`
  - [#1340](https://github.com/meepshop/meep-lerna/pull/1340) T7125 - 新增 email validator ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#1396](https://github.com/meepshop/meep-lerna/pull/1396) 內部開單 - STAGE k8s 資源調整 - 前端 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- Other
  - [#1416](https://github.com/meepshop/meep-lerna/pull/1416) /checkout 錯誤訊息標題：付款失敗改成「結帳失敗」 ([@HsuTing](https://github.com/HsuTing))
  - [#1423](https://github.com/meepshop/meep-lerna/pull/1423) (@admin/setting) Fix typo error ([@HsuTing](https://github.com/HsuTing))
  - [#1422](https://github.com/meepshop/meep-lerna/pull/1422) (@admin/setting) Fix title locale ([@HsuTing](https://github.com/HsuTing))
  - [#1419](https://github.com/meepshop/meep-lerna/pull/1419) (@meepshop/frontend) Add more types and move locales ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`
  - [#1418](https://github.com/meepshop/meep-lerna/pull/1418) 【BUG】在 checkout 頁，若商品超出購買量，沒有阻擋提示 ([@HsuTing](https://github.com/HsuTing))
  - [#1414](https://github.com/meepshop/meep-lerna/pull/1414) 【BUG】 商品頁顯示「已售完」，購物車卻還可以繼續選擇數量 ([@happycat6323](https://github.com/happycat6323))

#### :house: Internal

- [#1417](https://github.com/meepshop/meep-lerna/pull/1417) skip - (@admin/page-manager) Move gqls ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.76.8 (2021-02-03)

#### :boom: Breaking Change

- `store`
  - [#1413](https://github.com/meepshop/meep-lerna/pull/1413) 移除 page fixedTop, secondTop, fixedBottom, sidebar menuId ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- Other
  - [#1398](https://github.com/meepshop/meep-lerna/pull/1398) 補回訂單運送狀態 '8 資料有誤' - 前端 ([@happycat6323](https://github.com/happycat6323))
- `store`
  - [#1411](https://github.com/meepshop/meep-lerna/pull/1411) Revert Revert Revert 移除 page fixedTop, secondTop, fixedBottom, sidebar menuId ([@HsuTing](https://github.com/HsuTing))
  - [#1410](https://github.com/meepshop/meep-lerna/pull/1410) Revert Revert 移除 page fixedTop, secondTop, fixedBottom, sidebar menuId ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.76.7 (2021-02-02)

#### :rocket: New Feature

- `store`
  - [#1409](https://github.com/meepshop/meep-lerna/pull/1409) Revert 移除 page fixedTop, secondTop, fixedBottom, sidebar menuId ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing)

## 0.76.6 (2021-02-02)

#### :rocket: New Feature

- `store`
  - [#1368](https://github.com/meepshop/meep-lerna/pull/1368) 移除 page fixedTop, secondTop, fixedBottom, sidebar menuId ([@HsuTing](https://github.com/HsuTing))
  - [#1355](https://github.com/meepshop/meep-lerna/pull/1355) T7278 - 前端 - 改用 UserMemberGroupObjectType.expire/startAt ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `store`
  - [#1353](https://github.com/meepshop/meep-lerna/pull/1353) T7148 - 前端 - Use page.tabTitle instead of page.addressTitle ([@HsuTing](https://github.com/HsuTing))
  - [#1405](https://github.com/meepshop/meep-lerna/pull/1405) 內部開單 - 使用 json log 幫助 server debug ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.76.5 (2021-01-29)

#### :rocket: New Feature

- `meep-ui`
  - [#1363](https://github.com/meepshop/meep-lerna/pull/1363) 【優化】特約代碼使用新 API - 前端 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- [#1404](https://github.com/meepshop/meep-lerna/pull/1404) 【BUG】dashboard - 本月購物金到期通知信無出現數字 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.76.4 (2021-01-28)

#### :boom: Breaking Change

- [#1381](https://github.com/meepshop/meep-lerna/pull/1381) T7474 - 前端 - 移除 getDashboardInfo input 的 timeRange ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `store`
  - [#1386](https://github.com/meepshop/meep-lerna/pull/1386) 【優化】前台/頁面不存在(404)：新增前往商店首頁按鈕 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.76.3 (2021-01-28)

#### :rocket: New Feature

- [#1395](https://github.com/meepshop/meep-lerna/pull/1395) 【優化】move member-order blocks gqls to gqls folder ([@Lexiwu](https://github.com/Lexiwu))

#### :bug: Bug Fix

- `store`
  - [#1403](https://github.com/meepshop/meep-lerna/pull/1403) (@meepshop/store): fix widget default value ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- [@piovischioh](https://github.com/piovischioh)

## 0.76.2 (2021-01-27)

#### :rocket: New Feature

- [#1364](https://github.com/meepshop/meep-lerna/pull/1364) 前端 - OrderInvoice.issuedAt/invalidAt 改 DateTime ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- Other
  - [#1401](https://github.com/meepshop/meep-lerna/pull/1401) 【BUG】 使用 GMO 金流儲存信用卡號，無法送出訂單 ([@happycat6323](https://github.com/happycat6323))
- `meep-ui`
  - [#1399](https://github.com/meepshop/meep-lerna/pull/1399) 前台 - 修正選單功能 bug - 手機版 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.76.1 (2021-01-26)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#1309](https://github.com/meepshop/meep-lerna/pull/1309) 【優化】商品細節元件，新增「手機版選擇規格彈窗」設定 ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- [#1397](https://github.com/meepshop/meep-lerna/pull/1397) (@meepshop/apollo, @meepshop/cookies) Remove console.error, use console.log in server ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.76.0 (2021-01-26)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#1309](https://github.com/meepshop/meep-lerna/pull/1309) 【優化】商品細節元件，新增「手機版選擇規格彈窗」設定 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.75.6 (2021-01-25)

#### :bug: Bug Fix

- [#1394](https://github.com/meepshop/meep-lerna/pull/1394) (@meepshop/gmo-credit-card-form) Add @meepshop/link dependency ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- Cate Wang ([@happycat6323](https://github.com/happycat6323))

## 0.75.5 (2021-01-25)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#1344](https://github.com/meepshop/meep-lerna/pull/1344) T7360 - 前台 - 修正選單功能 bug ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `generate`, `meep-ui`
  - [#1318](https://github.com/meepshop/meep-lerna/pull/1318) T2024 - 【優化】 結帳頁面 - GMO 信用卡 - 欄位體驗優化 ([@Lexiwu](https://github.com/Lexiwu))

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#1344](https://github.com/meepshop/meep-lerna/pull/1344) T7360 - 前台 - 修正選單功能 bug ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#1389](https://github.com/meepshop/meep-lerna/pull/1389) 【BUG】後台已開啟快速滑動按鈕開關，但預覽頁面無出現按鈕 ([@happycat6323](https://github.com/happycat6323))

#### :memo: Documentation

- `storybook`
  - [#1390](https://github.com/meepshop/meep-lerna/pull/1390) skip - docs(@meepshop/frontend): modify readme ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- [#1393](https://github.com/meepshop/meep-lerna/pull/1393) (@store/unsubscribe-email) Modify detail ([@HsuTing](https://github.com/HsuTing))

#### Committers: 4

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.75.4 (2021-01-22)

#### :boom: Breaking Change

- `mock-types`, `storybook`
  - [#1373](https://github.com/meepshop/meep-lerna/pull/1373) (@meepshop/types) Add types package ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `mock-types`, `store`
  - [#1295](https://github.com/meepshop/meep-lerna/pull/1295) 【功能】購物金到期提醒 - 前端 ([@happycat6323](https://github.com/happycat6323))
- `generate`
  - [#1380](https://github.com/meepshop/meep-lerna/pull/1380) (@meepshop/locales) Use google translate as default ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#1392](https://github.com/meepshop/meep-lerna/pull/1392) skip - (@meepshop/frontend): resolve bizcharts ([@piovischioh](https://github.com/piovischioh))
- [#1388](https://github.com/meepshop/meep-lerna/pull/1388) (@meepshop/frontend) Fix deploy fail ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `generate`
  - [#1374](https://github.com/meepshop/meep-lerna/pull/1374) (@meepshop/frontend) Ignore @meepshop/mock-types import ([@HsuTing](https://github.com/HsuTing))
- `mock-types`, `storybook`
  - [#1373](https://github.com/meepshop/meep-lerna/pull/1373) (@meepshop/types) Add types package ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.75.3 (2021-01-19)

#### :bug: Bug Fix

- [#1383](https://github.com/meepshop/meep-lerna/pull/1383) 【功能】智慧轉換元件 - 前端 - 後期修正 ([@piovischioh](https://github.com/piovischioh))
- [#1384](https://github.com/meepshop/meep-lerna/pull/1384) (@admin/plan) Fix schema ([@happycat6323](https://github.com/happycat6323))
- [#1382](https://github.com/meepshop/meep-lerna/pull/1382) (@meepshop/frontend) Fix lock error ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#1383](https://github.com/meepshop/meep-lerna/pull/1383) 【功能】智慧轉換元件 - 前端 - 後期修正 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 3

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.75.2 (2021-01-14)

#### :bug: Bug Fix

- [#1378](https://github.com/meepshop/meep-lerna/pull/1378) 【功能】智慧轉換元件 - 前端 - 後期修正 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.75.1 (2021-01-14)

#### :rocket: New Feature

- `meep-ui`
  - [#1328](https://github.com/meepshop/meep-lerna/pull/1328) 【功能】修正新增/編輯會員與小幫手 email - Design/前端 ([@happycat6323](https://github.com/happycat6323))

#### :house: Internal

- [#1362](https://github.com/meepshop/meep-lerna/pull/1362) 【功能】智慧轉換元件 - 前端 - 後期修正 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- [@piovischioh](https://github.com/piovischioh)

## 0.75.0 (2021-01-11)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#1333](https://github.com/meepshop/meep-lerna/pull/1333) 【功能】快速滑動按鈕設定 - 前端 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- Cate Wang ([@happycat6323](https://github.com/happycat6323))

## 0.74.0 (2021-01-08)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#1349](https://github.com/meepshop/meep-lerna/pull/1349) T7249 - LandingPage SignUp api - 前端 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `mock-types`
  - [#1371](https://github.com/meepshop/meep-lerna/pull/1371) (@meepshop/mock-types) Fix types ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.73.3 (2021-01-07)

#### :bug: Bug Fix

- [#1367](https://github.com/meepshop/meep-lerna/pull/1367) (@meepshop/hooks) Support product null ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- Other
  - [#1370](https://github.com/meepshop/meep-lerna/pull/1370) (@admin/server) Modify k8s config ([@happycat6323](https://github.com/happycat6323))
  - [#1365](https://github.com/meepshop/meep-lerna/pull/1365) skip - (@meepshop/frontend) Modify typescript ([@HsuTing](https://github.com/HsuTing))
- `mock-types`
  - [#1366](https://github.com/meepshop/meep-lerna/pull/1366) skip - (@meepshop/mock-types) Modify typescript ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.73.2 (2021-01-05)

#### :rocket: New Feature

- `meep-ui`
  - [#1350](https://github.com/meepshop/meep-lerna/pull/1350) 【優化】訂單/商品問答 - 網址超連結功能 ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- [#1360](https://github.com/meepshop/meep-lerna/pull/1360) 【BUG 沒有帶正確的 token 給 meepshop-api ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- [@piovischioh](https://github.com/piovischioh)

## 0.73.1 (2021-01-04)

#### :rocket: New Feature

- `mock-types`
  - [#1286](https://github.com/meepshop/meep-lerna/pull/1286) skip - 【功能】網址管理工具 - 網址重新導向 - 前端 ([@Lexiwu](https://github.com/Lexiwu))

#### :bug: Bug Fix

- [#1347](https://github.com/meepshop/meep-lerna/pull/1347) T2076 - N312 【優化】收件人範本 - 點選編輯時，應跳至頁面下方的輸入文字區塊 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.73.0 (2020-12-29)

#### :rocket: New Feature

- Other
  - [#1155](https://github.com/meepshop/meep-lerna/pull/1155) 【功能】月租 - 後台試用期倒數提醒 - 前端 ([@happycat6323](https://github.com/happycat6323))
  - [#1170](https://github.com/meepshop/meep-lerna/pull/1170) 【功能】月租 - 後台選擇方案 - 前端 ([@happycat6323](https://github.com/happycat6323))
  - [#1348](https://github.com/meepshop/meep-lerna/pull/1348) (@store/utils) Add withHook HOC ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#913](https://github.com/meepshop/meep-lerna/pull/913) 【功能】後台 - 暫停營運 - 前端 ([@happycat6323](https://github.com/happycat6323))
- `mock-types`
  - [#1323](https://github.com/meepshop/meep-lerna/pull/1323) 後台 - 訂單歷程頁面 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#1346](https://github.com/meepshop/meep-lerna/pull/1346) (babel.config) Add @meepshop/thumbnail/gqls in module-resolver ([@happycat6323](https://github.com/happycat6323))
- [#1345](https://github.com/meepshop/meep-lerna/pull/1345) (@meepshop/locales) Update locales ([@happycat6323](https://github.com/happycat6323))
- [#1343](https://github.com/meepshop/meep-lerna/pull/1343) (@admin/order-history-records) Fix version error ([@HsuTing](https://github.com/HsuTing))
- [#1342](https://github.com/meepshop/meep-lerna/pull/1342) (@meepshop/locales) Delete .rej ([@happycat6323](https://github.com/happycat6323))

#### :house: Internal

- [#1358](https://github.com/meepshop/meep-lerna/pull/1358) (@meepshop/hooks): add useVariantsTree ([@piovischioh](https://github.com/piovischioh))
- [#1341](https://github.com/meepshop/meep-lerna/pull/1341) (@meepshop/\*) Move fragments to gqls ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.72.0 (2020-12-21)

#### :rocket: New Feature

- `meep-ui`
  - [#1131](https://github.com/meepshop/meep-lerna/pull/1131) 【功能】月租 - 後台註冊 - 前端 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- [#1339](https://github.com/meepshop/meep-lerna/pull/1339) adjust release message for zulip ([@Lexiwu](https://github.com/Lexiwu))

#### :house: Internal

- [#1337](https://github.com/meepshop/meep-lerna/pull/1337) (@meepshop/frontend) Remove lib path ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.71.2 (2020-12-18)

#### :boom: Breaking Change

- [#1331](https://github.com/meepshop/meep-lerna/pull/1331) 內部開單 - 消費者匯款通知 API 改用 updateOrder - 前端 ([@HsuTing](https://github.com/HsuTing))
- [#1334](https://github.com/meepshop/meep-lerna/pull/1334) (@meepshop/\*) Remove lib path ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#1327](https://github.com/meepshop/meep-lerna/pull/1327) 前端 - Avoid querying store.setting.design ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.71.1 (2020-12-17)

#### :rocket: New Feature

- `mock-types`
  - [#1277](https://github.com/meepshop/meep-lerna/pull/1277) 套用 pattern and default style ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`, `mock-types`, `store`
  - [#1326](https://github.com/meepshop/meep-lerna/pull/1326) (@meepshop/frontend) Add nprogress to apollo-client ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#1336](https://github.com/meepshop/meep-lerna/pull/1336) 【BUG】建立綠界信用卡訂單，頁面出現「你要提交的資訊未受到保護」 ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`
  - [#1330](https://github.com/meepshop/meep-lerna/pull/1330) (@meepshop/meep-ui) Fix path error ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#1332](https://github.com/meepshop/meep-lerna/pull/1332) (@meepshop/utils) Move files ([@HsuTing](https://github.com/HsuTing))
- [#1329](https://github.com/meepshop/meep-lerna/pull/1329) (@admin/\*) Add namespacesRequired to propsType ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.71.0 (2020-12-15)

#### :boom: Breaking Change

- `meep-ui`
  - [#1321](https://github.com/meepshop/meep-lerna/pull/1321) 將 call Login api 的順序改在 CreateOrder 之前 - 前端 ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- [#1316](https://github.com/meepshop/meep-lerna/pull/1316) 前端 - WishlistProduct.createdAt 改為 DateTime ([@Lexiwu](https://github.com/Lexiwu))

#### Committers: 2

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.70.2 (2020-12-14)

#### :rocket: New Feature

- [#1317](https://github.com/meepshop/meep-lerna/pull/1317) 【優化】後台第三方設定說明文字 ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- `meep-ui`
  - [#1320](https://github.com/meepshop/meep-lerna/pull/1320) 【BUG】送出訂單會有 network error ([@HsuTing](https://github.com/HsuTing))
- `mock-types`
  - [#1324](https://github.com/meepshop/meep-lerna/pull/1324) (@meepshop/mock-types) Fix type name ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.70.1 (2020-12-09)

#### :rocket: New Feature

- [#1304](https://github.com/meepshop/meep-lerna/pull/1304) 調整 gallery ([@Lexiwu](https://github.com/Lexiwu))
- [#1314](https://github.com/meepshop/meep-lerna/pull/1314) 調整 @admin/tooltip ([@Lexiwu](https://github.com/Lexiwu))

#### :bug: Bug Fix

- [#1315](https://github.com/meepshop/meep-lerna/pull/1315) 修 translate ([@Lexiwu](https://github.com/Lexiwu))
- [#1313](https://github.com/meepshop/meep-lerna/pull/1313) 移除 google auto translate ([@Lexiwu](https://github.com/Lexiwu))

#### Committers: 1

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))

## 0.70.0 (2020-12-07)

#### :bug: Bug Fix

- `mock-types`, `store`
  - [#1278](https://github.com/meepshop/meep-lerna/pull/1278) 【功能】智慧轉換元件 - 前端 - 後期修正 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.69.4 (2020-12-04)

#### :rocket: New Feature

- Other
  - [#1300](https://github.com/meepshop/meep-lerna/pull/1300) 【優化】後台 - 設定頁 header 樣式 ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`, `mock-types`
  - [#1229](https://github.com/meepshop/meep-lerna/pull/1229) 【重構】一頁式購物車元件 ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- `meep-ui`
  - [#1306](https://github.com/meepshop/meep-lerna/pull/1306) 【BUG】前台商品主圖沒有判斷 devicePixelRatio - 前端 ([@happycat6323](https://github.com/happycat6323))
- Other
  - [#1312](https://github.com/meepshop/meep-lerna/pull/1312) (@meepshop/locales): remove store/landing-page ([@piovischioh](https://github.com/piovischioh))
  - [#1310](https://github.com/meepshop/meep-lerna/pull/1310) (@meepshop/frontend) Remove pre-release menu schema ([@HsuTing](https://github.com/HsuTing))
  - [#1308](https://github.com/meepshop/meep-lerna/pull/1308) (@meepshop/landing-page) Fix styles import error ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `meep-ui`, `mock-types`
  - [#1229](https://github.com/meepshop/meep-lerna/pull/1229) 【重構】一頁式購物車元件 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 3

- Cate Wang ([@happycat6323](https://github.com/happycat6323))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh

## 0.69.3 (2020-11-30)

#### :bug: Bug Fix

- [#1305](https://github.com/meepshop/meep-lerna/pull/1305) 【BUG】沒吃到設定 primary-color ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- Cate Wang ([@happycat6323](https://github.com/happycat6323))

## 0.69.2 (2020-11-27)

#### :boom: Breaking Change

- `meep-ui`
  - [#1197](https://github.com/meepshop/meep-lerna/pull/1197) 【優化】點擊購物車商品主圖後，前往商品頁 ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `meep-ui`
  - [#1197](https://github.com/meepshop/meep-lerna/pull/1197) 【優化】點擊購物車商品主圖後，前往商品頁 ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#1293](https://github.com/meepshop/meep-lerna/pull/1293) setting-notification 改成 function component ([@Lexiwu](https://github.com/Lexiwu))
  - [#1255](https://github.com/meepshop/meep-lerna/pull/1255) 前端 - page && menu 套用欄位 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `mock-types`
  - [#1303](https://github.com/meepshop/meep-lerna/pull/1303) (@meepshop/images) Fix types error ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#1298](https://github.com/meepshop/meep-lerna/pull/1298) (@meepshop/frontend) Upgrade @types/react, @types/react-dom ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `mock-types`
  - [#1301](https://github.com/meepshop/meep-lerna/pull/1301) (@meepshop/mock-types, @meepshop/menu) Add more mock types and fix detail ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`, `store`
  - [#1297](https://github.com/meepshop/meep-lerna/pull/1297) 前端 - 移除 not used props and isServer ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.69.1 (2020-11-20)

#### :bug: Bug Fix

- `meep-ui`
  - [#1288](https://github.com/meepshop/meep-lerna/pull/1288) 【優化】頁腳選單 title 對齊位置 ([@piovischioh](https://github.com/piovischioh))
  - [#1294](https://github.com/meepshop/meep-lerna/pull/1294) 【BUG】手機版 - 選單元件若有購物車功能，顯示商品數量異常 ([@piovischioh](https://github.com/piovischioh))
  - [#1287](https://github.com/meepshop/meep-lerna/pull/1287) 【BUG】選單箭頭 icon 大小顯示有誤 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh

## 0.69.0 (2020-11-18)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#1290](https://github.com/meepshop/meep-lerna/pull/1290) 前端 - 移除 redux 裡面 updateWishList ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#1280](https://github.com/meepshop/meep-lerna/pull/1280) 前端 - 埋 trace code 在 submit formData 之前 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#1292](https://github.com/meepshop/meep-lerna/pull/1292) (@meepshop/frontend) Fix schemas ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.68.5 (2020-11-13)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#1276](https://github.com/meepshop/meep-lerna/pull/1276) 前端 - 移除 getStockNotificationList ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- [#1272](https://github.com/meepshop/meep-lerna/pull/1272) admin/orders-ecfit 使用 admin/table ([@Lexiwu](https://github.com/Lexiwu))

#### :bug: Bug Fix

- [#1289](https://github.com/meepshop/meep-lerna/pull/1289) (@meepshop/frontend) Fix schema error ([@HsuTing](https://github.com/HsuTing))
- [#1265](https://github.com/meepshop/meep-lerna/pull/1265) 【BUG】後台頁面權限問題 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 3

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.68.4 (2020-11-12)

#### :bug: Bug Fix

- `meep-ui`
  - [#1284](https://github.com/meepshop/meep-lerna/pull/1284) 【BUG】 前台 - 使用商品滿額折扣和購物金折抵，折扣顯示異常 ([@piovischioh](https://github.com/piovischioh))
- Other
  - [#1285](https://github.com/meepshop/meep-lerna/pull/1285) (@meepshop/images): rename image ([@piovischioh](https://github.com/piovischioh))
  - [#1281](https://github.com/meepshop/meep-lerna/pull/1281) (@meepshop/front-end) Remove ProductQaModule pre-release ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#1283](https://github.com/meepshop/meep-lerna/pull/1283) (@meepshop/images): upload images for mail ([@piovischioh](https://github.com/piovischioh))
- [#1282](https://github.com/meepshop/meep-lerna/pull/1282) (@meepshop/images): add images for mail ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.68.3 (2020-11-10)

#### :rocket: New Feature

- `generate`, `meep-ui`
  - [#1271](https://github.com/meepshop/meep-lerna/pull/1271) (@meepshop/hooks, @admin/hooks) Add new package ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#1279](https://github.com/meepshop/meep-lerna/pull/1279) 【BUG】 手機版 - 前台訂單明細選選樂折扣金額與後台不同 ([@piovischioh](https://github.com/piovischioh))
- Other
  - [#1274](https://github.com/meepshop/meep-lerna/pull/1274) (@meepshop/front-end)Remove landingPageModule pre-release ([@HsuTing](https://github.com/HsuTing))
  - [#1273](https://github.com/meepshop/meep-lerna/pull/1273) (@meepshop/front-end) Ignore @meepshop/utils style transform ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `meep-ui`
  - [#1279](https://github.com/meepshop/meep-lerna/pull/1279) 【BUG】 手機版 - 前台訂單明細選選樂折扣金額與後台不同 ([@piovischioh](https://github.com/piovischioh))
- Other
  - [#1275](https://github.com/meepshop/meep-lerna/pull/1275) 前端 - 移除 filter 之前檢查 null ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.68.2 (2020-11-06)

#### :boom: Breaking Change

- Other
  - [#1261](https://github.com/meepshop/meep-lerna/pull/1261) 【優化】合併廣告分析 schema - 前端 ([@HsuTing](https://github.com/HsuTing))
  - [#1263](https://github.com/meepshop/meep-lerna/pull/1263) 移除 @meepshop/module 的 conext ([@HsuTing](https://github.com/HsuTing))
- `mock-types`
  - [#1260](https://github.com/meepshop/meep-lerna/pull/1260) (@meepshop/mock-types) Add gqls folder ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- [#1233](https://github.com/meepshop/meep-lerna/pull/1233) date-picker 改成 function component ([@Lexiwu](https://github.com/Lexiwu))
- [#1259](https://github.com/meepshop/meep-lerna/pull/1259) 【新增】@admin/table ([@Lexiwu](https://github.com/Lexiwu))

#### :bug: Bug Fix

- `meep-ui`
  - [#1270](https://github.com/meepshop/meep-lerna/pull/1270) 【BUG】 前台 - 置頂選單「購物車」文字跑版 ([@piovischioh](https://github.com/piovischioh))
- Other
  - [#1266](https://github.com/meepshop/meep-lerna/pull/1266) (@meepshop/frontend) Fix schema ([@HsuTing](https://github.com/HsuTing))
  - [#1264](https://github.com/meepshop/meep-lerna/pull/1264) (@meepshop/locales) Fix auto translate ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- Other
  - [#1262](https://github.com/meepshop/meep-lerna/pull/1262) 前端 - 移除 showDetail:true ([@HsuTing](https://github.com/HsuTing))
  - [#1264](https://github.com/meepshop/meep-lerna/pull/1264) (@meepshop/locales) Fix auto translate ([@HsuTing](https://github.com/HsuTing))
- `generate`
  - [#1268](https://github.com/meepshop/meep-lerna/pull/1268) (@meepshop/locales, @meepshop/generate) Fix translate testing and add generate cli ([@HsuTing](https://github.com/HsuTing))
- `mock-types`, `storybook`
  - [#1267](https://github.com/meepshop/meep-lerna/pull/1267) (@meepshop/storybook) Fix storybook ([@HsuTing](https://github.com/HsuTing))
- `mock-types`
  - [#1260](https://github.com/meepshop/meep-lerna/pull/1260) (@meepshop/mock-types) Add gqls folder ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.68.1 (2020-11-02)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#1236](https://github.com/meepshop/meep-lerna/pull/1236) 【優化】移除藍新 Ezpay 金流 - 前端 ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `store`
  - [#1204](https://github.com/meepshop/meep-lerna/pull/1204) 【功能】電子報取消訂閱 - 前端 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#1257](https://github.com/meepshop/meep-lerna/pull/1257) 【BUG】前往結帳 - 購物車 panel 登入會員，panel 無消失 ([@piovischioh](https://github.com/piovischioh))
- Other
  - [#1253](https://github.com/meepshop/meep-lerna/pull/1253) (@meepshop/frontend) Remove antd lock ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#1258](https://github.com/meepshop/meep-lerna/pull/1258) (@admin/account-setting) Rename fragment ([@happycat6323](https://github.com/happycat6323))
- [#1254](https://github.com/meepshop/meep-lerna/pull/1254) (@meepshop/frontend) Rename gqls ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.68.0 (2020-10-28)

#### :rocket: New Feature

- Other
  - [#1250](https://github.com/meepshop/meep-lerna/pull/1250) (@meepshop/product-\*) Remove product id ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#1252](https://github.com/meepshop/meep-lerna/pull/1252) 前端 - 新元件防護機制 ([@HsuTing](https://github.com/HsuTing))
- `generators`
  - [#1246](https://github.com/meepshop/meep-lerna/pull/1246) (@meepshop/generators) Add page generator ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#1242](https://github.com/meepshop/meep-lerna/pull/1242) 修正 ssr router error ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `generators`
  - [#1246](https://github.com/meepshop/meep-lerna/pull/1246) (@meepshop/generators) Add page generator ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.67.3 (2020-10-27)

#### :bug: Bug Fix

- [#1249](https://github.com/meepshop/meep-lerna/pull/1249) 【BUG】後台帳戶設定，當手機和聯絡電話從來都沒有輸入過資料時，編輯姓名存儲時會有 bug ([@happycat6323](https://github.com/happycat6323))
- [#1248](https://github.com/meepshop/meep-lerna/pull/1248) (@meepshop/front-end): remove pre-released scm graphql ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- [#1248](https://github.com/meepshop/meep-lerna/pull/1248) (@meepshop/front-end): remove pre-released scm graphql ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.67.2 (2020-10-27)

#### :rocket: New Feature

- [#1219](https://github.com/meepshop/meep-lerna/pull/1219) member-orders 改成 function component ([@Lexiwu](https://github.com/Lexiwu))

#### :bug: Bug Fix

- `meep-ui`
  - [#1237](https://github.com/meepshop/meep-lerna/pull/1237) 【BUG】 GA 缺少結帳的工作階段 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.67.1 (2020-10-26)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#1218](https://github.com/meepshop/meep-lerna/pull/1218) 前台 - 移除 redux 裡面 user ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `mock-types`
  - [#1239](https://github.com/meepshop/meep-lerna/pull/1239) 改用新的 modules 欄位 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- Other
  - [#1243](https://github.com/meepshop/meep-lerna/pull/1243) (@meepshop/frontend) Lock antd ([@HsuTing](https://github.com/HsuTing))
  - [#1240](https://github.com/meepshop/meep-lerna/pull/1240) (@meepshop/menu, @meepshop/product-qa) Rename fragment and fix update cache ([@HsuTing](https://github.com/HsuTing))
  - [#1241](https://github.com/meepshop/meep-lerna/pull/1241) (@meepshop/frontend) Fix testing ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#1240](https://github.com/meepshop/meep-lerna/pull/1240) (@meepshop/menu, @meepshop/product-qa) Rename fragment and fix update cache ([@HsuTing](https://github.com/HsuTing))
- [#1241](https://github.com/meepshop/meep-lerna/pull/1241) (@meepshop/frontend) Fix testing ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.67.0 (2020-10-22)

#### :boom: Breaking Change

- `meep-ui`, `mock-types`, `store`
  - [#1137](https://github.com/meepshop/meep-lerna/pull/1137) 【功能】智慧轉換元件 ([@piovischioh](https://github.com/piovischioh))
- `meep-ui`
  - [#1238](https://github.com/meepshop/meep-lerna/pull/1238) (@store/\*): move packages to @meepshop ([@piovischioh](https://github.com/piovischioh))

#### :rocket: New Feature

- `meep-ui`, `mock-types`, `store`
  - [#1137](https://github.com/meepshop/meep-lerna/pull/1137) 【功能】智慧轉換元件 ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- [#1231](https://github.com/meepshop/meep-lerna/pull/1231) (@meepshop/frontend) Fix storybook ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `meep-ui`, `mock-types`, `store`
  - [#1137](https://github.com/meepshop/meep-lerna/pull/1137) 【功能】智慧轉換元件 ([@piovischioh](https://github.com/piovischioh))
- Other
  - [#1227](https://github.com/meepshop/meep-lerna/pull/1227) (@meepshop/images\*) Rename fragments to gqls ([@HsuTing](https://github.com/HsuTing))
  - [#1231](https://github.com/meepshop/meep-lerna/pull/1231) (@meepshop/frontend) Fix storybook ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`
  - [#1238](https://github.com/meepshop/meep-lerna/pull/1238) (@store/\*): move packages to @meepshop ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.66.4 (2020-10-21)

#### :rocket: New Feature

- Other
  - [#1214](https://github.com/meepshop/meep-lerna/pull/1214) member-reward-points 改成 function component ([@Lexiwu](https://github.com/Lexiwu))
  - [#1208](https://github.com/meepshop/meep-lerna/pull/1208) member-wish-list 改成 function component ([@Lexiwu](https://github.com/Lexiwu))
- `generators`
  - [#1235](https://github.com/meepshop/meep-lerna/pull/1235) (@meepshop/generators) Can create a new package ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- Other
  - [#1217](https://github.com/meepshop/meep-lerna/pull/1217) [DEV_TOOLS] CI Dockerhub Credentials - 前端 ([@happycat6323](https://github.com/happycat6323))
- `generators`
  - [#1235](https://github.com/meepshop/meep-lerna/pull/1235) (@meepshop/generators) Can create a new package ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.66.3 (2020-10-20)

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#1234](https://github.com/meepshop/meep-lerna/pull/1234) (@meepshop/store, @meepshop/meep-ui) Remove onCompleted ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.66.2 (2020-10-20)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#1213](https://github.com/meepshop/meep-lerna/pull/1213) 前台 - 移除 redux 裡面 sendResetPasswordEmail ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- [#1206](https://github.com/meepshop/meep-lerna/pull/1206) 前端 - Use new API to get template export formats ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#1232](https://github.com/meepshop/meep-lerna/pull/1232) (@meepshop/frontend) Remove pre-release schema ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.66.1 (2020-10-19)

#### :boom: Breaking Change

- [#1210](https://github.com/meepshop/meep-lerna/pull/1210) 【優化】廣告分析 - Google Ads & GTM（ schema 合併 ）- 前端 ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `store`
  - [#1180](https://github.com/meepshop/meep-lerna/pull/1180) 【重構】月租 - 後台帳戶設定 - 前端 ([@happycat6323](https://github.com/happycat6323))
- Other
  - [#1210](https://github.com/meepshop/meep-lerna/pull/1210) 【優化】廣告分析 - Google Ads & GTM（ schema 合併 ）- 前端 ([@HsuTing](https://github.com/HsuTing))
  - [#1139](https://github.com/meepshop/meep-lerna/pull/1139) 【重構】選單元件 ([@HsuTing](https://github.com/HsuTing))
  - [#1211](https://github.com/meepshop/meep-lerna/pull/1211) 【功能】自動翻譯 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- Other
  - [#1216](https://github.com/meepshop/meep-lerna/pull/1216) 【BUG】前台 - 會員資料更新成功，出現 update-user.success ([@HsuTing](https://github.com/HsuTing))
  - [#1221](https://github.com/meepshop/meep-lerna/pull/1221) (@meepshop/images) Move lib folder to images ([@HsuTing](https://github.com/HsuTing))

#### :memo: Documentation

- [#1222](https://github.com/meepshop/meep-lerna/pull/1222) (@meepshop/meep-lerna) Modify README ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#1224](https://github.com/meepshop/meep-lerna/pull/1224) (@meepshop/\*) Rename fragments to gqls ([@HsuTing](https://github.com/HsuTing))
- [#1225](https://github.com/meepshop/meep-lerna/pull/1225) (@meepshop/menu) Rename fragments to gqls ([@HsuTing](https://github.com/HsuTing))
- [#1223](https://github.com/meepshop/meep-lerna/pull/1223) (@store/member-recipients) Move less file and add gqls folder ([@HsuTing](https://github.com/HsuTing))
- [#1221](https://github.com/meepshop/meep-lerna/pull/1221) (@meepshop/images) Move lib folder to images ([@HsuTing](https://github.com/HsuTing))
- [#1211](https://github.com/meepshop/meep-lerna/pull/1211) 【功能】自動翻譯 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.66.0 (2020-10-12)

#### :rocket: New Feature

- `store`
  - [#1189](https://github.com/meepshop/meep-lerna/pull/1189) 【功能】回到頁面頂端 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#1209](https://github.com/meepshop/meep-lerna/pull/1209) (@meepshop/meep-ui) Fix code style ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.65.1 (2020-10-08)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#1196](https://github.com/meepshop/meep-lerna/pull/1196) 【優化】改用新的儲存 image 欄位 - 前端 ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#1202](https://github.com/meepshop/meep-lerna/pull/1202) feat move fragment to fragments folder ([@Lexiwu](https://github.com/Lexiwu))

#### :bug: Bug Fix

- `meep-ui`
  - [#1205](https://github.com/meepshop/meep-lerna/pull/1205) 【BUG】 手機版 - 選單元件文字內容跑版 ([@piovischioh](https://github.com/piovischioh))
- `meep-ui`, `store`
  - [#1199](https://github.com/meepshop/meep-lerna/pull/1199) 【BUG】 android - 無法兩指將網頁放大縮小 ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#1207](https://github.com/meepshop/meep-lerna/pull/1207) (@meepshop/frontend) Fix patch version error ([@HsuTing](https://github.com/HsuTing))
- `mock-types`
  - [#1201](https://github.com/meepshop/meep-lerna/pull/1201) (@meepshop/mock-types) Fix render error ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- Other
  - [#1207](https://github.com/meepshop/meep-lerna/pull/1207) (@meepshop/frontend) Fix patch version error ([@HsuTing](https://github.com/HsuTing))
- `mock-types`
  - [#1201](https://github.com/meepshop/meep-lerna/pull/1201) (@meepshop/mock-types) Fix render error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- LexiWu ([@Lexiwu](https://github.com/Lexiwu))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.65.0 (2020-10-06)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#1191](https://github.com/meepshop/meep-lerna/pull/1191) 修正 購物車 update cache 行為 ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- [#1200](https://github.com/meepshop/meep-lerna/pull/1200) 【優化】綠界貨態同步 - 後台文字解釋 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.64.3 (2020-10-05)

#### :boom: Breaking Change

- [#1198](https://github.com/meepshop/meep-lerna/pull/1198) (@admin/block, @admin/header) Rename @admin/header and @admin/block ([@happycat6323](https://github.com/happycat6323))

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#1174](https://github.com/meepshop/meep-lerna/pull/1174) 前台 - 移除 redux 裡面 updateShopperLanguagePreference ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#1182](https://github.com/meepshop/meep-lerna/pull/1182) KooData 直播購物車 - 購物車置入商品 URL ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#1192](https://github.com/meepshop/meep-lerna/pull/1192) 【調查】apollo client reset store error ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `store`
  - [#1160](https://github.com/meepshop/meep-lerna/pull/1160) 【BUG】後台 - 頁面設計/商品內容版型 - 商品細節、商品文字＆商品影片元件無顯示佔位圖 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.64.2 (2020-09-30)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#1194](https://github.com/meepshop/meep-lerna/pull/1194) Revert "【優化】改用新的儲存 image 欄位 - 前端 (#1167)" ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- [#1186](https://github.com/meepshop/meep-lerna/pull/1186) 【BUG】 會員註冊頁 - 語言翻譯未完全 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- Other
  - [#1195](https://github.com/meepshop/meep-lerna/pull/1195) (@store/member-password-change) Fix typescript error ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`
  - [#1187](https://github.com/meepshop/meep-lerna/pull/1187) 【BUG】側邊選單 - 分頁名稱前後台不一樣 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#1190](https://github.com/meepshop/meep-lerna/pull/1190) (@meepshop/frontend) Remove not used env variables ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.64.1 (2020-09-28)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#1167](https://github.com/meepshop/meep-lerna/pull/1167) 【優化】改用新的儲存 image 欄位 - 前端 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#1188](https://github.com/meepshop/meep-lerna/pull/1188) 【個別店家】 IE 瀏覽器 - 前台無法顯示 ([@happycat6323](https://github.com/happycat6323))

#### :house: Internal

- [#1185](https://github.com/meepshop/meep-lerna/pull/1185) (@meepshop/images) Remove not used tags ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.64.0 (2020-09-25)

#### :rocket: New Feature

- `store`
  - [#1176](https://github.com/meepshop/meep-lerna/pull/1176) store setting logos use scaledSrc url ([@HsuTing](https://github.com/HsuTing))
  - [#1179](https://github.com/meepshop/meep-lerna/pull/1179) 【功能】KooData 直播購物車 - 購物車置入商品 URL ([@HsuTing](https://github.com/HsuTing))
  - [#1178](https://github.com/meepshop/meep-lerna/pull/1178) 【功能】KooData 直播購物車 - 購物車置入商品 URL ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- Other
  - [#1184](https://github.com/meepshop/meep-lerna/pull/1184) 【BUG】後台 - 第三方設定，GoodDeal 同步庫存開關異常 ([@HsuTing](https://github.com/HsuTing))
  - [#1175](https://github.com/meepshop/meep-lerna/pull/1175) 【BUG】 前台 - 會員註冊頁面，越南文翻譯錯誤 ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#1183](https://github.com/meepshop/meep-lerna/pull/1183) (@meepshop/store) Fix typo error ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `store`
  - [#1173](https://github.com/meepshop/meep-lerna/pull/1173) 前端 - 改使用 Store.activity/activities ([@piovischioh](https://github.com/piovischioh))
- Other
  - [#1177](https://github.com/meepshop/meep-lerna/pull/1177) (@meepshop/frontend) Modify storybook ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.63.1 (2020-09-22)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#1172](https://github.com/meepshop/meep-lerna/pull/1172) 前端 - 移除 redux 裡面 updateUser ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `store`
  - [#1171](https://github.com/meepshop/meep-lerna/pull/1171) 前端 - 移除 redux 裡面 resetPassword ([@HsuTing](https://github.com/HsuTing))
  - [#1168](https://github.com/meepshop/meep-lerna/pull/1168) 前端 - seo 改用 image proxy ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#1165](https://github.com/meepshop/meep-lerna/pull/1165) (@meepshop/images) Remove filter attribute and support export images ([@HsuTing](https://github.com/HsuTing))
- [#1164](https://github.com/meepshop/meep-lerna/pull/1164) (@meepshop/frontend) Rename not null comments ([@HsuTing](https://github.com/HsuTing))
- [#1162](https://github.com/meepshop/meep-lerna/pull/1162) (@meepshop/frontend) Fix babel command ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.63.0 (2020-09-14)

#### :boom: Breaking Change

- `store`
  - [#1154](https://github.com/meepshop/meep-lerna/pull/1154) Add auth mutation client side schema ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `mock-types`, `store`
  - [#1152](https://github.com/meepshop/meep-lerna/pull/1152) 前端 - 改用 Store.defaultProductTemplatePage ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#1153](https://github.com/meepshop/meep-lerna/pull/1153) 前端 - 前端會員資料使用 Viewer.memberGroup ([@HsuTing](https://github.com/HsuTing))
  - [#1157](https://github.com/meepshop/meep-lerna/pull/1157) @meepshop/images support svg component ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#1154](https://github.com/meepshop/meep-lerna/pull/1154) Add auth mutation client side schema ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#1161](https://github.com/meepshop/meep-lerna/pull/1161) (@meepshop/image): fix unchanged imageURL ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.62.6 (2020-09-14)

#### :bug: Bug Fix

- [#1159](https://github.com/meepshop/meep-lerna/pull/1159) 【調查】 GA 瀏覽事件觸發網址異常 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.62.5 (2020-09-11)

#### :bug: Bug Fix

- `store`
  - [#1156](https://github.com/meepshop/meep-lerna/pull/1156) (@meepshop/store) Upgrade replicas ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.62.4 (2020-09-11)

#### :rocket: New Feature

- [#1144](https://github.com/meepshop/meep-lerna/pull/1144) 【功能】綠界超商 - 訂單明細 - 貨態同步 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.62.3 (2020-09-10)

#### :rocket: New Feature

- `mock-types`
  - [#1113](https://github.com/meepshop/meep-lerna/pull/1113) 【重構】商品主圖元件 ([@happycat6323](https://github.com/happycat6323))

#### :house: Internal

- `meep-ui`
  - [#1151](https://github.com/meepshop/meep-lerna/pull/1151) 【優化】 GA 事件 - 加入購物車/購買/瀏覽商品「商品 ID」統一 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.62.2 (2020-09-08)

#### :rocket: New Feature

- [#1148](https://github.com/meepshop/meep-lerna/pull/1148) [next-admin] add setGaViewId ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.62.1 (2020-09-03)

#### :rocket: New Feature

- [#1147](https://github.com/meepshop/meep-lerna/pull/1147) (@meepshop/images, @meepshop/icons) Auto generate typescript ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#1149](https://github.com/meepshop/meep-lerna/pull/1149) 【BUG】修正商品頁 Keywords 資料來源 ([@happycat6323](https://github.com/happycat6323))

#### :house: Internal

- `store`
  - [#1145](https://github.com/meepshop/meep-lerna/pull/1145) Remove currency in redux ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.62.0 (2020-09-02)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#1129](https://github.com/meepshop/meep-lerna/pull/1129) 前端 - 移除 getWebTrackList, getGtagList, getFbPixel 改用 @store/ad-track ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#1146](https://github.com/meepshop/meep-lerna/pull/1146) Image 和 GalleryImage 用 id 取代 fileId - 前端 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.61.2 (2020-09-01)

#### :bug: Bug Fix

- [#1143](https://github.com/meepshop/meep-lerna/pull/1143) (@meepshop/apollo) Fix missing import ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.61.1 (2020-09-01)

#### :boom: Breaking Change

- [#1124](https://github.com/meepshop/meep-lerna/pull/1124) Modify client side schema ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- [#1135](https://github.com/meepshop/meep-lerna/pull/1135) 前端 - 改用新的儲存 image 欄位 (前置） ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#1142](https://github.com/meepshop/meep-lerna/pull/1142) (@meepshop/apollo) Fix shouldIgnoreUnauthorizedError ([@happycat6323](https://github.com/happycat6323))
- [#1140](https://github.com/meepshop/meep-lerna/pull/1140) (preReleaseSchemas/Page): remove Image id ([@happycat6323](https://github.com/happycat6323))

#### :house: Internal

- [#1138](https://github.com/meepshop/meep-lerna/pull/1138) (@meepshop/frontend) Use languageType ([@HsuTing](https://github.com/HsuTing))
- [#1141](https://github.com/meepshop/meep-lerna/pull/1141) (@meepshop/frontend) Remove TODO list ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.61.0 (2020-08-28)

#### :boom: Breaking Change

- `meep-ui`, `mock-types`, `store`
  - [#1118](https://github.com/meepshop/meep-lerna/pull/1118) Add cookies to @meepshop/context ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `meep-ui`, `mock-types`
  - [#1068](https://github.com/meepshop/meep-lerna/pull/1068) 【重構】商品問答元件 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `meep-ui`
  - [#1133](https://github.com/meepshop/meep-lerna/pull/1133) 【BUG】前台 - 購物車 panel 登入會員，「密碼」placeholder 消失 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.60.6 (2020-08-27)

#### :bug: Bug Fix

- `meep-ui`
  - [#1134](https://github.com/meepshop/meep-lerna/pull/1134) 【BUG】 前台 - 綠界超商物流訂單，收件人姓名可儲存特殊符號，導致後台小白單無法列印 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.60.5 (2020-08-27)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#1120](https://github.com/meepshop/meep-lerna/pull/1120) 【優化】廣告追蹤 - 瀏覽商品頁補商品價格 ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- `meep-ui`
  - [#1132](https://github.com/meepshop/meep-lerna/pull/1132) 【BUG】 後台/編輯訂單 - 收件人姓名可儲存特殊符號，導致後台小白單無法列印 ([@happycat6323](https://github.com/happycat6323))
- Other
  - [#1130](https://github.com/meepshop/meep-lerna/pull/1130) (@meepshop/images): add abbrev format option ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.60.4 (2020-08-25)

#### :bug: Bug Fix

- `meep-ui`
  - [#1123](https://github.com/meepshop/meep-lerna/pull/1123) 【BUG】 後台已設定好 FB 登入相關設定，但前台未顯示 FB 登入按鈕 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.60.3 (2020-08-25)

#### :bug: Bug Fix

- [#1127](https://github.com/meepshop/meep-lerna/pull/1127) 【BUG】 後台 - 廣告分析一直在跑圈圈 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.60.2 (2020-08-25)

#### :bug: Bug Fix

- [#1126](https://github.com/meepshop/meep-lerna/pull/1126) 【BUG】 後台 - 廣告分析一直在跑圈圈 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.60.1 (2020-08-24)

#### :bug: Bug Fix

- `meep-ui`
  - [#1121](https://github.com/meepshop/meep-lerna/pull/1121) 【個別店家】 影片嵌入元件若為 FB 影片連結，前台無法顯示 ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#1122](https://github.com/meepshop/meep-lerna/pull/1122) (@meepshop/apollo) Fix merge error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.60.0 (2020-08-21)

#### :boom: Breaking Change

- `store`
  - [#1101](https://github.com/meepshop/meep-lerna/pull/1101) 修改廣告分析相關 schema - 前端 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#1119](https://github.com/meepshop/meep-lerna/pull/1119) 【BUG】 前台 - 語系若為英文，無法完成綠界稍後付款 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.59.3 (2020-08-20)

#### :bug: Bug Fix

- `store`
  - [#1116](https://github.com/meepshop/meep-lerna/pull/1116) 【BUG】 手機版 - 無法使用 Facebook 登入 ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`
  - [#1117](https://github.com/meepshop/meep-lerna/pull/1117) 【BUG】 手機版 - 商品頁輸入購買數量，該數字無顯示 ([@piovischioh](https://github.com/piovischioh))
  - [#1115](https://github.com/meepshop/meep-lerna/pull/1115) 【BUG】手機版 - 於購物車 panel 更改商品數量，顯示異常 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.59.2 (2020-08-19)

#### :rocket: New Feature

- Other
  - [#1114](https://github.com/meepshop/meep-lerna/pull/1114) 【BUG】後台 - 第三方設定，儲存資料後，無出現反饋訊息 ([@HsuTing](https://github.com/HsuTing))
- `mock-types`
  - [#1105](https://github.com/meepshop/meep-lerna/pull/1105) 【重構】商品照片集元件 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.59.1 (2020-08-18)

#### :house: Internal

- [#1112](https://github.com/meepshop/meep-lerna/pull/1112) (@meepshop/apollo) Add logId ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.59.0 (2020-08-18)

#### :boom: Breaking Change

- `meep-ui`, `mock-types`, `store`
  - [#1074](https://github.com/meepshop/meep-lerna/pull/1074) 前端 - 改用 at timestamp ([@piovischioh](https://github.com/piovischioh))

#### :rocket: New Feature

- `meep-ui`, `mock-types`, `store`
  - [#1074](https://github.com/meepshop/meep-lerna/pull/1074) 前端 - 改用 at timestamp ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- `meep-ui`, `mock-types`, `store`
  - [#1074](https://github.com/meepshop/meep-lerna/pull/1074) 前端 - 改用 at timestamp ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.58.2 (2020-08-18)

#### :bug: Bug Fix

- `meep-ui`
  - [#1111](https://github.com/meepshop/meep-lerna/pull/1111) (@meepshop/meep-ui) Should overwrite cart when getCartList.data[0] is null ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `meep-ui`, `mock-types`, `store`
  - [#1109](https://github.com/meepshop/meep-lerna/pull/1109) Rename context name to uppercase name ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.58.1 (2020-08-17)

#### :bug: Bug Fix

- `meep-ui`
  - [#1110](https://github.com/meepshop/meep-lerna/pull/1110) (@meepshop/meep-ui) Fix add product to cart error ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#1108](https://github.com/meepshop/meep-lerna/pull/1108) (@meepshop/switch) Move @admin/switch to @meepshop/switch ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.58.0 (2020-08-17)

#### :boom: Breaking Change

- `meep-ui`, `mock-types`, `store`
  - [#1076](https://github.com/meepshop/meep-lerna/pull/1076) Add currency to @meepshop/context ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`, `store`
  - [#1093](https://github.com/meepshop/meep-lerna/pull/1093) 前端 - 移除 redux 裡面 getCartList 改用 apollo-client ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `store`
  - [#1106](https://github.com/meepshop/meep-lerna/pull/1106) 【優化】移除 fb graphql api v3 改用 v8 ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`
  - [#1084](https://github.com/meepshop/meep-lerna/pull/1084) Add @meepshop/product-amount-select ([@HsuTing](https://github.com/HsuTing))
- `mock-types`
  - [#1083](https://github.com/meepshop/meep-lerna/pull/1083) 【重構】輪播圖片元件 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.57.0 (2020-08-14)

#### :boom: Breaking Change

- `mock-types`, `store`
  - [#1013](https://github.com/meepshop/meep-lerna/pull/1013) 【優化】後台/第三方設定：新增預設應用程式編號 - 前端 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#1103](https://github.com/meepshop/meep-lerna/pull/1103) 【BUG】 文字元件 - 「新視窗打開連結」設定失效 ([@happycat6323](https://github.com/happycat6323))

#### :house: Internal

- `store`
  - [#1095](https://github.com/meepshop/meep-lerna/pull/1095) 前端 - 避免 query unused fields ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`, `store`
  - [#1097](https://github.com/meepshop/meep-lerna/pull/1097) 前端 - 統一改用 enhancer carts ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#1104](https://github.com/meepshop/meep-lerna/pull/1104) (@meepshop/frontend) Should auto replace modules fragment path ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.56.6 (2020-08-13)

#### :bug: Bug Fix

- `meep-ui`
  - [#1075](https://github.com/meepshop/meep-lerna/pull/1075) 【BUG】前後台商品問答元件，設定元件寬度沒有效果 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.56.5 (2020-08-13)

#### :rocket: New Feature

- `mock-types`
  - [#1096](https://github.com/meepshop/meep-lerna/pull/1096) 【重構】圖片文字元件 ([@happycat6323](https://github.com/happycat6323))
- Other
  - [#1091](https://github.com/meepshop/meep-lerna/pull/1091) (@meepshop/locales) Add more locales ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#1100](https://github.com/meepshop/meep-lerna/pull/1100) 【優化】FB、IG 的 in-app-browser - 無法兩指放大頁面 ([@piovischioh](https://github.com/piovischioh))
- Other
  - [#1102](https://github.com/meepshop/meep-lerna/pull/1102) 【BUG】 後台 -「自訂停留秒數追蹤」開關自動關閉 ([@HsuTing](https://github.com/HsuTing))
  - [#1098](https://github.com/meepshop/meep-lerna/pull/1098) (circleci) Fix kustomize install ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`
  - [#1099](https://github.com/meepshop/meep-lerna/pull/1099) 【BUG】圖片文字元件，按鈕 hover 時，文字 color 應為白色 ([@happycat6323](https://github.com/happycat6323))
- `mock-types`
  - [#1094](https://github.com/meepshop/meep-lerna/pull/1094) (@meepshop/apollo) Fix link union type ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.56.4 (2020-08-06)

#### :bug: Bug Fix

- `store`
  - [#1089](https://github.com/meepshop/meep-lerna/pull/1089) 【BUG】前台 - 「我的收藏」頁面空白 ([@piovischioh](https://github.com/piovischioh))
  - [#1092](https://github.com/meepshop/meep-lerna/pull/1092) (@meepshop/store): fix pages initial flow ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- `store`
  - [#1063](https://github.com/meepshop/meep-lerna/pull/1063) 預設商品 schema - 前端 ([@HsuTing](https://github.com/HsuTing))
  - [#1092](https://github.com/meepshop/meep-lerna/pull/1092) (@meepshop/store): fix pages initial flow ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.56.3 (2020-08-05)

#### :bug: Bug Fix

- [#1077](https://github.com/meepshop/meep-lerna/pull/1077) 【優化】前台 - 日文翻譯 ([@HsuTing](https://github.com/HsuTing))
- [#1073](https://github.com/meepshop/meep-lerna/pull/1073) 【BUG】 AddToCart_PopUpp 事件會重複觸發 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.56.2 (2020-08-05)

#### :bug: Bug Fix

- `meep-ui`
  - [#1090](https://github.com/meepshop/meep-lerna/pull/1090) 【BUG】 一頁式購物車 - FB pixel AddToCart Event 異常 ([@HsuTing](https://github.com/HsuTing))
- `mock-types`
  - [#1088](https://github.com/meepshop/meep-lerna/pull/1088) (@meepshop/mock-types) Fix type field ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `mock-types`
  - [#1086](https://github.com/meepshop/meep-lerna/pull/1086) (@admin/setting-wrapper) Pre #1013 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.56.1 (2020-08-04)

#### :bug: Bug Fix

- [#1087](https://github.com/meepshop/meep-lerna/pull/1087) (@meepshop/front-end): remove istioctl ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- [#1087](https://github.com/meepshop/meep-lerna/pull/1087) (@meepshop/front-end): remove istioctl ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.56.0 (2020-08-04)

#### :bug: Bug Fix

- [#1085](https://github.com/meepshop/meep-lerna/pull/1085) (@meepshop/front-end): remove kube-inject ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- [#1085](https://github.com/meepshop/meep-lerna/pull/1085) (@meepshop/front-end): remove kube-inject ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.55.1 (2020-08-04)

#### :rocket: New Feature

- `meep-ui`
  - [#1078](https://github.com/meepshop/meep-lerna/pull/1078) 【優化】更換：meepShop MAX 極速開店 URL ([@piovischioh](https://github.com/piovischioh))
- `mock-types`
  - [#1081](https://github.com/meepshop/meep-lerna/pull/1081) Add modules context ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#1072](https://github.com/meepshop/meep-lerna/pull/1072) 【BUG】 一頁式購物車 - FB pixel AddToCart Event 異常 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `mock-types`
  - [#1082](https://github.com/meepshop/meep-lerna/pull/1082) (@meepshop/cart) Pre rewrite cart ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.55.0 (2020-07-31)

#### :boom: Breaking Change

- `meep-ui`, `mock-types`, `store`
  - [#1065](https://github.com/meepshop/meep-lerna/pull/1065) 前端 - 移除 getStoreAppList 改用 @meepshop/context ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- Other
  - [#1066](https://github.com/meepshop/meep-lerna/pull/1066) 【BUG】前台 - 匯款通知訂單，付款方式顯示的付款資訊分隔線有誤 ([@piovischioh](https://github.com/piovischioh))
- `meep-ui`
  - [#1067](https://github.com/meepshop/meep-lerna/pull/1067) 【BUG】前後台圖片元件佔位圖，元件寬度和水平對齊顯示錯誤 ([@happycat6323](https://github.com/happycat6323))

#### :house: Internal

- `store`
  - [#1070](https://github.com/meepshop/meep-lerna/pull/1070) (@meepshop/store) Add new config ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.54.2 (2020-07-30)

#### :rocket: New Feature

- `meep-ui`, `mock-types`
  - [#1046](https://github.com/meepshop/meep-lerna/pull/1046) 【重構】圖片元件 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `meep-ui`
  - [#1069](https://github.com/meepshop/meep-lerna/pull/1069) 【BUG】後台 - 頁面設計＆色彩配置背景圖片問題 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.54.1 (2020-07-29)

#### :rocket: New Feature

- `store`
  - [#1064](https://github.com/meepshop/meep-lerna/pull/1064) 判斷 Guest Token 是否合法 ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#1042](https://github.com/meepshop/meep-lerna/pull/1042) 【優化】權限設定/商店管理 - 新增「通知設定」- Design / 前端 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- Other
  - [#1062](https://github.com/meepshop/meep-lerna/pull/1062) 【BUG】ecfit 的訂單匯出壞掉了 ([@happycat6323](https://github.com/happycat6323))
- `store`
  - [#1059](https://github.com/meepshop/meep-lerna/pull/1059) 【BUG】首次購物 - thank-you-page 查看訂單，訂單明細頁面空白 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.54.0 (2020-07-28)

#### :boom: Breaking Change

- `meep-ui`, `mock-types`, `store`
  - [#1053](https://github.com/meepshop/meep-lerna/pull/1053) 移除 getColorList 改用 @meepshop/context ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.53.2 (2020-07-27)

#### :boom: Breaking Change

- `store`
  - [#1056](https://github.com/meepshop/meep-lerna/pull/1056) 前端 - 移除 getValidUserPointList ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#1061](https://github.com/meepshop/meep-lerna/pull/1061) (@meepshop/store) Fix lint error with eslint-plugin-react ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `store`
  - [#1058](https://github.com/meepshop/meep-lerna/pull/1058) 前端 - 移除 sendPaymentNotification ([@HsuTing](https://github.com/HsuTing))
  - [#1057](https://github.com/meepshop/meep-lerna/pull/1057) 前端 - 移除 addOrderMessage ([@HsuTing](https://github.com/HsuTing))
- `mock-types`, `store`
  - [#1054](https://github.com/meepshop/meep-lerna/pull/1054) (@meepshop/context) Move @meepshop/events ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#1060](https://github.com/meepshop/meep-lerna/pull/1060) (@meepshop/frontend) Fix schema error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.53.1 (2020-07-24)

#### :bug: Bug Fix

- `store`
  - [#1055](https://github.com/meepshop/meep-lerna/pull/1055) 【BUG】未登入狀態，應被導到登入頁 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `meep-ui`, `mock-types`, `store`
  - [#1031](https://github.com/meepshop/meep-lerna/pull/1031) (@meepshop/utils) Move screenSmMax, add antd ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.53.0 (2020-07-22)

#### :rocket: New Feature

- `meep-ui`
  - [#1044](https://github.com/meepshop/meep-lerna/pull/1044) 前後台 - 圖片元件、圖片文字元件、輪播元件 改用 image proxy ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.52.0 (2020-07-21)

#### :rocket: New Feature

- `meep-ui`
  - [#1032](https://github.com/meepshop/meep-lerna/pull/1032) 【優化】檢查統一編號 - 前端 ([@happycat6323](https://github.com/happycat6323))
- Other
  - [#1029](https://github.com/meepshop/meep-lerna/pull/1029) 【功能】Google Shopping Ads ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#1033](https://github.com/meepshop/meep-lerna/pull/1033) 【功能】 LINE Pay 手機付款網址跳轉優化 ([@piovischioh](https://github.com/piovischioh))
- `store`
  - [#1050](https://github.com/meepshop/meep-lerna/pull/1050) (@meepshop/store) Remove resources limit ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `store`
  - [#1052](https://github.com/meepshop/meep-lerna/pull/1052) (@meepshop/store) Modify code style ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.51.0 (2020-07-20)

#### :boom: Breaking Change

- `mock-types`, `store`
  - [#1023](https://github.com/meepshop/meep-lerna/pull/1023) 統一 apollo-client 寫法 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.50.3 (2020-07-17)

#### :bug: Bug Fix

- `store`
  - [#1048](https://github.com/meepshop/meep-lerna/pull/1048) 【BUG】 前台 - 多規格商品加入購物車，於購物車 panel 更改數量，商品消失 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.50.2 (2020-07-16)

#### :rocket: New Feature

- `meep-ui`
  - [#1040](https://github.com/meepshop/meep-lerna/pull/1040) 【優化】會員註冊顯示「必填」欄位 ([@happycat6323](https://github.com/happycat6323))

#### :house: Internal

- `store`
  - [#1039](https://github.com/meepshop/meep-lerna/pull/1039) 前端 - 移除不必要的 getOrderApplyList API call ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.50.1 (2020-07-15)

#### :rocket: New Feature

- `mock-types`
  - [#1043](https://github.com/meepshop/meep-lerna/pull/1043) 【重構】商品語法嵌入元件 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `mock-types`
  - [#1038](https://github.com/meepshop/meep-lerna/pull/1038) (@meepshop/mock-types) Fix testing ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.50.0 (2020-07-13)

#### :bug: Bug Fix

- `mock-types`
  - [#1037](https://github.com/meepshop/meep-lerna/pull/1037) (@meepshop/frontend) HotFix graphql version error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.49.2 (2020-07-13)

#### :boom: Breaking Change

- `meep-ui`, `mock-types`, `store`
  - [#967](https://github.com/meepshop/meep-lerna/pull/967) 【重構】廣告分析元件 ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `mock-types`
  - [#996](https://github.com/meepshop/meep-lerna/pull/996) 【重構】社群分享元件 ([@happycat6323](https://github.com/happycat6323))
- Other
  - [#1036](https://github.com/meepshop/meep-lerna/pull/1036) (@meepshop/front-end): upgrade istio ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- [#1036](https://github.com/meepshop/meep-lerna/pull/1036) (@meepshop/front-end): upgrade istio ([@piovischioh](https://github.com/piovischioh))
- [#1034](https://github.com/meepshop/meep-lerna/pull/1034) (@meepshop/front-end): upgrade istio ([@piovischioh](https://github.com/piovischioh))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.49.1 (2020-07-08)

#### :rocket: New Feature

- [#1020](https://github.com/meepshop/meep-lerna/pull/1020) 【優化】新增上傳圖片限制提示文字 - 解析度小於 5000 萬 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.49.0 (2020-07-08)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#958](https://github.com/meepshop/meep-lerna/pull/958) 【重構】admin 文字編輯器 ([@piovischioh](https://github.com/piovischioh))

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#958](https://github.com/meepshop/meep-lerna/pull/958) 【重構】admin 文字編輯器 ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- `meep-ui`, `store`
  - [#958](https://github.com/meepshop/meep-lerna/pull/958) 【重構】admin 文字編輯器 ([@piovischioh](https://github.com/piovischioh))
- Other
  - [#1030](https://github.com/meepshop/meep-lerna/pull/1030) (@admin/tooltip): add admin tooltip ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.48.3 (2020-07-06)

#### :bug: Bug Fix

- [#1028](https://github.com/meepshop/meep-lerna/pull/1028) (@meepshop/utils) Fix antd styles ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.48.2 (2020-07-06)

#### :rocket: New Feature

- `store`
  - [#977](https://github.com/meepshop/meep-lerna/pull/977) 前端 - 前後台 移除 getPageList ([@happycat6323](https://github.com/happycat6323))
  - [#998](https://github.com/meepshop/meep-lerna/pull/998) 【優化】重設密碼錯誤訊息文字（ token 過期） ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- [#1027](https://github.com/meepshop/meep-lerna/pull/1027) 【BUG】新開商店 - 前台商品頁預設商品文字與後台不同 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `meep-ui`, `store`
  - [#1007](https://github.com/meepshop/meep-lerna/pull/1007) 前端 - 移除 variantInfo 欄位，改用 product.variants[0] 資料 ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#1014](https://github.com/meepshop/meep-lerna/pull/1014) 前端 - createFileList 改給 id 且避免使用 linkId 欄位 Open ([@piovischioh](https://github.com/piovischioh))
- `mock-types`, `store`
  - [#1026](https://github.com/meepshop/meep-lerna/pull/1026) (@meepshop/frontend) Modify storybook and mock-types ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.48.1 (2020-07-03)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#976](https://github.com/meepshop/meep-lerna/pull/976) 【功能】商品版型 - 商品資料元件 - 前端 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#1025](https://github.com/meepshop/meep-lerna/pull/1025) (@store/member-order-apply) Fix lint error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.48.0 (2020-07-03)

#### :boom: Breaking Change

- `meep-ui`, `mock-types`, `store`
  - [#914](https://github.com/meepshop/meep-lerna/pull/914) 前端 - 新架構統一改用 @meepshop/images ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `meep-ui`, `mock-types`
  - [#1017](https://github.com/meepshop/meep-lerna/pull/1017) 新增 @meepshop/setting-wrapper 以及 @admin/setting-block ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`, `store`
  - [#1022](https://github.com/meepshop/meep-lerna/pull/1022) 【優化】前台忘記密碼使用新 API，更改錯誤訊息 - 前端 ([@happycat6323](https://github.com/happycat6323))
- `store`
  - [#1015](https://github.com/meepshop/meep-lerna/pull/1015) (@meepshop/link) Add DomainProvider to admin/store ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `store`
  - [#1021](https://github.com/meepshop/meep-lerna/pull/1021) 【BUG】前台 - 前往結帳，在購物車 panel 登入會員，會閃一個商品已下架畫面 ([@happycat6323](https://github.com/happycat6323))

#### :house: Internal

- `meep-ui`, `mock-types`, `store`
  - [#1024](https://github.com/meepshop/meep-lerna/pull/1024) (@meepshop/frontend) Support to check dependencies ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#1019](https://github.com/meepshop/meep-lerna/pull/1019) (@meepshop/utils) Move locale fragment ([@HsuTing](https://github.com/HsuTing))
  - [#1018](https://github.com/meepshop/meep-lerna/pull/1018) (@meepshop/locales) Add more locales ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.47.0 (2020-06-30)

#### :boom: Breaking Change

- `locale-parser`
  - [#993](https://github.com/meepshop/meep-lerna/pull/993) 修正 @meepshop/locales ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- Other
  - [#1016](https://github.com/meepshop/meep-lerna/pull/1016) feat(eslintrc) Modify rules ([@happycat6323](https://github.com/happycat6323))
- `store`
  - [#1005](https://github.com/meepshop/meep-lerna/pull/1005) (@meepshop/link) Move link wrapper to @meepshop/link ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.46.5 (2020-06-23)

#### :bug: Bug Fix

- [#1012](https://github.com/meepshop/meep-lerna/pull/1012) 【個別店家】 後台 - google ads 事件轉換欄位無法更新 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.46.4 (2020-06-22)

#### :rocket: New Feature

- `store`
  - [#1010](https://github.com/meepshop/meep-lerna/pull/1010) (@meepshop/store) Modify kustomize setting ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#1004](https://github.com/meepshop/meep-lerna/pull/1004) 【優化】手機版搜尋欄顯示規則 ([@piovischioh](https://github.com/piovischioh))
- Other
  - [#1009](https://github.com/meepshop/meep-lerna/pull/1009) 【BUG】後台 - 廣告分析/Facebook 像素，填寫編號格式錯誤訊息會浮動 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.46.3 (2020-06-19)

#### :bug: Bug Fix

- [#1006](https://github.com/meepshop/meep-lerna/pull/1006) 【BUG】更換 SEO 圖片，上傳圖片會有錯誤訊息 ([@piovischioh](https://github.com/piovischioh))
- [#1000](https://github.com/meepshop/meep-lerna/pull/1000) 【BUG】後台登入頁 - 未勾選 reCAPTCHA，按登入，錯誤訊息顯示有誤 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.46.2 (2020-06-17)

#### :bug: Bug Fix

- [#1003](https://github.com/meepshop/meep-lerna/pull/1003) (@admin/web-track): fix logo style ([@happycat6323](https://github.com/happycat6323))

#### :house: Internal

- `meep-ui`, `store`
  - [#1002](https://github.com/meepshop/meep-lerna/pull/1002) (@meepshop/utils) Move i18n to this package ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.46.1 (2020-06-16)

#### :bug: Bug Fix

- `store`
  - [#1001](https://github.com/meepshop/meep-lerna/pull/1001) Fix store kustomize gateways setting ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.46.0 (2020-06-16)

#### :boom: Breaking Change

- `mock-types`
  - [#997](https://github.com/meepshop/meep-lerna/pull/997) (@meepshop/modules): use PageModule fragment ([@piovischioh](https://github.com/piovischioh))
  - [#990](https://github.com/meepshop/meep-lerna/pull/990) 【重構】facebook 塗鴉牆 ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- Other
  - [#928](https://github.com/meepshop/meep-lerna/pull/928) 【重構】admin 廣告分析 ([@happycat6323](https://github.com/happycat6323))
- `store`
  - [#999](https://github.com/meepshop/meep-lerna/pull/999) (@meepshop/store) Use new setting ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#994](https://github.com/meepshop/meep-lerna/pull/994) 【BUG】 Google 網站管理員提示伺服器錯誤 500 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `mock-types`
  - [#997](https://github.com/meepshop/meep-lerna/pull/997) (@meepshop/modules): use PageModule fragment ([@piovischioh](https://github.com/piovischioh))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.45.1 (2020-06-15)

#### :bug: Bug Fix

- `store`
  - [#995](https://github.com/meepshop/meep-lerna/pull/995) (@meepshop/store) Hotfix preview product build error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.45.0 (2020-06-15)

#### :rocket: New Feature

- `meep-ui`, `mock-types`, `store`
  - [#936](https://github.com/meepshop/meep-lerna/pull/936) 【優化】 resizer 使用 imgproxy - 商品圖片提供 imgproxy 加密連結 API - 前端 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.44.1 (2020-06-11)

#### :bug: Bug Fix

- [#992](https://github.com/meepshop/meep-lerna/pull/992) 【BUG】後台頁面空白 - 前端 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.44.0 (2020-06-10)

#### :rocket: New Feature

- [#971](https://github.com/meepshop/meep-lerna/pull/971) 【功能】後台登入頁 - 忘記密碼 - 前端 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `meep-ui`
  - [#989](https://github.com/meepshop/meep-lerna/pull/989) 【BUG】 社群分享元件異常 ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- `mock-types`
  - [#982](https://github.com/meepshop/meep-lerna/pull/982) (@meepshop/modules) Add new package ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.43.3 (2020-06-10)

#### :boom: Breaking Change

- `meep-ui`, `mock-types`, `store`
  - [#961](https://github.com/meepshop/meep-lerna/pull/961) 【重構】臉書按讚元件 ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `store`
  - [#978](https://github.com/meepshop/meep-lerna/pull/978) 前端 - 修改 babel imgproxy build 特殊處理 ([@HsuTing](https://github.com/HsuTing))
- `mock-types`
  - [#988](https://github.com/meepshop/meep-lerna/pull/988) 商品文字元件 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#979](https://github.com/meepshop/meep-lerna/pull/979) 【BUG】後台 - 當頁面設計、色彩配置皆有設定背景圖，預覽畫面跑版 ([@happycat6323](https://github.com/happycat6323))
- `store`
  - [#981](https://github.com/meepshop/meep-lerna/pull/981) 【BUG】前台 - 建立訂單，thank-you-page 點選查看訂單，頁面顯示空白 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.43.2 (2020-06-09)

#### :boom: Breaking Change

- `mock-types`
  - [#983](https://github.com/meepshop/meep-lerna/pull/983) 【重構】影片元件 ([@HsuTing](https://github.com/HsuTing))
  - [#984](https://github.com/meepshop/meep-lerna/pull/984) 【重構】文字元件 ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `mock-types`
  - [#972](https://github.com/meepshop/meep-lerna/pull/972) 【優化】 群組增加色彩配置功能 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#985](https://github.com/meepshop/meep-lerna/pull/985) 【BUG】手機版 - 無法顯示頁面 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.43.1 (2020-06-05)

#### :boom: Breaking Change

- `meep-ui`, `mock-types`, `store`
  - [#964](https://github.com/meepshop/meep-lerna/pull/964) 移除 redux 裡的 getAppLoginList 改用 @store/fb ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `mock-types`
  - [#969](https://github.com/meepshop/meep-lerna/pull/969) 【重構】UnavailableModule ([@HsuTing](https://github.com/HsuTing))
  - [#974](https://github.com/meepshop/meep-lerna/pull/974) 【重構】語法嵌入元件 ([@happycat6323](https://github.com/happycat6323))
  - [#968](https://github.com/meepshop/meep-lerna/pull/968) 【重構】分隔線元件 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `mock-types`
  - [#975](https://github.com/meepshop/meep-lerna/pull/975) (@meepshop/mock-types) Fix ci memory lock ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.43.0 (2020-06-01)

#### :rocket: New Feature

- `store`
  - [#797](https://github.com/meepshop/meep-lerna/pull/797) 【優化】頁面設計/頁面管 /page-manager ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.42.5 (2020-05-29)

#### :bug: Bug Fix

- [#970](https://github.com/meepshop/meep-lerna/pull/970) 【BUG】後台 - 「新北市新莊區」的訂單，收件人資訊地址欄位沒有出現郵遞區號 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.42.4 (2020-05-29)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#962](https://github.com/meepshop/meep-lerna/pull/962) 【功能】圖片元件新增「圖片替代文字」欄位 ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#963](https://github.com/meepshop/meep-lerna/pull/963) 【BUG】會員登入前/後商品頁資訊顯示問題 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.42.3 (2020-05-27)

#### :rocket: New Feature

- `meep-ui`
  - [#959](https://github.com/meepshop/meep-lerna/pull/959) 【優化】商品版型元件 - 商品細節 - 資料顯示間距調整 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- [#966](https://github.com/meepshop/meep-lerna/pull/966) (@meepshop/frontend) Remove existing schema ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.42.2 (2020-05-27)

#### :boom: Breaking Change

- `meep-ui`, `mock-types`
  - [#955](https://github.com/meepshop/meep-lerna/pull/955) 重構 block ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#960](https://github.com/meepshop/meep-lerna/pull/960) 【BUG】 粗黑體文字顏色 - 前台顯示異常 ([@happycat6323](https://github.com/happycat6323))
- Other
  - [#965](https://github.com/meepshop/meep-lerna/pull/965) (@meepshop/images) Fix testing error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.42.1 (2020-05-22)

#### :bug: Bug Fix

- `meep-ui`
  - [#957](https://github.com/meepshop/meep-lerna/pull/957) 【BUG】 前台 - 商品描述 - 文字顏色問題 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.42.0 (2020-05-22)

#### :rocket: New Feature

- Other
  - [#844](https://github.com/meepshop/meep-lerna/pull/844) 【重構】admin 設定總覽 ([@piovischioh](https://github.com/piovischioh))
- `meep-ui`, `store`
  - [#877](https://github.com/meepshop/meep-lerna/pull/877) 【優化】前台商品頁使用 product.applicableActivities 取得商品折扣 - 前端 ([@happycat6323](https://github.com/happycat6323))
  - [#924](https://github.com/meepshop/meep-lerna/pull/924) 【優化】取得會員資料情境 & 特約代碼顯示設定 - 前端 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `meep-ui`
  - [#954](https://github.com/meepshop/meep-lerna/pull/954) 【BUG】 前後台 - 商品描述 - 文字顏色問題 ([@happycat6323](https://github.com/happycat6323))
- `mock-types`
  - [#956](https://github.com/meepshop/meep-lerna/pull/956) (@meepshop/mock-types) Fix load data error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.41.11 (2020-05-20)

#### :bug: Bug Fix

- `meep-ui`
  - [#953](https://github.com/meepshop/meep-lerna/pull/953) 【BUG】後台電子發票勾選選項，前台順序顯示有誤 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.41.10 (2020-05-19)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#949](https://github.com/meepshop/meep-lerna/pull/949) 【功能】新增電子發票是否開放選項 - Design / 前端 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#952](https://github.com/meepshop/meep-lerna/pull/952) 【BUG】後台 - 語言設定已取消前台所選語系問題 ([@HsuTing](https://github.com/HsuTing))
- `mock-types`
  - [#951](https://github.com/meepshop/meep-lerna/pull/951) (@meepshop/frontend) Fix typescript ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.41.9 (2020-05-14)

#### :rocket: New Feature

- `store`
  - [#948](https://github.com/meepshop/meep-lerna/pull/948) 前台 - 移除 getStorePaymentList, getStoreShipmentList ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#944](https://github.com/meepshop/meep-lerna/pull/944) 【BUG】新架構 menu background 閃爍 - part 2 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.41.8 (2020-05-12)

#### :rocket: New Feature

- `store`
  - [#886](https://github.com/meepshop/meep-lerna/pull/886) 【優化】GMO 超商代碼 or 虛擬帳號 - 前台訂單明細顯示繳費資訊 - Design / 前端 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- Other
  - [#927](https://github.com/meepshop/meep-lerna/pull/927) 【優化】選擇 GMO 信用分期付款，需重新輸入卡號 - 前端 ([@piovischioh](https://github.com/piovischioh))
- `store`
  - [#932](https://github.com/meepshop/meep-lerna/pull/932) 【個別店家】會員無法登入 ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- [#946](https://github.com/meepshop/meep-lerna/pull/946) (@meepshop/frontend) Set the max package running at the same time ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.41.7 (2020-05-11)

#### :bug: Bug Fix

- `mock-types`
  - [#945](https://github.com/meepshop/meep-lerna/pull/945) 修正 apollo-client v2.6.9 core/types 位置 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.41.6 (2020-05-11)

#### :rocket: New Feature

- [#904](https://github.com/meepshop/meep-lerna/pull/904) 【功能】 LINE Pay - 前端 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.41.5 (2020-05-08)

#### :rocket: New Feature

- `store`
  - [#926](https://github.com/meepshop/meep-lerna/pull/926) 前台 - 移除 less 裡的 @phone-media 改用 antd @screen-sm-max ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#933](https://github.com/meepshop/meep-lerna/pull/933) 【優化】一頁式商店，在選完超取門市後，跳回填結帳資訊 ([@piovischioh](https://github.com/piovischioh))
  - [#942](https://github.com/meepshop/meep-lerna/pull/942) 【BUG】前台地址選單，按 x 清除後，需必填 ([@happycat6323](https://github.com/happycat6323))
  - [#929](https://github.com/meepshop/meep-lerna/pull/929) 【BUG】 Chrome 瀏覽器 - 當母選單有設定分頁，且為「另開視窗」時，於平板電腦上點選無反應 ([@piovischioh](https://github.com/piovischioh))
- Other
  - [#940](https://github.com/meepshop/meep-lerna/pull/940) 【BUG】後台 - menu 若為縮起，點選商品頁面任一商品，menu 顯示問題 ([@HsuTing](https://github.com/HsuTing))
  - [#941](https://github.com/meepshop/meep-lerna/pull/941) 【BUG】小幫手帳號 - 登入後台，不應該看見「帳戶設定」＆「帳單與付款」 ([@HsuTing](https://github.com/HsuTing))
  - [#939](https://github.com/meepshop/meep-lerna/pull/939) (@meepshop/frontend) Fix ci typo error ([@HsuTing](https://github.com/HsuTing))
  - [#938](https://github.com/meepshop/meep-lerna/pull/938) (@meepshop/frontend) Add install.sh to ci ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.41.4 (2020-05-07)

#### :bug: Bug Fix

- `meep-ui`
  - [#942](https://github.com/meepshop/meep-lerna/pull/942) 【BUG】前台地址選單，按 x 清除後，需必填 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.41.3 (2020-05-06)

#### :bug: Bug Fix

- `meep-ui`
  - [#929](https://github.com/meepshop/meep-lerna/pull/929) 【BUG】 Chrome 瀏覽器 - 當母選單有設定分頁，且為「另開視窗」時，於平板電腦上點選無反應 ([@piovischioh](https://github.com/piovischioh))
- Other
  - [#939](https://github.com/meepshop/meep-lerna/pull/939) (@meepshop/frontend) Fix ci typo error ([@HsuTing](https://github.com/HsuTing))
  - [#938](https://github.com/meepshop/meep-lerna/pull/938) (@meepshop/frontend) Add install.sh to ci ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.41.2 (2020-05-05)

#### :rocket: New Feature

- `store`
  - [#921](https://github.com/meepshop/meep-lerna/pull/921) 【優化】前台關閉畫面 ([@happycat6323](https://github.com/happycat6323))
- Other
  - [#919](https://github.com/meepshop/meep-lerna/pull/919) 【優化】前/後台 - 購物金使用規則說明文字 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- Other
  - [#937](https://github.com/meepshop/meep-lerna/pull/937) 【BUG】 小幫手帳號 - 點選統計分析被登出 ([@HsuTing](https://github.com/HsuTing))
  - [#931](https://github.com/meepshop/meep-lerna/pull/931) 【BUG】後台部分頁面無支援另開視窗/分頁 ([@HsuTing](https://github.com/HsuTing))
  - [#925](https://github.com/meepshop/meep-lerna/pull/925) 【BUG】後台 - Navigation Menu 展開狀態中項目切換顯示錯誤 ([@HsuTing](https://github.com/HsuTing))
- `locale-parser`
  - [#930](https://github.com/meepshop/meep-lerna/pull/930) 修正 @meepshop/images 的 img proxy 圖片 cache 問題 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `meep-ui`, `mock-types`, `store`
  - [#935](https://github.com/meepshop/meep-lerna/pull/935) Revert "【優化】 resizer 使用 imgproxy - 商品圖片提供 imgproxy 加密連結 API - 前端 (#908)" ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.41.1 (2020-05-04)

#### :house: Internal

- `store`
  - [#934](https://github.com/meepshop/meep-lerna/pull/934) 前端 - 前台 調高 CPU 跟 memory ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.41.0 (2020-05-04)

#### :boom: Breaking Change

- `meep-ui`, `mock-types`, `store`
  - [#908](https://github.com/meepshop/meep-lerna/pull/908) 【優化】 resizer 使用 imgproxy - 商品圖片提供 imgproxy 加密連結 API - 前端 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.40.2 (2020-04-30)

#### :rocket: New Feature

- `locale-parser`, `mock-types`
  - [#918](https://github.com/meepshop/meep-lerna/pull/918) Build storybook in circleci ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.40.1 (2020-04-23)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#916](https://github.com/meepshop/meep-lerna/pull/916) 【優化】寄發給「消費者」系統通知信語言設定 - 前端 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.40.0 (2020-04-21)

#### :boom: Breaking Change

- [#865](https://github.com/meepshop/meep-lerna/pull/865) 【優化】 後台 - Navigation Menu ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#923](https://github.com/meepshop/meep-lerna/pull/923) (@meepshop/frontend) Lock @types/node version for next.js version ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.39.4 (2020-04-16)

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#917](https://github.com/meepshop/meep-lerna/pull/917) 【BUG】 前台 - 選單商品篩選結果顯示錯誤 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.39.3 (2020-04-15)

#### :bug: Bug Fix

- `meep-ui`
  - [#915](https://github.com/meepshop/meep-lerna/pull/915) 【個別店家】 前台-文字元件內的小圖片顯示不出來 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.39.2 (2020-04-14)

#### :rocket: New Feature

- `meep-ui`
  - [#899](https://github.com/meepshop/meep-lerna/pull/899) 前端 - 搜尋門市 query input 加上綠界帳號類型（B2C / C2C） ([@happycat6323](https://github.com/happycat6323))

#### :house: Internal

- [#909](https://github.com/meepshop/meep-lerna/pull/909) 前端 - 避免使用 File.storage ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.39.1 (2020-04-13)

#### :bug: Bug Fix

- `meep-ui`
  - [#911](https://github.com/meepshop/meep-lerna/pull/911) 【BUG】商品列表，有篩選商品關鍵字或標籤，商品顯示錯誤 ([@happycat6323](https://github.com/happycat6323))
  - [#912](https://github.com/meepshop/meep-lerna/pull/912) 【BUG】 自訂會員註冊與登入頁訊息空白無法顯示登入頁 ([@piovischioh](https://github.com/piovischioh))
  - [#910](https://github.com/meepshop/meep-lerna/pull/910) 【BUG】手機版選單跑版 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.39.0 (2020-04-09)

#### :boom: Breaking Change

- [#893](https://github.com/meepshop/meep-lerna/pull/893) 【重構】admin login ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#896](https://github.com/meepshop/meep-lerna/pull/896) 【BUG】前台 - 訂單明細 - 付款方式的繳費資訊，變成多列顯示 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#907](https://github.com/meepshop/meep-lerna/pull/907) (@meepshop/frontend) Remove docker-compose ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.38.2 (2020-04-08)

#### :rocket: New Feature

- `meep-ui`, `mock-types`
  - [#902](https://github.com/meepshop/meep-lerna/pull/902) 前端 - 改用 User.shippableRecipientAddresses & 移除濾掉收件人範本的 code ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.38.1 (2020-04-07)

#### :bug: Bug Fix

- `meep-ui`
  - [#905](https://github.com/meepshop/meep-lerna/pull/905) 【個別店家】 複製頁面，前台換頁，商品元件未更新 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

# 0.38.0 (2020-04-07)

#### :rocket: New Feature

- [#898](https://github.com/meepshop/meep-lerna/pull/898) 前端 - 優化 @meepshop/icons ([@HsuTing](https://github.com/HsuTing))
- [#878](https://github.com/meepshop/meep-lerna/pull/878) 【優化】 前台 - 訂單明細 - 「立即付款」按鈕出現規則 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `meep-ui`
  - [#903](https://github.com/meepshop/meep-lerna/pull/903) 移除前台 FixedEndsContainer ([@HsuTing](https://github.com/HsuTing))
  - [#892](https://github.com/meepshop/meep-lerna/pull/892) 【BUG】前/後台 - 圖片出現一條白線 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.37.2 (2020-04-01)

#### :bug: Bug Fix

- `meep-ui`
  - [#901](https://github.com/meepshop/meep-lerna/pull/901) 【BUG】 一頁式無法正常結帳，錯誤訊息：物流有金額使用限制(limit:10~5000) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.37.1 (2020-03-30)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#889](https://github.com/meepshop/meep-lerna/pull/889) 【優化】 商品列表元件編號＆網址列參數追蹤 ([@piovischioh](https://github.com/piovischioh))
- `store`
  - [#891](https://github.com/meepshop/meep-lerna/pull/891) 前端 - 改用新 API：setUserPasswordByToken ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`
  - [#894](https://github.com/meepshop/meep-lerna/pull/894) 【優化】新開商店 - 預設 logo 佔位圖 ([@piovischioh](https://github.com/piovischioh))
- `mock-types`
  - [#897](https://github.com/meepshop/meep-lerna/pull/897) 前端 - 建立 @meepshop/images ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#894](https://github.com/meepshop/meep-lerna/pull/894) 【優化】新開商店 - 預設 logo 佔位圖 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.37.0 (2020-03-27)

#### :boom: Breaking Change

- `meep-ui`, `mock-types`, `store`
  - [#842](https://github.com/meepshop/meep-lerna/pull/842) 前端 - 「前台 checkout & landing page、後台編輯訂單」改用新的 addressService api ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#888](https://github.com/meepshop/meep-lerna/pull/888) 【優化】 前台結帳頁 - 發票捐贈欄位檢查 - 前端 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `store`
  - [#895](https://github.com/meepshop/meep-lerna/pull/895) (@meepshop/store): fix virtualservice ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- `store`
  - [#895](https://github.com/meepshop/meep-lerna/pull/895) (@meepshop/store): fix virtualservice ([@piovischioh](https://github.com/piovischioh))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.36.17 (2020-03-25)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#888](https://github.com/meepshop/meep-lerna/pull/888) 【優化】 前台結帳頁 - 發票捐贈欄位檢查 - 前端 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.36.16 (2020-03-23)

#### :bug: Bug Fix

- `meep-ui`
  - [#890](https://github.com/meepshop/meep-lerna/pull/890) D&D 頁面編輯 - 選單 - 增加 Logo 排列設定 - 前端（補） ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.36.15 (2020-03-23)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#867](https://github.com/meepshop/meep-lerna/pull/867) D&D 頁面編輯 - 選單 - 增加 Logo 排列設定 - 前端 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.36.14 (2020-03-19)

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#887](https://github.com/meepshop/meep-lerna/pull/887) 【個別店家】 結帳頁面無優惠碼欄位（cname：swissstyle） ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.36.13 (2020-03-17)

#### :boom: Breaking Change

- [#885](https://github.com/meepshop/meep-lerna/pull/885) feat(@meepshop/front-end): upgrade istio ([@piovischioh](https://github.com/piovischioh))

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#881](https://github.com/meepshop/meep-lerna/pull/881) 【功能】 一鍵撥號 - 前端 ([@happycat6323](https://github.com/happycat6323))
- `mock-types`, `store`
  - [#883](https://github.com/meepshop/meep-lerna/pull/883) (@meepshop/frontend) Modify detail ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#885](https://github.com/meepshop/meep-lerna/pull/885) feat(@meepshop/front-end): upgrade istio ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- [#885](https://github.com/meepshop/meep-lerna/pull/885) feat(@meepshop/front-end): upgrade istio ([@piovischioh](https://github.com/piovischioh))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.36.12 (2020-03-10)

#### :bug: Bug Fix

- `meep-ui`
  - [#882](https://github.com/meepshop/meep-lerna/pull/882) 【BUG】 搜尋客戶商品時，搜尋結果會出現 meepshop 文字 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.36.11 (2020-03-09)

#### :rocket: New Feature

- `meep-ui`
  - [#880](https://github.com/meepshop/meep-lerna/pull/880) 【優化】頁腳沒有 padding & 點擊選單時，子選單會收起 ([@happycat6323](https://github.com/happycat6323))
  - [#876](https://github.com/meepshop/meep-lerna/pull/876) 【優化】 商品頁在有庫存的狀態下，需顯示可購買規格 ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#875](https://github.com/meepshop/meep-lerna/pull/875) 【優化】補未翻譯欄位 - Part 1（全數使用 Google 翻譯） ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#874](https://github.com/meepshop/meep-lerna/pull/874) 【優化】翻譯文字調整 ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`
  - [#879](https://github.com/meepshop/meep-lerna/pull/879) 【BUG】商品範例 - 出現定價＆建議售價 ([@happycat6323](https://github.com/happycat6323))
- `mock-types`
  - [#873](https://github.com/meepshop/meep-lerna/pull/873) 【BUG】Thank you page 按鈕跑版 ([@HsuTing](https://github.com/HsuTing))
- `locale-parser`
  - [#871](https://github.com/meepshop/meep-lerna/pull/871) (@meepshop/locale-parser) Fix csv link error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.36.10 (2020-03-04)

#### :rocket: New Feature

- `meep-ui`
  - [#856](https://github.com/meepshop/meep-lerna/pull/856) 新架構改用 Store.storePayments/storePayment, Store.storeShipments/storeShipment ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#869](https://github.com/meepshop/meep-lerna/pull/869) 【BUG】 手機 LOGO 跑版 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.36.9 (2020-03-03)

#### :rocket: New Feature

- `store`
  - [#872](https://github.com/meepshop/meep-lerna/pull/872) 【優化】前台 - 匯款通知 - 內容變更行為 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.36.8 (2020-03-03)

#### :rocket: New Feature

- `store`
  - [#866](https://github.com/meepshop/meep-lerna/pull/866) 【優化】前台 / 匯款通知 / 內容變更行為 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- Other
  - [#828](https://github.com/meepshop/meep-lerna/pull/828) 【優化】退&換貨申請處理流程 ([@piovischioh](https://github.com/piovischioh))
- `meep-ui`
  - [#864](https://github.com/meepshop/meep-lerna/pull/864) 【BUG】手機版 - 購物車登入 - UI 問題 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.36.7 (2020-03-02)

#### :boom: Breaking Change

- `store`
  - [#847](https://github.com/meepshop/meep-lerna/pull/847) (@meepshop/front-end): add kustomize ([@piovischioh](https://github.com/piovischioh))

#### :rocket: New Feature

- `store`
  - [#847](https://github.com/meepshop/meep-lerna/pull/847) (@meepshop/front-end): add kustomize ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- `store`
  - [#847](https://github.com/meepshop/meep-lerna/pull/847) (@meepshop/front-end): add kustomize ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.36.6 (2020-02-24)

#### :bug: Bug Fix

- `store`
  - [#868](https://github.com/meepshop/meep-lerna/pull/868) 【BUG】 手機版 - 於購物車內更改商品數量，購物車會放大且無法移動 ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- `mock-types`
  - [#863](https://github.com/meepshop/meep-lerna/pull/863) (@meepshop/frontend) Modify detail ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.36.5 (2020-02-21)

#### :rocket: New Feature

- `meep-ui`
  - [#862](https://github.com/meepshop/meep-lerna/pull/862) D&D 元件 - 圖片/輪播/圖片文字 - 優化預設顯示 - 補手機版文字 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.36.4 (2020-02-20)

#### :rocket: New Feature

- [#858](https://github.com/meepshop/meep-lerna/pull/858) 【功能】 Admin - FB/GA 全域代碼埋放 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.36.3 (2020-02-19)

#### :rocket: New Feature

- `meep-ui`
  - [#853](https://github.com/meepshop/meep-lerna/pull/853) D&D 頁面編輯 - 選單 - Logo 預設佔位圖 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.36.2 (2020-02-18)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#843](https://github.com/meepshop/meep-lerna/pull/843) 【功能】自訂會員註冊與登入頁訊息 - 前端 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `store`
  - [#860](https://github.com/meepshop/meep-lerna/pull/860) (@admin/server, @meepshop/store) Fix typo ([@HsuTing](https://github.com/HsuTing))
  - [#855](https://github.com/meepshop/meep-lerna/pull/855) (@admin/gallery) Fix details error ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#859](https://github.com/meepshop/meep-lerna/pull/859) (@store/address-cascader) Fix lint error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.36.1 (2020-02-17)

#### :rocket: New Feature

- `meep-ui`
  - [#845](https://github.com/meepshop/meep-lerna/pull/845) 【功能】 前台登入密碼框可視密碼功能 ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`, `store`
  - [#851](https://github.com/meepshop/meep-lerna/pull/851) D&D 元件 - 圖片/輪播/圖片文字 - 優化預設顯示 - 前端 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#854](https://github.com/meepshop/meep-lerna/pull/854) (@meepshop/frontend) Add more types in writeFragment and writeQuery ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.36.0 (2020-02-11)

#### :boom: Breaking Change

- `store`
  - [#808](https://github.com/meepshop/meep-lerna/pull/808) 【功能】國泰世華 - 虛擬帳號付款 - 前端 ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `store`
  - [#808](https://github.com/meepshop/meep-lerna/pull/808) 【功能】國泰世華 - 虛擬帳號付款 - 前端 ([@HsuTing](https://github.com/HsuTing))
- `mock-types`, `store`
  - [#849](https://github.com/meepshop/meep-lerna/pull/849) (@meepshop/icons) Move to the new workspace ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `mock-types`
  - [#852](https://github.com/meepshop/meep-lerna/pull/852) (@meepshop/mock-types) Fix types error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.35.5 (2020-02-10)

#### :bug: Bug Fix

- `meep-ui`
  - [#848](https://github.com/meepshop/meep-lerna/pull/848) 【BUG】 IE 瀏覽器 - 後台無商品時，前台商品範例位置跑版 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.35.4 (2020-02-07)

#### :rocket: New Feature

- `store`
  - [#830](https://github.com/meepshop/meep-lerna/pull/830)前台 - 新增頁面 For 後台 page-manager 預覽用 ([@HsuTing](https://github.com/HsuTing))
- `icons`
  - [#818](https://github.com/meepshop/meep-lerna/pull/818) 【優化】簡單引導基本開店步驟 - 前端 ([@piovischioh](https://github.com/piovischioh))
- Other
  - [#846](https://github.com/meepshop/meep-lerna/pull/846) (@store/ad-track) Rewrite with @apollo/react-hooks ([@HsuTing](https://github.com/HsuTing))
- `mock-types`
  - [#841](https://github.com/meepshop/meep-lerna/pull/841) (@admin/gallery) Add new package ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.35.3 (2020-01-31)

#### :bug: Bug Fix

- `meep-ui`
  - [#832](https://github.com/meepshop/meep-lerna/pull/832) 【BUG】前台 - 商品無圖時，商品圖位置跑版 ([@piovischioh](https://github.com/piovischioh))
  - [#840](https://github.com/meepshop/meep-lerna/pull/840) 【BUG】後台 - 商品問答有多則回覆，前台只會顯示第一則的回覆訊息 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.35.2 (2020-01-20)

#### :rocket: New Feature

- Other
  - [#786](https://github.com/meepshop/meep-lerna/pull/786) 前端 - 前台 訂單地址使用新欄位 ([@HsuTing](https://github.com/HsuTing))
- `icons`
  - [#838](https://github.com/meepshop/meep-lerna/pull/838) (@meepshop/icons) Add new package ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#837](https://github.com/meepshop/meep-lerna/pull/837) 【BUG】前台/日文、越南文語系 - 會員收件人範本地區資料出現 null ([@HsuTing](https://github.com/HsuTing))
- `icons`
  - [#839](https://github.com/meepshop/meep-lerna/pull/839) (@meepshop/icons) Fix lint error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.35.1 (2020-01-16)

Fix locale key.

## 0.35.0 (2020-01-16)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#814](https://github.com/meepshop/meep-lerna/pull/814) D&D 元件 - 商品列表 - 顯示預設值 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.34.0 (2020-01-16)

#### :rocket: New Feature

- `locale-parser`, `meep-ui`, `mock-types`, `store`
  - [#825](https://github.com/meepshop/meep-lerna/pull/825) 【功能】 新增前後台語系：泰文、印尼文 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#836](https://github.com/meepshop/meep-lerna/pull/836) 【BUG】 FB 像素未追蹤到註冊會員事件 ([@piovischioh](https://github.com/piovischioh))
- Other
  - [#834](https://github.com/meepshop/meep-lerna/pull/834) (@meepshop/front-end) Remove @types/node lock ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.33.3 (2020-01-13)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#790](https://github.com/meepshop/meep-lerna/pull/790) 【優化】後台 - 將「商品收藏」改為用開關來控制前台是否顯示 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.33.2 (2020-01-09)

#### :rocket: New Feature

- `locale-parser`
  - [#831](https://github.com/meepshop/meep-lerna/pull/831) (@meepshop/locale-parser) Add copy command ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#833](https://github.com/meepshop/meep-lerna/pull/833) (@admin/server) Add @admin/setting-notification to package.json ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `locale-parser`
  - [#831](https://github.com/meepshop/meep-lerna/pull/831) (@meepshop/locale-parser) Add copy command ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.33.1 (2020-01-09)

#### :rocket: New Feature

- `meep-ui`
  - [#826](https://github.com/meepshop/meep-lerna/pull/826) 前端 - 建立訂單 input 加上選擇的門市資訊 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- [#829](https://github.com/meepshop/meep-lerna/pull/829) 【BUG】後台 - 通知設定開關問題 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.33.0 (2020-01-03)

#### :rocket: New Feature

- `store`
  - [#810](https://github.com/meepshop/meep-lerna/pull/810) 前端 - 改用 store.memberGroups / memberGroupCodes ([@piovischioh](https://github.com/piovischioh))
- `meep-ui`, `store`
  - [#819](https://github.com/meepshop/meep-lerna/pull/819) 【優化】 前台 - search bar「搜尋」二字語系 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `store`
  - [#810](https://github.com/meepshop/meep-lerna/pull/810) 前端 - 改用 store.memberGroups / memberGroupCodes ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.32.1 (2020-01-02)

#### :bug: Bug Fix

- `meep-ui`
  - [#827](https://github.com/meepshop/meep-lerna/pull/827) 【BUG】前台 - 我的收藏加入無效 ([@happycat6323](https://github.com/happycat6323))
- `mock-types`
  - [#821](https://github.com/meepshop/meep-lerna/pull/821) (前置）【功能】國泰世華 - 虛擬帳號付款 - 前端 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.32.0 (2019-12-30)

#### :rocket: New Feature

- `locale-parser`, `store`
  - [#817](https://github.com/meepshop/meep-lerna/pull/817) 新增語系 tool ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `locale-parser`, `store`
  - [#817](https://github.com/meepshop/meep-lerna/pull/817) 新增語系 tool ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.31.1 (2019-12-27)

#### :bug: Bug Fix

- `meep-ui`
  - [#822](https://github.com/meepshop/meep-lerna/pull/822) 修正 admin, meepshop-ui, next-store input 錯誤 - 前端 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.31.0 (2019-12-25)

#### :boom: Breaking Change

- `meep-ui`, `mock-types`, `store`
  - [#812](https://github.com/meepshop/meep-lerna/pull/812) 【功能】 新增新架構前後台語系：大量翻譯 ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `meep-ui`, `mock-types`, `store`
  - [#812](https://github.com/meepshop/meep-lerna/pull/812) 【功能】 新增新架構前後台語系：大量翻譯 ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`
  - [#804](https://github.com/meepshop/meep-lerna/pull/804) 【優化】移除假擴充功能 - 前端 ([@happycat6323](https://github.com/happycat6323))
  - [#805](https://github.com/meepshop/meep-lerna/pull/805) D&D 群組 - 電腦、手機版間距優化 ([@happycat6323](https://github.com/happycat6323))

#### :house: Internal

- [#816](https://github.com/meepshop/meep-lerna/pull/816) 產生所有語系 csv 檔案 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.30.7 (2019-12-23)

#### :house: Internal

- `store`
  - [#806](https://github.com/meepshop/meep-lerna/pull/806) remove getOrderList ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.30.6 (2019-12-20)

#### :boom: Breaking Change

- `mock-types`
  - [#802](https://github.com/meepshop/meep-lerna/pull/802) (@meepshop/front-end) Remove idx ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `store`
  - [#811](https://github.com/meepshop/meep-lerna/pull/811) 前端 - 前台更新會員資料改用新 API ([@piovischioh](https://github.com/piovischioh))
- `meep-ui`, `store`
  - [#775](https://github.com/meepshop/meep-lerna/pull/775) 【優化】 返回上一頁 - 保留結帳頁已填的會員＆收件者資料 ([@piovischioh](https://github.com/piovischioh))
- `mock-types`
  - [#802](https://github.com/meepshop/meep-lerna/pull/802) (@meepshop/front-end) Remove idx ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#813](https://github.com/meepshop/meep-lerna/pull/813) 【BUG】 獨立商品頁 - 頁面連結若有使用「頁面群組」，預覽頁面 404 問題 ([@HsuTing](https://github.com/HsuTing))
  - [#779](https://github.com/meepshop/meep-lerna/pull/779) 【優化】修補影片元件 ([@piovischioh](https://github.com/piovischioh))
- `meep-ui`
  - [#807](https://github.com/meepshop/meep-lerna/pull/807) 【優化】幣值顯示格式 ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- `store`
  - [#811](https://github.com/meepshop/meep-lerna/pull/811) 前端 - 前台更新會員資料改用新 API ([@piovischioh](https://github.com/piovischioh))
- `meep-ui`
  - [#807](https://github.com/meepshop/meep-lerna/pull/807) 【優化】幣值顯示格式 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.30.5 (2019-12-17)

#### :bug: Bug Fix

- `meep-ui`
  - [#809](https://github.com/meepshop/meep-lerna/pull/809) 【BUG】 系統通知信 - 未寄送相對應語系 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.30.4 (2019-12-11)

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#761](https://github.com/meepshop/meep-lerna/pull/761) 清查 store, admin, next-admin input 資料型別 ([@happycat6323](https://github.com/happycat6323))
  - [#791](https://github.com/meepshop/meep-lerna/pull/791) 弱點掃描分析：可立即修復錯誤 ([@piovischioh](https://github.com/piovischioh))
- Other
  - [#803](https://github.com/meepshop/meep-lerna/pull/803) (@meepshop/front-end) Fix typescript with the new antd version ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `meep-ui`, `store`
  - [#791](https://github.com/meepshop/meep-lerna/pull/791) 弱點掃描分析：可立即修復錯誤 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.30.3 (2019-12-10)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#798](https://github.com/meepshop/meep-lerna/pull/798) 剩下 locale 轉到 next-i18next ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `store`
  - [#800](https://github.com/meepshop/meep-lerna/pull/800) 【優化】 預設 thank you page - 若使用者為尚未登入的狀態，先轉至登入頁面，再轉回 thank-you-page ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.30.2 (2019-12-09)

#### :rocket: New Feature

- `admin`
  - [#747](https://github.com/meepshop/meep-lerna/pull/747)【功能】帳單與付款 - 合約戶：即將到期通知信 & 到期後關閉商店 - 前端 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.30.1 (2019-12-06)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#794](https://github.com/meepshop/meep-lerna/pull/794) landingPage 與 checkout 從 locale.js 改成 next-i18next ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#795](https://github.com/meepshop/meep-lerna/pull/795) 【隔離名單】隱藏頁腳 - 前端 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#799](https://github.com/meepshop/meep-lerna/pull/799) 【BUG】手機版 - 商品頁「加入購物車」按鈕，會切到圖片 ([@happycat6323](https://github.com/happycat6323))
- Other
  - [#796](https://github.com/meepshop/meep-lerna/pull/796) (@meepshop/front-end) Fix lint error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.30.0 (2019-12-03)

#### :rocket: New Feature

- `meep-ui`, `store`
- [#788](https://github.com/meepshop/meep-lerna/pull/788) 移除超取地圖白名單功能，以及舊的超取 - 前端
  ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.29.8 (2019-12-02)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#789](https://github.com/meepshop/meep-lerna/pull/789) landingPage 與 checkout 共用元件 從 locale.js 改成 next-i18next ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `meep-ui`
  - [#792](https://github.com/meepshop/meep-lerna/pull/792) 【個別店家】 meepShop MAX 極速開店：新增白名單 - digitalrabbit ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.29.7 (2019-11-29)

#### :rocket: New Feature

- `meep-ui`
  - [#746](https://github.com/meepshop/meep-lerna/pull/746) 註冊/會員登入 - 信箱格式、驗證體驗 ([@piovischioh](https://github.com/piovischioh))
- `store`
  - [#778](https://github.com/meepshop/meep-lerna/pull/778) 【優化】- 查看前後台瀏覽器版本功能 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.29.6 (2019-11-28)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#781](https://github.com/meepshop/meep-lerna/pull/781) 【優化】修正前後台商店顯示範圍 ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#781](https://github.com/meepshop/meep-lerna/pull/781) 【優化】修正前後台商店顯示範圍 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.29.5 (2019-11-27)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#783](https://github.com/meepshop/meep-lerna/pull/783) 購物車 與 checkout 共用元件 從 locale.js 改成 next-i18next ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`, `mock-types`, `store`
  - [#785](https://github.com/meepshop/meep-lerna/pull/785) 修改 @store/currency ([@piovischioh](https://github.com/piovischioh))
- Other
  - [#764](https://github.com/meepshop/meep-lerna/pull/764) 【BUG】手機版/iPhone - 無法選擇超取地圖 ([@happycat6323](https://github.com/happycat6323))

#### :house: Internal

- `meep-ui`, `mock-types`, `store`
  - [#785](https://github.com/meepshop/meep-lerna/pull/785) 修改 @store/currency ([@piovischioh](https://github.com/piovischioh))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.29.4 (2019-11-22)

#### :rocket: New Feature

- `meep-ui`
  - [#784](https://github.com/meepshop/meep-lerna/pull/784)【個案處理】meepShop MAX 極速開店：新增白名單 - uteam ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `meep-ui`
  - [#782](https://github.com/meepshop/meep-lerna/pull/782)【BUG】 前台 - 當商品影像 1 無設定自動輪播，往前點選無反應 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.29.3 (2019-11-20)

#### :boom: Breaking Change

- `store`
  - [#769](https://github.com/meepshop/meep-lerna/pull/769) 部分頁面細節 從 locale.js 改成 next-i18next ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `meep-ui`
  - [#765](https://github.com/meepshop/meep-lerna/pull/765) 【優化】 手機版 - 搜尋欄問題 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `store`
  - [#776](https://github.com/meepshop/meep-lerna/pull/776) 【個別店家】 前台 - 越南語系變回中文 ([@HsuTing](https://github.com/HsuTing))
  - [#777](https://github.com/meepshop/meep-lerna/pull/777) 【BUG】前台 - FB 登入之後，無出現購物金即將到期筆數提醒彈窗 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.29.2 (2019-11-19)

#### :bug: Bug Fix

- `store`
  - [#780](https://github.com/meepshop/meep-lerna/pull/780) 【BUG】前台 - 日文＆越南語系地址選單的臺灣縣市地區顯示異常 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.29.1 (2019-11-18)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#766](https://github.com/meepshop/meep-lerna/pull/766) 【優化】更改密碼通知信連結頁面 UI 調整 ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- `store`
  - [#774](https://github.com/meepshop/meep-lerna/pull/774) 【BUG】前台 - 我的收藏無法移除商品([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.29.0 (2019-11-15)

#### :boom: Breaking Change

- `meep-ui`, `mock-types`, `store`
  - [#714](https://github.com/meepshop/meep-lerna/pull/714) 套件大更新 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.28.2 (2019-11-14)

#### :bug: Bug Fix

- Other
  - [#772](https://github.com/meepshop/meep-lerna/pull/772) 【BUG】 購買事件重複觸發 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.28.1 (2019-11-14)

#### :bug: Bug Fix

- `meep-ui`
  - [#773](https://github.com/meepshop/meep-lerna/pull/773) 【BUG】 商店頁面無法載入 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.28.0 (2019-11-13)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#760](https://github.com/meepshop/meep-lerna/pull/760) 產品問答元件 從 locale.js 改成 next-i18next ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `meep-ui`
  - [#767](https://github.com/meepshop/meep-lerna/pull/767) 【個案處理】meepShop MAX 極速開店：新增白名單 - i-eat ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#768](https://github.com/meepshop/meep-lerna/pull/768) 【個別店家】 地圖元件，前台出現錯誤訊息「Google Maps Platform rejected your request. Invalid request. One of the input parameters contains a non-UTF-8 string.」 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.27.14 (2019-11-12)

#### :rocket: New Feature

- `meep-ui`, `mock-types`, `store`
  - [#751](https://github.com/meepshop/meep-lerna/pull/751) 建立新的 @store/ad-track ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#750](https://github.com/meepshop/meep-lerna/pull/750) 前端 - 移除 gtag/fbPixel 無用的 active 欄位 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.27.13 (2019-11-11)

#### :bug: Bug Fix

- `meep-ui`
  - [#763](https://github.com/meepshop/meep-lerna/pull/763) (@meepshop/meep-ui): fix drawer style ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.27.12 (2019-11-11)

#### :boom: Breaking Change

- `meep-ui`, `mock-types`, `store`
  - [#710](https://github.com/meepshop/meep-lerna/pull/710) 前端 - 前台會員資料＆收件人範本改用新的 addressService api ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`, `store`
  - [#759](https://github.com/meepshop/meep-lerna/pull/759) 產品列表元件 從 locale.js 改成 next-i18next ([@HsuTing](https://github.com/HsuTing))
  - [#757](https://github.com/meepshop/meep-lerna/pull/757) 產品資訊元件、產品主圖元件 從 locale.js 改成 next-i18next ([@HsuTing](https://github.com/HsuTing))
  - [#754](https://github.com/meepshop/meep-lerna/pull/754) 登入頁面 從 locale.js 改成 next-i18next ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `meep-ui`, `mock-types`, `store`
  - [#755](https://github.com/meepshop/meep-lerna/pull/755) (@meepshop/front-end) Add hook rules to eslint ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- Other
  - [#762](https://github.com/meepshop/meep-lerna/pull/762) (@store/address-cascader) Fix eslint error ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`, `store`
  - [#758](https://github.com/meepshop/meep-lerna/pull/758) (@meepshop/front-end) Fix prettier ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `meep-ui`, `mock-types`, `store`
  - [#755](https://github.com/meepshop/meep-lerna/pull/755) (@meepshop/front-end) Add hook rules to eslint ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.27.11 (2019-11-07)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#753](https://github.com/meepshop/meep-lerna/pull/753) 購物車從 locale.js 改成 next-i18next ([@HsuTing](https://github.com/HsuTing))
  - [#756](https://github.com/meepshop/meep-lerna/pull/756) 【個別店家】 一頁式購物車付款完成後指定頁面跳轉 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.27.10 (2019-11-06)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#752](https://github.com/meepshop/meep-lerna/pull/752) 忘記密碼從 locale.js 改成 next-i18next ([@HsuTing](https://github.com/HsuTing))
  - [#741](https://github.com/meepshop/meep-lerna/pull/741) 折扣元件從 locale.js 改成 next-i18next ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#748](https://github.com/meepshop/meep-lerna/pull/748) 【BUG】前台 - 會員登入後，無跳轉回登入前的頁面 ([@HsuTing](https://github.com/HsuTing))
  - [#745](https://github.com/meepshop/meep-lerna/pull/745) 【優化】 前台 - 購物金 - 「獲得點數」文字改為「可用購物金」 ([@piovischioh](https://github.com/piovischioh))
- `meep-ui`
  - [#744](https://github.com/meepshop/meep-lerna/pull/744) 【BUG】 商品、訂單優惠碼 - 若是輸入已過期的優惠碼，前/後台「結束日期」不同 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.27.9 (2019-11-04)

#### :boom: Breaking Change

- [#743](https://github.com/meepshop/meep-lerna/pull/743) Revert - 修改 AdminStatusEnum type ([@happycat6323](https://github.com/happycat6323))
- [#739](https://github.com/meepshop/meep-lerna/pull/739) 修改 AdminStatusEnum type ([@happycat6323](https://github.com/happycat6323))

#### :rocket: New Feature

- `meep-ui`
  - [#740](https://github.com/meepshop/meep-lerna/pull/740) 【個別店家】 meepShop MAX 極速開店：新增白名單 - 2plus1store, iwe ([@happycat6323](https://github.com/happycat6323))
- Other
  - [#736](https://github.com/meepshop/meep-lerna/pull/736) 優化後台 ecfit 語系 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#733](https://github.com/meepshop/meep-lerna/pull/733) (@admin/wrapper): fix style and redirection ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- `store`
  - [#742](https://github.com/meepshop/meep-lerna/pull/742) (@meepshop/frontend): upgrade kubectl ([@piovischioh](https://github.com/piovischioh))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.27.8 (2019-10-30)

#### :rocket: New Feature

- `meep-ui`
  - [#737](https://github.com/meepshop/meep-lerna/pull/737) 【個別店家】 meepShop MAX 極速開店：新增白名單 - 2plus1store, iwe ([@happycat6323](https://github.com/happycat6323))
- `meep-ui`, `store`
  - [#731](https://github.com/meepshop/meep-lerna/pull/731) 【優化】 FB/GA 事件參數補充 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#738](https://github.com/meepshop/meep-lerna/pull/738) 【BUG】手機版/in-app browser - FB 登入之後，出現 500 Internal Server Error. ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.27.7 (2019-10-28)

#### :bug: Bug Fix

- `meep-ui`
  - [#734](https://github.com/meepshop/meep-lerna/pull/734) 【BUG】IE 瀏覽器 - /checkout 頁面選完門市，頁面無法滑動 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.27.6 (2019-10-25)

#### :bug: Bug Fix

- `meep-ui`
  - [#735](https://github.com/meepshop/meep-lerna/pull/735) 【BUG】/checkout - 資料未填寫完整，無出現「必填」提示訊息 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.27.5 (2019-10-23)

#### :rocket: New Feature

- [#728](https://github.com/meepshop/meep-lerna/pull/728) 左側 Navigation bar 增加提示優化 ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- Other
  - [#730](https://github.com/meepshop/meep-lerna/pull/730) 【BUG】 ECFIT 訂單管理 - 取消訂單有發生錯誤，但錯誤訊息沒有顯示 ([@happycat6323](https://github.com/happycat6323))
- `meep-ui`
  - [#729](https://github.com/meepshop/meep-lerna/pull/729) 【優化】 結帳頁 - 刪除商品時 - 不清除已填欄位的會員資料＆收件者資料 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.27.4 (2019-10-21)

#### :rocket: New Feature

- `meep-ui`
  - [#724](https://github.com/meepshop/meep-lerna/pull/724) 【個案處理】meepShop MAX 極速開店：新增白名單 - dusabioliving ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- Other
  - [#725](https://github.com/meepshop/meep-lerna/pull/725) 【BUG】商店設定 - 通知設定介面 ([@piovischioh](https://github.com/piovischioh))
  - [#726](https://github.com/meepshop/meep-lerna/pull/726) 【BUG】 ECFIT/進階搜尋 - 篩選面板欄位跑版 ([@piovischioh](https://github.com/piovischioh))
- `store`
  - [#727](https://github.com/meepshop/meep-lerna/pull/727) 【BUG】前台 - 訂單明細/發票資訊 - 出現 blocks.invoice.type.manual-electronic ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.27.3 (2019-10-16)

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#723](https://github.com/meepshop/meep-lerna/pull/723) 【BUG】手機版/iPhone/商品頁、商品列表 - 數量下拉選單，無法顯示最後一個數量 ([@piovischioh](https://github.com/piovischioh))
- `meep-ui`
  - [#722](https://github.com/meepshop/meep-lerna/pull/722) 【BUG】 後台 - 訂單明細 - 地址顯示問題 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.27.2 (2019-10-14)

#### :rocket: New Feature

- `meep-ui`
  - [#721](https://github.com/meepshop/meep-lerna/pull/721) 【個別店家】 meepShop MAX 極速開店：新增白名單 - 3cking ([@happycat6323](https://github.com/happycat6323))
  - [#716](https://github.com/meepshop/meep-lerna/pull/716) 【個案處理】meepShop MAX 極速開店：新增白名單 - shinzitiy ([@happycat6323](https://github.com/happycat6323))
- `store`
  - [#720](https://github.com/meepshop/meep-lerna/pull/720) 【優化】 自建超取地圖 - 路名搜尋 - 前端 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `store`
  - [#718](https://github.com/meepshop/meep-lerna/pull/718) 【BUG】 新架構 - 登入之後，出現「登入中」空白畫面 ([@HsuTing](https://github.com/HsuTing))
  - [#715](https://github.com/meepshop/meep-lerna/pull/715) 【BUG】前台 - 幣值選單，選項排序與後台不符 ([@piovischioh](https://github.com/piovischioh))
- `meep-ui`
  - [#719](https://github.com/meepshop/meep-lerna/pull/719) (@meepshop/meep-ui): modify scrolling height when changing pages ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- `mock-types`
  - [#717](https://github.com/meepshop/meep-lerna/pull/717) (@meepshop/mock-types) Fix testing with type error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.27.1 (2019-10-07)

#### :rocket: New Feature

- `store`
  - [#709](https://github.com/meepshop/meep-lerna/pull/709) 使用新的匯率查詢 API ([@happycat6323](https://github.com/happycat6323))
  - [#693](https://github.com/meepshop/meep-lerna/pull/693) 前端 - 改用 viewer.store 取得商店資料 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.27.0 (2019-10-04)

#### :boom: Breaking Change

- [#572](https://github.com/meepshop/meep-lerna/pull/572) 1011 【功能】店家自動通知信＋通知設定 - 前端 ([@piovischioh](https://github.com/piovischioh))

#### :rocket: New Feature

- `meep-ui`
  - [#713](https://github.com/meepshop/meep-lerna/pull/713) 【個案處理】meepShop MAX 極速開店：新增白名單 - luckyandcolorful & may ([@happycat6323](https://github.com/happycat6323))
- Other
  - [#572](https://github.com/meepshop/meep-lerna/pull/572) 1011 【功能】店家自動通知信＋通知設定 - 前端 ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- `meep-ui`
  - [#702](https://github.com/meepshop/meep-lerna/pull/702) 【BUG】 後台 - 商品庫存大於 1，前台 - 一頁式購買數量顯示 null ([@piovischioh](https://github.com/piovischioh))
  - [#707](https://github.com/meepshop/meep-lerna/pull/707) 【個別店家】 確認送出訂單，卻產生多筆訂單 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.26.3 (2019-10-02)

#### :rocket: New Feature

- Other
  - [#711](https://github.com/meepshop/meep-lerna/pull/711) (@store/utils): replace MaybeType with Partial ([@piovischioh](https://github.com/piovischioh))
- `meep-ui`
  - [#603](https://github.com/meepshop/meep-lerna/pull/603) 【功能】 PayPal 串接：前端 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `meep-ui`
  - [#701](https://github.com/meepshop/meep-lerna/pull/701) 【BUG】前台 - 回覆商品問答若文字太短，會造成跑版 ([@piovischioh](https://github.com/piovischioh))
  - [#700](https://github.com/meepshop/meep-lerna/pull/700) 【個別店家】 部分分頁顯示空白 ([@piovischioh](https://github.com/piovischioh))
- Other
  - [#704](https://github.com/meepshop/meep-lerna/pull/704) 【BUG】 前台 - 會員資料 - 未顯示會員群組名稱、起迄時間 ([@happycat6323](https://github.com/happycat6323))
- `store`
  - [#696](https://github.com/meepshop/meep-lerna/pull/696) 【BUG】 前台 - 會員資料 - 無法更新 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#711](https://github.com/meepshop/meep-lerna/pull/711) (@store/utils): replace MaybeType with Partial ([@piovischioh](https://github.com/piovischioh))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.26.1 (2019-10-01)

#### :rocket: New Feature

- `meep-ui`
  - [#697](https://github.com/meepshop/meep-lerna/pull/697) 【優化】 前端 - 結帳頁，建立訂單失敗時，美化提示文字 ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`, `mock-types`, `store`
  - [#610](https://github.com/meepshop/meep-lerna/pull/610) 2371 【功能】前台 - 結帳頁 - 自建超取地圖：前端 ([@happycat6323](https://github.com/happycat6323))
- Other
  - [#708](https://github.com/meepshop/meep-lerna/pull/708) (@meepshop/front-end) Remove OmitType, use new Omit ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.26.0 (2019-09-27)

#### :rocket: New Feature

- `mock-types`, `store`
  - [#694](https://github.com/meepshop/meep-lerna/pull/694) 前端 - 收件人範本從新欄位拿 (using yahooCode) ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#699](https://github.com/meepshop/meep-lerna/pull/699) 【BUG】一頁式購物車 - 「訂單備註」的越南文語系，出現日文 ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#698](https://github.com/meepshop/meep-lerna/pull/698) (@meepshop/store): end response after logging ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- `end-to-end`
  - [#706](https://github.com/meepshop/meep-lerna/pull/706) (@meepshop/end-to-end) Remove end-to-end testing ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#698](https://github.com/meepshop/meep-lerna/pull/698) (@meepshop/store): end response after logging ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.25.25 (2019-09-20)

#### :bug: Bug Fix

- [#695](https://github.com/meepshop/meep-lerna/pull/695) (@store/gmo-credit-card-form, @store/member-settings) Fix cache ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.25.24 (2019-09-20)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#604](https://github.com/meepshop/meep-lerna/pull/604) 【優化】 GMO 信用卡 - 信用卡卡號、安全碼留存同意機制：前端 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#683](https://github.com/meepshop/meep-lerna/pull/683) 【優化】 前端 - 結帳頁：若訂單建立失敗，保留消費者已填寫的各項資料 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.25.23 (2019-09-18)

#### :rocket: New Feature

- `meep-ui`
  - [#692](https://github.com/meepshop/meep-lerna/pull/692) 【個案處理】meepShop MAX 極速開店：新增白名單 - giftcungvn, giftcung ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#691](https://github.com/meepshop/meep-lerna/pull/691) 前端 - 結帳頁 儲存收件人範本 國家需存英文 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.25.22 (2019-09-12)

#### :bug: Bug Fix

- `store`
  - [#689](https://github.com/meepshop/meep-lerna/pull/689) 前端 - 前台會員資料＆收件人範本 補傳 streetAddress 到後端 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `meep-ui`, `store`
  - [#675](https://github.com/meepshop/meep-lerna/pull/675) 前端改用 logo/mobileLogo/favicon 新欄位 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.25.21 (2019-09-11)

#### :bug: Bug Fix

- `meep-ui`
  - [#690](https://github.com/meepshop/meep-lerna/pull/690) 【個別店家】無法使用藍新 - 超商代碼建立訂單 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.25.20 (2019-09-09)

#### :bug: Bug Fix

- `store`
  - [#679](https://github.com/meepshop/meep-lerna/pull/679) 【BUG】前台 - 訂單明細/發票資訊 ([@piovischioh](https://github.com/piovischioh))
- `meep-ui`
  - [#681](https://github.com/meepshop/meep-lerna/pull/681) 【BUG】 前台商品列表頁 - 排序選單文字出現 createdOn-asc ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.25.19 (2019-09-09)

#### :bug: Bug Fix

- `meep-ui`
  - [#680](https://github.com/meepshop/meep-lerna/pull/680) 【BUG】 手機版 - 商品加入我的收藏，尚未登入會員提示彈窗跑版 ([@piovischioh](https://github.com/piovischioh))
- Other
  - [#682](https://github.com/meepshop/meep-lerna/pull/682) 前台 移除不必要的 client side schema ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.25.18 (2019-09-04)

#### :rocket: New Feature

- `meep-ui`
  - [#655](https://github.com/meepshop/meep-lerna/pull/655) 原本在 商品列表 或 選選樂 就先取得 商品彈窗 中的資料，改成點開 商品彈窗 才取得 商品的資料 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `meep-ui`
  - [#678](https://github.com/meepshop/meep-lerna/pull/678) 【BUG】新架構/手機版 - 若背景顏色不為白色，menu 底下會有一塊空白 ([@piovischioh](https://github.com/piovischioh))
  - [#677](https://github.com/meepshop/meep-lerna/pull/677) 【BUG】 背景顏色 - 後台預覽顯示正常，前台顯示會多一塊空白 ([@piovischioh](https://github.com/piovischioh))
- Other
  - [#676](https://github.com/meepshop/meep-lerna/pull/676) (@meepshop/front-end) Lock typescript version ([@happycat6323](https://github.com/happycat6323))

#### Committers: 2

- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.25.17 (2019-08-28)

#### :bug: Bug Fix

- [#674](https://github.com/meepshop/meep-lerna/pull/674) 【其他】Next Admin - 左側列表細項：補 英 / 日 翻譯 ([@piovischioh](https://github.com/piovischioh))
- [#673](https://github.com/meepshop/meep-lerna/pull/673) (@meepshop/front-end) Lock @types/graphql ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.25.15 (2019-08-23)

#### :bug: Bug Fix

- [#670](https://github.com/meepshop/meep-lerna/pull/670) 同步 admin 新舊架構語系設定 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.25.14 (2019-08-23)

#### :rocket: New Feature

- [#668](https://github.com/meepshop/meep-lerna/pull/668) (@meepshop/front-end) Modify locale notifier ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#672](https://github.com/meepshop/meep-lerna/pull/672) 【BUG】 前台語系越南文變成中文 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#668](https://github.com/meepshop/meep-lerna/pull/668) (@meepshop/front-end) Modify locale notifier ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.25.13 (2019-08-21)

#### :rocket: New Feature

- `store`
  - [#667](https://github.com/meepshop/meep-lerna/pull/667) (@meepshop/front-end) Add locale notifier ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#660](https://github.com/meepshop/meep-lerna/pull/660) 【BUG】新架構 - 商品規格 dropdown menu 的箭頭與前面文字無間距 ([@piovischioh](https://github.com/piovischioh))
- `mock-types`, `store`
  - [#659](https://github.com/meepshop/meep-lerna/pull/659) 修正前後台 apollo-client 的一些 bug ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#666](https://github.com/meepshop/meep-lerna/pull/666) (@admin/server): add lost config option ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.25.12 (2019-08-20)

#### :bug: Bug Fix

- `store`
  - [#665](https://github.com/meepshop/meep-lerna/pull/665) 【BUG】新架構/IE 瀏覽器 - 前台顯示異常 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.25.11 (2019-08-19)

#### :bug: Bug Fix

- [#664](https://github.com/meepshop/meep-lerna/pull/664) 【BUG】Next Admin - 左側列表細項跑版 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.25.10 (2019-08-19)

#### :bug: Bug Fix

- `meep-ui`
  - [#663](https://github.com/meepshop/meep-lerna/pull/663) 【BUG】新架構 - 購物車 panel 問題 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.25.9 (2019-08-19)

#### :boom: Breaking Change

- `store`
  - [#654](https://github.com/meepshop/meep-lerna/pull/654) next-store 使用 next-i18next ([@piovischioh](https://github.com/piovischioh))

#### :rocket: New Feature

- `store`
  - [#654](https://github.com/meepshop/meep-lerna/pull/654) next-store 使用 next-i18next ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- `store`
  - [#661](https://github.com/meepshop/meep-lerna/pull/661) (@meepshop/front-end) Upgrade less version, lock less-loader version ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`
  - [#658](https://github.com/meepshop/meep-lerna/pull/658) 【BUG】 後台 - 商品庫存大於 1，但前台 - 購買數量僅顯示 1 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.25.8 (2019-08-14)

#### :rocket: New Feature

- `meep-ui`
  - [#656](https://github.com/meepshop/meep-lerna/pull/656) 【個案處理】meepShop MAX 極速開店：新增白名單 - mothersarm ([@happycat6323](https://github.com/happycat6323))
  - [#653](https://github.com/meepshop/meep-lerna/pull/653) 【個別店家】 移除新架構 - 購物車 panel 會員登入畫面客製之文字 -- 阿原 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.25.7 (2019-08-12)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#649](https://github.com/meepshop/meep-lerna/pull/649) 修改 退換貨申請 ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- `store`
  - [#651](https://github.com/meepshop/meep-lerna/pull/651) 【BUG】新架構/手機版 - 訂單列表位置跑版 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.25.6 (2019-08-07)

#### :rocket: New Feature

- `meep-ui`
  - [#650](https://github.com/meepshop/meep-lerna/pull/650) 【優化】 電子發票捐贈社福團體愛心碼查詢網址變更([@happycat6323](https://github.com/happycat6323))

## 0.25.5 (2019-08-05)

#### :rocket: New Feature

- `meep-ui`, `mock-types`, `store`
  - [#644](https://github.com/meepshop/meep-lerna/pull/644) 修改 退換貨查詢 ([@piovischioh](https://github.com/piovischioh))
- `meep-ui`, `store`
  - [#645](https://github.com/meepshop/meep-lerna/pull/645) 【功能】 新增(自訂)廣告事件 - 彈窗版型商品列表的「加到購物車」 ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#646](https://github.com/meepshop/meep-lerna/pull/646) 修改 匯款通知 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- [#647](https://github.com/meepshop/meep-lerna/pull/647) 【個別店家】 新架構 - 前台訂單明細空白 ([@piovischioh](https://github.com/piovischioh))
- [#648](https://github.com/meepshop/meep-lerna/pull/648) 【個別店家】 新架構 - 前台訂單管理轉圈圈，無法查詢訂單 ([@happycat6323](https://github.com/happycat6323))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.25.4 (2019-07-31)

#### :bug: Bug Fix

- [#643](https://github.com/meepshop/meep-lerna/pull/643) 【BUG】新架構 - 前台訂單明細 - 運送狀態顯示有誤 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.25.3 (2019-07-31)

#### :bug: Bug Fix

- [#639](https://github.com/meepshop/meep-lerna/pull/639) 【優化】ECFIT 訂單管理 UI 調整 ([@HsuTing](https://github.com/HsuTing))
- [#642](https://github.com/meepshop/meep-lerna/pull/642) 【BUG】新架構/手機版 -「立即付款」項目跑版 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#640](https://github.com/meepshop/meep-lerna/pull/640) 重新命名 Fragments ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.25.2 (2019-07-29)

#### :bug: Bug Fix

- [#638](https://github.com/meepshop/meep-lerna/pull/638) (@store/member-orders) Fix query error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.25.1 (2019-07-29)

#### :bug: Bug Fix

- [#637](https://github.com/meepshop/meep-lerna/pull/637) (@store/\*) Fix v0.25.0 release error ([@HsuTing](https://github.com/HsuTing))
- [#636](https://github.com/meepshop/meep-lerna/pull/636) (@store/member-orders) Fix typescript error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.25.0 (2019-07-29)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#630](https://github.com/meepshop/meep-lerna/pull/630) next-store koa 轉 express ([@piovischioh](https://github.com/piovischioh))

#### :rocket: New Feature

- `meep-ui`, `mock-types`, `store`
  - [#622](https://github.com/meepshop/meep-lerna/pull/622) 修改 訂單列表 ([@HsuTing](https://github.com/HsuTing))
  - [#621](https://github.com/meepshop/meep-lerna/pull/621) 修改 訂單明細 ([@piovischioh](https://github.com/piovischioh))
- `meep-ui`, `store`
  - [#630](https://github.com/meepshop/meep-lerna/pull/630) next-store koa 轉 express ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- `meep-ui`
  - [#631](https://github.com/meepshop/meep-lerna/pull/631) 【BUG】新架構/選選樂 - 將商品從購物車 panel 刪除，會變為「贈品」 ([@piovischioh](https://github.com/piovischioh))
  - [#634](https://github.com/meepshop/meep-lerna/pull/634) 【BUG】新架構/手機版 - 新開商店，開啟選單，頁面跑版 ([@HsuTing](https://github.com/HsuTing))
  - [#635](https://github.com/meepshop/meep-lerna/pull/635) 【BUG】新架構 - 前台會員系列，部分頁面呈現 loading ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#633](https://github.com/meepshop/meep-lerna/pull/633) (@store/\*) Fix i18n ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.24.18 (2019-07-24)

#### :bug: Bug Fix

- `store`
  - [#632](https://github.com/meepshop/meep-lerna/pull/632) 【BUG】 新架構/手機版 - Android 瀏覽頁面時，畫面會卡住 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.24.17 (2019-07-24)

#### :rocket: New Feature

- `store`
  - [#626](https://github.com/meepshop/meep-lerna/pull/626) 【功能】 FB 像素：新增(自訂)廣告事件 - 加到購物車 ([@HsuTing](https://github.com/HsuTing))
- `mock-types`
  - [#624](https://github.com/meepshop/meep-lerna/pull/624) (@store/utils) Add set currenct ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#628](https://github.com/meepshop/meep-lerna/pull/628) 【BUG】前台 - 若該會員無購物金，頁面頁面會一直 loading ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#629](https://github.com/meepshop/meep-lerna/pull/629) (@store/\*) Modify code style ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.24.16 (2019-07-22)

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#627](https://github.com/meepshop/meep-lerna/pull/627) Revert "next-store koa 轉 express (#601)" ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.24.15 (2019-07-22)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#601](https://github.com/meepshop/meep-lerna/pull/601) next-store koa 轉 express ([@piovischioh](https://github.com/piovischioh))

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#620](https://github.com/meepshop/meep-lerna/pull/620) 修改 會員 更改密碼 ([@HsuTing](https://github.com/HsuTing))
  - [#601](https://github.com/meepshop/meep-lerna/pull/601) next-store koa 轉 express ([@piovischioh](https://github.com/piovischioh))
- `meep-ui`, `mock-types`, `store`
  - [#607](https://github.com/meepshop/meep-lerna/pull/607) 修改 購物金 ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`
  - [#566](https://github.com/meepshop/meep-lerna/pull/566) 【功能】 中國信託信用卡串接（POS_URL） ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.24.14 (2019-07-19)

#### :bug: Bug Fix

- `meep-ui`
  - [#625](https://github.com/meepshop/meep-lerna/pull/625) 【BUG】新架構/綠界金流 - 首次購物，出現交易失敗！訂單編號重覆，建立失敗(錯誤代碼 100002)，請聯繫商店處理。 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.24.13 (2019-07-18)

#### :bug: Bug Fix

- `store`
  - [#623](https://github.com/meepshop/meep-lerna/pull/623) 【其他】新架構/手機版 - 從 FB 粉絲專頁導向過去前台，無法 FB 登入 ([@piovischioh](https://github.com/piovischioh))
- Other
  - [#619](https://github.com/meepshop/meep-lerna/pull/619) (@store/currency): modify currenyType ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.24.12 (2019-07-17)

#### :rocket: New Feature

- Other
  - [#613](https://github.com/meepshop/meep-lerna/pull/613) 【BUG】新架構/藍新超商代碼 - EC＆一頁式皆無法成立訂單 ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`, `mock-types`
  - [#618](https://github.com/meepshop/meep-lerna/pull/618) (@store/currency) init fx ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#608](https://github.com/meepshop/meep-lerna/pull/608) (@store/thumbnail, @store/currency) add new packages ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- `store`
  - [#580](https://github.com/meepshop/meep-lerna/pull/580) N362 【BUG】前台 - Line 分享連結，商品頁未帶「商品描述」 ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#614](https://github.com/meepshop/meep-lerna/pull/614) 【BUG】新架構/收件人範本 - 地區下拉選項顯示「no data」 ([@HsuTing](https://github.com/HsuTing))
  - [#617](https://github.com/meepshop/meep-lerna/pull/617) (@store/member-recipients) Remove client side schema recipient id ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`, `store`
  - [#612](https://github.com/meepshop/meep-lerna/pull/612) 前端重整 code 架構 -- 補翻譯 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- Other
  - [#615](https://github.com/meepshop/meep-lerna/pull/615) (@store/currency, @store/member-wish-list) Modify code style ([@HsuTing](https://github.com/HsuTing))
- `end-to-end`, `meep-ui`, `mock-types`, `store`
  - [#616](https://github.com/meepshop/meep-lerna/pull/616) (@meepshop/front-end) Remove console ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.24.11 (2019-07-15)

#### :bug: Bug Fix

- `meep-ui`
  - [#611](https://github.com/meepshop/meep-lerna/pull/611) 【BUG】新架構/一頁式購物車 - 頁面空白 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.24.10 (2019-07-15)

#### :rocket: New Feature

- `meep-ui`, `mock-types`, `store`
  - [#591](https://github.com/meepshop/meep-lerna/pull/591) 修改 收件人範本 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#609](https://github.com/meepshop/meep-lerna/pull/609) 【BUG】新架構 - 會員登入後，先進到「會員資料」再進到「訂單明細」，訂單列表無法顯示 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.24.9 (2019-07-11)

#### :bug: Bug Fix

- Other
  - [#606](https://github.com/meepshop/meep-lerna/pull/606) 【BUG】 新架構 - 前台會員資料頁面空白 ([@HsuTing](https://github.com/HsuTing))
- `mock-types`
  - [#605](https://github.com/meepshop/meep-lerna/pull/605) 【BUG】新架構/IE 瀏覽器 - 前台無法正常開啟，顯示一片空白 - 07/11 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.24.8 (2019-07-10)

#### :rocket: New Feature

- `mock-types`, `store`
  - [#586](https://github.com/meepshop/meep-lerna/pull/586) 修改 我的收藏 ([@happycat6323](https://github.com/happycat6323))
- `meep-ui`, `mock-types`, `store`
  - [#590](https://github.com/meepshop/meep-lerna/pull/590) 修改 thankYouPage ([@piovischioh](https://github.com/piovischioh))
  - [#524](https://github.com/meepshop/meep-lerna/pull/524) 新增 @store/address-cascader ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- Other
  - [#588](https://github.com/meepshop/meep-lerna/pull/588) 【BUG】 手機版 - 後台商店總覽頁面跑版 ([@piovischioh](https://github.com/piovischioh))
  - [#602](https://github.com/meepshop/meep-lerna/pull/602) (@meepshop/front-end) Fix bug about @babel/helper ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#600](https://github.com/meepshop/meep-lerna/pull/600) (@meepshop/front-end) Fix packages warning ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.24.6 (2019-07-08)

#### :bug: Bug Fix

- Other
  - [#598](https://github.com/meepshop/meep-lerna/pull/598) 【BUG】ECFIT 訂單管理 - DatePicker 選擇「自訂時間」無出現訂單 ([@HsuTing](https://github.com/HsuTing))
  - [#597](https://github.com/meepshop/meep-lerna/pull/597) (@admin/server) Fix export error with new babel version ([@HsuTing](https://github.com/HsuTing))
  - [#595](https://github.com/meepshop/meep-lerna/pull/595) (@meepshop/front-end) Fix new version babel error ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`
  - [#587](https://github.com/meepshop/meep-lerna/pull/587) 【BUG】 新架構 - (預設) 商品列表分頁的「...」按了無反應，無法跳頁 ([@happycat6323](https://github.com/happycat6323))
  - [#596](https://github.com/meepshop/meep-lerna/pull/596) 【BUG】 新架構 - 未安裝「會員群組代碼」擴充功能，前台卻顯示 ([@piovischioh](https://github.com/piovischioh))
- `store`
  - [#593](https://github.com/meepshop/meep-lerna/pull/593) 【BUG】 新架構/IE 瀏覽器 - 前台無法正常開啟，顯示一片空白 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.24.4 (2019-07-04)

#### :bug: Bug Fix

- `store`
  - [#594](https://github.com/meepshop/meep-lerna/pull/594) 【BUG】新架構 - GMO 信用卡安全碼第一碼若為 0，系統會過濾掉 ([@HsuTing](https://github.com/HsuTing))
  - [#592](https://github.com/meepshop/meep-lerna/pull/592) (@meepshop/store) Fix deploy ([@HsuTing](https://github.com/HsuTing))
  - [#589](https://github.com/meepshop/meep-lerna/pull/589) (@meepshop/store) Fix i18n SSR error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.24.3 (2019-07-01)

#### :rocket: New Feature

- `store`
  - [#584](https://github.com/meepshop/meep-lerna/pull/584) 【優化】 meepShop x Facebook - pixel ([@happycat6323](https://github.com/happycat6323))
- `mock-types`
  - [#583](https://github.com/meepshop/meep-lerna/pull/583) (@store/apollo-client-resolvers) Add colors client schema ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `end-to-end`, `mock-types`
  - [#585](https://github.com/meepshop/meep-lerna/pull/585) (@meepshop/front-end) Fix detail of pacakages ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.24.2 (2019-06-25)

#### :rocket: New Feature

- `meep-ui`
  - [#577](https://github.com/meepshop/meep-lerna/pull/577) 【優化】 ECFIT - 物流設定 - 海外：前端 ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`, `store`
  - [#539](https://github.com/meepshop/meep-lerna/pull/539) 修正使用商品主圖邏輯 - 前端 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `store`
  - [#403](https://github.com/meepshop/meep-lerna/pull/403) N362 【BUG】前台 - Line 分享連結，商品頁未帶「商品描述」 ([@barrypeng6](https://github.com/barrypeng6))
- Other
  - [#578](https://github.com/meepshop/meep-lerna/pull/578) 【BUG】後台 - Dashboard：本月訂單數、會員總數出現字元 '＄' ([@piovischioh](https://github.com/piovischioh))
  - close react/prop-types rule ([@HsuTing](https://github.com/HsuTing))

#### Committers: 4

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.24.1 (2019-06-24)

#### :boom: Breaking Change

- `end-to-end`, `meep-ui`, `store`
  - [#527](https://github.com/meepshop/meep-lerna/pull/527) 【功能】GMO 金流規格變更 - 新增「新 NEWEB」：前端 ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#556](https://github.com/meepshop/meep-lerna/pull/556) (@admin/server): remove unnecessary env ([@piovischioh](https://github.com/piovischioh))

#### :rocket: New Feature

- `end-to-end`, `meep-ui`, `store`
  - [#527](https://github.com/meepshop/meep-lerna/pull/527) 【功能】GMO 金流規格變更 - 新增「新 NEWEB」：前端 ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#556](https://github.com/meepshop/meep-lerna/pull/556) (@admin/server): remove unnecessary env ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- `meep-ui`
  - [#575](https://github.com/meepshop/meep-lerna/pull/575) 2844 【優化】 前台/login - 「企業優惠代碼」正名「群組代碼」- 補翻譯 ([@HsuTing](https://github.com/HsuTing))
- `end-to-end`
  - [#576](https://github.com/meepshop/meep-lerna/pull/576) (@meepshop/end-to-end) Fix testing ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#574](https://github.com/meepshop/meep-lerna/pull/574) (@admin/server): remove additional router and component in withApollo ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- [#573](https://github.com/meepshop/meep-lerna/pull/573) (@meepshop/front-end) Add old-admin ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.24.0 (2019-06-19)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#569](https://github.com/meepshop/meep-lerna/pull/569) Upgrade next.js ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- [#568](https://github.com/meepshop/meep-lerna/pull/568) 【其他】admin 的 favicon ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- Other
  - [#571](https://github.com/meepshop/meep-lerna/pull/571) 【BUG】 小幫手權限管理 - 點選營收統計，會直接登出系統 ([@piovischioh](https://github.com/piovischioh))
  - [#564](https://github.com/meepshop/meep-lerna/pull/564) 【BUG】ECFIT 訂單管理 - 點選「清空搜尋」無清空「搜尋關鍵字」內容 ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`
  - [#565](https://github.com/meepshop/meep-lerna/pull/565) 【BUG】 新架構 - 預設圖示 24x24，前台會出現壓縮＆解析度問題 ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- `end-to-end`
  - [#570](https://github.com/meepshop/meep-lerna/pull/570) (@meepshop/end-to-end) Fix testing ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#567](https://github.com/meepshop/meep-lerna/pull/567) (@admin/wrapper) Fix typo error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.23.2 (2019-06-11)

#### :rocket: New Feature

- [#563](https://github.com/meepshop/meep-lerna/pull/563) (@meepshop/front-end) Add docker compose ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#562](https://github.com/meepshop/meep-lerna/pull/562) 【BUG】新架構 -「購物車數量」、購物車內的「商品名稱/規格」、「金額」沒有綁色彩計畫 ([@piovischioh](https://github.com/piovischioh))
  - [#559](https://github.com/meepshop/meep-lerna/pull/559) 【BUG】新架構/手機版 - 會員登入 icon 於登入之後跑版 ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#560](https://github.com/meepshop/meep-lerna/pull/560) 【BUG】ECFIT 訂單管理 - 列表欄位顯示有誤 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#563](https://github.com/meepshop/meep-lerna/pull/563) (@meepshop/front-end) Add docker compose ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.23.1 (2019-06-10)

#### :rocket: New Feature

- `store`
  - [#557](https://github.com/meepshop/meep-lerna/pull/557) 【個別店家】 Facebook 無法登入：應用程式未設定 (cname：imint) ([@piovischioh](https://github.com/piovischioh))
- `meep-ui`
  - [#547](https://github.com/meepshop/meep-lerna/pull/547) 【個案處理】meepShop MAX 極速開店：新增白名單 - jin ([@happycat6323](https://github.com/happycat6323))
- `mock-types`, `store`
  - [#552](https://github.com/meepshop/meep-lerna/pull/552) (@meepshop/front-end) Support component ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#557](https://github.com/meepshop/meep-lerna/pull/557) 【個別店家】 Facebook 無法登入：應用程式未設定 (cname：imint) ([@piovischioh](https://github.com/piovischioh))
  - [#555](https://github.com/meepshop/meep-lerna/pull/555) (@meepshop/store) Fix i18n language error ([@HsuTing](https://github.com/HsuTing))
  - [#554](https://github.com/meepshop/meep-lerna/pull/554) (@meepshop/store) Support to use i18n ([@HsuTing](https://github.com/HsuTing))
  - [#553](https://github.com/meepshop/meep-lerna/pull/553) (@meepshop/store) Compatible login flow with meep-nginx ([@piovischioh](https://github.com/piovischioh))
- `meep-ui`, `store`
  - [#558](https://github.com/meepshop/meep-lerna/pull/558) (@meepshop/front-end) Fix prettier ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `store`
  - [#561](https://github.com/meepshop/meep-lerna/pull/561) (@meepshop/store) Add body log ([@HsuTing](https://github.com/HsuTing))
- `mock-types`, `store`
  - [#552](https://github.com/meepshop/meep-lerna/pull/552) (@meepshop/front-end) Support component ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.23.0 (2019-06-06)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#549](https://github.com/meepshop/meep-lerna/pull/549) (Revert) next-store koa 轉 express, add log ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#551](https://github.com/meepshop/meep-lerna/pull/551) 【個別店家】 Facebook 無法登入：應用程式未設定 (cname：truda-moda) ([@piovischioh](https://github.com/piovischioh))
  - [#550](https://github.com/meepshop/meep-lerna/pull/550) (@meepshop/store) Fix log error ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `meep-ui`, `store`
  - [#549](https://github.com/meepshop/meep-lerna/pull/549) (Revert) next-store koa 轉 express, add log ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.22.0 (2019-06-04)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#526](https://github.com/meepshop/meep-lerna/pull/526) next-store koa 轉 express ([@piovischioh](https://github.com/piovischioh))

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#526](https://github.com/meepshop/meep-lerna/pull/526) next-store koa 轉 express ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.21.7 (2019-06-03)

#### :rocket: New Feature

- `store`
  - [#541](https://github.com/meepshop/meep-lerna/pull/541) 【其他】修改前端 deploy 的設定 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#544](https://github.com/meepshop/meep-lerna/pull/544) 新架構 - 產品列表元件不應吃產品搜尋 (products?limit)＆關鍵字搜尋 (products/?search) 的值 ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`
  - [#540](https://github.com/meepshop/meep-lerna/pull/540) 【BUG】 新架構/選單元件 - 子選單展開第一層文字應置左 ([@HsuTing](https://github.com/HsuTing))
  - [#542](https://github.com/meepshop/meep-lerna/pull/542) 【BUG】 前台新架構 - 置頂選單顯示異常（有子選單時） ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- Other
  - [#545](https://github.com/meepshop/meep-lerna/pull/545) (@meepshop/front-end) Remove lock ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`, `mock-types`
  - [#543](https://github.com/meepshop/meep-lerna/pull/543) (@meepshop/front-end) Modify storybook ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.21.6 (2019-05-29)

#### :rocket: New Feature

- `meep-ui`
  - [#431](https://github.com/meepshop/meep-lerna/pull/431) 2331 【功能 國泰世華銀行 - 信用卡收單服務（金流串接） ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- `meep-ui`
  - [#536](https://github.com/meepshop/meep-lerna/pull/536) 修復 next-store 另開分頁 ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- [#538](https://github.com/meepshop/meep-lerna/pull/538) (@meepshop/front-end) Remove lock ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.21.5 (2019-05-27)

#### :rocket: New Feature

- `meep-ui`
  - [#532](https://github.com/meepshop/meep-lerna/pull/532) 【其他】 綠界電子發票：前端要 call 手機條碼驗證 api ([@piovischioh](https://github.com/piovischioh))
  - [#530](https://github.com/meepshop/meep-lerna/pull/530) 【個案處理】meepShop MAX 極速開店：新增白名單 - fionho ([@happycat6323](https://github.com/happycat6323))
- `meep-ui`, `store`
  - [#518](https://github.com/meepshop/meep-lerna/pull/518) N366 【優化】選單 - 預設圖示 icon＆自訂圖示顯示的大小 - 前端 ([@HsuTing](https://github.com/HsuTing))
- `mock-types`
  - [#502](https://github.com/meepshop/meep-lerna/pull/502) 2114 【功能】ECFIT 串接 - 前端 - 補做 ECFIT 訂單頁的匯出＆列印 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#513](https://github.com/meepshop/meep-lerna/pull/513) 修正 fixedbottom 可以為 null 的問題 ([@HsuTing](https://github.com/HsuTing))
- `mock-types`
  - [#502](https://github.com/meepshop/meep-lerna/pull/502) 2114 【功能】ECFIT 串接 - 前端 - 補做 ECFIT 訂單頁的匯出＆列印 ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#533](https://github.com/meepshop/meep-lerna/pull/533) (@meepshop/front-end) Fix apollo error ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- Other
  - [#533](https://github.com/meepshop/meep-lerna/pull/533) (@meepshop/front-end) Fix apollo error ([@HsuTing](https://github.com/HsuTing))
  - [#529](https://github.com/meepshop/meep-lerna/pull/529) (@meepshop/front-end) lock apollo version ([@HsuTing](https://github.com/HsuTing))
- `mock-types`
  - [#531](https://github.com/meepshop/meep-lerna/pull/531) (@meepshop/front-end) Fix dev with @store/\* ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.21.4 (2019-05-23)

#### :rocket: New Feature

- `meep-ui`
  - [#519](https://github.com/meepshop/meep-lerna/pull/519) 【優化】 前台/login - 「企業優惠代碼」正名「群組代碼」 ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#466](https://github.com/meepshop/meep-lerna/pull/466) 2361 【優化】後台 - 商店設定 UI 優化 - 前端 only ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#521](https://github.com/meepshop/meep-lerna/pull/521) 前台會員購物金頁面金額錯誤 ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`
  - [#517](https://github.com/meepshop/meep-lerna/pull/517) 【BUG】新架構/商品問答 - 後台回覆商品問答，前台文字顯示跑版 ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- [#525](https://github.com/meepshop/meep-lerna/pull/525) (@meepshop/front-end) Fix lock ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.21.3 (2019-05-21)

#### :rocket: New Feature

- Other
  - [#523](https://github.com/meepshop/meep-lerna/pull/523) (@meepshop/front-end) Add APOLLO_TAG in config ([@HsuTing](https://github.com/HsuTing))
  - [#522](https://github.com/meepshop/meep-lerna/pull/522) (@admin/server) Add testing to check namespacesRequired ([@HsuTing](https://github.com/HsuTing))
- `mock-types`
  - [#512](https://github.com/meepshop/meep-lerna/pull/512) (@admin/orders-export) Add orders export panel ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#516](https://github.com/meepshop/meep-lerna/pull/516) 【其他】ECFIT 訂單管理 - 未測試到的 Spec UI ([@HsuTing](https://github.com/HsuTing))
- [#520](https://github.com/meepshop/meep-lerna/pull/520) (@meepshop/front-end) Remove lock version ([@HsuTing](https://github.com/HsuTing))
- [#514](https://github.com/meepshop/meep-lerna/pull/514) (@meepshop/front-end) Hotfix for rc-drawer new version ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#523](https://github.com/meepshop/meep-lerna/pull/523) (@meepshop/front-end) Add APOLLO_TAG in config ([@HsuTing](https://github.com/HsuTing))
- [#522](https://github.com/meepshop/meep-lerna/pull/522) (@admin/server) Add testing to check namespacesRequired ([@HsuTing](https://github.com/HsuTing))
- [#520](https://github.com/meepshop/meep-lerna/pull/520) (@meepshop/front-end) Remove lock version ([@HsuTing](https://github.com/HsuTing))
- [#514](https://github.com/meepshop/meep-lerna/pull/514) (@meepshop/front-end) Hotfix for rc-drawer new version ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.21.2 (2019-05-14)

#### :boom: Breaking Change

- [#505](https://github.com/meepshop/meep-lerna/pull/505) (@admin/\*) add getInitialProps ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- `meep-ui`
  - [#507](https://github.com/meepshop/meep-lerna/pull/507) 【BUG】新架構/發票資訊 - 載具欄位顯示錯誤＆無顯示愛心碼 ([@piovischioh](https://github.com/piovischioh))
  - [#506](https://github.com/meepshop/meep-lerna/pull/506) 【BUG】 圖片元件 - 群組寬度 60%、元件寬度 40％，前台顯示異常 ([@piovischioh](https://github.com/piovischioh))
- Other
  - [#509](https://github.com/meepshop/meep-lerna/pull/509) (@meepshop/front-end) Fix typescript config with relative path ([@HsuTing](https://github.com/HsuTing))
  - [#505](https://github.com/meepshop/meep-lerna/pull/505) (@admin/\*) add getInitialProps ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- [#509](https://github.com/meepshop/meep-lerna/pull/509) (@meepshop/front-end) Fix typescript config with relative path ([@HsuTing](https://github.com/HsuTing))
- [#508](https://github.com/meepshop/meep-lerna/pull/508) (@meepshop/front-end) Upgrade lock ([@HsuTing](https://github.com/HsuTing))
- [#505](https://github.com/meepshop/meep-lerna/pull/505) (@admin/\*) add getInitialProps ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.21.1 (2019-05-09)

#### :boom: Breaking Change

- [#485](https://github.com/meepshop/meep-lerna/pull/485) 【其他】移除 lock version ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `mock-types`
  - [#503](https://github.com/meepshop/meep-lerna/pull/503) (@meepshop/mock-types) Use new apollo command ([@HsuTing](https://github.com/HsuTing))
- `mock-types`, `store`
  - [#498](https://github.com/meepshop/meep-lerna/pull/498) (@store/apollo-client-resolvers, admin/apollo-client-resolvers) Add apollo client resolvers ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#501](https://github.com/meepshop/meep-lerna/pull/501) 【BUG】新架構 - 商品列表排序選單顯示「0,50000」 ([@piovischioh](https://github.com/piovischioh))
  - [#497](https://github.com/meepshop/meep-lerna/pull/497) 【優化】 新架構 - /checkout - 付款方式/運送方式說明文字段落換行 ([@piovischioh](https://github.com/piovischioh))
  - [#494](https://github.com/meepshop/meep-lerna/pull/494) 【其他】Chrome 74 造成的問題 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#485](https://github.com/meepshop/meep-lerna/pull/485) 【其他】移除 lock version ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.21.0 (2019-05-07)

#### :rocket: New Feature

- `mock-types`
  - [#477](https://github.com/meepshop/meep-lerna/pull/477) Use Typescript in Next-Admin ([@piovischioh](https://github.com/piovischioh))
- `store`
  - [#444](https://github.com/meepshop/meep-lerna/pull/444) 2114 【功能】ECFIT 串接 - 前端 - 商品設定 + 訂單頁 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- [#500](https://github.com/meepshop/meep-lerna/pull/500) (@store/ezpay) Fix typescript with using moment ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `mock-types`
  - [#477](https://github.com/meepshop/meep-lerna/pull/477) Use Typescript in Next-Admin ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.20.6 (2019-05-02)

#### :rocket: New Feature

- [#492](https://github.com/meepshop/meep-lerna/pull/492) (@meepshop/front-end) Add release bot ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#493](https://github.com/meepshop/meep-lerna/pull/493) 【BUG】 新架構/Chrome 74 - /checkout 付款方式選擇 GMO 信用卡，畫面空白 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#492](https://github.com/meepshop/meep-lerna/pull/492) (@meepshop/front-end) Add release bot ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.20.5 (2019-05-02)

#### :rocket: New Feature

- [#491](https://github.com/meepshop/meep-lerna/pull/491) (@store/utils) Add new packages ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#478](https://github.com/meepshop/meep-lerna/pull/478) 【BUG】 前台 - 商品圖 (影像 1) 出現白邊 ([@happycat6323](https://github.com/happycat6323))
  - [#481](https://github.com/meepshop/meep-lerna/pull/481) 【BUG】新架構/手機版 - 前台頁腳若有子選單，會自動展開 ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#480](https://github.com/meepshop/meep-lerna/pull/480) 【BUG】 新架構 - 後台選單設計樣式透明度設為 0，前台出現白色 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `end-to-end`
  - [#489](https://github.com/meepshop/meep-lerna/pull/489) (@meepshop/end-to-end) Fix testing error ([@HsuTing](https://github.com/HsuTing))
  - [#487](https://github.com/meepshop/meep-lerna/pull/487) (@meepshop/front-end) Use parallel ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.20.4 (2019-04-30)

#### :bug: Bug Fix

- [#482](https://github.com/meepshop/meep-lerna/pull/482) 【BUG】登入 admin，有時候會轉到舊版的 dashboard ([@piovischioh](https://github.com/piovischioh))
- [#484](https://github.com/meepshop/meep-lerna/pull/484) (@meepshop/front-end) Lock react-slick ([@HsuTing](https://github.com/HsuTing))
- [#483](https://github.com/meepshop/meep-lerna/pull/483) (@meepshop/front-end) Fix eslint error ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#484](https://github.com/meepshop/meep-lerna/pull/484) (@meepshop/front-end) Lock react-slick ([@HsuTing](https://github.com/HsuTing))
- [#483](https://github.com/meepshop/meep-lerna/pull/483) (@meepshop/front-end) Fix eslint error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.20.3 (2019-04-25)

#### :bug: Bug Fix

- `meep-ui`
  - [#474](https://github.com/meepshop/meep-lerna/pull/474) 【BUG】IE 瀏覽器 - 當選單 or 頁面背景顏色為黑色時，前台選單文字顯示異常 --- 新架構 ([@piovischioh](https://github.com/piovischioh))
- `mock-types`
  - [#472](https://github.com/meepshop/meep-lerna/pull/472) (@meepshop/mock-types, @admin/server) Fix error ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `mock-types`
  - [#475](https://github.com/meepshop/meep-lerna/pull/475) (@meepshop/mock-types) Add StoreEcfitSettings schema ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.20.2 (2019-04-23)

#### :boom: Breaking Change

- [#457](https://github.com/meepshop/meep-lerna/pull/457) (@admin/utils) use typescripts ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `meep-ui`
  - [#464](https://github.com/meepshop/meep-lerna/pull/464) 【個案處理】meepShop MAX 極速開店：新增白名單 - xmiutc ([@happycat6323](https://github.com/happycat6323))
- `mock-types`
  - [#470](https://github.com/meepshop/meep-lerna/pull/470) (@meepshop/front-end) Add strictNullChecks to typescript ([@HsuTing](https://github.com/HsuTing))
  - [#468](https://github.com/meepshop/meep-lerna/pull/468) (@meepshop/mock-types) Add new mock types ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#469](https://github.com/meepshop/meep-lerna/pull/469) (@meepshop/front-end): Add idx ([@HsuTing](https://github.com/HsuTing))
  - [#458](https://github.com/meepshop/meep-lerna/pull/458) (@admin/date-picker) Add date-picker ([@HsuTing](https://github.com/HsuTing))
  - [#457](https://github.com/meepshop/meep-lerna/pull/457) (@admin/utils) use typescripts ([@HsuTing](https://github.com/HsuTing))
  - [#455](https://github.com/meepshop/meep-lerna/pull/455) use variables.less ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- Other
  - [#467](https://github.com/meepshop/meep-lerna/pull/467) 【BUG】Query String 造成新架構 IE 瀏覽器部分問題 ([@HsuTing](https://github.com/HsuTing))
  - [#463](https://github.com/meepshop/meep-lerna/pull/463) (@meepshop/front-end) Fix babel config with css-module ([@HsuTing](https://github.com/HsuTing))
  - [#465](https://github.com/meepshop/meep-lerna/pull/465) (@meepshop/front-end) Fix eslint bug ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`
  - [#460](https://github.com/meepshop/meep-lerna/pull/460) 【其他】GMO 信用卡 - 前台移除卡號碼檢查器 ([@piovischioh](https://github.com/piovischioh))
- `mock-types`
  - [#471](https://github.com/meepshop/meep-lerna/pull/471) (@admin/data-picker, @meepshop/mock-types) Fix storybook error ([@HsuTing](https://github.com/HsuTing))
  - [#470](https://github.com/meepshop/meep-lerna/pull/470) (@meepshop/front-end) Add strictNullChecks to typescript ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `mock-types`
  - [#471](https://github.com/meepshop/meep-lerna/pull/471) (@admin/data-picker, @meepshop/mock-types) Fix storybook error ([@HsuTing](https://github.com/HsuTing))
  - [#468](https://github.com/meepshop/meep-lerna/pull/468) (@meepshop/mock-types) Add new mock types ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#469](https://github.com/meepshop/meep-lerna/pull/469) (@meepshop/front-end): Add idx ([@HsuTing](https://github.com/HsuTing))
  - [#459](https://github.com/meepshop/meep-lerna/pull/459) (@admin/utils, @store/ezpay): Move typescript position ([@HsuTing](https://github.com/HsuTing))
- `end-to-end`, `mock-types`
  - [#461](https://github.com/meepshop/meep-lerna/pull/461) (@meepshop/mock-types, @meepshop/end-to-end) Add comments ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.20.1 (2019-04-16)

#### :boom: Breaking Change

- `meep-ui`, `mock-types`
  - [#440](https://github.com/meepshop/meep-lerna/pull/440) (@meepshop/front-end): Fix typescript ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#441](https://github.com/meepshop/meep-lerna/pull/441) Remove meepshop-api proxy ([@piovischioh](https://github.com/piovischioh))

#### :rocket: New Feature

- [#441](https://github.com/meepshop/meep-lerna/pull/441) Remove meepshop-api proxy ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- `store`
  - [#446](https://github.com/meepshop/meep-lerna/pull/446) 【個別店家】 前台 - 整個頁面跑版 ([@HsuTing](https://github.com/HsuTing))
  - [#451](https://github.com/meepshop/meep-lerna/pull/451) 【其他】 手機版 - Chrome 瀏覽器，無法放大檢視商品圖 ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#450](https://github.com/meepshop/meep-lerna/pull/450) New Admin ([@piovischioh](https://github.com/piovischioh))
  - [#453](https://github.com/meepshop/meep-lerna/pull/453) (@meepshop/front-end) Fix resolutions ([@HsuTing](https://github.com/HsuTing))
  - [#452](https://github.com/meepshop/meep-lerna/pull/452) (@meepshop/front-end) Fix Makefile error ([@HsuTing](https://github.com/HsuTing))
  - [#447](https://github.com/meepshop/meep-lerna/pull/447) (@meepshop/front-end) Fix e2e ([@HsuTing](https://github.com/HsuTing))
- `mock-types`
  - [#448](https://github.com/meepshop/meep-lerna/pull/448) (@meepshop/mock-types) Fix typescript error ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#454](https://github.com/meepshop/meep-lerna/pull/454) (@meepshop/front-end) Use `react-i18next` in mock ([@HsuTing](https://github.com/HsuTing))
- [#453](https://github.com/meepshop/meep-lerna/pull/453) (@meepshop/front-end) Fix resolutions ([@HsuTing](https://github.com/HsuTing))
- [#449](https://github.com/meepshop/meep-lerna/pull/449) (@meepshop/front-end) Add storybook mock ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.20.0 (2019-04-09)

#### :boom: Breaking Change

- `end-to-end`, `meep-ui`, `mock-types`, `store`
  - [#429](https://github.com/meepshop/meep-lerna/pull/429) 範例 package ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#439](https://github.com/meepshop/meep-lerna/pull/439) Modify @admin/\* detail ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#438](https://github.com/meepshop/meep-lerna/pull/438) 【個別店家】後台 - 查看某分頁，Server error ([@piovischioh](https://github.com/piovischioh))
  - [#437](https://github.com/meepshop/meep-lerna/pull/437) 【BUG】 新架構 - 鎖定會員生日欄位功能失效 ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#436](https://github.com/meepshop/meep-lerna/pull/436) fix(admin): modify api method ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.19.4 (2019-04-02)

#### :boom: Breaking Change

- [#421](https://github.com/meepshop/meep-lerna/pull/421) New Admin ([@piovischioh](https://github.com/piovischioh))

#### :rocket: New Feature

- `meep-ui`
  - [#434](https://github.com/meepshop/meep-lerna/pull/434) 【個案處理】meepShop MAX 極速開店：新增白名單 - jj-f4 ([@happycat6323](https://github.com/happycat6323))
- Other
  - [#421](https://github.com/meepshop/meep-lerna/pull/421) New Admin ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.19.3 (2019-03-28)

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#433](https://github.com/meepshop/meep-lerna/pull/433) 【優化】會員目前可用購物金，修正計算規則 - 前端 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.19.2 (2019-03-26)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#432](https://github.com/meepshop/meep-lerna/pull/432) N240 【優化產品列表改版 Step-1：加購區 - 白名單開關，前端移除判斷 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.19.1 (2019-03-21)

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#420](https://github.com/meepshop/meep-lerna/pull/420) productsObjectType.galleryInfo 改用 mainImage ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.19.0 (2019-03-13)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#425](https://github.com/meepshop/meep-lerna/pull/425) Modify babel plugin and antd ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- [#428](https://github.com/meepshop/meep-lerna/pull/428) (@meepshop/front-end): Add typescript ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- Other
  - [#428](https://github.com/meepshop/meep-lerna/pull/428) (@meepshop/front-end): Add typescript ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`, `store`
  - [#425](https://github.com/meepshop/meep-lerna/pull/425) Modify babel plugin and antd ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.18.11 (2019-03-05)

#### :bug: Bug Fix

- `meep-ui`
  - [#404](https://github.com/meepshop/meep-lerna/pull/404) 2378 【優化】優惠碼 - 前台 /checkout 系統判斷＆文字提示調整：前端 ([@HsuTing](https://github.com/HsuTing))
  - [#426](https://github.com/meepshop/meep-lerna/pull/426) N216 【BUG】商品問答 - 無資料時隱藏 "no data" ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.18.10 (2019-03-04)

#### :rocket: New Feature

- `meep-ui`
  - [#422](https://github.com/meepshop/meep-lerna/pull/422) N324 【優化】前台 - 綠界物流：調整 7-11 收件人姓名字元限制 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#423](https://github.com/meepshop/meep-lerna/pull/423) 【BUG】 新架構 - 廣告分析 - 點擊＆瀏覽追蹤事件失效 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `meep-ui`, `store`, `test-prod-server`
  - [#424](https://github.com/meepshop/meep-lerna/pull/424) Remove testing ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.18.9 (2019-02-26)

#### :rocket: New Feature

- `meep-ui`
  - [#419](https://github.com/meepshop/meep-lerna/pull/419) 【個案處理】meepShop MAX 極速開店：新增白名單 - kolstyle ([@yuhsu1004](https://github.com/yuhsu1004))
- `store`
  - [#416](https://github.com/meepshop/meep-lerna/pull/416) Add apollo-client name ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#417](https://github.com/meepshop/meep-lerna/pull/417) 電子發票 - 前台補上翻譯 (2) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ariel Hsu ([@yuhsu1004](https://github.com/yuhsu1004))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.18.8 (2019-02-21)

#### :bug: Bug Fix

- `meep-ui`
  - [#415](https://github.com/meepshop/meep-lerna/pull/415) 【BUG】新架構 - 手機版商店 LOGO 跑版 ([@HsuTing](https://github.com/HsuTing))
  - [#414](https://github.com/meepshop/meep-lerna/pull/414) 【其他】新架構 /checkout，郵遞區號前端先擋 ([@HsuTing](https://github.com/HsuTing))
  - [#397](https://github.com/meepshop/meep-lerna/pull/397) N354 【BUG】綠界信用卡 - 稍後付款，至訂單列表立即付款，出現交易失敗 ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#386](https://github.com/meepshop/meep-lerna/pull/386) 選完門市回到 /checkout 語系會跑掉 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.18.7 (2019-02-19)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#391](https://github.com/meepshop/meep-lerna/pull/391) N240 【優化產品列表改版 Step-1：加購區 (點擊圖片＆加入購物車行為) ([@piovischioh](https://github.com/piovischioh))

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#391](https://github.com/meepshop/meep-lerna/pull/391) N240 【優化產品列表改版 Step-1：加購區 (點擊圖片＆加入購物車行為) ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.18.6 (2019-02-18)

#### :bug: Bug Fix

- `meep-ui`
  - [#412](https://github.com/meepshop/meep-lerna/pull/412) N356 【BUG】前台 - 商品頁 - 影像 1 下方多出邊框 ([@yuhsu1004](https://github.com/yuhsu1004))
  - [#409](https://github.com/meepshop/meep-lerna/pull/409) N368 【BUG】前台 - 產品列表 - 無顯示「定價」＆「建議售價」 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ariel Hsu ([@yuhsu1004](https://github.com/yuhsu1004))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.18.5 (2019-02-14)

#### :bug: Bug Fix

- `meep-ui`
  - [#408](https://github.com/meepshop/meep-lerna/pull/408) fix(meep-ui): remove product list warning ([@piovischioh](https://github.com/piovischioh))
  - [#407](https://github.com/meepshop/meep-lerna/pull/407) N365 【BUG】前台 - 退貨申請確認後，訂單明細中的訂單狀態未即時改為「退換貨處理」([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- [@piovischioh](https://github.com/piovischioh)
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.18.4 (2019-02-12)

#### :rocket: New Feature

- `meep-ui`
  - [#398](https://github.com/meepshop/meep-lerna/pull/398) N340 【優化】一頁式購物車：「收件人姓名」字元限制檢查 & 提示文字變更 ([@barrypeng6](https://github.com/barrypeng6))
  - [#396](https://github.com/meepshop/meep-lerna/pull/396) N297 【優化】前台 - 側邊選單無法顯示第三層 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#405](https://github.com/meepshop/meep-lerna/pull/405) N358 【BUG】前台 - 商品頁 - 無顯示「定價」＆「建議售價」 ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#406](https://github.com/meepshop/meep-lerna/pull/406) Fix build ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.18.3 (2019-01-30)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#402](https://github.com/meepshop/meep-lerna/pull/402) 一頁式購物車 - 訂購完成後無法從第三方金流跳轉回「首頁」(N341) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.18.2 (2019-01-28)

#### :rocket: New Feature

- `store`
  - [#394](https://github.com/meepshop/meep-lerna/pull/394) 【BUG】新建立的訂單，回到訂單列表，並無出現在最上方 ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#400](https://github.com/meepshop/meep-lerna/pull/400) Modify README ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`
  - [#387](https://github.com/meepshop/meep-lerna/pull/387) 串接綠界金流刷卡語系設定 (N089) ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#395](https://github.com/meepshop/meep-lerna/pull/395) N350 【個別店家】前台 - 某會員的 1/17 訂單明細呈現空白 ([@happycat6323](https://github.com/happycat6323))
  - [#399](https://github.com/meepshop/meep-lerna/pull/399) N355 【BUG】一頁式購物車 - 當切換物流選項時，會發生錯誤（綠界超取＆ezShip） ([@HsuTing](https://github.com/HsuTing))
  - [#401](https://github.com/meepshop/meep-lerna/pull/401) Fix prettier error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.18.1 (2019-01-24)

#### :bug: Bug Fix

- `meep-ui`
  - [#401](https://github.com/meepshop/meep-lerna/pull/401) Fix prettier error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.18.0 (2019-01-24)

#### :rocket: New Feature

- `meep-ui`
  - [#387](https://github.com/meepshop/meep-lerna/pull/387) 串接綠界金流刷卡語系設定 (N089) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.17.10 (2019-01-22)

#### :bug: Bug Fix

- `meep-ui`
  - [#389](https://github.com/meepshop/meep-lerna/pull/389) 一頁式購物車元件 - 當後台「商品數量」未勾選時，前台無法選擇商品 (N349) ([@HsuTing](https://github.com/HsuTing))
  - [#392](https://github.com/meepshop/meep-lerna/pull/392) 商品描述，文字間距顯示與後台不一致 (N344) ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.17.9 (2019-01-21)

#### :bug: Bug Fix

- `meep-ui`
  - [#393](https://github.com/meepshop/meep-lerna/pull/393) Fix prettier error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.17.8 (2019-01-21)

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#380](https://github.com/meepshop/meep-lerna/pull/380) 訂單列表分頁問題 ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#388](https://github.com/meepshop/meep-lerna/pull/388) call 新的 API (Query.viewer.order) - 補上藍新 ([@HsuTing](https://github.com/HsuTing))
  - [#390](https://github.com/meepshop/meep-lerna/pull/390) 【個別店家】搜尋結果的商店描述，與後台設定不同 (N346) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.17.6 (2019-01-16)

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#381](https://github.com/meepshop/meep-lerna/pull/381) header 跑版 (多了一條空白) (N325) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.17.5 (2019-01-14)

#### :rocket: New Feature

- `meep-ui`
  - [#350](https://github.com/meepshop/meep-lerna/pull/350) 前端 - 會員地址傳完整資料 ([@HsuTing](https://github.com/HsuTing))
  - [#382](https://github.com/meepshop/meep-lerna/pull/382) 一頁式購物車 - 當商品 or 商品某種規格庫存為 0 時，提醒視窗的時間點＆提示文字優化(N305) ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#374](https://github.com/meepshop/meep-lerna/pull/374) 產品列表：從產品頁返回產品列表時，應回到該產品的位置 (N235) ([@piovischioh](https://github.com/piovischioh))
- `store`
  - [#379](https://github.com/meepshop/meep-lerna/pull/379) 分享連結，縮圖顯示有誤 (N306) ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)
- [@piovischioh](https://github.com/piovischioh)

## 0.17.4 (2019-01-11)

#### :bug: Bug Fix

- `store`
  - [#385](https://github.com/meepshop/meep-lerna/pull/385) Hotfix set cookies ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.17.3 (2019-01-10)

#### :bug: Bug Fix

- `store`, `test-prod-server`
  - [#384](https://github.com/meepshop/meep-lerna/pull/384) 首次購物 - 確認門市跳回 /checkout 頁面時，購物車內商品消失（綠界＆ezShip）(N330) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.17.2 (2019-01-10)

#### :rocket: New Feature

- `meep-ui`
  - [#378](https://github.com/meepshop/meep-lerna/pull/378) /checkout、一頁式購物車：地區選單，增加國家(N085) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.17.1 (2019-01-09)

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#383](https://github.com/meepshop/meep-lerna/pull/383) 訂單管理頁面空白 (N329) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.17.0 (2019-01-09)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#362](https://github.com/meepshop/meep-lerna/pull/362) call 新的 API (Query.viewer.order) ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#376](https://github.com/meepshop/meep-lerna/pull/376) 選單分頁往下滑動，畫面呈現空白 (N322) ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.16.1 (2019-01-07)

#### :bug: Bug Fix

- [#377](https://github.com/meepshop/meep-lerna/pull/377) Fix circleci ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.16.0 (2019-01-07)

#### :rocket: New Feature

- `store`
  - [#373](https://github.com/meepshop/meep-lerna/pull/373) 從 viewer 拿取 store.storeStatus 跟 store.adminStatus ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#375](https://github.com/meepshop/meep-lerna/pull/375) 手機版 - menu 點選任一頁面，panel 都應自動收合 (N319) ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#370](https://github.com/meepshop/meep-lerna/pull/370) 部分獨立編輯商品頁跑版：「產品細節」跑至「產品主圖」下方 (N307) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.15.1 (2019-01-04)

#### :bug: Bug Fix

- `store`
  - [#372](https://github.com/meepshop/meep-lerna/pull/372) 點選『產品 tag 搜尋』的選單分頁後，再點選 /products，產品列表顯示有誤 (N317) ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.15.0 (2019-01-03)

#### :rocket: New Feature

- `store`
  - [#343](https://github.com/meepshop/meep-lerna/pull/343) 前端 - page 改用新欄位 ([@barrypeng6](https://github.com/barrypeng6))

#### :bug: Bug Fix

- `store`
  - [#363](https://github.com/meepshop/meep-lerna/pull/363) FB 登入，出現 Something went wrong. (N141) ([@barrypeng6](https://github.com/barrypeng6))
- `meep-ui`
  - [#367](https://github.com/meepshop/meep-lerna/pull/367) 無法新增、編輯＆刪除收件人範本 (N302) ([@barrypeng6](https://github.com/barrypeng6))
- `meep-ui`, `store`
  - [#368](https://github.com/meepshop/meep-lerna/pull/368) 手機版 - 若「電腦版寬度設定」設定在 50％ 以下，影像 2 圖片呈現模糊 (N311) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.14.0 (2018-12-26)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#356](https://github.com/meepshop/meep-lerna/pull/356) 前端 - Gallery 改用新 API ([@piovischioh](https://github.com/piovischioh))

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#356](https://github.com/meepshop/meep-lerna/pull/356) 前端 - Gallery 改用新 API ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- `store`
  - [#358](https://github.com/meepshop/meep-lerna/pull/358) N235 fix(store): fix unexpected reload when browser goes back to /products ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 2

- [@barrypeng6](https://github.com/barrypeng6)
- [@piovischioh](https://github.com/piovischioh)

## 0.13.1 (2018-12-25)

#### :rocket: New Feature

- `meep-ui`
  - [#366](https://github.com/meepshop/meep-lerna/pull/366) 前台頁面圖片 loading 過慢，且未按瀏覽順序顯示(apply 到「所有店家」)(N241) ([@barrypeng6](https://github.com/barrypeng6))

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#361](https://github.com/meepshop/meep-lerna/pull/361) 背景圖片:前台頁面背景還是空白(N288) ([@piovischioh](https://github.com/piovischioh))
- `store`
  - [#365](https://github.com/meepshop/meep-lerna/pull/365) 送出訂單問答，發生錯誤：400 Syntax Error: Unexpected (N298) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)
- [@piovischioh](https://github.com/piovischioh)

## 0.13.0 (2018-12-19)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#332](https://github.com/meepshop/meep-lerna/pull/332) 前端 - Wishlist 改用新 API ([@HsuTing](https://github.com/HsuTing))
  - [#344](https://github.com/meepshop/meep-lerna/pull/344) 會員功能：會員群組、群組起訖(1970) ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `meep-ui`
  - [#357](https://github.com/meepshop/meep-lerna/pull/357) 後台有設定「廣告分析 - 瀏覽追蹤」元件，前台 FB pixel 無觸發事件(N282) ([@barrypeng6](https://github.com/barrypeng6))
  - [#359](https://github.com/meepshop/meep-lerna/pull/359) 手機版 - 吃到後台產品照片集 - 電腦版寬度之設定值(N281) ([@piovischioh](https://github.com/piovischioh))
  - [#355](https://github.com/meepshop/meep-lerna/pull/355) 商品頁：影像 1 商品圖跑版，原本 div 被改成 img(N280) ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 4

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.12.2 (2018-12-18)

#### :bug: Bug Fix

- `store`
  - [#364](https://github.com/meepshop/meep-lerna/pull/364) 無法 FB 登入，應用程式未設定 cname：angelina-outfit (N291) ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.12.1 (2018-12-18)

#### :bug: Bug Fix

- `store`
  - [#360](https://github.com/meepshop/meep-lerna/pull/360) 廣告分析 : 無法偵測 GTM 程式碼(N287) ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.12.0 (2018-12-17)

#### :rocket: New Feature

- `meep-ui`
  - [#347](https://github.com/meepshop/meep-lerna/pull/347) 訂單明細: 門市代號 (2030) ([@yuhsu1004](https://github.com/yuhsu1004))
- `meep-ui`, `store`
  - [#327](https://github.com/meepshop/meep-lerna/pull/327) 「社群分享」元件優化(1511) ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 2

- Ariel Hsu ([@yuhsu1004](https://github.com/yuhsu1004))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.11.4 (2018-12-13)

#### :rocket: New Feature

- `meep-ui`
  - [#353](https://github.com/meepshop/meep-lerna/pull/353) meepShop MAX 極速開店：新增白名單 - animen(2301) ([@yuhsu1004](https://github.com/yuhsu1004))

#### :bug: Bug Fix

- `meep-ui`
  - [#345](https://github.com/meepshop/meep-lerna/pull/345) 手機版 menu: 加入購物車 icon 跟會員登入 icon 位置錯誤(N275) ([@HsuTing](https://github.com/HsuTing))
  - [#351](https://github.com/meepshop/meep-lerna/pull/351) 當後台置底選單部分設定分頁（部分無），前台頁腳顯示跑版(N278) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ariel Hsu ([@yuhsu1004](https://github.com/yuhsu1004))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.11.3 (2018-12-11)

#### :bug: Bug Fix

- `meep-ui`
  - [#352](https://github.com/meepshop/meep-lerna/pull/352) 無法正常開啟，Internal Server Error（N279） ([@barrypeng6](https://github.com/barrypeng6))
- `store`
  - [#354](https://github.com/meepshop/meep-lerna/pull/354) fix(store): fix wrong query syntax ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- [@barrypeng6](https://github.com/barrypeng6)
- [@piovischioh](https://github.com/piovischioh)

## 0.11.2 (2018-12-11)

#### :bug: Bug Fix

- `meep-ui`
  - [#341](https://github.com/meepshop/meep-lerna/pull/341) 將商品加入我的收藏，我的收藏按鈕（愛心）沒有變實心(N270) ([@happycat6323](https://github.com/happycat6323))
  - [#346](https://github.com/meepshop/meep-lerna/pull/346) IE 瀏覽器 - thank-you-page 跑版(N273) ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#334](https://github.com/meepshop/meep-lerna/pull/334) 產品列表: 分頁顯示商品異常 (重複顯示)(N260) ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)
- [@happycat6323](https://github.com/happycat6323)

## 0.11.1 (2018-12-10)

#### :bug: Bug Fix

- `meep-ui`
  - [#349](https://github.com/meepshop/meep-lerna/pull/349) 輪播圖元件 : 後台有設定連結，前台連結失效 (N277) ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.11.0 (2018-12-10)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#335](https://github.com/meepshop/meep-lerna/pull/335) Image Lazy Loading（N241 ） ([@barrypeng6](https://github.com/barrypeng6))

#### :bug: Bug Fix

- `meep-ui`
  - [#264](https://github.com/meepshop/meep-lerna/pull/264) 手機版 - 滑動購物車 panel or checkout 頁面時，背景會跟著滑動（1775） ([@HsuTing](https://github.com/HsuTing))
  - [#340](https://github.com/meepshop/meep-lerna/pull/340) 產品列表：當頁面有 30 個產品列表元件，頁面顯示無法讀取（反灰）（N265） ([@piovischioh](https://github.com/piovischioh))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)
- [@piovischioh](https://github.com/piovischioh)

## 0.10.9 (2018-12-06)

#### :bug: Bug Fix

- `meep-ui`
  - [#342](https://github.com/meepshop/meep-lerna/pull/342) 綠界超商代碼、條碼＆自動櫃員機，送出訂單，出現 error(2296) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.10.8 (2018-12-06)

#### :bug: Bug Fix

- `meep-ui`
  - [#339](https://github.com/meepshop/meep-lerna/pull/339) 下訂單，跳轉至網際威信 (hitrust) 結帳頁面，訂單描述顯示亂碼(2270) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.10.7 (2018-12-05)

#### :bug: Bug Fix

- `meep-ui`
  - [#338](https://github.com/meepshop/meep-lerna/pull/338) 一頁式購物車/結帳頁： 運送方式為「超商取貨」時，選擇門市按鈕跳掉(N269) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.10.6 (2018-12-04)

#### :bug: Bug Fix

- `meep-ui`
  - [#336](https://github.com/meepshop/meep-lerna/pull/336) 一頁式購物車，多規格之商品，無法正常下訂單(N263) ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `meep-ui`, `store`, `test-prod-server`
  - [#294](https://github.com/meepshop/meep-lerna/pull/294) Remove some warning in packages ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.10.5 (2018-12-04)

#### :bug: Bug Fix

- `meep-ui`
  - [#333](https://github.com/meepshop/meep-lerna/pull/333) 頁面管理，首頁頁面選擇：置頂＆置底版型，手機版 menu 消失 (N259) ([@HsuTing](https://github.com/HsuTing))
  - [#331](https://github.com/meepshop/meep-lerna/pull/331) 於前台任一分頁，要點選回首頁，畫面 load 完，還是停留在該分頁 (N255) ([@HsuTing](https://github.com/HsuTing))
  - [#329](https://github.com/meepshop/meep-lerna/pull/329) IE - 若後台選單樣式有設定背景顏色，前台分頁名稱的底色會變為白色 (N244) ([@piovischioh](https://github.com/piovischioh))
  - [#323](https://github.com/meepshop/meep-lerna/pull/323) Group「單一元件寬度」＆「間距」之設定值，造成圖片元件在前台顯示跑版 (N233) ([@piovischioh](https://github.com/piovischioh))
  - [#298](https://github.com/meepshop/meep-lerna/pull/298) 商品問答: 無資料時隱藏 "no data"(N216) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.10.4 (2018-12-03)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#309](https://github.com/meepshop/meep-lerna/pull/309) 自訂廣告事件:新增(自訂)廣告事件：自訂停留秒數追蹤(1996) ([@barrypeng6](https://github.com/barrypeng6))

#### :bug: Bug Fix

- `meep-ui`
  - [#316](https://github.com/meepshop/meep-lerna/pull/316) 結帳頁面：「收件人姓名」字元限制檢查 & 提示文字變更(N236) ([@HsuTing](https://github.com/HsuTing))
  - [#330](https://github.com/meepshop/meep-lerna/pull/330) 下訂單，跳轉至網際威信 (hitrust) 結帳頁面，訂單描述顯示亂碼(2270) ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`, `store`
  - [#318](https://github.com/meepshop/meep-lerna/pull/318) 產品列表：從產品頁返回產品列表時，應回到該產品的位置(N235) ([@piovischioh](https://github.com/piovischioh))
  - [#319](https://github.com/meepshop/meep-lerna/pull/319) N251, N246, N248, N245 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)
- [@piovischioh](https://github.com/piovischioh)

## 0.10.3 (2018-11-27)

#### :bug: Bug Fix

- `meep-ui`
  - [#320](https://github.com/meepshop/meep-lerna/pull/320) 前台 - 某分頁無法正常顯示，頁面為空白(N242) ([@HsuTing](https://github.com/HsuTing))
  - [#321](https://github.com/meepshop/meep-lerna/pull/321) 後台已設定好「頁面群組」連結，前台連至該群組，但頁面顯示空白(N243) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@happycat6323](https://github.com/happycat6323)

## 0.10.2 (2018-11-26)

#### :bug: Bug Fix

- `meep-ui`
  - [#322](https://github.com/meepshop/meep-lerna/pull/322) Hotfix N231 ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.10.1 (2018-11-22)

#### :bug: Bug Fix

- `meep-ui`
  - [#313](https://github.com/meepshop/meep-lerna/pull/313) 【個別店家】手機版 - 點開 menu，選單跑版(N234 ) ([@HsuTing](https://github.com/HsuTing))
  - [#315](https://github.com/meepshop/meep-lerna/pull/315) 產品列表 - 當後台元件間距設定無時，前台顯示結果與後台不同，會多出空白(N231) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.10.0 (2018-11-21)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#311](https://github.com/meepshop/meep-lerna/pull/311) 手機版：當後台未設定手機版商店 LOGO，menu 會跑版（N228） ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.9.2 (2018-11-19)

#### :bug: Bug Fix

- `store`
  - [#299](https://github.com/meepshop/meep-lerna/pull/299) fix(store): remove DOMAIN query string of fbLogin api ([@barrypeng6](https://github.com/barrypeng6))
  - [#295](https://github.com/meepshop/meep-lerna/pull/295) 側邊選單：顯示空白問題 （N209） ([@barrypeng6](https://github.com/barrypeng6))
  - [#304](https://github.com/meepshop/meep-lerna/pull/304) 訂單問答：當切斷網路，送出訂單問答，提示訊息應為：「發送訂單問答：發生錯誤」(N220) ([@happycat6323](https://github.com/happycat6323))
  - [#308](https://github.com/meepshop/meep-lerna/pull/308) google 搜尋品牌名稱，商店敘述出現錯誤訊息 (N225) ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`, `store`
  - [#286](https://github.com/meepshop/meep-lerna/pull/286) 分隔線： 後台無設定背景顏色，前台顯示結果卻是白色(N204) ([@piovischioh](https://github.com/piovischioh))
- `meep-ui`
  - [#306](https://github.com/meepshop/meep-lerna/pull/306) 商品頁產品主圖: 輪播異常 (N215) ([@piovischioh](https://github.com/piovischioh))

#### Committers: 4

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)
- [@happycat6323](https://github.com/happycat6323)
- [@piovischioh](https://github.com/piovischioh)

## 0.9.1 (2018-11-14)

#### :boom: Breaking Change

- `meep-ui`
  - [#303](https://github.com/meepshop/meep-lerna/pull/303) New link ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#265](https://github.com/meepshop/meep-lerna/pull/265) 自訂廣告事件: 「廣告分析 - 點擊追蹤」&「廣告分析 - 瀏覽追蹤」(1996) ([@barrypeng6](https://github.com/barrypeng6))

#### :bug: Bug Fix

- `meep-ui`
  - [#310](https://github.com/meepshop/meep-lerna/pull/310) fix(meep-ui): fix link in menu style, link checking ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`, `store`, `test-prod-server`
  - [#305](https://github.com/meepshop/meep-lerna/pull/305) fix(meep-ui): lock clipboard version ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.8.0 (2018-11-12)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#196](https://github.com/meepshop/meep-lerna/pull/196) Refactor menu: N122, N101, N121 ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `meep-ui`
  - [#297](https://github.com/meepshop/meep-lerna/pull/297) email 欄位，增加檢查規則(N214) ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#287](https://github.com/meepshop/meep-lerna/pull/287) 手機版商店 LOGO 顯示模糊(N202) ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#302](https://github.com/meepshop/meep-lerna/pull/302) 訂單問答：發送成功的提示訊息，日文翻譯更正(N219) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.7.0 (2018-11-07)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#268](https://github.com/meepshop/meep-lerna/pull/268) 訂單問答: 重做(053) ([@happycat6323](https://github.com/happycat6323))

#### Committers: 1

- [@happycat6323](https://github.com/happycat6323)

## 0.6.7 (2018-11-06)

#### :bug: Bug Fix

- `meep-ui`
  - [#293](https://github.com/meepshop/meep-lerna/pull/293) 一頁式購物車：結帳顯示訂購失敗（N211） ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.6.6 (2018-11-06)

#### :bug: Bug Fix

- `meep-ui`
  - [#292](https://github.com/meepshop/meep-lerna/pull/292) 文字編輯器：文字置中 or 置右搭配點點 / 數字選單問題（N213） ([@HsuTing](https://github.com/HsuTing))
  - [#285](https://github.com/meepshop/meep-lerna/pull/285) meepShop MAX 極速開店：新增白名單 - ecomo (2188) ([@yuhsu1004](https://github.com/yuhsu1004))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- Ariel Hsu ([@yuhsu1004](https://github.com/yuhsu1004))

## 0.6.4 (2018-11-02)

#### :bug: Bug Fix

- `meep-ui`
  - [#288](https://github.com/meepshop/meep-lerna/pull/288) IE 11: JS 語法不支援(N210) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.6.1 (2018-11-01)

#### :boom: Breaking Change

- `meep-ui`, `store`, `test-prod-server`
  - [#261](https://github.com/meepshop/meep-lerna/pull/261) Use yarn & thank-you-page 的 loading icon 框變為藍色(N178) ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`, `store`
  - [#77](https://github.com/meepshop/meep-lerna/pull/77) feat(meep-ui): new context api ([@HsuTing](https://github.com/HsuTing))

#### :rocket: New Feature

- `meep-ui`
  - [#253](https://github.com/meepshop/meep-lerna/pull/253) 結帳頁面＆一頁式購物車元件：輸入欄位的檢查時間點變更 Open, HighAll Users(N135) ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#271](https://github.com/meepshop/meep-lerna/pull/271) 文字元件: 圖示、圖示搭配連結，顯示異常(N186) ([@HsuTing](https://github.com/HsuTing))
- Other
  - [#283](https://github.com/meepshop/meep-lerna/pull/283) fix(root): fix check publish ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.5.5 (2018-10-23)

#### :rocket: New Feature

- `meep-ui`
  - [#214](https://github.com/meepshop/meep-lerna/pull/214) 結帳頁面流程調整: 第三頁拿掉 (2022) ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- Other
  - [#280](https://github.com/meepshop/meep-lerna/pull/280) Fix deploy test ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#281](https://github.com/meepshop/meep-lerna/pull/281) 前往結帳，於 panel FB 登入，出現 404 畫面 (N198) ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)
- [@happycat6323](https://github.com/happycat6323)

## 0.5.3 (2018-10-23)

#### :rocket: New Feature

- `store`
  - [#277](https://github.com/meepshop/meep-lerna/pull/277) 優化 HTML 語言 lang attribute (N171) ([@barrypeng6](https://github.com/barrypeng6))

#### :bug: Bug Fix

- `meep-ui`
  - [#263](https://github.com/meepshop/meep-lerna/pull/263) 首次購物，使用已達限定次數優惠碼，資料同步異常(N183) ([@HsuTing](https://github.com/HsuTing))
  - [#276](https://github.com/meepshop/meep-lerna/pull/276) 圖片文字：標題 / 敘述 / 按鈕文字大小與後台顯示結果不同(N188) ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#275](https://github.com/meepshop/meep-lerna/pull/275) 商店設定連接 Facebook Store，於 FB 粉絲頁出現 “OK”(N184) ([@HsuTing](https://github.com/HsuTing))
  - [#278](https://github.com/meepshop/meep-lerna/pull/278) FB Login: Hide loading status after cancel in fb login (N173) ([@barrypeng6](https://github.com/barrypeng6))

#### :house: Internal

- [#279](https://github.com/meepshop/meep-lerna/pull/279) Modify circleci to deploy test ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.5.2 (2018-10-22)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#130](https://github.com/meepshop/meep-lerna/pull/130) 電子發票串接 - 綠界科技(107) ([@piovischioh](https://github.com/piovischioh))

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#130](https://github.com/meepshop/meep-lerna/pull/130) 電子發票串接 - 綠界科技(107) ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.4.7 (2018-10-18)

#### :bug: Bug Fix

- `meep-ui`
  - [#274](https://github.com/meepshop/meep-lerna/pull/274) 修正 IE JS 語法不支援(N189) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.4.6 (2018-10-16)

#### :bug: Bug Fix

- `store`
  - [#273](https://github.com/meepshop/meep-lerna/pull/273) 會員選單: 修正標題文字 ([@barrypeng6](https://github.com/barrypeng6))
- `meep-ui`
  - [#272](https://github.com/meepshop/meep-lerna/pull/272) 收件人範本: 拿掉手機必填規則文字 ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.4.5 (2018-10-15)

#### :bug: Bug Fix

- `meep-ui`
  - [#257](https://github.com/meepshop/meep-lerna/pull/257) 結帳頁面：若商品符合免運，折扣項目的文字未顯示「免運費」(N165) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.4.4 (2018-10-15)

#### :bug: Bug Fix

- `meep-ui`
  - [#269](https://github.com/meepshop/meep-lerna/pull/269) 文字元件：Use patch to fix emoji bug ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.4.3 (2018-10-11)

#### :bug: Bug Fix

- `store`
  - [#266](https://github.com/meepshop/meep-lerna/pull/266) GA：修正加入購物車事件的 name 參數 (N175) ([@barrypeng6](https://github.com/barrypeng6))

#### :house: Internal

- `meep-ui`, `store`
  - [#255](https://github.com/meepshop/meep-lerna/pull/255) perf(meep-ui): Modify detail ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.4.2 (2018-10-09)

#### :house: Internal

- [#262](https://github.com/meepshop/meep-lerna/pull/262) fix(root): fix jest memory lack ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.3.23 (2018-10-04)

#### :bug: Bug Fix

- `meep-ui`
  - [#252](https://github.com/meepshop/meep-lerna/pull/252) 物流網址由後端給(T1527) ([@HsuTing](https://github.com/HsuTing))

## 0.3.22 (2018-10-03)

#### :bug: Bug Fix

- `store`
  - [#259](https://github.com/meepshop/meep-lerna/pull/259) Log server error with hostname and handling error in Koa ([@barrypeng6](https://github.com/barrypeng6))
  - [#258](https://github.com/meepshop/meep-lerna/pull/258) fix(store): log os hostname ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.3.19 (2018-10-03)

#### :rocket: New Feature

- `store`
  - [#256](https://github.com/meepshop/meep-lerna/pull/256) feat(store): log uncaughtException ([@barrypeng6](https://github.com/barrypeng6))

#### :bug: Bug Fix

- `meep-ui`
  - [#247](https://github.com/meepshop/meep-lerna/pull/247) 購物金列表：到期日期顯示錯誤(N168) ([@barrypeng6](https://github.com/barrypeng6))
  - [#248](https://github.com/meepshop/meep-lerna/pull/248) 商品名稱＆商品描述以單字為單位斷行(N16) ([@piovischioh](https://github.com/piovischioh))
  - [#254](https://github.com/meepshop/meep-lerna/pull/254) 圖文/文字元件: 圖文元件搭配文字元件顯示結果會跑版(N174) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)
- [@piovischioh](https://github.com/piovischioh)

## 0.3.18 (2018-09-27)

#### :bug: Bug Fix

- `meep-ui`
  - [#249](https://github.com/meepshop/meep-lerna/pull/249) 產品列表(手機版)：排序選單(英/日)位置會跑版(N154) ([@piovischioh](https://github.com/piovischioh))
  - [#244](https://github.com/meepshop/meep-lerna/pull/244) 越南文翻譯更新(N152) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.3.16 (2018-09-25)

#### :bug: Bug Fix

- `store`
  - [#245](https://github.com/meepshop/meep-lerna/pull/245) fix(store): set http status 200 ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.3.15 (2018-09-25)

#### :bug: Bug Fix

- `store`
  - [#243](https://github.com/meepshop/meep-lerna/pull/243) fix(store): modified maxAge of token ([@barrypeng6](https://github.com/barrypeng6))
  - [#242](https://github.com/meepshop/meep-lerna/pull/242) fix(store): add pageNotFound error for products ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.3.14 (2018-09-25)

#### :rocket: New Feature

- `meep-ui`
  - [#239](https://github.com/meepshop/meep-lerna/pull/239) meepShop MAX 極速開店：新增白名單 - doctorabiotech (N166) ([@yuhsu1004](https://github.com/yuhsu1004))

#### :bug: Bug Fix

- `meep-ui`
  - [#229](https://github.com/meepshop/meep-lerna/pull/229) 結帳頁：移除所有商品後，需出現彈窗「購物車內沒有商品，請返回商店繼續購物」(N162) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ariel Hsu ([@yuhsu1004](https://github.com/yuhsu1004))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.3.13 (2018-09-21)

#### :bug: Bug Fix

- `meep-ui`
  - [#238](https://github.com/meepshop/meep-lerna/pull/238) 文字元件：文字顯示異常(N150 hotfix) ([@yuhsu1004](https://github.com/yuhsu1004))

#### Committers: 1

- Ariel Hsu ([@yuhsu1004](https://github.com/yuhsu1004))

## 0.3.12 (2018-09-20)

#### :bug: Bug Fix

- `meep-ui`
  - [#232](https://github.com/meepshop/meep-lerna/pull/232) fix(meep-ui): keep menu title one line ([@barrypeng6](https://github.com/barrypeng6))
  - [#226](https://github.com/meepshop/meep-lerna/pull/226) 文字元件：斷行問題(N161) ([@yuhsu1004](https://github.com/yuhsu1004))
  - [#225](https://github.com/meepshop/meep-lerna/pull/225) 文字元件：若有使用圖示，文字顯示異常(N150) ([@yuhsu1004](https://github.com/yuhsu1004))
- `store`
  - [#233](https://github.com/meepshop/meep-lerna/pull/233) fix(store): fix check valid pathname(N163) ([@barrypeng6](https://github.com/barrypeng6))
  - [#231](https://github.com/meepshop/meep-lerna/pull/231) fix(store): fix get product pages ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 3

- Ariel Hsu ([@yuhsu1004](https://github.com/yuhsu1004))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.3.10 (2018-09-20)

#### :bug: Bug Fix

- `meep-ui`
  - [#230](https://github.com/meepshop/meep-lerna/pull/230) fix(meep-ui): offset type error in ProductList ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.3.9 (2018-09-19)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#213](https://github.com/meepshop/meep-lerna/pull/213) 新增錯誤頁畫面(N151) ([@barrypeng6](https://github.com/barrypeng6))
  - [#215](https://github.com/meepshop/meep-lerna/pull/215) 產品列表：商品換頁排序問題(1494) ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- [@barrypeng6](https://github.com/barrypeng6)
- [@piovischioh](https://github.com/piovischioh)

## 0.3.8 (2018-09-19)

#### :bug: Bug Fix

- `store`
  - [#224](https://github.com/meepshop/meep-lerna/pull/224) fix(store): get wrong home page(N155) ([@barrypeng6](https://github.com/barrypeng6))
- `store`, `test-prod-server`
  - [#223](https://github.com/meepshop/meep-lerna/pull/223) 使用「綠界：信用卡」下訂單， 無跳轉至預設的 thank-you-page(N158) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.3.7 (2018-09-18)

#### :bug: Bug Fix

- `meep-ui`
  - [#221](https://github.com/meepshop/meep-lerna/pull/221) 系統通知信:翻譯問題(N146) ([@barrypeng6](https://github.com/barrypeng6))
  - [#220](https://github.com/meepshop/meep-lerna/pull/220) 後台訂單匯出：門市代號有誤(N159) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.3.6 (2018-09-18)

#### :rocket: New Feature

- `meep-ui`
  - [#217](https://github.com/meepshop/meep-lerna/pull/217) 越南文翻譯更新(N152) ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#222](https://github.com/meepshop/meep-lerna/pull/222) fix(store) await getOrderInfo ([@barrypeng6](https://github.com/barrypeng6))
  - [#218](https://github.com/meepshop/meep-lerna/pull/218) fix(store): refactor get orderInfo and remove warnnimg ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.3.4 (2018-09-17)

#### :bug: Bug Fix

- `meep-ui`
  - [#212](https://github.com/meepshop/meep-lerna/pull/212) 商品描述：修正文字背景顏色(N153) ([@yuhsu1004](https://github.com/yuhsu1004))
- `store`
  - [#216](https://github.com/meepshop/meep-lerna/pull/216) FB 登入：登入之後頁面 Loading 未消失(N156) ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 2

- Ariel Hsu ([@yuhsu1004](https://github.com/yuhsu1004))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.3.3 (2018-09-14)

#### :bug: Bug Fix

- `store`
  - [#210](https://github.com/meepshop/meep-lerna/pull/210) fix(store): modified handling log & fix setHeader error ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.3.2 (2018-09-13)

#### :boom: Breaking Change

- `meep-ui`
  - [#183](https://github.com/meepshop/meep-lerna/pull/183) perf(meep-ui): use less, minify code in draftText ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#208](https://github.com/meepshop/meep-lerna/pull/208) add log route and fix setHeader error ([@barrypeng6](https://github.com/barrypeng6))
- `meep-ui`
  - [#209](https://github.com/meepshop/meep-lerna/pull/209) 越南文翻譯更新(N125) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.3.1 (2018-09-12)

#### :bug: Bug Fix

- `meep-ui`
  - [#207](https://github.com/meepshop/meep-lerna/pull/207) 訂單明細：電子發票資訊顯示有誤(N149) ([@piovischioh](https://github.com/piovischioh))
  - [#205](https://github.com/meepshop/meep-lerna/pull/205) 產品：修正會員可見價(N147) ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.3.0 (2018-09-12)

#### :rocket: New Feature

- `store`, `test-prod-server`
  - 顯示商店關閉狀態
  - Switch to Koa Server
  - Use proxy
  - [#159](https://github.com/meepshop/meep-lerna/pull/159) Fix some bugs ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.75 (2018-09-11)

#### :bug: Bug Fix

- `store`
  - [#204](https://github.com/meepshop/meep-lerna/pull/204) 感謝頁：修正 loading spinner 轉不停 ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.74 (2018-09-11)

#### :house: Internal

- `store`
  - [#203](https://github.com/meepshop/meep-lerna/pull/203) fix(store): remove conosle ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.73 (2018-09-11)

#### :bug: Bug Fix

- `meep-ui`
  - [#202](https://github.com/meepshop/meep-lerna/pull/202) 結帳確認明細頁：發票資訊 - 電子發票(N138) ([@HsuTing](https://github.com/HsuTing))
  - [#195](https://github.com/meepshop/meep-lerna/pull/195) 登入頁: fix login style in IE ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#201](https://github.com/meepshop/meep-lerna/pull/201) fix(store): failed to fetch log too many ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.2.72 (2018-09-10)

#### :bug: Bug Fix

- `meep-ui`
  - [#199](https://github.com/meepshop/meep-lerna/pull/199) 結帳頁：修正更新購物車(N145) ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#200](https://github.com/meepshop/meep-lerna/pull/200) fix(store):fb login at first time & modify token expired time ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.70 (2018-09-07)

#### :bug: Bug Fix

- `meep-ui`
  - [#197](https://github.com/meepshop/meep-lerna/pull/197) fix(meep-ui): ErroNotFound DOM exception ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.69 (2018-09-06)

#### :rocket: New Feature

- `store`
  - [#176](https://github.com/meepshop/meep-lerna/pull/176) perf(store): remove polyfill, add core-js/modules/es6.string.starts-with ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#194](https://github.com/meepshop/meep-lerna/pull/194) 手機版產品頁：商品規格顯示跑版(N115) ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.2.68 (2018-09-06)

#### :rocket: New Feature

- `meep-ui`
  - [#190](https://github.com/meepshop/meep-lerna/pull/190) 結帳頁面＆一頁式購物車元件：收件人「手機」欄位檢查規則變更 (N136)

#### Committers: 1

- happycat6323 ([@happycat6323](https://github.com/happycat6323))

## 0.2.67 (2018-09-05)

#### :bug: Bug Fix

- `meep-ui`
  - [#193](https://github.com/meepshop/meep-lerna/pull/193) GMO:已儲存的卡號無法更新(N139) ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.2.66 (2018-09-05)

#### :bug: Bug Fix

- `meep-ui`
  - [#192](https://github.com/meepshop/meep-lerna/pull/192) fix(meep-ui): header button next disappears ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.65 (2018-09-05)

#### :rocket: New Feature

- `meep-ui`
  - [#191](https://github.com/meepshop/meep-lerna/pull/191) 頁腳白名單：fbshop ([@barrypeng6](https://github.com/barrypeng6))

#### :bug: Bug Fix

- `meep-ui`
  - [#189](https://github.com/meepshop/meep-lerna/pull/189) fix(meep-ui): avoid clicked next button when computing at checkout page ([@barrypeng6](https://github.com/barrypeng6))

#### :house: Internal

- `store`
  - [#188](https://github.com/meepshop/meep-lerna/pull/188) chore(store): not show landinagePage log ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.64 (2018-09-04)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#177](https://github.com/meepshop/meep-lerna/pull/177) 收件人地址：新增郵遞區號欄位(1309) ([@piovischioh](https://github.com/piovischioh))

#### :bug: Bug Fix

- `meep-ui`
  - [#187](https://github.com/meepshop/meep-lerna/pull/187) fix(meep-ui): fix streetAddress of null ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#185](https://github.com/meepshop/meep-lerna/pull/185) perf(root): use test branch to test depoly ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.2.63 (2018-08-31)

#### :bug: Bug Fix

- `meep-ui`
  - [#180](https://github.com/meepshop/meep-lerna/pull/180) 產品列表(手機版)：分頁鈕跑版（N119） ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.2.62 (2018-08-30)

#### :bug: Bug Fix

- `store`
  - [#181](https://github.com/meepshop/meep-lerna/pull/181) fix(store): prevent browser cache HTML ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.61 (2018-08-29)

#### :bug: Bug Fix

- `store`
  - [#174](https://github.com/meepshop/meep-lerna/pull/174) fix(store): add polyfill ([@barrypeng6](https://github.com/barrypeng6))
  - [#172](https://github.com/meepshop/meep-lerna/pull/172) fix(store): fix set header error ([@barrypeng6](https://github.com/barrypeng6))
  - [#173](https://github.com/meepshop/meep-lerna/pull/173) fix(store): handle fb login error ([@barrypeng6](https://github.com/barrypeng6))
  - [#170](https://github.com/meepshop/meep-lerna/pull/170) fix(store): give storeName default value & replace getIn ([@barrypeng6](https://github.com/barrypeng6))
  - [#169](https://github.com/meepshop/meep-lerna/pull/169) 修正不複寫 blocks ID ([@barrypeng6](https://github.com/barrypeng6))
- `meep-ui`

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.58 (2018-08-28)

#### :bug: Bug Fix

- `meep-ui`
  - [#167](https://github.com/meepshop/meep-lerna/pull/167) 結帳頁：修正當切換語言造成地址欄 error ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#166](https://github.com/meepshop/meep-lerna/pull/166) 修正 server-side & client-side 畫面不一致 ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.56 (2018-08-28)

#### :bug: Bug Fix

- `store`
  - [#165](https://github.com/meepshop/meep-lerna/pull/165) fix(store): hot fix regenerator-runtime ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.2.55 (2018-08-28)

#### :boom: Breaking Change

- `meep-ui`, `store`
  - [#144](https://github.com/meepshop/meep-lerna/pull/144) pref(root): Remove babel polyfill ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#164](https://github.com/meepshop/meep-lerna/pull/164) fix(store): get gtmId from trackCode (N127) ([@barrypeng6](https://github.com/barrypeng6))
  - [#163](https://github.com/meepshop/meep-lerna/pull/163) fix(store): add path for set-cookie ([@barrypeng6](https://github.com/barrypeng6))
  - [#161](https://github.com/meepshop/meep-lerna/pull/161) fix(store): cannot read property templateId ([@barrypeng6](https://github.com/barrypeng6))
- `meep-ui`
  - [#162](https://github.com/meepshop/meep-lerna/pull/162) 結帳頁面：國家選項 日 / 越 翻譯（N114） ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.54 (2018-08-27)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#154](https://github.com/meepshop/meep-lerna/pull/154) 1997 【優化】會員資料 - 取消訂閱電子報 UI ([@piovischioh](https://github.com/piovischioh))

#### Committers: 1

- [@piovischioh](https://github.com/piovischioh)

## 0.2.53 (2018-08-24)

#### :house: Internal

- `store`
  - [#158](https://github.com/meepshop/meep-lerna/pull/158) perf(store): log createOrder null ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.2.52 (2018-08-24)

#### :bug: Bug Fix

- `store`
  - [#156](https://github.com/meepshop/meep-lerna/pull/156) 修正頁面 blocks, widgets ID 相同時的 render problem(複製頁面造成) ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.51 (2018-08-23)

#### :bug: Bug Fix

- `meep-ui`
  - [#151](https://github.com/meepshop/meep-lerna/pull/151) 一頁式購物車：修正選擇金物流時的錯誤(N118) ([@HsuTing](https://github.com/HsuTing))
  - [#153](https://github.com/meepshop/meep-lerna/pull/153) 產品列表：修正 query error(400 Bad request) ([@piovischioh](https://github.com/piovischioh))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.2.50 (2018-08-22)

#### :house: Internal

- `store`
  - [#149](https://github.com/meepshop/meep-lerna/pull/149) chore(store): remove console ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.2.48 (2018-08-22)

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#147](https://github.com/meepshop/meep-lerna/pull/147) fix(meep-ui): handle getData return null ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#148](https://github.com/meepshop/meep-lerna/pull/148) fix(store): fix handling error ([@barrypeng6](https://github.com/barrypeng6))
- `meep-ui`
  - [#145](https://github.com/meepshop/meep-lerna/pull/145) fix(meep-ui): fix checkout undefined ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6

## 0.2.47 (2018-08-21)

#### :bug: Bug Fix

- `store`
  - [#143](https://github.com/meepshop/meep-lerna/pull/143) 會員管理列表：修正英/日/越 翻譯（N110） ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.2.46 (2018-08-20)

#### :rocket: New Feature

- `meep-ui`
  - [#99](https://github.com/meepshop/meep-lerna/pull/99) 置底選單: 優化（N095） ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#138](https://github.com/meepshop/meep-lerna/pull/138) 修正 GMO 刷卡無自動對帳完成（N058） ([@HsuTing](https://github.com/HsuTing))
  - [#140](https://github.com/meepshop/meep-lerna/pull/140) 語系: 新增前往結帳的越南文（N109） ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#141](https://github.com/meepshop/meep-lerna/pull/141) fix(store): use Link for pagination ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.45 (2018-08-20)

#### :bug: Bug Fix

- `meep-ui`
  - [#137](https://github.com/meepshop/meep-lerna/pull/137) 文字元件：修正多個空白問題（N071） ([@yuhsu1004](https://github.com/yuhsu1004))
  - [#132](https://github.com/meepshop/meep-lerna/pull/132) 修正商品描述的空白段落（N073） ([@HsuTing](https://github.com/HsuTing))
  - [#131](https://github.com/meepshop/meep-lerna/pull/131) 修正匯款通知預設值（N074） ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ariel Hsu ([@yuhsu1004](https://github.com/yuhsu1004))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.2.43 (2018-08-17)

#### :bug: Bug Fix

- [#135](https://github.com/meepshop/meep-lerna/pull/135) fix(root): hotfix babel ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.2.42 (2018-08-17)

#### :bug: Bug Fix

- `meep-ui`
  - [#134](https://github.com/meepshop/meep-lerna/pull/134) 修正 GMO 刷卡無自動對帳完成 ([@HsuTing](https://github.com/HsuTing))
  - [#128](https://github.com/meepshop/meep-lerna/pull/128) 訂單問答：修正手機版排版 ([@HsuTing](https://github.com/HsuTing))
  - [#121](https://github.com/meepshop/meep-lerna/pull/121) 更新翻譯 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#133](https://github.com/meepshop/meep-lerna/pull/133) perf(root): use @babel/preset-env to include polyfill files ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.2.41 (2018-08-15)

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#126](https://github.com/meepshop/meep-lerna/pull/126) ezpay 頁面：處理 ES 同步訂單問題 ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.40 (2018-08-14)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#123](https://github.com/meepshop/meep-lerna/pull/123) refactor(store, meep-ui): Move memberSettings to ui ([@barrypeng6](https://github.com/barrypeng6))

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#106](https://github.com/meepshop/meep-lerna/pull/106) 結帳頁：修正多個結帳問題(N058, N100) ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#125](https://github.com/meepshop/meep-lerna/pull/125) 圖文元件：showOverlay ([@barrypeng6](https://github.com/barrypeng6))
  - [#124](https://github.com/meepshop/meep-lerna/pull/124) 修正擷取 GTM Id status ([@barrypeng6](https://github.com/barrypeng6))
  - [#122](https://github.com/meepshop/meep-lerna/pull/122) Remove adTrack API ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.39 (2018-08-14)

#### :bug: Bug Fix

- `meep-ui`
  - [#118](https://github.com/meepshop/meep-lerna/pull/118) 產品列表：修正第一頁商品的自訂排序 ([@piovischioh](https://github.com/piovischioh))
  - [#119](https://github.com/meepshop/meep-lerna/pull/119) 結帳頁面：修正選擇 ezShip 超取，無法跳頁至 ezShip ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#120](https://github.com/meepshop/meep-lerna/pull/120) fix(store): remove log at sitemaps/v1 ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)
- [@piovischioh](https://github.com/piovischioh)

## 0.2.38 (2018-08-13)

#### :rocket: New Feature

- `meep-ui`, `store`
  - [#51](https://github.com/meepshop/meep-lerna/pull/51) Replace adTrack API by new API(fbPixel, gtagList) ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.37 (2018-08-10)

#### :bug: Bug Fix

- `store`
  - [#116](https://github.com/meepshop/meep-lerna/pull/116) 產品列表（products-controlled）：修正加入購物車 modal 的錯誤 ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.36 (2018-08-10)

#### :bug: Bug Fix

- `store`
  - [#115](https://github.com/meepshop/meep-lerna/pull/115) 修正使用 default group 排版錯誤 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.2.35 (2018-08-10)

#### :bug: Bug Fix

- [#114](https://github.com/meepshop/meep-lerna/pull/114) fix(root): fix circleci deploy fail ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.2.34 (2018-08-10)

#### :rocket: New Feature

- `meep-ui`
  - [#107](https://github.com/meepshop/meep-lerna/pull/107) 結帳頁：超過折抵金額，需顯示提示紅框 ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#113](https://github.com/meepshop/meep-lerna/pull/113) 優化 SEO: 新增/sitemaps/v1 連結 ([@barrypeng6](https://github.com/barrypeng6))

#### :bug: Bug Fix

- `store`
  - [#110](https://github.com/meepshop/meep-lerna/pull/110) 處理當此頁面無 pageId & templateId 的意外情況 ([@barrypeng6](https://github.com/barrypeng6))

#### :house: Internal

- `store`, `test-prod-server`
  - [#101](https://github.com/meepshop/meep-lerna/pull/101) test(test-prod-server): new testing tool ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#109](https://github.com/meepshop/meep-lerna/pull/109) perf(store): ignore offline to log ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)
- [@piovischioh](https://github.com/piovischioh)

## 0.2.33 (2018-08-07)

#### :rocket: New Feature

- `meep-ui`
  - [#102](https://github.com/meepshop/meep-lerna/pull/102) 更新登入頁翻譯 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#98](https://github.com/meepshop/meep-lerna/pull/98) 產品組合元件：更改語系或幣值時該元件未改變 ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- `meep-ui`, `store`
  - [#105](https://github.com/meepshop/meep-lerna/pull/105) perf(store): catch uncaught error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@piovischioh](https://github.com/piovischioh)

## 0.2.32 (2018-08-02)

#### :rocket: New Feature

- `meep-ui`
  - [#95](https://github.com/meepshop/meep-lerna/pull/95)[#96](https://github.com/meepshop/meep-lerna/pull/96) 輪播元件：新增開新視窗功能 ([@happycat6323](https://github.com/happycat6323))

#### :bug: Bug Fix

- `store`
  - [#97](https://github.com/meepshop/meep-lerna/pull/97)[#93](https://github.com/meepshop/meep-lerna/pull/93) 修正預設語言＆幣值 ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 2

- [@barrypeng6](https://github.com/barrypeng6)
- [@happycat6323](https://github.com/happycat6323)

## 0.2.31 (2018-08-02)

#### :house: Internal

- [#89](https://github.com/meepshop/meep-lerna/pull/89) Upgrade react & next version ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.30 (2018-08-02)

#### :rocket: New Feature

- `meep-ui`
  - [#87](https://github.com/meepshop/meep-lerna/pull/87) 手機版選單： 加大展開/收合箭頭的 icon - N088 ([@HsuTing](https://github.com/HsuTing))
  - [#73](https://github.com/meepshop/meep-lerna/pull/73) feat(meep-ui): new Components ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#88](https://github.com/meepshop/meep-lerna/pull/88) 產品資訊元件：修正定價與價格之間的空格 ([@piovischioh](https://github.com/piovischioh))
- `store`
  - [#81](https://github.com/meepshop/meep-lerna/pull/81) 更改密碼頁：修正提示訊息的錯誤 ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)
- [@piovischioh](https://github.com/piovischioh)

## 0.2.29 (2018-08-01)

#### :bug: Bug Fix

- `meep-ui`, `store`
  - [#83](https://github.com/meepshop/meep-lerna/pull/83) fix FB initialized(Error: init not called with valid version) ([@barrypeng6](https://github.com/barrypeng6))
- `store`
  - [#84](https://github.com/meepshop/meep-lerna/pull/84) 臉書牆元件：修正 props ([@barrypeng6](https://github.com/barrypeng6))
  - [#79](https://github.com/meepshop/meep-lerna/pull/79) 圖文元件：新增 newWindow props ([@barrypeng6](https://github.com/barrypeng6))
- `meep-ui`
  - [#82](https://github.com/meepshop/meep-lerna/pull/82) 產品資訊：顯示 HTML 產品敘述 ([@piovischioh](https://github.com/piovischioh))

#### :house: Internal

- `meep-ui`
  - [#80](https://github.com/meepshop/meep-lerna/pull/80) fix(root): fix less files hot load ([@HsuTing](https://github.com/HsuTing))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)
- [@piovischioh](https://github.com/piovischioh)

## 0.2.28 (2018-07-31)

#### :bug: Bug Fix

- `store`
  - [#78](https://github.com/meepshop/meep-lerna/pull/78) 修正 FB init: move init code to mount ([@barrypeng6](https://github.com/barrypeng6))
- `meep-ui`
  - [#66](https://github.com/meepshop/meep-lerna/pull/66) 圖片元件（手機版）：圖片解析度不足 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.27 (2018-07-31)

#### :bug: Bug Fix

- `store`
  - [#76](https://github.com/meepshop/meep-lerna/pull/76) 修正 FB init: change sdk.js to all.js ([@barrypeng6](https://github.com/barrypeng6))
- `meep-ui`
  - [#75](https://github.com/meepshop/meep-lerna/pull/75) 確認訂單頁面：修正 undefined address ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- [#72](https://github.com/meepshop/meep-lerna/pull/72) feat(root): add checking not to use keyword with lint-staged ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.26 (2018-07-30)

#### :bug: Bug Fix

- `store`
  - [#71](https://github.com/meepshop/meep-lerna/pull/71) 更改 FB sdk version to 3.1 ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.25 (2018-07-30)

#### :bug: Bug Fix

- `meep-ui`
  - [#67](https://github.com/meepshop/meep-lerna/pull/67) 修正：地址「郵遞區號」欄位消失 ([@HsuTing](https://github.com/HsuTing))

#### :house: Internal

- `meep-ui`
  - [#70](https://github.com/meepshop/meep-lerna/pull/70) Add meep ui tool ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.2.24 (2018-07-27)

#### :bug: Bug Fix

- `meep-ui`
  - [#64](https://github.com/meepshop/meep-lerna/pull/64) 選單元件（手機版）：點擊之後未關閉 ([@HsuTing](https://github.com/HsuTing))
  - [#68](https://github.com/meepshop/meep-lerna/pull/68) 手機版選單搜尋欄：輸入的文字被切到 ([@HsuTing](https://github.com/HsuTing))
  - [#54](https://github.com/meepshop/meep-lerna/pull/54) fix(meep-ui): fix error without showing summary error ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#63](https://github.com/meepshop/meep-lerna/pull/63) 圖文元件：修正後台顏色覆蓋關掉時，hover 仍然會有黑色覆蓋 ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.22 (2018-07-27)

#### :rocket: New Feature

- `store`
  - [#46](https://github.com/meepshop/meep-lerna/pull/46) 新增商品列表 sitemap(用於 SEO) ([@barrypeng6](https://github.com/barrypeng6))

#### :bug: Bug Fix

- `meep-ui`
  - [#49](https://github.com/meepshop/meep-lerna/pull/49) 一頁式購物車：修正「商品數量」欄位關閉，無法顯示金額 ([@HsuTing](https://github.com/HsuTing))
  - [#52](https://github.com/meepshop/meep-lerna/pull/52) 修正 color 套件版本問題 ([@piovischioh](https://github.com/piovischioh))
- `store`
  - [#50](https://github.com/meepshop/meep-lerna/pull/50) 修正會員頁 title 顯示商店名稱 ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 3

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)
- [@piovischioh](https://github.com/piovischioh)

## 0.2.21 (2018-07-26)

#### :rocket: New Feature

- `meep-ui`
  - [#44](https://github.com/meepshop/meep-lerna/pull/44) 由後端解析 user-agent 字串 ([@HsuTing](https://github.com/HsuTing))
  - [#42](https://github.com/meepshop/meep-lerna/pull/42) 手機版選單： 點擊選單後需關閉 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `store`
  - [#48](https://github.com/meepshop/meep-lerna/pull/48) hotfix 401 token verify failed error ([@barrypeng6](https://github.com/barrypeng6))
  - [#45](https://github.com/meepshop/meep-lerna/pull/45) fix(store): fix error compoenent ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.20 (2018-07-25)

#### :rocket: New Feature

- `meep-ui`
  - [#16](https://github.com/meepshop/meep-lerna/pull/16) feat(meep-ui): remove showCartlockQty in productList ([@HsuTing](https://github.com/HsuTing))
  - [#41](https://github.com/meepshop/meep-lerna/pull/41) 更新隱藏頁腳白名單 ([@barrypeng6](https://github.com/barrypeng6))

#### :bug: Bug Fix

- `store`
  - [#40](https://github.com/meepshop/meep-lerna/pull/40) FB 登入：改回帶 token ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.19 (2018-07-24)

#### :bug: Bug Fix

- `store`
  - [#39](https://github.com/meepshop/meep-lerna/pull/39) FB 登入：修正 FB 登入不需帶 token ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.18 (2018-07-24)

#### :bug: Bug Fix

- `store`
  - [#38](https://github.com/meepshop/meep-lerna/pull/38) FB 登入: 修正登入錯誤 ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.17 (2018-07-24)

#### :rocket: New Feature

- `meep-ui`
  - [#35](https://github.com/meepshop/meep-lerna/pull/35) 更新翻譯 ([@friderika62](https://github.com/friderika62))
- `meep-ui`, `store`
  - [#25](https://github.com/meepshop/meep-lerna/pull/25) 臉書牆元件: 使用新版 plugin ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix

- `meep-ui`
  - [#36](https://github.com/meepshop/meep-lerna/pull/36) 修正群組未置中 ([@HsuTing](https://github.com/HsuTing))
  - [#34](https://github.com/meepshop/meep-lerna/pull/34) 文字元件：修正連結失效 ([@yuhsu1004](https://github.com/yuhsu1004))
  - [#12](https://github.com/meepshop/meep-lerna/pull/12) 修正群組無法並排問題 ([@HsuTing](https://github.com/HsuTing))
- `meep-ui`, `store`
  - [#25](https://github.com/meepshop/meep-lerna/pull/25) 臉書牆元件：修正臉書牆未正確 RWD ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#29](https://github.com/meepshop/meep-lerna/pull/29) 修改預設字體為黑體（原標楷體） ([@HsuTing](https://github.com/HsuTing))

#### Committers: 4

- Ariel Hsu ([@yuhsu1004](https://github.com/yuhsu1004))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)
- [@friderika62](https://github.com/friderika62)

## 0.2.16 (2018-07-23)

#### :bug: Bug Fix

- `store`
  - [#32](https://github.com/meepshop/meep-lerna/pull/32) fix: 調整 error page UI ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.15 (2018-07-23)

#### :bug: Bug Fix

- `meep-ui`
  - [#21](https://github.com/meepshop/meep-lerna/pull/21) fix (圖片元件)：修正未設定圖片時，無顯示 placeholder ([@HsuTing](https://github.com/HsuTing))
  - [#22](https://github.com/meepshop/meep-lerna/pull/22) fix (訂單明細): 訂單備註的多行顯示 ([@barrypeng6](https://github.com/barrypeng6))
  - [#24](https://github.com/meepshop/meep-lerna/pull/24) fix (結帳頁)：備註欄位 UI 調整 ([@HsuTing](https://github.com/HsuTing))
  - [#26](https://github.com/meepshop/meep-lerna/pull/26) fix 修正手機版 logo 圖上偏＆logo's resize width ([@barrypeng6](https://github.com/barrypeng6))
  - [#27](https://github.com/meepshop/meep-lerna/pull/27) fix 更改翻譯 ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#23](https://github.com/meepshop/meep-lerna/pull/23) fix 調整登入會員過期時間，改為 7days ([@barrypeng6](https://github.com/barrypeng6))

#### :house: Internal

- `meep-ui`, `store`
  - [#9](https://github.com/meepshop/meep-lerna/pull/9) refactor(meep-ui): move login component from store to meep-ui ([@barrypeng6](https://github.com/barrypeng6))
  - [#20](https://github.com/meepshop/meep-lerna/pull/20) ci(store, meep-ui): New deploy ([@HsuTing](https://github.com/HsuTing))
- `store`
  - [#30](https://github.com/meepshop/meep-lerna/pull/30) feat(store): support changing api and domain ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.14 (2018-07-19)

#### :bug: Bug Fix

- `meep-ui`
  - [#18](https://github.com/meepshop/meep-lerna/pull/18) fix(meep-ui): 修正結帳備註輸入多行時導致結帳失敗 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.2.6 (2018-07-18)

#### :bug: Bug Fix

- `store`
  - [#7](https://github.com/meepshop/meep-lerna/pull/7) fix(store): give lockedCountry default value in storeReducer ([@barrypeng6](https://github.com/barrypeng6))
  - [#13](https://github.com/meepshop/meep-lerna/pull/13) iOS checkout/LP 選完超商後未跳回收件人資料區塊 ([@barrypeng6](https://github.com/barrypeng6))
- `meep-ui`
  - [#10](https://github.com/meepshop/meep-lerna/pull/10) 忘記密碼元件 button 文字顯示錯誤 ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1

- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.5 (2018-07-18)

#### :bug: Bug Fix

- `store`
  - [#11](https://github.com/meepshop/meep-lerna/pull/11) fix(store): fix deploy error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.2.3 (2018-07-18)

#### :bug: Bug Fix

- `meep-ui`
  - [#6](https://github.com/meepshop/meep-lerna/pull/6) fix landingPage, checkout ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.2.2 (2018-07-17)

#### :bug: Bug Fix

- `meep-ui`
  - [#6](https://github.com/meepshop/meep-lerna/pull/6) fix landingPage, checkout ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1

- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
