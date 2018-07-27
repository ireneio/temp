## 0.2.23 (2018-07-27)

#### :bug: Bug Fix
* `meep-ui`
  * [#64](https://github.com/meepshop/meep-lerna/pull/64) 選單元件（手機版）：點擊之後未關閉 ([@HsuTing](https://github.com/HsuTing))
  * [#68](https://github.com/meepshop/meep-lerna/pull/68) 手機版選單搜尋欄：輸入的文字被切到 ([@HsuTing](https://github.com/HsuTing))
  * [#54](https://github.com/meepshop/meep-lerna/pull/54) fix(meep-ui): fix error without showing summary error ([@HsuTing](https://github.com/HsuTing))
* `store`
  * [#63](https://github.com/meepshop/meep-lerna/pull/63) 圖文元件：修正後台顏色覆蓋關掉時，hover仍然會有黑色覆蓋 ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 2
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.22 (2018-07-27)

#### :rocket: New Feature
* `store`
  * [#46](https://github.com/meepshop/meep-lerna/pull/46) 新增商品列表sitemap(用於SEO) ([@barrypeng6](https://github.com/barrypeng6))

#### :bug: Bug Fix
* `meep-ui`
  * [#49](https://github.com/meepshop/meep-lerna/pull/49) 一頁式購物車：修正「商品數量」欄位關閉，無法顯示金額 ([@HsuTing](https://github.com/HsuTing))
  * [#52](https://github.com/meepshop/meep-lerna/pull/52) 修正color套件版本問題 ([@piovischioh](https://github.com/piovischioh))
* `store`
  * [#50](https://github.com/meepshop/meep-lerna/pull/50) 修正會員頁title顯示商店名稱 ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 3
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)
- [@piovischioh](https://github.com/piovischioh)

## 0.2.21 (2018-07-26)

#### :rocket: New Feature
* `meep-ui`
  * [#44](https://github.com/meepshop/meep-lerna/pull/44) 由後端解析 user-agent 字串 ([@HsuTing](https://github.com/HsuTing))
  * [#42](https://github.com/meepshop/meep-lerna/pull/42) 手機版選單： 點擊選單後需關閉 ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix
* `store`
  * [#48](https://github.com/meepshop/meep-lerna/pull/48) hotfix 401 token verify failed error ([@barrypeng6](https://github.com/barrypeng6))
  * [#45](https://github.com/meepshop/meep-lerna/pull/45) fix(store): fix error compoenent ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 2
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.20 (2018-07-25)

#### :rocket: New Feature
* `meep-ui`
  * [#16](https://github.com/meepshop/meep-lerna/pull/16) feat(meep-ui): remove showCartlockQty in productList ([@HsuTing](https://github.com/HsuTing))
  * [#41](https://github.com/meepshop/meep-lerna/pull/41) 更新隱藏頁腳白名單 ([@barrypeng6](https://github.com/barrypeng6))

#### :bug: Bug Fix
* `store`
  * [#40](https://github.com/meepshop/meep-lerna/pull/40) FB登入：改回帶token ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 2
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.19 (2018-07-24)

#### :bug: Bug Fix
* `store`
  * [#39](https://github.com/meepshop/meep-lerna/pull/39) FB登入：修正FB登入不需帶token ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1
- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.18 (2018-07-24)

#### :bug: Bug Fix
* `store`
  * [#38](https://github.com/meepshop/meep-lerna/pull/38) FB登入: 修正登入錯誤 ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1
- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.17 (2018-07-24)

#### :rocket: New Feature
* `meep-ui`
  * [#35](https://github.com/meepshop/meep-lerna/pull/35) 更新翻譯 ([@friderika62](https://github.com/friderika62))
* `meep-ui`, `store`
  * [#25](https://github.com/meepshop/meep-lerna/pull/25) 臉書牆元件: 使用新版plugin ([@HsuTing](https://github.com/HsuTing))

#### :bug: Bug Fix
* `meep-ui`
  * [#36](https://github.com/meepshop/meep-lerna/pull/36) 修正群組未置中 ([@HsuTing](https://github.com/HsuTing))
  * [#34](https://github.com/meepshop/meep-lerna/pull/34) 文字元件：修正連結失效 ([@yuhsu1004](https://github.com/yuhsu1004))
  * [#12](https://github.com/meepshop/meep-lerna/pull/12) 修正群組無法並排問題 ([@HsuTing](https://github.com/HsuTing))
* `meep-ui`, `store`
  * [#25](https://github.com/meepshop/meep-lerna/pull/25) 臉書牆元件：修正臉書牆未正確RWD ([@HsuTing](https://github.com/HsuTing))
* `store`
  * [#29](https://github.com/meepshop/meep-lerna/pull/29) 修改預設字體為黑體（原標楷體） ([@HsuTing](https://github.com/HsuTing))

#### Committers: 4
- Ariel Hsu ([@yuhsu1004](https://github.com/yuhsu1004))
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)
- [@friderika62](https://github.com/friderika62)

## 0.2.16 (2018-07-23)

#### :bug: Bug Fix
* `store`
  * [#32](https://github.com/meepshop/meep-lerna/pull/32) fix: 調整error page UI ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1
- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.15 (2018-07-23)

#### :bug: Bug Fix
* `meep-ui`
  * [#21](https://github.com/meepshop/meep-lerna/pull/21) fix (圖片元件)：修正未設定圖片時，無顯示placeholder ([@HsuTing](https://github.com/HsuTing))
  * [#22](https://github.com/meepshop/meep-lerna/pull/22) fix (訂單明細): 訂單備註的多行顯示 ([@barrypeng6](https://github.com/barrypeng6))
  * [#24](https://github.com/meepshop/meep-lerna/pull/24) fix (結帳頁)：備註欄位UI調整 ([@HsuTing](https://github.com/HsuTing))
  * [#26](https://github.com/meepshop/meep-lerna/pull/26) fix 修正手機版logo圖上偏＆logo's resize width ([@barrypeng6](https://github.com/barrypeng6))
  * [#27](https://github.com/meepshop/meep-lerna/pull/27) fix 更改翻譯 ([@HsuTing](https://github.com/HsuTing))
* `store`
  * [#23](https://github.com/meepshop/meep-lerna/pull/23) fix 調整登入會員過期時間，改為7days ([@barrypeng6](https://github.com/barrypeng6))

#### :house: Internal
* `meep-ui`, `store`
  * [#9](https://github.com/meepshop/meep-lerna/pull/9) refactor(meep-ui): move login component from store to meep-ui ([@barrypeng6](https://github.com/barrypeng6))
  * [#20](https://github.com/meepshop/meep-lerna/pull/20) ci(store, meep-ui): New deploy ([@HsuTing](https://github.com/HsuTing))
* `store`
  * [#30](https://github.com/meepshop/meep-lerna/pull/30) feat(store): support changing api and domain ([@HsuTing](https://github.com/HsuTing))

#### Committers: 2
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.14 (2018-07-19)

#### :bug: Bug Fix
* `meep-ui`
  * [#18](https://github.com/meepshop/meep-lerna/pull/18) fix(meep-ui): 修正結帳備註輸入多行時導致結帳失敗 ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.2.6 (2018-07-18)

#### :bug: Bug Fix
* `store`
  * [#7](https://github.com/meepshop/meep-lerna/pull/7) fix(store): give lockedCountry default value in storeReducer ([@barrypeng6](https://github.com/barrypeng6))
  * [#13](https://github.com/meepshop/meep-lerna/pull/13) iOS checkout/LP 選完超商後未跳回收件人資料區塊 ([@barrypeng6](https://github.com/barrypeng6))
* `meep-ui`
  * [#10](https://github.com/meepshop/meep-lerna/pull/10) 忘記密碼元件button文字顯示錯誤 ([@barrypeng6](https://github.com/barrypeng6))

#### Committers: 1
- [@barrypeng6](https://github.com/barrypeng6)

## 0.2.5 (2018-07-18)

#### :bug: Bug Fix
* `store`
  * [#11](https://github.com/meepshop/meep-lerna/pull/11) fix(store): fix deploy error ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.2.3 (2018-07-18)

#### :bug: Bug Fix
* `meep-ui`
  * [#6](https://github.com/meepshop/meep-lerna/pull/6) fix landingPage, checkout ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))

## 0.2.2 (2018-07-17)

#### :bug: Bug Fix
* `meep-ui`
  * [#6](https://github.com/meepshop/meep-lerna/pull/6) fix landingPage, checkout ([@HsuTing](https://github.com/HsuTing))

#### Committers: 1
- Ting-Hsiang Hsu ([@HsuTing](https://github.com/HsuTing))
