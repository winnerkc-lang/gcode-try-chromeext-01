# 規格驅動開發 (SDD) - 自訂書籤管理器 Chrome Extension

## 專案概述

**專案名稱**: 自訂書籤管理器 (Custom Bookmark Manager)
**專案類型**: Chrome Extension (Manifest V3)
**開發語言**: TypeScript
**目標平台**: Chrome 瀏覽器 (及相容的 Chromium 瀏覽器)

### 核心功能
1. 管理自訂書籤（新增、刪除、瀏覽）
2. 即時搜尋書籤功能
3. 本地資料持久化存儲
4. 初始化預設書籤

---

## 技術架構規格

### 1. 專案結構
```
try-chromeext-01/
├── src/
│   ├── background.ts      # 背景服務工作者
│   └── popup.ts           # 彈出視窗邏輯
├── dist/                  # TypeScript 編譯輸出目錄
├── popup.html             # 彈出視窗介面
├── manifest.json          # 擴充功能配置檔
├── bookmark.json          # 初始書籤資料
├── tsconfig.json          # TypeScript 配置
└── package.json           # Node.js 專案配置
```

### 2. TypeScript 配置規格
```json
{
  "target": "es2017",
  "module": "es2022",
  "strict": true,
  "outDir": "dist",
  "rootDir": "src"
}
```

### 3. Chrome Extension 配置
- **Manifest Version**: 3
- **權限需求**:
  - `storage`: 用於本地資料存儲
  - `tabs`: 用於開啟新分頁
- **背景腳本**: Service Worker 模式
- **使用者介面**: Browser Action Popup

---

## 資料結構規格

### Bookmark 介面
```typescript
interface Bookmark {
  name: string;  // 書籤名稱
  url: string;   // 書籤網址 (必須是有效的 URL)
}
```

### 存儲規格
- **存儲位置**: `chrome.storage.local`
- **存儲鍵值**: `bookmarks`
- **資料格式**: `Bookmark[]` (書籤陣列)
- **初始資料來源**: `bookmark.json`

---

## 功能規格

### 1. 背景服務 (background.ts)

#### 1.1 初始化功能
**觸發時機**: 擴充功能首次安裝 (`chrome.runtime.onInstalled`)

**執行流程**:
1. 檢測安裝原因是否為 `'install'`
2. 從 `bookmark.json` 讀取初始書籤資料
3. 解析 JSON 資料
4. 儲存至 `chrome.storage.local`
5. 錯誤處理與日誌記錄

**錯誤處理**:
- 網路請求失敗處理
- JSON 解析錯誤處理
- 存儲失敗處理

#### 1.2 訊息處理功能
**監聽器**: `chrome.runtime.onMessage`

**支援的動作**:

| 動作 | 參數 | 回應 | 說明 |
|------|------|------|------|
| `open-tab` | `url: string` | 無 | 開啟新分頁 |
| `get-bookmarks` | 無 | `Bookmark[]` | 取得所有書籤 |
| `save-bookmarks` | `bookmarks: Bookmark[]` | `{success: boolean}` | 儲存書籤 |

**實作要求**:
- 使用異步回應 (return true)
- 參數驗證
- 未知動作的警告日誌

---

### 2. 彈出視窗邏輯 (popup.ts)

#### 2.1 UI 元素綁定
```typescript
// DOM 元素
- searchInput: HTMLInputElement       // 搜尋輸入框
- bookmarksList: HTMLDivElement       // 書籤列表容器
- newNameInput: HTMLInputElement      // 新增書籤名稱輸入
- newUrlInput: HTMLInputElement       // 新增書籤 URL 輸入
- addButton: HTMLButtonElement        // 新增按鈕
```

#### 2.2 書籤渲染功能
**函數**: `renderBookmarks(bookmarks: Bookmark[])`

**渲染規格**:
- 清空現有列表
- 空書籤時顯示提示訊息："沒有書籤"
- 每個書籤項目包含:
  - 名稱 (可點擊開啟)
  - URL (作為 tooltip)
  - 刪除按鈕 (× 符號)
- 使用 `data-index` 和 `data-url` 儲存元資料

#### 2.3 搜尋功能
**觸發事件**: `input` 事件於 `searchInput`

**搜尋邏輯**:
- 即時過濾 (無延遲)
- 不分大小寫比對
- 搜尋範圍: 書籤名稱 + URL
- 更新顯示過濾後的結果

**演算法**:
```typescript
filteredBookmarks = allBookmarks.filter(b =>
  b.name.toLowerCase().includes(searchTerm) ||
  b.url.toLowerCase().includes(searchTerm)
)
```

#### 2.4 新增書籤功能
**觸發事件**: `click` 事件於 `addButton`

**驗證規則**:
- 名稱與 URL 均不可為空 (trim 後)
- URL 自動補全協定 (http:// 或 https://)

**執行流程**:
1. 驗證輸入
2. 標準化 URL
3. 建立新 Bookmark 物件
4. 加入書籤陣列
5. 儲存至背景腳本
6. 清空輸入欄位
7. 清空搜尋欄位
8. 重新載入書籤

#### 2.5 刪除書籤功能
**觸發事件**: `click` 事件於刪除按鈕

**執行流程**:
1. 識別點擊的書籤索引
2. 從陣列中移除
3. 儲存更新後的書籤
4. 重新渲染列表

#### 2.6 開啟書籤功能
**觸發事件**: `click` 事件於書籤項目 (非刪除按鈕)

**執行流程**:
1. 取得書籤 URL
2. 發送訊息至背景腳本開啟分頁
3. 關閉彈出視窗

---

### 3. 使用者介面 (popup.html)

#### 3.1 UI 結構
```
搜尋輸入框
├── 書籤列表 (可滾動, max-height: 300px)
│   ├── 書籤項目 1 [名稱] [×]
│   ├── 書籤項目 2 [名稱] [×]
│   └── ...
└── 新增表單
    ├── 名稱輸入框
    ├── URL 輸入框
    └── 新增按鈕
```

#### 3.2 樣式規格
- **視窗寬度**: 350px
- **字體**: sans-serif
- **搜尋框**: 95% 寬, 8px padding
- **列表高度**: 最大 300px, 垂直滾動
- **書籤項目**:
  - Flexbox 佈局 (space-between)
  - hover 背景色: #f0f0f0
  - 邊框: 底部 1px #eee
- **刪除按鈕**:
  - 預設顏色: #aaa
  - hover 顏色: #f00
- **新增按鈕**:
  - 背景色: #007bff
  - hover 背景色: #0056b3

---

## 開發工作流程規格

### 編譯指令
```bash
npm run build   # 單次編譯
npm run watch   # 監聽模式編譯
```

### 載入擴充功能步驟
1. 執行 `npm run build` 編譯 TypeScript
2. 開啟 Chrome 瀏覽器
3. 前往 `chrome://extensions/`
4. 啟用「開發人員模式」
5. 點擊「載入未封裝項目」
6. 選擇專案根目錄

### 偵錯方式
- **背景腳本**: `chrome://extensions/` → 檢查服務工作者
- **彈出視窗**: 右鍵點擊擴充功能圖示 → 檢查彈出式視窗

---

## 程式碼品質規範

### TypeScript 規範
- 使用嚴格模式 (`strict: true`)
- 明確定義介面與類型
- 避免使用 `any` (除訊息處理必要情況)
- 強制檔案名稱大小寫一致性

### 錯誤處理規範
- 所有非同步操作必須包含錯誤處理
- 使用 `console.error` 記錄錯誤
- 使用 `console.warn` 記錄警告
- 使用 `console.log` 記錄重要資訊

### 程式碼組織規範
- 單一職責原則
- 函數應保持簡潔 (< 50 行)
- 使用有意義的變數與函數名稱
- 適當的程式碼註解 (中文)

---

## 擴充性規格

### 未來可能的功能擴充方向
1. **書籤分類功能**
   - 新增 `category` 欄位至 Bookmark 介面
   - 實作分類篩選器

2. **書籤排序功能**
   - 按名稱、URL、新增時間排序
   - 拖曳排序

3. **匯入/匯出功能**
   - 匯出為 JSON
   - 從瀏覽器原生書籤匯入

4. **同步功能**
   - 使用 `chrome.storage.sync`
   - 跨裝置同步

5. **書籤圖示 (Favicon)**
   - 顯示網站圖示
   - 使用 Google Favicon API

6. **鍵盤快捷鍵**
   - 註冊 `commands` 權限
   - 快速開啟特定書籤

7. **書籤統計**
   - 點擊次數追蹤
   - 使用頻率分析

---

## 測試規格

### 功能測試檢查清單
- [ ] 首次安裝載入初始書籤
- [ ] 新增書籤成功
- [ ] URL 自動補全協定
- [ ] 刪除書籤成功
- [ ] 搜尋功能正確過濾
- [ ] 點擊書籤開啟新分頁
- [ ] 空書籤列表顯示提示
- [ ] 輸入驗證 (空白名稱/URL)
- [ ] 資料持久化 (重啟瀏覽器後仍存在)
- [ ] 中文字符正確處理

### 邊界情況測試
- [ ] 超長書籤名稱顯示 (text-overflow: ellipsis)
- [ ] 大量書籤 (100+) 效能
- [ ] 特殊字符 URL 處理
- [ ] 無效 URL 處理
- [ ] 並發操作 (快速連續新增/刪除)

---

## 安全性規範

### Chrome Extension 安全最佳實踐
1. **最小權限原則**: 僅請求必要權限
2. **內容安全政策 (CSP)**: Manifest V3 預設啟用
3. **輸入驗證**: 所有使用者輸入必須驗證與清理
4. **HTTPS 優先**: 建議使用 HTTPS URL

### 資料隱私
- 所有資料僅存儲於本地
- 不收集使用者資訊
- 不傳送資料至遠端伺服器

---

## 故障排除指南

### 常見問題
1. **編譯錯誤**: 檢查 TypeScript 版本與配置
2. **擴充功能無法載入**: 檢查 manifest.json 語法
3. **背景腳本錯誤**: 檢查服務工作者控制台
4. **書籤未儲存**: 檢查 storage 權限
5. **搜尋無反應**: 檢查 popup.js 是否正確編譯

### 偵錯步驟
1. 確認 TypeScript 編譯無錯誤
2. 檢查背景腳本控制台
3. 檢查彈出視窗控制台
4. 驗證 chrome.storage 資料
5. 重新載入擴充功能

---

## 版本歷史

### v1.0 (當前版本)
- 基本書籤管理功能
- 即時搜尋功能
- 本地資料存儲
- 初始書籤載入

---

## 參考資源

### 官方文件
- [Chrome Extension Manifest V3](https://developer.chrome.com/docs/extensions/mv3/)
- [Chrome Storage API](https://developer.chrome.com/docs/extensions/reference/storage/)
- [Chrome Tabs API](https://developer.chrome.com/docs/extensions/reference/tabs/)
- [TypeScript 官方文件](https://www.typescriptlang.org/docs/)

### 開發工具
- Chrome DevTools
- TypeScript Compiler
- VS Code (推薦 IDE)

---

## 引用此規格的方式

在與 AI 助手的後續對話中，可以使用以下提示詞引用本規格:

```
請參考專案根目錄的 SDD_SPEC.md 規格文件，
該文件包含完整的技術架構、功能規格、程式碼規範等資訊。
```

或針對特定部分:

```
請根據 SDD_SPEC.md 中的「資料結構規格」進行開發
請遵循 SDD_SPEC.md 中的「程式碼品質規範」
請參考 SDD_SPEC.md 中的「擴充性規格」來實作新功能
```
