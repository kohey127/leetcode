# LeetCode 678. Valid Parenthesis String

https://leetcode.com/problems/valid-parenthesis-string/

## 1. PROBLEM UNDERSTANDING

- **What**: Check if a string with `(`, `)`, and `*` is valid. `*` can be `(`, `)`, or empty.
- **Input**: A string `s` with only `(`, `)`, `*`
- **Output**: `true` if the string is valid, `false` otherwise
- **Constraints**:
  - 1 <= s.length <= 100
  - s[i] is `(`, `)`, or `*`
- **Key insight**: We don't know what each `*` will become. But we can track the **range** of possible open parentheses count (low to high). If 0 is always in that range, it's valid.

## 2. APPROACH (面接で話す流れ)

"The tricky part is that `*` can be three things. Instead of trying all combinations, I'll track the **range** of possible open parenthesis counts."

"I use two variables: `low` and `high`. `low` is the minimum possible open count, `high` is the maximum."

"For `(`, both go up by 1. For `)`, both go down by 1. For `*`, `low` goes down (treat as `)`) and `high` goes up (treat as `(`)."

"If `high` drops below 0, we have too many `)` — return false. If `low` drops below 0, we just reset it to 0, because we'd never choose to go negative."

"At the end, if `low` is 0, it means there's a valid way to match everything."

## 3. SOLUTION

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

## 4. COMPLEXITY (必ず聞かれる)

**Time: O(n)**
- "We scan the string once, doing O(1) work per character."

**Space: O(1)**
- "We only use two variables: low and high."

## 5. KEY PHRASES (面接で使える英語)

**Clarifying questions:**
- "Can the string be empty?" (Yes, and it's valid)
- "Is the string only `(`, `)`, and `*`?" (Yes)
- "Can `*` be treated as an empty string — meaning we just ignore it?" (Yes)

**Explaining approach:**
- "I'll track the range of possible open parenthesis counts"
- "low is the best case — we close as many as we can. high is the worst case — we open as many as we can"
- "If high goes below zero, there's no way to fix it, so we return false"
- "If low goes below zero, we reset it to zero because we'd never choose a negative count"

**Explaining complexity:**
- "Time is O(n) — one pass through the string"
- "Space is O(1) — just two integer variables"

## 6. VISUAL WALKTHROUGH

**Example: `(*))`**

```
Character by character:

    char    low    high    note
    ──────────────────────────────────
start  -     0      0
  '('        1      1     both go up
  '*'        0      2     low-- (as ')'), high++ (as '(')
  ')'       -1      1     both go down → low < 0, reset to 0
  ')'        0*     0     both go down

                          * low was reset from -1 to 0

low == 0 → return true ✓
```

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

**Example: `(*))` — how does it actually match?**

```
(  *  )  )
│  │  │  │
│  │  │  └── matches with '*' (treat * as '(')
│  │  └───── matches with '('
│  └──────── treated as '('
└─────────── '('

Result: ( ( ) )  ← valid!
```

**Example that fails: `)(`**

```
    char    low    high
    ────────────────────
start  -     0      0
  ')'       -1     -1    high < 0 → return false ✗
```

Even `*` can't save us if high goes negative.

## 7. EDGE CASES

- Empty-like: `"***"` → all become empty → true
- All open: `"((("` → low=3, high=3, low != 0 → false
- All close: `")))"` → high goes negative on first char → false
- Single star: `"*"` → low=0, high=1, low=0 → true
- Star saves: `"(*)"` → true (star becomes empty)
- Star can't save: `")("` → high < 0 at first char → false

## 8. TEST CASES

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

## 9. WHY "RANGE" WORKS

The key idea is: **we don't need to know what each `*` becomes — we just need to know if a valid assignment exists.**

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

## 10. ALTERNATIVE: TWO-PASS APPROACH

Another way to think about this:

```typescript
function checkValidString(s: string): boolean {
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

## 11. COMMON INTERVIEW QUESTIONS

**Q: Why not just count `(` and `)` and see if they match?**
A: Order matters. `)(` has equal counts but is invalid. We need to check left-to-right.

**Q: Why reset low to 0?**
A: `low` represents the minimum possible open count. Open count can never be negative in a real string — you can't have more `)` than `(` so far. So if `low` goes negative, it means "in the best case, we'd choose `*` as `(` to avoid going negative." We clamp it to 0.

**Q: Why does high < 0 mean invalid?**
A: `high` is the maximum possible open count — even if every `*` becomes `(`. If even the maximum goes negative, there's no way to avoid having unmatched `)`. No assignment of `*` can fix it.

**Q: Is this greedy?**
A: Yes. We greedily track the range instead of trying all possibilities. The range always stays correct because `low` and `high` move in predictable ways.

## 12. RELATED PROBLEMS

- LeetCode 20. Valid Parentheses (basic version, no `*`)
- LeetCode 32. Longest Valid Parentheses
- LeetCode 921. Minimum Add to Make Parentheses Valid
- LeetCode 1249. Minimum Remove to Make Valid Parentheses

## 13. HOW TO READ CODE ALOUD (口頭での読み方)

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
