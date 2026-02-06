// ============================================
// LeetCode 155. Min Stack
// https://leetcode.com/problems/min-stack/
// ============================================
//
// Design a stack that supports push, pop, top, and retrieving
// the minimum element in constant time.
//
// Implement the MinStack class:
// - MinStack()        initializes the stack object
// - push(val: number) pushes the element val onto the stack
// - pop()             removes the element on the top of the stack
// - top(): number     gets the top element of the stack
// - getMin(): number  retrieves the minimum element in the stack
//
// You must implement a solution with O(1) time complexity for each function.
//
// Example 1:
// Input:
//   ["MinStack","push","push","push","getMin","pop","top","getMin"]
//   [[],[-2],[0],[-3],[],[],[],[]]
// Output:
//   [null,null,null,null,-3,null,0,-2]
//
// ↑ これを普通のコードで書くとこういう意味：
//   const ms = new MinStack();  // → null (返り値なし)
//   ms.push(-2);                // → null
//   ms.push(0);                 // → null
//   ms.push(-3);                // → null
//   ms.getMin();                // → -3
//   ms.pop();                   // → null
//   ms.top();                   // → 0
//   ms.getMin();                // → -2
//
// Constraints:
// - -2^31 <= val <= 2^31 - 1
// - Methods pop, top and getMin operations will always be called on non-empty stacks
// - At most 3 * 10^4 calls will be made to push, pop, top, and getMin

class MinStack {
    private stack: number[];
    private minStack: number[];

  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val: number): void {
    this.stack.push(val);
    const currentMin = this.minStack.length === 0 ? val : 
        Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(currentMin);
  }

  pop(): void {
    this.stack.pop();
    this.minStack.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1];
  }
}
