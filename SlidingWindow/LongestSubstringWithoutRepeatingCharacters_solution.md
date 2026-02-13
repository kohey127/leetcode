# LeetCode 3. Longest Substring Without Repeating Characters

https://leetcode.com/problems/longest-substring-without-repeating-characters/

## 1. PROBLEM UNDERSTANDING

- **What**: Find the length of the longest substring (consecutive characters) with no duplicate characters
- **Input**: A string `s`
- **Output**: The length of the longest substring without repeating characters
- **Constraints**:
  - 0 <= s.length <= 5 * 10^4
  - s consists of English letters, digits, symbols, and spaces
- **Key Insight**: Use a sliding window that expands to the right. When a duplicate is found, shrink the window from the left until there are no duplicates. Use a Set to track characters in the current window.

## 2. APPROACH (Interview Flow)

"First, let me clarify — we need a substring, not a subsequence. A substring must be consecutive characters.

A brute force approach would check every possible substring and verify if it has all unique characters — that's O(n³). We can optimize to O(n²) by using a Set for each starting position.

But the optimal approach is a sliding window with a Set. I maintain a window [left, right]. I expand right one step at a time. If the new character is already in the window, I shrink from the left by removing characters until there's no duplicate. The Set tracks what's currently in the window. At each step, I update the maximum length."

## 3. SOLUTION

```typescript
function lengthOfLongestSubstring(s: string): number {
  const seen = new Set<string>();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    // If duplicate found, shrink window from left
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }

    seen.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

### Alternative: Using a Map for O(n) without inner while loop

```typescript
function lengthOfLongestSubstringMap(s: string): number {
  const lastIndex = new Map<string, number>();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    if (lastIndex.has(s[right]) && lastIndex.get(s[right])! >= left) {
      // Jump left directly past the previous occurrence
      left = lastIndex.get(s[right])! + 1;
    }

    lastIndex.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

## 4. COMPLEXITY (Always Asked!)

### Set Approach

**Time: O(n)**
- "Each character is added to the Set once and removed at most once. So both pointers together traverse the string at most 2n times — still O(n)."

**Space: O(min(n, m))** where m is the size of the character set
- "The Set stores at most min(n, 128) characters for ASCII, or min(n, 26) for lowercase letters only."

### Map Approach

**Time: O(n)**
- "Single pass. No inner while loop — we jump left directly."

**Space: O(min(n, m))**
- "Same as Set approach."

## 5. KEY PHRASES (Interview English)

**Clarifying Questions:**
- "Just to confirm, we need a substring, not a subsequence — meaning the characters must be consecutive?"
- "What characters can the string contain? Just lowercase letters, or any ASCII?"
- "What should I return for an empty string?" (return 0)

**Explaining Approach:**
- "I'll use a sliding window with a Set to track the characters in the current window."
- "I expand the window to the right one character at a time."
- "When I find a duplicate, I shrink the window from the left until the duplicate is removed."
- "At each step, I update the maximum window size."

**Explaining Complexity:**
- "Time is O of n because each character enters and leaves the Set at most once."
- "Space is O of min n m, where m is the character set size."

## 6. VISUAL WALKTHROUGH

### Input: `s = "abcabcbb"`

```
窓の動き:

Step 1: right=0  'a'
        [a] b c a b c b b
         L
         R
        Set: {a}       maxLen = 1

Step 2: right=1  'b'
        [a b] c a b c b b
         L R
        Set: {a,b}     maxLen = 2

Step 3: right=2  'c'
        [a b c] a b c b b
         L   R
        Set: {a,b,c}   maxLen = 3

Step 4: right=3  'a'  ← 重複！ 'a' はSetにある
        Setから 'a' を消して left++ →
         a [b c a] b c b b
            L   R
        Set: {b,c,a}   maxLen = 3

Step 5: right=4  'b'  ← 重複！ 'b' はSetにある
        Setから 'b' を消して left++ →
         a  b [c a b] c b b
               L   R
        Set: {c,a,b}   maxLen = 3

Step 6: right=5  'c'  ← 重複！ 'c' はSetにある
        Setから 'c' を消して left++ →
         a  b  c [a b c] b b
                  L   R
        Set: {a,b,c}   maxLen = 3

Step 7: right=6  'b'  ← 重複！ 'b' はSetにある
        Setから 'a' を消して left++ → まだ 'b' ある
        Setから 'b' を消して left++ →
         a  b  c  a  b [c b] b
                        L  R
        Set: {c,b}     maxLen = 3

Step 8: right=7  'b'  ← 重複！
        Setから 'c' を消して left++ →
        Setから 'b' を消して left++ →
         a  b  c  a  b  c  b [b]
                               LR
        Set: {b}       maxLen = 3

答え: 3 ("abc")
```

### Input: `s = "bbbbb"`

```
Step 1: [b] → Set: {b}              maxLen = 1
Step 2: 'b' 重複 → left++, [b] →    maxLen = 1
Step 3: 'b' 重複 → left++, [b] →    maxLen = 1
Step 4: 'b' 重複 → left++, [b] →    maxLen = 1
Step 5: 'b' 重複 → left++, [b] →    maxLen = 1

答え: 1
```

## 7. EDGE CASES

- Empty string: `""` → 0
- Single character: `"a"` → 1
- All same characters: `"aaaa"` → 1
- All unique characters: `"abcd"` → 4
- Spaces: `" "` → 1
- Duplicate at end: `"abca"` → 3
- String with digits and symbols: `"a1!a"` → 3

## 8. TEST CASES

```typescript
console.log(lengthOfLongestSubstring("abcabcbb") === 3,  "Test 1: abc");
console.log(lengthOfLongestSubstring("bbbbb") === 1,     "Test 2: all same");
console.log(lengthOfLongestSubstring("pwwkew") === 3,    "Test 3: wke");
console.log(lengthOfLongestSubstring("") === 0,           "Test 4: empty");
console.log(lengthOfLongestSubstring("a") === 1,          "Test 5: single char");
console.log(lengthOfLongestSubstring("abcd") === 4,       "Test 6: all unique");
console.log(lengthOfLongestSubstring(" ") === 1,          "Test 7: space");
console.log(lengthOfLongestSubstring("dvdf") === 3,       "Test 8: vdf");
console.log(lengthOfLongestSubstring("abba") === 2,       "Test 9: ab or ba");
```

## 9. VARIATIONS

### A. Set vs Map — 窓の縮め方の違い

**Set approach**: 重複が消えるまで left を1つずつ進める（while ループ）

```typescript
while (seen.has(s[right])) {
  seen.delete(s[left]);
  left++;
}
```

**Map approach**: 前回出現した位置を記録して、left を一気にジャンプ

```typescript
if (lastIndex.has(s[right]) && lastIndex.get(s[right])! >= left) {
  left = lastIndex.get(s[right])! + 1;
}
```

Map の方が定数倍速いが、面接ではどちらでもOK。

### B. Return the actual substring (not just length)

```typescript
function longestSubstring(s: string): string {
  const seen = new Set<string>();
  let left = 0;
  let start = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    if (right - left + 1 > maxLen) {
      maxLen = right - left + 1;
      start = left;
    }
  }

  return s.slice(start, start + maxLen);
}
```

## 10. WHEN TO USE WHICH

**Q: When should I think "sliding window with Set/Map"?**
A: When the problem asks for a longest/shortest subarray or substring with a constraint on unique elements or character frequency.

**Q: How is this different from the stock problem's sliding window?**
A: In the stock problem, the window only shrinks by jumping left to right. Here, we may need to shrink one step at a time (Set) or jump (Map). The stock problem tracks a single value (min price), while this problem tracks a set of characters.

**Q: Set vs Map — when to use which?**
A: Use Set when you only care about "is this character in the window?" Use Map when you need to know "where was this character last seen?" — the Map lets you skip the inner while loop.

## 11. COMMON INTERVIEW QUESTIONS

**Q: Why does each character enter and leave the Set at most once?**
A: "The left pointer only moves right, never left. Each character is added when right reaches it and removed when left passes it. So each character has at most one add and one delete — total 2n operations."

**Q: Can you solve this without a Set?**
A: "Yes, I could use an array of size 128 (for ASCII) as a frequency map. The logic is the same, but array access is faster than Set operations."

**Q: What if we need the longest substring with at most K distinct characters?**
A: "Similar sliding window, but instead of a Set, I'd use a Map to count character frequencies. I shrink the window when the Map size exceeds K. That's LeetCode 340."

## 12. RELATED PROBLEMS

- LeetCode 340: Longest Substring with At Most K Distinct Characters (Medium)
- LeetCode 76: Minimum Window Substring (Hard)
- LeetCode 438: Find All Anagrams in a String (Medium)
- LeetCode 567: Permutation in String (Medium)
- LeetCode 209: Minimum Size Subarray Sum (Medium)
- LeetCode 424: Longest Repeating Character Replacement (Medium)

## 13. HOW TO READ CODE ALOUD

**Code Symbols:**
- `new Set<string>()` → "a new Set of strings"
- `seen.has(s[right])` → "seen has the character at right"
- `seen.delete(s[left])` → "delete the character at left from seen"
- `right - left + 1` → "right minus left plus one" (window size)

**Complexity:**
- O(n) → "O of n" or "linear time"
- O(min(n, m)) → "O of min n m"

**Example Explanation Script:**
"Let me trace through 'abcabcbb'.
I start with an empty Set and both pointers at 0.
I add 'a', 'b', 'c' — no duplicates, window grows to size 3.
At index 3, I see 'a' again — it's already in the Set.
So I remove characters from the left: remove 'a', move left to 1.
Now the window is 'bca', still size 3.
I continue this process. The maximum window size I see is 3.
So the answer is 3."
