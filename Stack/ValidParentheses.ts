// ============================================
// LeetCode 20. Valid Parentheses
// https://leetcode.com/problems/valid-parentheses/
// ============================================

// Given a string s containing just the characters
// '(', ')', '{', '}', '[' and ']',
// determine if the input string is valid.
//
// An input string is valid if:
// 1. Open brackets must be closed by the same type of brackets.
// 2. Open brackets must be closed in the correct order.
// 3. Every close bracket has a corresponding open bracket of the same type.
//
// Example 1: "()" -> true
// Example 2: "()[]{}" -> true
// Example 3: "(]" -> false
// Example 4: "([])" -> true
//
// Constraints:
// - 1 <= s.length <= 10^4
// - s consists of parentheses only '()[]{}'

function isValid(s: string): boolean {
    const stack: string[] = [];

    const pairs: Record<string, string> = {
        ')' : '(',
        '}' : '{',
        ']' : '['
    }

    for (const char of s) {
        if (char in pairs) {
            // Its a closing bracket
            if (stack.length === 0 || pairs[char] !== stack.pop()) {
                return false;
            }
        } else {
            // Its a opening bracket
            stack.push(char);
        }

    }
    return stack.length === 0;
}
