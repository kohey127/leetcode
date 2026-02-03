# 計算量（Time Complexity）完全リファレンス

**毎回調べる必要がなくなる**ための完全ガイド。

---

## 1. 計算量の成長率（速い順）

| 記号 | 計算量 | 名前 | イメージ |
|:---:|--------|------|----------|
| ⚡ | **O(1)** | 定数時間 | 常に1回で終わる |
| 🚀 | **O(log n)** | 対数時間 | 半分ずつ絞り込む |
| 🏃 | **O(n)** | 線形時間 | 全部1回ずつ見る |
| 🚶 | **O(n log n)** | 線形対数時間 | 全部を分割しながら処理 |
| 🐢 | **O(n²)** | 二乗時間 | 全ペアをチェック |

### 具体的な数値で比較

| 計算量 | イメージ | n=10 | n=100 | n=1000 | n=10000 |
|--------|----------|------|-------|--------|---------|
| **O(1)** | 1回で終わる | 1 | 1 | 1 | 1 |
| **O(log n)** | 半分ずつ絞る | 3 | 7 | 10 | 13 |
| **O(n)** | 全部見る | 10 | 100 | 1,000 | 10,000 |
| **O(n log n)** | 全部×分割回数 | 33 | 664 | 9,966 | 132,877 |
| **O(n²)** | 全ペア | 100 | 10,000 | 1,000,000 | 100,000,000 |

> **覚え方**: log₂(1000) ≈ 10 なので、Binary Searchは1000個のデータを約10回で探せる

---

## 2. JavaScript/TypeScript 操作の計算量一覧

### 配列操作

| 操作 | 計算量 | 理由 |
|------|--------|------|
| `arr[i]` | **O(1)** | インデックスでメモリ直接アクセス |
| `push()` | **O(1)** | 末尾に追加するだけ |
| `pop()` | **O(1)** | 末尾を削除するだけ |
| `shift()` | **O(n)** | 先頭削除 → 全要素を前にずらす |
| `unshift()` | **O(n)** | 先頭追加 → 全要素を後ろにずらす |
| `splice()` | O(n) | 要素をずらす必要あり |
| `slice()` | O(n) | コピーが発生 |
| `concat()` | O(n) | 新配列を作成 |
| `indexOf()` | **O(n)** | 先頭から順番に探す |
| `includes()` | O(n) | indexOfと同じ |
| `find()` | O(n) | 条件に合うまで探す |
| `filter()` | O(n) | 全要素をチェック |
| `map()` | O(n) | 全要素を変換 |
| `reduce()` | O(n) | 全要素を処理 |
| `sort()` | **O(n log n)** | TimSort使用 |
| `reverse()` | O(n) | 全要素を入れ替え |

### Map / Set 操作

| 操作 | 計算量 | 理由 |
|------|--------|------|
| `Map.get()` | **O(1)** | ハッシュで場所を直接計算 |
| `Map.set()` | **O(1)** | 同上 |
| `Map.has()` | **O(1)** | 同上 |
| `Map.delete()` | **O(1)** | 同上 |
| `Set.add()` | **O(1)** | ハッシュテーブル |
| `Set.has()` | **O(1)** | ハッシュで直接アクセス |
| `Set.delete()` | **O(1)** | 同上 |

### 文字列操作

| 操作 | 計算量 | 理由 |
|------|--------|------|
| `str[i]` | O(1) | インデックスアクセス |
| `str.length` | O(1) | プロパティ参照 |
| `str.slice()` | O(n) | 新文字列を作成 |
| `str.split()` | O(n) | 全文字を走査 |
| `str + str` | O(n) | 新文字列を作成 |
| `str.indexOf()` | O(n×m) | パターンマッチング（mはパターン長） |

---

## 3. なぜその計算量になるのか

### O(n) になる理由: indexOf

```typescript
function myIndexOf(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
```

**例**: `[1, 2, 3, 4, 5]` で `5` を探す場合

```
1を見る → 2を見る → 3を見る → 4を見る → 5を見る → 見つかった！
```

最悪5回（= n回）のチェックが必要 → **O(n)**

---

### O(log n) になる理由: Binary Search

```typescript
function binarySearch(arr: number[], target: number): number {
  let left = 0, right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;  // 右半分を探索
    else right = mid - 1;                    // 左半分を探索
  }
  return -1;
}
```

**例**: `[1, 2, 3, 4, 5, 6, 7, 8]` で `7` を探す場合

```
1回目: 真ん中は5 → 7 > 5 → 右半分 [6, 7, 8] だけ見る
2回目: 真ん中は7 → 見つかった！
```

8個のデータを**2回**で発見。毎回半分を捨てるから → **O(log n)**

| n | 最大何回で見つかる？ |
|---|---------------------|
| 8 | 3回 |
| 1,000 | 10回 |
| 1,000,000 | 20回 |

---

### O(n log n) になる理由: ソート

**シンプルな考え方**:

- **log n** = 「半分に分ける回数」（8個なら3回で1個になる）
- **n** = 「各段階で全要素を1回ずつ処理」

→ **n × log n** = 「全要素を処理」×「分割の段数」

**具体例**: 8個の配列をソートする場合

| 段階 | 何をする | 処理回数 |
|------|----------|----------|
| 分割1 | 8個 → 4個×2 | - |
| 分割2 | 4個 → 2個×4 | - |
| 分割3 | 2個 → 1個×8 | - |
| マージ1 | 1個×8 → 2個×4 | 8回の比較 |
| マージ2 | 2個×4 → 4個×2 | 8回の比較 |
| マージ3 | 4個×2 → 8個×1 | 8回の比較 |

合計: **8 × 3 = 24回** → **n × log₂(n)** → **O(n log n)**

---

### O(1) になる理由: Map/Set（ハッシュテーブル）

**仕組み**: キーから「場所」を直接計算する

```typescript
const map = new Map<string, number>();
map.set("apple", 100);
map.get("apple");
```

**内部動作**:

```
set("apple", 100):
  "apple" → ハッシュ関数 → 42 → 内部配列[42]に100を格納

get("apple"):
  "apple" → ハッシュ関数 → 42 → 内部配列[42]から100を取得
```

配列アクセス `arr[42]` は **O(1)** なので、Map/Setも **O(1)**

**ポイント**: ハッシュ関数で場所を計算して直接アクセスするので **O(1)**

---

## 4. よくあるパターンの計算量

| パターン | 計算量 | 例 |
|----------|--------|-----|
| 単純ループ | O(n) | `for (let i = 0; i < n; i++)` |
| 二重ループ | O(n²) | `for i { for j { ... } }` |
| ループ内でソート | O(n² log n) | 危険！避けるべき |
| ループ内でindexOf | O(n²) | 危険！Mapを使おう |
| 分割統治 | O(n log n) | マージソート |
| 半分ずつ絞る | O(log n) | 二分探索 |
| ループ内でMap操作 | O(n) | O(n) × O(1) = O(n) |

---

## 5. 計算量を改善するテクニック

| 元の方法 | 計算量 | 改善方法 | 改善後 |
|----------|--------|----------|--------|
| `indexOf`で検索 | O(n) | `Map`に変換して検索 | **O(1)** |
| 二重ループで重複チェック | O(n²) | `Set`を使う | **O(n)** |
| 毎回ソートして最小値取得 | O(n log n) | 最小値を変数で管理 | **O(1)** |
| 線形探索 | O(n) | ソート済み配列 + 二分探索 | **O(log n)** |

### 改善例: indexOf → Map

```typescript
// Before: O(n²) - ループ内でindexOf
function hasDuplicate_slow(arr: number[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i]) !== i) return true;  // O(n) × n回 = O(n²)
  }
  return false;
}

// After: O(n) - Setを使用
function hasDuplicate_fast(arr: number[]): boolean {
  const seen = new Set<number>();
  for (const num of arr) {          // O(n)
    if (seen.has(num)) return true; // O(1)
    seen.add(num);                  // O(1)
  }
  return false;
}
```

---

## クイックリファレンス（暗記用）

```
O(1)      : arr[i], Map.get(), Set.has(), push(), pop()
O(log n)  : Binary Search
O(n)      : indexOf, includes, find, filter, map, reduce, shift, unshift
O(n log n): sort()
O(n²)     : 二重ループ、ループ内indexOf（危険！）
```
