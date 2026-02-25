// ============================================
// LeetCode 206. Reverse Linked List
// https://leetcode.com/problems/reverse-linked-list/
// ============================================
//
// Given the head of a singly linked list,
// reverse the list, and return the reversed list.
//
// Example 1:
//   Input:  head = [1,2,3,4,5]
//   Output: [5,4,3,2,1]
//
// Example 2:
//   Input:  head = [1,2]
//   Output: [2,1]
//
// Example 3:
//   Input:  head = []
//   Output: []
//
// Constraints:
// - The number of nodes in the list is the range [0, 5000]
// - -5000 <= Node.val <= 5000

class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let cur: ListNode | null = head;

    while (cur !== null) {
        // save cur next
        const next = cur.next; // 2 → 3
        // reverse the arrow
        cur.next = prev; // null → 1
        prev = cur // 1 → 3
        cur = next; // 2 → 3
    }

    return prev;
}
