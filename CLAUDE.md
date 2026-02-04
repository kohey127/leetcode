# LeetCode Learning Project

北米技術面接に向けたアルゴリズム学習リポジトリ。

## 解説ファイル生成ルール

問題の解説ファイル（`*_solution.ts`）を作成する際は、以下のセクション構成で作成すること。

### 必須セクション（全問題共通）

```typescript
// ============================================
// LeetCode [番号]. [問題名]
// [URL]
// ============================================

// 1. PROBLEM UNDERSTANDING
// - What, Input, Output, Constraints, Key insight

// 2. APPROACH (面接で話す流れ)
// 英語で、面接官に説明するように自然な英語で

// 3. SOLUTION
// 動作するTypeScriptコード

// 4. COMPLEXITY (必ず聞かれる)
// Time: O(?) - 理由を英語で
// Space: O(?) - 理由を英語で

// 5. KEY PHRASES (面接で使える英語)
// - Clarifying questions, Explaining approach, Explaining complexity

// 6. VISUAL WALKTHROUGH
// 具体例でアルゴリズムの動きを視覚的に示す

// 7. EDGE CASES
// 境界ケースのリスト

// 8. TEST CASES
// console.logで実行可能なテストケース
```

### 追加セクション（トピックに応じて）

```typescript
// 9. VARIATIONS (バリエーション)
// このアルゴリズムの派生パターン（例：Binary Searchなら Lower/Upper Bound）

// 10. WHEN TO USE WHICH (使い分け)
// Q&A形式でパターンの使い分けを説明

// 11. COMMON INTERVIEW QUESTIONS
// よくある質問と回答（Q&A形式）

// 12. RELATED PROBLEMS
// 関連するLeetCode問題のリスト

// 13. HOW TO READ CODE ALOUD (口頭での読み方)
// コード・記号の英語での読み方
// 計算量の読み方（O(log n) → "O of log n"）
// 例を使った説明スクリプト
```

### 参考例

`BinarySearch/BinarySearch_solution.ts` を参照。

## ファイル構成

```
[ProblemName]/
├── [ProblemName].ts           # 問題 - 自分で解く用
└── [ProblemName]_solution.ts  # 解説 - 学習・復習用
```

## 検証

解説ファイル作成後は `bun run [file]` でテストケースが通ることを確認する。
