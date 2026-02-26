// ============================================
// LeetCode 2. Add Two Numbers
// https://leetcode.com/problems/add-two-numbers/
// ============================================
//
// You are given two non-empty linked lists.
// They represent two non-negative integers.
// The digits are stored in reverse order.
// Each node has a single digit.
// Add the two numbers and return the sum as a linked list.
//
// Example 1:
//   Input:  l1 = [2,4,3], l2 = [5,6,4]
//   Output: [7,0,8]
//   Explanation: 342 + 465 = 807
//
// Example 2:
//   Input:  l1 = [0], l2 = [0]
//   Output: [0]
//
// Example 3:
//   Input:  l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
//   Output: [8,9,9,9,0,0,0,1]
//
// Constraints:
// - The number of nodes in each list is in the range [1, 100]
// - 0 <= Node.val <= 9
// - The lists do not have leading zeros (except the number 0 itself)

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {

}
