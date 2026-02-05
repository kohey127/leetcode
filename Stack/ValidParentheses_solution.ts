// ============================================
// LeetCode 20. Valid Parentheses
// https://leetcode.com/problems/valid-parentheses/
// ============================================

// ============================================
// 1. PROBLEM UNDERSTANDING
// ============================================
// What: Check if a string of brackets is properly matched and nested
// Input: String containing only '(', ')', '{', '}', '[', ']'
// Output: boolean - true if valid, false otherwise
//
// Constraints:
// - 1 <= s.length <= 10^4
// - Only contains '()[]{}'
//
// Key Insight:
// - When we see a closing bracket, the most recent unmatched opening bracket
//   must be of the same type -> LIFO pattern -> Stack!
// - "Most recent" is the key word that suggests using a stack

// ============================================
// 2. APPROACH (Interview Flow)
// ============================================
// "Let me think about this problem step by step.
//
// When I encounter a closing bracket, I need to check if it matches
// the most recently opened bracket. This 'most recent' pattern
// suggests using a stack - Last In, First Out.
//
// My approach:
// 1. Iterate through each character in the string
// 2. If it's an opening bracket, push it onto the stack
// 3. If it's a closing bracket:
//    - If the stack is empty, return false (no matching open bracket)
//    - Pop from stack and check if it matches
//    - If doesn't match, return false
// 4. After processing all characters, the stack should be empty
//
// For efficient matching, I'll use a hash map to map closing brackets
// to their corresponding opening brackets."

// ============================================
// 3. SOLUTION
// ============================================
function isValid(s: string): boolean {
  const stack: string[] = [];

  // Map closing bracket to its matching opening bracket
  const pairs: Record<string, string> = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (const char of s) {
    if (char in pairs) {
      // It's a closing bracket
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    } else {
      // It's an opening bracket
      stack.push(char);
    }
  }

  // Stack should be empty if all brackets matched
  return stack.length === 0;
}

// ============================================
// 4. COMPLEXITY (Always Asked!)
// ============================================
//
// ■ Time: O(n)
// ─────────────────────────────────────────────
// Processing "([{}])":
//
//   ( → push         ← 1 operation
//   [ → push         ← 1 operation
//   { → push         ← 1 operation
//   } → pop + check  ← 1 operation
//   ] → pop + check  ← 1 operation
//   ) → pop + check  ← 1 operation
//   ─────────────────
//   Total: 6 = n characters
//
// → We visit each character exactly once → O(n)
// → push/pop are O(1) since they operate on the end of the array
//
// ■ Space: O(n) - Worst Case
// ─────────────────────────────────────────────
// Worst case: "(((((((" ← all opening brackets
//
//   ( → stack: ["("]
//   ( → stack: ["(", "("]
//   ( → stack: ["(", "(", "("]
//   ( → stack: ["(", "(", "(", "("]
//   ( → stack: ["(", "(", "(", "(", "("]
//   ( → stack: ["(", "(", "(", "(", "(", "("]
//   ( → stack: ["(", "(", "(", "(", "(", "(", "("]
//   ───────────────────────────────────────────
//   Stack has 7 items = n characters
//
// → No closing brackets means nothing gets popped
// → Everything stays in the stack → O(n)
//
// ■ Space: O(1) - Best Case (for reference)
// ─────────────────────────────────────────────
// Best case: "()()()()" ← open and close immediately
//
//   ( → stack: ["("]
//   ) → stack: []      ← popped right away
//   ( → stack: ["("]
//   ) → stack: []      ← popped right away
//   ...
//   ───────────────────────────────────────────
//   Stack always has at most 1 item → O(1)
//
// → But we always consider the worst case, so Space: O(n)

// ============================================
// 5. KEY PHRASES (Interview English)
// ============================================
// Clarifying Questions:
// - "Can the string be empty? Or is it guaranteed to have at least one character?"
// - "Does the string contain only bracket characters, no other characters?"
// - "Just to confirm, we need to check both matching type AND correct nesting order?"
//
// Explaining Approach:
// - "The key insight is that when we see a closing bracket, we need to match it
//    with the MOST RECENT unmatched opening bracket."
// - "This 'most recent' pattern is a classic use case for a stack - LIFO."
// - "I'll use a hash map for O(1) bracket matching lookup."
//
// Explaining Complexity:
// - "Time is O(n) since we make a single pass through the string,
//    and stack operations are constant time."
// - "Space is O(n) in the worst case when the string is all opening brackets,
//    like '(((((' - we'd push all of them onto the stack."

// ============================================
// 6. VISUAL WALKTHROUGH
// ============================================
// Example: "{[()]}"
//
// Step | char | Stack (bottom→top) | Action
// -----|------|-------------------|--------
//   1  |  {   | ['{']             | Push '{'
//   2  |  [   | ['{', '[']        | Push '['
//   3  |  (   | ['{', '[', '(']   | Push '('
//   4  |  )   | ['{', '[']        | ')' matches '(' ✓ Pop
//   5  |  ]   | ['{']             | ']' matches '[' ✓ Pop
//   6  |  }   | []                | '}' matches '{' ✓ Pop
//
// Stack is empty → return true ✓
//
// -------------------------------------------
// Example: "([)]"
//
// Step | char | Stack (bottom→top) | Action
// -----|------|-------------------|--------
//   1  |  (   | ['(']             | Push '('
//   2  |  [   | ['(', '[']        | Push '['
//   3  |  )   | -                 | ')' should match '[' ✗
//
// Mismatch! return false ✗

// ============================================
// 7. EDGE CASES
// ============================================
// - Single character: "(" → false (unmatched)
// - Closing first: ")(" → false (stack empty when seeing ')')
// - Only opening: "(((" → false (stack not empty at end)
// - Empty result after all matches: "()" → true
// - Nested same type: "(())" → true
// - Interleaved different types: "([{}])" → true
// - Wrong nesting: "([)]" → false

// ============================================
// 8. TEST CASES
// ============================================
console.log("=== Valid Parentheses Tests ===");
console.log(isValid("()") === true, 'Test 1: "()" → true');
console.log(isValid("()[]{}") === true, 'Test 2: "()[]{}" → true');
console.log(isValid("(]") === false, 'Test 3: "(]" → false');
console.log(isValid("([])") === true, 'Test 4: "([])" → true');
console.log(isValid("{[()]}") === true, 'Test 5: "{[()]}" → true');
console.log(isValid("([)]") === false, 'Test 6: "([)]" → false');
console.log(isValid("(") === false, 'Test 7: "(" → false');
console.log(isValid(")") === false, 'Test 8: ")" → false');
console.log(isValid("((()))") === true, 'Test 9: "((()))" → true');

// ============================================
// 9. VARIATIONS
// ============================================
// A. Generate Parentheses (LeetCode 22)
//    - Generate all valid combinations of n pairs
//
// B. Longest Valid Parentheses (LeetCode 32)
//    - Find length of longest valid substring
//
// C. Remove Invalid Parentheses (LeetCode 301)
//    - Remove minimum number of invalid brackets
//
// D. Minimum Add to Make Parentheses Valid (LeetCode 921)
//    - Count minimum insertions needed

// ============================================
// 10. WHEN TO USE STACK
// ============================================
// Q: When should I think about using a Stack?
// A: Look for these patterns:
//    1. "Most recent" or "last opened" - matching/pairing problems
//    2. Nested structures - parentheses, HTML tags, function calls
//    3. Undo/back operations - browser history, text editor
//    4. Monotonic patterns - next greater element, daily temperatures
//    5. Expression evaluation - calculators, parsers
//
// Q: Stack vs Queue - when to use which?
// A: Stack (LIFO): Need to process most recent first
//    Queue (FIFO): Need to process in order received

// ============================================
// 11. COMMON INTERVIEW QUESTIONS
// ============================================
// Q: Why use a stack instead of just counting?
// A: "Counting only works for single bracket type like '()'.
//     With multiple types, we need to track the ORDER and TYPE
//     of opening brackets. Stack preserves this information.
//     Example: '([)]' has equal counts but is invalid due to wrong nesting."
//
// Q: Can you solve this without extra space?
// A: "Not really. We need O(n) space in worst case to track
//     unmatched opening brackets. The stack is necessary to know
//     which bracket was opened most recently."
//
// Q: What if we also had to return the position of mismatch?
// A: "I'd store the index along with the bracket in the stack,
//     like stack.push({char: '(', index: 0}), and return the
//     index when we find a mismatch."

// ============================================
// 12. RELATED PROBLEMS
// ============================================
// - LeetCode 22: Generate Parentheses (Medium)
// - LeetCode 32: Longest Valid Parentheses (Hard)
// - LeetCode 301: Remove Invalid Parentheses (Hard)
// - LeetCode 921: Minimum Add to Make Parentheses Valid (Medium)
// - LeetCode 1249: Minimum Remove to Make Valid Parentheses (Medium)
// - LeetCode 1541: Minimum Insertions to Balance a Parentheses String (Medium)

// ============================================
// 13. HOW TO READ CODE ALOUD
// ============================================
// Code Symbols:
// - {} → "curly braces" or "curly brackets"
// - [] → "square brackets"
// - () → "parentheses" (plural) or "parens" (casual)
// - stack.push() → "stack dot push"
// - stack.pop() → "stack dot pop"
// - stack.length === 0 → "stack dot length equals zero" or "stack is empty"
// - char in pairs → "char in pairs" (checking if key exists)
//
// Complexity:
// - O(n) → "O of n" or "linear time"
// - O(1) → "O of one" or "constant time"
//
// Example Explanation Script:
// "Let's walk through the string '([])'.
//  First, I see open paren, so I push it onto the stack.
//  Stack is now: open paren.
//  Next, open bracket, push it. Stack: open paren, open bracket.
//  Now close bracket. I pop from stack and get open bracket.
//  Close bracket matches open bracket, so continue.
//  Stack: open paren.
//  Finally, close paren. Pop gives open paren.
//  They match, and stack is empty, so return true."
