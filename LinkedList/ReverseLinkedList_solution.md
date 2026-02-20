# LeetCode 206. Reverse Linked List

https://leetcode.com/problems/reverse-linked-list/

## 1. PROBLEM UNDERSTANDING

- **What**: Reverse a singly linked list
- **Input**: head of a linked list
- **Output**: head of the reversed list
- **Constraints**:
  - 0 to 5000 nodes
  - Node values: -5000 to 5000
- **Key insight**: We change the direction of each arrow. Each node should point to its previous node, not the next one.

## 2. APPROACH (面接で話す流れ)

"I'll use an iterative approach with three pointers."

"I need `prev`, `curr`, and `next`.
I go through the list and flip each arrow one by one."

"For each node, I:
1. Save the next node
2. Point the current node to prev
3. Move prev and curr forward"

"When curr is null, prev is the new head."

## 3. SOLUTION

```typescript
function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let curr: ListNode | null = head;

    while (curr !== null) {
        const next = curr.next; // save next
        curr.next = prev;       // flip the arrow
        prev = curr;            // move prev forward
        curr = next;            // move curr forward
    }

    return prev;
}
```

## 4. COMPLEXITY (必ず聞かれる)

**Time: O(n)**
- "I visit each node once."
- "n is the number of nodes."

**Space: O(1)**
- "I only use three pointers: prev, curr, next."
- "No extra data structures."

## 5. KEY PHRASES (面接で使える英語)

**Clarifying questions:**
- "Can the list be empty?"
- "Should I reverse it in-place, or can I make a new list?"

**Explaining approach:**
- "I'll use three pointers to reverse the links one by one."
- "I save the next node first, then flip the arrow."
- "When I reach the end, prev is the new head."

**Explaining complexity:**
- "Time is O(n) because I go through each node once."
- "Space is O(1) because I only use a few pointers."

## 6. VISUAL WALKTHROUGH

```
Input: 1 -> 2 -> 3 -> 4 -> 5 -> null

Step 0: Start
  prev = null
  curr = 1

Step 1: Flip node 1
  next = 2          (save)
  1.next = null     (flip arrow: 1 -> null)
  prev = 1, curr = 2

  null <- 1    2 -> 3 -> 4 -> 5 -> null
         prev  curr

Step 2: Flip node 2
  next = 3          (save)
  2.next = 1        (flip arrow: 2 -> 1)
  prev = 2, curr = 3

  null <- 1 <- 2    3 -> 4 -> 5 -> null
               prev  curr

Step 3: Flip node 3
  next = 4          (save)
  3.next = 2        (flip arrow: 3 -> 2)
  prev = 3, curr = 4

  null <- 1 <- 2 <- 3    4 -> 5 -> null
                    prev  curr

Step 4: Flip node 4
  next = 5          (save)
  4.next = 3        (flip arrow: 4 -> 3)
  prev = 4, curr = 5

  null <- 1 <- 2 <- 3 <- 4    5 -> null
                         prev  curr

Step 5: Flip node 5
  next = null       (save)
  5.next = 4        (flip arrow: 5 -> 4)
  prev = 5, curr = null

  null <- 1 <- 2 <- 3 <- 4 <- 5
                              prev  curr = null

Done! Return prev (node 5) = new head

Output: 5 -> 4 -> 3 -> 2 -> 1 -> null
```

## 7. EDGE CASES

- Empty list: head = null -> return null
- Single node: [1] -> [1] (no change)
- Two nodes: [1,2] -> [2,1]
- Long list: [1,2,3,4,5] -> [5,4,3,2,1]

## 8. TEST CASES

```typescript
// Helper: make a linked list from array
function makeList(arr: number[]): ListNode | null {
    if (arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let curr = head;
    for (let i = 1; i < arr.length; i++) {
        curr.next = new ListNode(arr[i]);
        curr = curr.next;
    }
    return head;
}

// Helper: linked list to array
function toArray(head: ListNode | null): number[] {
    const result: number[] = [];
    while (head) {
        result.push(head.val);
        head = head.next;
    }
    return result;
}

console.log("Test 1:", toArray(reverseList(makeList([1,2,3,4,5]))));  // [5,4,3,2,1]
console.log("Test 2:", toArray(reverseList(makeList([1,2]))));         // [2,1]
console.log("Test 3:", toArray(reverseList(makeList([]))));            // []
console.log("Test 4:", toArray(reverseList(makeList([1]))));           // [1]
```

## 9. VARIATIONS

### Recursive approach

```typescript
function reverseListRecursive(head: ListNode | null): ListNode | null {
    // Base case: empty or single node
    if (head === null || head.next === null) return head;

    // Reverse the rest of the list
    const newHead = reverseListRecursive(head.next);

    // Flip the arrow
    head.next.next = head;
    head.next = null;

    return newHead;
}
```

- Time: O(n), Space: O(n) - because of the call stack

### Reverse part of a list (LeetCode 92)

- Reverse only from position `left` to `right`.
- Same idea, but you need to track the node before `left`.

## 10. COMMON INTERVIEW QUESTIONS

**Q: Why do you need the `next` variable?**
A: "If I flip `curr.next` to `prev` first, I lose the link to the rest of the list. So I save it in `next` first."

**Q: Why is `prev` initialized to null?**
A: "The first node becomes the last node after reverse. The last node should point to null. So `prev` starts as null."

**Q: Iterative or recursive - which is better?**
A: "Iterative is better for this problem. It uses O(1) space. Recursive uses O(n) space for the call stack."

## 13. HOW TO READ CODE ALOUD

```
let prev = null          → "Let prev equal null"
let curr = head          → "Let curr equal head"
while (curr !== null)    → "While curr is not null"
const next = curr.next   → "Const next equals curr dot next"
curr.next = prev         → "Set curr dot next to prev"
prev = curr              → "Move prev to curr"
curr = next              → "Move curr to next"
return prev              → "Return prev"
```

**Reading complexity:**
- O(n) → "O of n"
- O(1) → "O of one" or "constant space"

## 12. RELATED PROBLEMS

- [92. Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/) - Reverse part of a list
- [234. Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/) - Uses reverse to check palindrome
- [25. Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/) - Reverse in groups (Hard)
- [21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) - Another basic linked list problem
