# LeetCode Learning Project

北米技術面接に向けたアルゴリズム学習リポジトリ。

## 英語のルール（最重要）

- **超簡単な英語だけ使う。** 難しい単語は覚えられないし、時間の無駄。
- 中学英語レベルで書く。"utilize" → "use"、"traverse" → "go through"、"subsequently" → "then"
- 短い文で書く。1文は15語以下を目指す。
- 面接フレーズも、丸暗記しやすいシンプルな文にする。

## 解説ファイル生成ルール

問題の解説ファイル（`*_solution.md`）を作成する際は、以下のセクション構成でMarkdownファイルとして作成すること。
コード部分は ```typescript コードブロックで記述する。

### 必須セクション（全問題共通）

```markdown
# LeetCode [番号]. [問題名]
[URL]

## 1. PROBLEM UNDERSTANDING
What, Input, Output, Constraints, Key insight

## 2. APPROACH (面接で話す流れ)
英語で、面接官に説明するように自然な英語で

## 3. SOLUTION
動作するTypeScriptコード（```typescript コードブロック内）

## 4. COMPLEXITY (必ず聞かれる)
Time: O(?) - 理由を英語で
Space: O(?) - 理由を英語で

## 5. KEY PHRASES (面接で使える英語)
Clarifying questions, Explaining approach, Explaining complexity

## 6. VISUAL WALKTHROUGH
具体例でアルゴリズムの動きを視覚的に示す

## 7. EDGE CASES
境界ケースのリスト

## 8. TEST CASES
テストケース（```typescript コードブロック内）
```

### 追加セクション（トピックに応じて）

```markdown
## 9. VARIATIONS (バリエーション)
このアルゴリズムの派生パターン（例：Binary Searchなら Lower/Upper Bound）

## 10. WHEN TO USE WHICH (使い分け)
Q&A形式でパターンの使い分けを説明

## 11. COMMON INTERVIEW QUESTIONS
よくある質問と回答（Q&A形式）

## 12. RELATED PROBLEMS
関連するLeetCode問題のリスト

## 13. HOW TO READ CODE ALOUD (口頭での読み方)
コード・記号の英語での読み方
計算量の読み方（O(log n) → "O of log n"）
例を使った説明スクリプト
```

### 参考例

`BinarySearch/BinarySearch_solution.md` を参照。

## Explanation Style Guidelines

When explaining code or algorithms (in conversation, not in solution files):

- **Visualize over verbalize**: Use ASCII diagrams and figures instead of long text. Show ranges, pointer movements, and comparisons visually.
- **Less is more**: Remove every sentence that doesn't add understanding. If a diagram already explains it, don't repeat it in words.
- **Concrete examples first**: Always start with a specific, small example (5-6 elements) before stating general rules. Never explain abstract logic without a concrete case.
- **Middle-school friendly**: Assume no programming background. Use real-world analogies (e.g., weight scale, people in a line) to build intuition before showing code.
- **One concept at a time**: Don't mix the main algorithm with edge-case handling. Explain the core idea first, then layer on details like duplicate skipping.
- **Show, don't tell "why"**: Instead of saying "this works because X", show two cases side by side — one that works and one that doesn't — so the reader sees why themselves.

## ファイル構成

テーマ別ディレクトリの中に問題ファイルと解説ファイルを配置する。

```
[テーマ名]/
├── [Problem1].ts              # 問題 - 自分で解く用
├── [Problem1]_solution.md     # 解説 - 学習・復習用（Markdown）
├── [Problem2].ts
└── [Problem2]_solution.md
```

例:
```
BinarySearch/
├── BinarySearch.ts
├── BinarySearch_solution.md
├── KokoEatingBananas.ts
└── KokoEatingBananas_solution.md
```
