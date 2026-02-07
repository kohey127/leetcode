# LeetCode 125. Valid Palindrome

https://leetcode.com/problems/valid-palindrome/

## 1. PROBLEM UNDERSTANDING

- **What**: Determine if a string is a palindrome, considering only alphanumeric characters and ignoring case
- **Input**: A string `s` (may contain letters, digits, spaces, punctuation)
- **Output**: `true` if it's a palindrome, `false` otherwise
- **Constraints**:
  - 1 <= s.length <= 2 * 10^5
  - s consists only of printable ASCII characters
- **Key Insight**: Use two pointers from both ends, skip non-alphanumeric characters, and compare lowercase versions. No need to create a cleaned string first.

## 2. APPROACH (Interview Flow)

"First, I want to clarify what counts as a palindrome here — we ignore non-alphanumeric characters and treat uppercase and lowercase as the same.

A brute force approach would be to first clean the string — remove all non-alphanumeric characters, convert to lowercase — then check if it equals its reverse. That works, but it uses O(n) extra space for the cleaned string.

Instead, I'll use the two-pointer technique. I'll place one pointer at the start and one at the end. I'll move each pointer inward, skipping any non-alphanumeric characters. At each step, I compare the two characters in lowercase. If they ever don't match, it's not a palindrome. If the pointers meet or cross, it is."

## 3. SOLUTION

```typescript
function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Skip non-alphanumeric from left
    while (left < right && !isAlphanumeric(s[left])) {
      left++;
    }
    // Skip non-alphanumeric from right
    while (left < right && !isAlphanumeric(s[right])) {
      right--;
    }

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

function isAlphanumeric(c: string): boolean {
  return /[a-zA-Z0-9]/.test(c);
}
```

### Why not use the brute force approach?

```typescript
// Brute force — works but uses O(n) extra space
function isPalindromeBruteForce(s: string): boolean {
  const cleaned = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  return cleaned === cleaned.split("").reverse().join("");
}
```

This creates a new cleaned string, a reversed copy, and joins it back. That's 3 extra strings = O(n) space. The two-pointer approach does it in O(1) space.

## 4. COMPLEXITY (Always Asked!)

### Two-Pointer Approach

**Time: O(n)**
- "Each pointer traverses the string at most once, so it's linear."

**Space: O(1)**
- "We only use two pointer variables. No extra strings or arrays."

### Brute Force Approach

**Time: O(n)**
- "Cleaning, reversing, and comparing are all O(n)."

**Space: O(n)**
- "We create a cleaned string and a reversed copy."

## 5. KEY PHRASES (Interview English)

**Clarifying Questions:**
- "When you say palindrome, should I ignore non-alphanumeric characters like spaces and punctuation?"
- "Should the comparison be case-insensitive?"
- "Is an empty string considered a palindrome?"

**Explaining Approach:**
- "I'll use two pointers, one from the start and one from the end."
- "I'll skip over any characters that aren't letters or digits."
- "At each step, I compare the characters in lowercase."

**Explaining Complexity:**
- "Time is O(n) because each pointer moves through the string at most once."
- "Space is O(1) because I'm comparing in place without creating a new string."

**Common Mistakes to Mention:**
- "I need to make sure I skip non-alphanumeric characters from both sides."
- "I have to check `left < right` inside the inner while loops too, to avoid the pointers crossing."
- "I should compare in lowercase, not modify the original string."

## 6. VISUAL WALKTHROUGH

### Input: `"A man, a plan, a canal: Panama"`

```
Pointer positions (skipping non-alphanumeric):

Step 1: left=0('A') vs right=29('a')  → 'a' == 'a' ✓
Step 2: left=2('m') vs right=27('m')  → 'm' == 'm' ✓
Step 3: left=3('a') vs right=26('a')  → 'a' == 'a' ✓
Step 4: left=4('n') vs right=24('n')  → 'n' == 'n' ✓
...continues matching...
Pointers meet in the middle → return true
```

### Input: `"race a car"`

```
Step 1: left=0('r') vs right=9('r')  → 'r' == 'r' ✓
Step 2: left=1('a') vs right=8('a')  → 'a' == 'a' ✓
Step 3: left=2('c') vs right=7('c')  → 'c' == 'c' ✓
Step 4: left=3('e') vs right=5('a')  → 'e' != 'a' ✗ → return false
```

### Input: `" "` (space only)

```
left=0, right=0
left skips space → left=1
left(1) < right(0) is false → while loop doesn't run
return true (empty after skipping = palindrome)
```

## 7. EDGE CASES

- Empty after cleaning: `" "` → true (empty string is a palindrome)
- Single character: `"a"` → true
- Only non-alphanumeric: `".,!"` → true
- Digits included: `"0P"` → false (`'0'` != `'p'`)
- Mixed digits and letters: `"a1b1a"` → true
- All same characters: `"aaaa"` → true
- Two characters match: `"ab"` → false
- Case difference: `"Aa"` → true

## 8. TEST CASES

```typescript
console.log(isPalindrome("A man, a plan, a canal: Panama") === true,  "Test 1: classic palindrome");
console.log(isPalindrome("race a car") === false,                     "Test 2: not a palindrome");
console.log(isPalindrome(" ") === true,                               "Test 3: space only");
console.log(isPalindrome("a") === true,                               "Test 4: single char");
console.log(isPalindrome(".,!") === true,                             "Test 5: only symbols");
console.log(isPalindrome("0P") === false,                             "Test 6: digit vs letter");
console.log(isPalindrome("Aa") === true,                              "Test 7: case insensitive");
console.log(isPalindrome("a1b1a") === true,                           "Test 8: mixed digits and letters");
console.log(isPalindrome("ab") === false,                             "Test 9: two different chars");
```

## 9. VARIATIONS

### A. Without Helper Function (charCodeAt)

Instead of regex, use character codes for better performance:

```typescript
function isPalindromeCharCode(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    while (left < right && !isAlnum(s.charCodeAt(left))) left++;
    while (left < right && !isAlnum(s.charCodeAt(right))) right--;

    if (toLower(s.charCodeAt(left)) !== toLower(s.charCodeAt(right))) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

function isAlnum(code: number): boolean {
  return (code >= 48 && code <= 57) ||  // 0-9
         (code >= 65 && code <= 90) ||  // A-Z
         (code >= 97 && code <= 122);   // a-z
}

function toLower(code: number): number {
  // A-Z (65-90) → a-z (97-122) by adding 32
  return (code >= 65 && code <= 90) ? code + 32 : code;
}
```

Why? Regex creates a RegExp object per call. charCodeAt is a direct number comparison — faster in tight loops.

### B. Recursive Approach

```typescript
function isPalindromeRecursive(s: string, left = 0, right = s.length - 1): boolean {
  while (left < right && !/[a-zA-Z0-9]/.test(s[left])) left++;
  while (left < right && !/[a-zA-Z0-9]/.test(s[right])) right--;

  if (left >= right) return true;
  if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
  return isPalindromeRecursive(s, left + 1, right - 1);
}
```

Time O(n), Space O(n) due to call stack. Not recommended — just for understanding recursion.

## 10. WHEN TO USE WHICH

**Q: When should I use the two-pointer technique?**
A: When the problem involves comparing elements from both ends of a linear structure (array, string). Classic signals: "palindrome", "two sum in sorted array", "container with most water".

**Q: Brute force (clean + reverse) vs two-pointer?**
A: Both are O(n) time. Two-pointer is O(1) space vs O(n) space. In interviews, mention the brute force first as a baseline, then optimize with two pointers.

**Q: Regex vs charCodeAt for checking alphanumeric?**
A: Regex is more readable. charCodeAt is faster. In interviews, regex is fine — mention charCodeAt as an optimization if asked about performance.

## 11. COMMON INTERVIEW QUESTIONS

**Q: Why two pointers instead of cleaning the string first?**
A: "Cleaning the string requires O(n) extra space. Two pointers work in-place with O(1) space. The time complexity is the same."

**Q: What if we need to consider Unicode characters?**
A: "The current solution works for ASCII. For Unicode, I'd need a more robust alphanumeric check, possibly using a library or Unicode-aware regex like `/\p{L}|\p{N}/u`."

**Q: Can you solve this without any built-in string methods?**
A: "Yes, I'd use charCodeAt to compare character codes directly — checking ranges for 0-9, A-Z, a-z manually."

**Q: What's the difference between this and LeetCode 680 (Valid Palindrome II)?**
A: "In 680, you're allowed to remove at most one character. So when a mismatch is found, you try skipping left or right and check if either remaining substring is a palindrome."

## 12. RELATED PROBLEMS

- LeetCode 680: Valid Palindrome II (Easy) — Can remove at most one character
- LeetCode 234: Palindrome Linked List (Easy) — Two pointers on linked list
- LeetCode 9: Palindrome Number (Easy) — Check if integer is a palindrome
- LeetCode 5: Longest Palindromic Substring (Medium) — Find longest palindrome in string
- LeetCode 647: Palindromic Substrings (Medium) — Count all palindromic substrings

## 13. HOW TO READ CODE ALOUD

**Code Symbols:**
- `s[left]` → "s at left" or "the character at index left"
- `s.length - 1` → "s dot length minus one"
- `s[left].toLowerCase()` → "s at left, converted to lowercase"
- `/[a-zA-Z0-9]/` → "a regex matching alphanumeric characters"
- `!isAlphanumeric(s[left])` → "if the character at left is not alphanumeric"

**Complexity:**
- O(n) → "O of n" or "linear time"
- O(1) → "O of one" or "constant space"

**Example Explanation Script:**
"Let me walk through the example with 'A man, a plan, a canal: Panama'.
I start with left at index 0, which is 'A', and right at the last index, which is 'a'.
Comparing lowercase, both are 'a' — they match.
I move left forward to 'm' and right backward, skipping the space, to 'm'.
They match again.
I keep going inward, skipping spaces and punctuation each time.
Eventually the pointers meet in the middle, and every pair matched — so it's a palindrome."
