// ============================================
// LeetCode 1652. Defuse the Bomb
// https://leetcode.com/problems/defuse-the-bomb/
// ============================================
//
// You have a bomb to defuse. Your informer gives you
// a circular array code of length n and a key k.
//
// To decrypt the code, replace every number at the same time:
// - If k > 0, replace the ith number with the sum of the next k numbers.
// - If k < 0, replace the ith number with the sum of the previous k numbers.
// - If k == 0, replace the ith number with 0.
//
// The array is circular. The next element of code[n-1] is code[0].
// The previous element of code[0] is code[n-1].
//
// Return the decrypted code.
//
// Example 1:
//   Input:  code = [5,7,1,4], k = 3
//   Output: [12,10,16,13]
//   Explanation: [7+1+4, 1+4+5, 4+5+7, 5+7+1]
//
// Example 2:
//   Input:  code = [1,2,3,4], k = 0
//   Output: [0,0,0,0]
//
// Example 3:
//   Input:  code = [2,4,9,3], k = -2
//   Output: [12,5,6,13]
//   Explanation: [3+9, 2+3, 4+2, 9+4]
//
// Constraints:
// - n == code.length
// - 1 <= n <= 100
// - 1 <= code[i] <= 100
// - -(n - 1) <= k <= n - 1

function decrypt(code: number[], k: number): number[] {
    if (k === 0) return Array(code.length).fill(0);
    return [code[2]];
}

console.log(decrypt([1,2,3], 1))