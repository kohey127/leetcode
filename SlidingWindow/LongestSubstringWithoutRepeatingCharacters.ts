// ============================================
// LeetCode 3. Longest Substring Without Repeating Characters
// https://leetcode.com/problems/longest-substring-without-repeating-characters/
// ============================================
//
// Given a string s, find the length of the longest substring
// without repeating characters.
//
// Example 1:
//   Input:  s = "abcabcbb"
//   Output: 3
//   Explanation: The answer is "abc", with the length of 3.
//
// Example 2:
//   Input:  s = "bbbbb"
//   Output: 1
//   Explanation: The answer is "b", with the length of 1.
//
// Example 3:
//   Input:  s = "pwwkew"
//   Output: 3
//   Explanation: The answer is "wke", with the length of 3.
//   Notice that "pwke" is a subsequence, not a substring.
//
// Constraints:
// - 0 <= s.length <= 5 * 10^4
// - s consists of English letters, digits, symbols, and spaces

function lengthOfLongestSubstring(s: string): number {
    const seen = new Set<string>();
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        // Increase left by one until unduplicated character
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }

        seen.add(s[right]);
        const currentWindowLen = right - left + 1;
        maxLen = Math.max(maxLen, currentWindowLen);
    }
    return maxLen;
}
