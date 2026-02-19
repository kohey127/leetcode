// ============================================
// LeetCode 678. Valid Parenthesis String
// https://leetcode.com/problems/valid-parenthesis-string/
// ============================================
//
// Given a string s containing only three types of characters:
//   '(', ')' and '*'
// return true if s is valid.
//
// The following rules define a valid string:
//   - Any '(' must have a matching ')'
//   - Any ')' must have a matching '('
//   - '(' must come before its matching ')'
//   - '*' can be treated as '(' or ')' or an empty string ""
//   - An empty string is also valid
//
// Example 1:
//   Input:  s = "()"
//   Output: true
//
// Example 2:
//   Input:  s = "(*)"
//   Output: true
//
// Example 3:
//   Input:  s = "(*))"
//   Output: true
//
// Constraints:
// - 1 <= s.length <= 100
// - s[i] is '(', ')' or '*'

function checkValidString(s: string): boolean {
    // The tricky point is * has three types. So trace range of "(" possibility.
    let min = 0; // min possible open parens
    let max = 0; // max possible open parens

    // example: ))(
    // example: (*)
    // example: *)

    for (let char of s) {
        if (char === '(') {
            min++;
            max++;
        } else if (char === ')') {
            min--;
            max--;
        } else {
            // * case
            min--; // treat as ")"
            max++; // treat as "("
        }
        if (min < 0) min = 0;
        if (max < 0) return false;
    }
    return min === 0;
}
