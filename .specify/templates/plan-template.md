# 實作計畫：[FEATURE]

**分支**：`[###-feature-name]` | **日期**：[DATE] | **規格**：[link]
**輸入**：來自 `/specs/[###-feature-name]/spec.md` 的功能規格

**注意**：此範本由 `/speckit.plan` 命令填寫。有關執行工作流程，請參閱 `.specify/templates/commands/plan.md`。

## 摘要

[從功能規格中提取：主要需求 + 來自研究的技術方法]

## 技術上下文

<!--
  需要操作：請將此部分的內容替換為專案的技術細節。
  此處的結構僅作為指導迭代過程的建議。
-->

**語言/版本**：[例如，Python 3.11, Swift 5.9, Rust 1.75 或 NEEDS CLARIFICATION]
**主要依賴項**：[例如，FastAPI, UIKit, LLVM 或 NEEDS CLARIFICATION]
**儲存**：[如果適用，例如，PostgreSQL, CoreData, 檔案 或 N/A]
**測試**：[例如，pytest, XCTest, cargo test 或 NEEDS CLARIFICATION]
**目標平台**：[例如，Linux 伺服器, iOS 15+, WASM 或 NEEDS CLARIFICATION]
**專案類型**：[single/web/mobile - 決定原始碼結構]
**性能目標**：[特定領域，例如，1000 req/s, 10k lines/sec, 60 fps 或 NEEDS CLARIFICATION]
**限制**：[特定領域，例如，<200ms p95, <100MB 記憶體, 可離線 或 NEEDS CLARIFICATION]
**規模/範疇**：[特定領域，例如，10k 使用者, 1M 行程式碼, 50 個畫面 或 NEEDS CLARIFICATION]

## 憲章檢查

*關卡：必須在階段 0 研究之前通過。在階段 1 設計後重新檢查。*

- [ ] **I. 規格驅動開發**：計畫是否與 `SDD_SPEC.md` 對齊？
- [ ] **II. 嚴格的類型安全**：計畫是否考慮了 `strict` TypeScript 並避免了 `any`？
- [ ] **III. 設計即安全與隱私**：計畫是否尊重使用者隱私和資料安全？
- [ ] **IV. 明確的關注點分離**：計畫是否保持了背景和 UI 邏輯之間的分離？
- [ ] **V. 透過測試確保品質**：計畫是否包含了對可測試性的考量？

## 專案結構

### 文件（此功能）

```
specs/[###-feature]/
├── plan.md              # 此檔案 (/speckit.plan 命令輸出)
├── research.md          # 階段 0 輸出 (/speckit.plan 命令)
├── data-model.md        # 階段 1 輸出 (/speckit.plan 命令)
├── quickstart.md        # 階段 1 輸出 (/speckit.plan 命令)
├── contracts/           # 階段 1 輸出 (/speckit.plan 命令)
└── tasks.md             # 階段 2 輸出 (/speckit.tasks 命令 - 不是由 /speckit.plan 建立)
```

### 原始碼（儲存庫根目錄）
<!--
  需要操作：請將下方的預留位置樹狀結構替換為此功能的具體佈局。
  刪除未使用的選項，並用真實路徑擴展所選結構（例如，apps/admin, packages/something）。
  交付的計畫不得包含「選項」標籤。
-->

```
# [如果未使用則移除] 選項 1：單一專案（預設）
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [如果未使用則移除] 選項 2：Web 應用程式（當偵測到 "frontend" + "backend" 時）
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [如果未使用則移除] 選項 3：行動應用 + API（當偵測到 "iOS/Android" 時）
api/
└── [同上方的 backend]

ios/ 或 android/
└── [特定平台的結構：功能模組、UI 流程、平台測試]
```

**結構決策**：[記錄所選的結構並參考上方捕獲的真實目錄]

## 複雜度追蹤

*僅在「憲章檢查」有必須證明的違規時填寫*

| 違規 | 為何需要 | 被拒絕的更簡單替代方案的原因 |
|-----------|------------|-------------------------------------|
| [例如，第 4 個專案] | [目前的需求] | [為何 3 個專案不足] |
| [例如，儲存庫模式] | [具體問題] | [為何直接存取資料庫不足] |