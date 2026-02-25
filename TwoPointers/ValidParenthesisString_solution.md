# LeetCode 678. Valid Parenthesis String (Medium)

https://leetcode.com/problems/valid-parenthesis-string/

## U - Understand（問題の理解）

- **What**: Check if a string with `(`, `)`, and `*` is valid. `*` can be `(`, `)`, or empty.
- **Input**: A string `s` with only `(`, `)`, `*`
- **Output**: `true` if the string can be valid, `false` otherwise

**Clarifying Questions:**
- "Can the string be empty?" (Yes, and it's valid)
- "Is the string only `(`, `)`, and `*`?" (Yes)
- "Can `*` be treated as empty — meaning we just ignore it?" (Yes)

**Constraints:**
- 1 <= s.length <= 100
- s[i] is `(`, `)`, or `*`

**Test Cases:**

1. **Happy Path**: `"()"` → `true` (basic valid parentheses)
2. **Happy Path**: `"(*)"` → `true` (star becomes empty)
3. **Happy Path**: `"(*))"` → `true` (star becomes `(`)
4. **Edge Case**: `")("` → `false` (order matters, can't fix)
5. **Edge Case**: `"***"` → `true` (all become empty)
6. **Edge Case**: `"*"` → `true` (becomes empty)
7. **Constraint**: `"((("` → `false` (low=3 at end, not 0)

## M - Match（パターンマッチ）

**Pattern: Greedy with Range Tracking (low/high)**

"I think we can track the range of possible open parenthesis counts."

Why this pattern?
- We don't know what each `*` becomes.
- Brute force tries all combinations → O(3^n). Too slow.
- Instead, we track the minimum and maximum possible open count.
- If 0 is in the range at the end, a valid choice exists.

## P - Plan（プラン立て）

"Let me think about the steps."

"I use two variables: `low` and `high`. `low` is the minimum possible open count. `high` is the maximum."

"For `(`, both go up by 1. For `)`, both go down by 1. For `*`, `low` goes down (treat as `)`) and `high` goes up (treat as `(`)."

"If `high` goes below 0, too many `)` — return false. If `low` goes below 0, I reset it to 0. We'd never choose to go negative."

"At the end, if `low` is 0, it means we can match everything."

**Pseudocode:**
```
// set low = 0, high = 0
// for each character c:
//   if c == '(': low++, high++
//   if c == ')': low--, high--
//   if c == '*': low-- (as ')'), high++ (as '(')
//   if high < 0: return false (too many ')')
//   if low < 0: low = 0 (don't go negative)
// return low == 0
```

```mermaid
flowchart TD
    A[Start: low = 0, high = 0] --> B[For each char c]
    B --> C{c is?}
    C -->|'('| D[low++, high++]
    C -->|')'| E[low--, high--]
    C -->|'*'| F[low--, high++]
    D --> G{high < 0?}
    E --> G
    F --> G
    G -->|Yes| H[Return false]
    G -->|No| I{low < 0?}
    I -->|Yes| J[low = 0] --> B
    I -->|No| B
    B --> K{All done?}
    K -->|Yes| L{low == 0?}
    L -->|Yes| M[Return true]
    L -->|No| H
```

## I - Implement（実装）

```typescript
function checkValidString(s: string): boolean {
    let low = 0;  // min possible open parens
    let high = 0; // max possible open parens

    for (const c of s) {
        if (c === '(') {
            low++;
            high++;
        } else if (c === ')') {
            low--;
            high--;
        } else { // '*'
            low--;   // treat as ')'
            high++;  // treat as '('
        }

        if (high < 0) return false; // too many ')'
        if (low < 0) low = 0;      // don't go negative
    }

    return low === 0;
}
```

## R - Review（振り返り）

"Let me walk through Test Case 3: `(*))`."

| Step | char | low | high | Note |
|------|------|-----|------|------|
| start | - | 0 | 0 | |
| 1 | `(` | **1** | **1** | both go up |
| 2 | `*` | **0** | **2** | low-- (as `)`) , high++ (as `(`) |
| 3 | `)` | 0 | **1** | low was -1 → reset to 0 |
| 4 | `)` | 0 | **0** | both go down |

low == 0 → return **true** ✓

**What does the range mean?**

```
After "(*":
  low = 0, high = 2

This means open count could be 0, 1, or 2:
  "(*" → treat * as ')' → "()" → 0 open
  "(*" → treat * as ''  → "("  → 1 open
  "(*" → treat * as '(' → "((" → 2 open

Any value from low to high is reachable!
```

**How does `(*))`  actually match?**

```
(  *  )  )
│  │  │  │
│  │  │  └── matches with '*' (treat * as '(')
│  │  └───── matches with '('
│  └──────── treated as '('
└─────────── '('

Result: ( ( ) )  ← valid!
```

"Let me check an example that fails: `)(`."

| Step | char | low | high | Note |
|------|------|-----|------|------|
| start | - | 0 | 0 | |
| 1 | `)` | -1 | **-1** | high < 0 → return **false** |

Even `*` can't save us if high goes negative.

"Let me also check other edge cases."
- `"***"` → low goes to -3 (reset to 0 each time), high goes to 3, final low=0 → true ✓
- `"((("` → low=3, high=3, low != 0 → false ✓
- `"*"` → low=-1 reset to 0, high=1, low=0 → true ✓

```typescript
console.log("Test 1:", checkValidString("()"));
// Expected: true

console.log("Test 2:", checkValidString("(*)"));
// Expected: true

console.log("Test 3:", checkValidString("(*))"));
// Expected: true

console.log("Test 4:", checkValidString(")("));
// Expected: false

console.log("Test 5:", checkValidString("***"));
// Expected: true

console.log("Test 6:", checkValidString("((("));
// Expected: false

console.log("Test 7:", checkValidString("(*)("));
// Expected: false

console.log("Test 8:", checkValidString("*"));
// Expected: true
```

## E - Evaluate（評価）

**Time: O(n)**
- "I go through the string once. I do O(1) work per character."

**Space: O(1)**
- "I only use two variables: low and high."

**Why this approach?**
- Greedy range tracking solves it in one pass.
- Brute force tries all 3^n combinations — way too slow.
- "By tracking the range, I know if a valid choice exists without trying every possibility."

**Trade-off:**
| | Range Tracking | Two-Pass | Brute Force |
|---|---|---|---|
| Time | O(n) | O(n) | O(3^n) |
| Space | O(1) | O(1) | O(n) |
| Idea | Track low/high | Check each direction | Try all combos |

## REAL-WORLD ANALOGY (バスの乗降)

**バスが停留所を順番に回る。最後に乗客を0人にできるか？**

```
(  = 1人乗ってくる（確定）
)  = 1人降りる（確定）
*  = 乗るかもしれない、降りるかもしれない、誰も来ないかもしれない

min = 最少で何人乗ってるか
max = 最多で何人乗ってるか
```

**Example: `(*))`**

```
停留所1 '(' → 乗客: 1〜1人    1人乗ってきた
停留所2 '*' → 乗客: 0〜2人    乗るかも、降りるかも、来ないかも
停留所3 ')' → 乗客: 0〜1人    1人降りた
停留所4 ')' → 乗客: 0〜0人    1人降りた → 0人にできる! ✓
```

**ルールがそのまま対応する:**

| Algorithm | Bus |
|---|---|
| `max < 0` → return false | 最良でも乗客がマイナス = 誰も乗ってないのに降りろと言ってる。無理 |
| `min < 0` → reset to 0 | 乗客がマイナスはありえない。その選び方をしないだけ |
| `min === 0` at the end | 全員降ろせるパターンがある = valid |

## WHY "RANGE" WORKS (なぜ範囲追跡で解けるのか)

The key idea: **we don't need to know what each `*` becomes — we just need to know if a valid choice exists.**

```
Without range (brute force):
  "(**)" → try all 3^2 = 9 combinations of * → O(3^n)

With range:
  Track [low, high] → if 0 is in the range at the end → valid → O(n)
```

**Think of it like this:**

```
Imagine you have a counter starting at 0.
  '(' → counter goes up by 1
  ')' → counter goes down by 1
  '*' → counter could go up, down, or stay

After the full string, if counter CAN be 0 → valid.

low = the smallest the counter could be
high = the biggest the counter could be

If low <= 0 <= high → 0 is reachable → valid
(We keep low >= 0, so just check low == 0)
```

## ALTERNATIVE: TWO-PASS APPROACH

Another way to think about this:

```typescript
function checkValidStringTwoPass(s: string): boolean {
    // Left to right: check for too many ')'
    let open = 0;
    for (const c of s) {
        if (c === '(' || c === '*') open++;
        else open--;
        if (open < 0) return false;
    }

    // Right to left: check for too many '('
    let close = 0;
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === ')' || s[i] === '*') close++;
        else close--;
        if (close < 0) return false;
    }

    return true;
}
```

**Left to right**: Treat every `*` as `(`. If we still can't balance, too many `)`.
**Right to left**: Treat every `*` as `)`. If we still can't balance, too many `(`.

Both are O(n) time, O(1) space.

## COMMON INTERVIEW QUESTIONS

**Q: Why not just count `(` and `)` and see if they match?**
A: "Order matters. `)(` has equal counts but is not valid. I need to check left-to-right."

**Q: Why reset low to 0?**
A: "`low` is the minimum possible open count. Open count can never be negative — you can't have more `)` than `(` so far. If `low` goes negative, we'd choose `*` as `(` to avoid it. So I clamp it to 0."

**Q: Why does high < 0 mean invalid?**
A: "`high` is the maximum possible open count — even if every `*` becomes `(`. If even the max goes negative, no choice of `*` can fix it."

**Q: Is this greedy?**
A: "Yes. I greedily track the range instead of trying all choices. The range stays correct because `low` and `high` move in predictable ways."

## RELATED PROBLEMS

- LeetCode 20. Valid Parentheses (basic version, no `*`)
- LeetCode 32. Longest Valid Parentheses
- LeetCode 921. Minimum Add to Make Parentheses Valid
- LeetCode 1249. Minimum Remove to Make Valid Parentheses

## HOW TO READ CODE ALOUD

**Key variables:**
- `low` → "low" (minimum possible open count)
- `high` → "high" (maximum possible open count)

**Reading the loop:**
- `for (const c of s)` → "for each character c in the string s"
- `if (c === '(')` → "if c is an open paren"
- `low++` → "low plus plus" or "increment low"
- `if (high < 0) return false` → "if high is less than zero, return false"
- `if (low < 0) low = 0` → "if low goes below zero, reset it to zero"

**Explaining at the whiteboard:**
- "Let me walk through with the example `(*))`. I start with low equals zero and high equals zero."
- "First character is open paren. Both low and high go up to one."
- "Next is star. Low goes down to zero, high goes up to two."
- "Next is close paren. Low goes to negative one, high goes to one. Low is negative so I reset it to zero."
- "Last is close paren. Low goes to negative one, high goes to zero. Reset low to zero."
- "At the end, low is zero, so it's valid."
