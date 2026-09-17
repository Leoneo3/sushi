# 壽司郎叫號 PWA

使用網址：https://leoneo3.github.io/sushi/

香港分店叫號、地區搜尋、收藏、10／30／60 秒更新、票號追蹤、自訂 1–100 號提醒及 30 分鐘補檯估算倒數。非官方工具，無需帳戶。

## iPhone 使用
用 Safari 開啟上述網址即可使用，亦可在分享選單選加入主畫面。首次在線開啟後會快取介面；離線可查看儲存的票號及倒數，即時資料仍需網絡。

必須保持畫面開啟才能檢查叫號。鎖屏、切去其他 app 或被系統暫停時，不提供背景叫號推送。通知權限不等於背景服務。

## 計算方式
以同一隊列排序後最前（最小）號碼計算，其餘號碼視作預告。720／721／722 與 730 號相差 10 號，不是 8。只有自己的票號成為最前號碼才記錄時間；跳過而未觀察到到號時不推算。

首次偵測時間不是店方實際叫號時間，輪詢及上游延遲可能令估算偏遲。30 分鐘按使用者提供的安排計算，補檯以店員確認為準。重複叫號不延長期限。

## 私隱及架構
票號、收藏及設定僅儲存在自己瀏覽器 localStorage。公開只讀轉接服務只收到分店 ID，不會收到票號或收藏；服務提供者可能記錄正常網絡連線資訊。

GitHub Pages 從 docs/ 發佈單一 HTML 及 PWA 資源。資料轉接位於 https://sushi-api.leoneo-f3c.workers.dev/api/queue，只接受固定分店列表及分店 ID 路徑，不接受任意上游網址。

## 開發及驗證
pnpm install 後執行 pnpm test、pnpm exec tsc --noEmit、pnpm run build。
standalone/main.tsx 與主站共用 app/dashboard.tsx，build 內嵌 JS/CSS 成 public/sushi-queue.html，再複製至 docs/index.html 供 Pages 使用。

29 項核心自動測試通過；未完成 iPhone 真機驗證。WebMCP 只讀工具已提供，未完成契約驗證。
