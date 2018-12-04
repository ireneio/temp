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
