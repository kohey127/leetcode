# LeetCode 155. Min Stack

https://leetcode.com/problems/min-stack/

## 1. PROBLEM UNDERSTANDING

- **What**: Design a stack that supports push, pop, top, and retrieving the minimum element — all in O(1) time
- **Input**: A sequence of operations (push, pop, top, getMin)
- **Output**: Results of top() and getMin() calls
- **Constraints**:
  - -2^31 <= val <= 2^31 - 1
  - pop, top, getMin are always called on non-empty stacks
  - At most 3 * 10^4 calls
- **Key Insight**: A regular stack gives O(1) push/pop/top, but getMin is O(n). The trick is to **record the minimum at the time of each push**. This way, when we pop, the previous minimum is already stored underneath.

## 2. APPROACH (Interview Flow)

"The challenge here is that getMin needs to be O(1). If I just use a regular stack, I'd have to scan the whole stack to find the minimum each time.

My key insight is: if I record the minimum at the time of each push, then when I pop, the previous minimum is already stored underneath.

I'll use two stacks:
1. A main stack for the actual values
2. A min stack that records the minimum at the time of each push

When I push a value, I also push the new minimum onto the min stack — which is either the new value or the current minimum, whichever is smaller.

When I pop, I pop from both stacks. The top of the min stack always gives me the current minimum."

## 3. SOLUTION

```typescript
class MinStack {
  private stack: number[];
  private minStack: number[];

  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val: number): void {
    this.stack.push(val);
    // Push the new minimum: either val or current min, whichever is smaller
    const currentMin = this.minStack.length === 0 ? val : Math.min(val, this.minStack[this.minStack.length - 1]);
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
```

## 4. COMPLEXITY (Always Asked!)

### Time: O(1) for all operations

- **push**: One push to each stack → O(1)
- **pop**: One pop from each stack → O(1)
- **top**: Array index access → O(1)
- **getMin**: Array index access → O(1)

"Every single operation is constant time because we're just doing array push, pop, or index access."

### Space: O(n)

- We maintain two stacks, each with at most n elements
- "In the worst case, both stacks have n elements, so space is O(n)."

## 5. KEY PHRASES (Interview English)

**Clarifying Questions:**
- "Can I assume pop, top, and getMin will only be called on non-empty stacks?"
- "Is there a constraint on the range of values that can be pushed?"
- "Should I handle concurrent access, or is single-threaded fine?"

**Explaining Approach:**
- "The naive approach for getMin would be O(n) — scanning the whole stack each time."
- "My key insight is to maintain a parallel stack that tracks the running minimum."
- "This way, whenever I pop an element, the new minimum is already stored at the top of my min stack."

**Explaining Complexity:**
- "All four operations are O(1) because they only involve push, pop, or peek on arrays."
- "The trade-off is O(n) extra space for the min stack, but that gives us O(1) getMin."

## 6. VISUAL WALKTHROUGH

### Operations: push(-2), push(0), push(-3), getMin, pop, top, getMin

```
Operation     stack          minStack       getMin
─────────     ─────          ────────       ──────
push(-2)      [-2]           [-2]
push(0)       [-2, 0]        [-2, -2]
push(-3)      [-2, 0, -3]    [-2, -2, -3]
getMin()                                    → -3  (top of minStack)
pop()         [-2, 0]        [-2, -2]
top()                                       → 0   (top of stack)
getMin()                                    → -2  (top of minStack)
```

**Why this works:** When we popped -3, the minStack also popped -3, revealing -2 as the new minimum — no re-scanning needed!

## 7. EDGE CASES

- Single element: push(5), getMin() → 5, top() → 5
- All same values: push(3), push(3), push(3) → getMin always 3
- Decreasing order: push(3), push(2), push(1) → minStack mirrors stack
- Increasing order: push(1), push(2), push(3) → minStack is [1, 1, 1]
- Push then pop all: after popping everything, no getMin call (guaranteed non-empty)
- Negative values: push(-1), push(-2) → getMin = -2

## 8. TEST CASES

```typescript
const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin() === -3, "Test 1: getMin → -3");
minStack.pop();
console.log(minStack.top() === 0, "Test 2: top → 0");
console.log(minStack.getMin() === -2, "Test 3: getMin → -2");

// Additional tests
const ms2 = new MinStack();
ms2.push(1);
ms2.push(1);
ms2.push(1);
console.log(ms2.getMin() === 1, "Test 4: all same values → 1");
ms2.pop();
console.log(ms2.getMin() === 1, "Test 5: after pop, still → 1");

const ms3 = new MinStack();
ms3.push(3);
ms3.push(2);
ms3.push(1);
console.log(ms3.getMin() === 1, "Test 6: decreasing → 1");
ms3.pop();
console.log(ms3.getMin() === 2, "Test 7: after pop → 2");
ms3.pop();
console.log(ms3.getMin() === 3, "Test 8: after pop → 3");
```

## 9. VARIATIONS

### A. Single Stack Approach (Space Optimization)

Instead of two stacks, store `{val, min}` pairs in one stack:

```typescript
class MinStackSingleStack {
  private stack: { val: number; min: number }[] = [];

  push(val: number): void {
    const min = this.stack.length === 0 ? val : Math.min(val, this.stack[this.stack.length - 1].min);
    this.stack.push({ val, min });
  }

  pop(): void { this.stack.pop(); }
  top(): number { return this.stack[this.stack.length - 1].val; }
  getMin(): number { return this.stack[this.stack.length - 1].min; }
}
```

Same time/space complexity, but arguably cleaner code.

### B. Optimized Min Stack (Less Space)

Only push to minStack when the new value is <= current min. Pop from minStack only when the popped value equals the current min. This saves space when few elements are minimums.

## 10. WHEN TO USE WHICH

**Q: When should I think about using an auxiliary data structure alongside a stack?**
A: When a problem asks for O(1) access to some aggregate property (min, max, frequency) that would normally require scanning. The pattern is: maintain a parallel structure that tracks the aggregate at each state.

**Q: Two stacks vs single stack with pairs?**
A: Two stacks is easier to explain in interviews and is the more common approach. Single stack with pairs is slightly more elegant. Both have identical time and space complexity.

## 11. COMMON INTERVIEW QUESTIONS

**Q: Why can't you just keep a single variable for the minimum?**
A: "If I only track the current min in one variable, when I pop that min value, I'd need to find the new min — which requires O(n) scanning. The min stack remembers the min at every stack level, so popping is still O(1)."

**Q: Can you optimize the space of the min stack?**
A: "Yes. I can only push to the min stack when the new value is less than or equal to the current min. And only pop from the min stack when the value being popped equals the current min. This way the min stack may be smaller than the main stack."

**Q: What if we also needed getMax in O(1)?**
A: "I'd add a third stack — a max stack — using the same pattern. Push the running max on each push, pop on each pop."

## 12. RELATED PROBLEMS

- LeetCode 716: Max Stack (Hard) — Same idea but for max, plus popMax()
- LeetCode 232: Implement Queue using Stacks (Easy) — Stack design problem
- LeetCode 225: Implement Stack using Queues (Easy) — Stack design problem
- LeetCode 895: Maximum Frequency Stack (Hard) — Stack + frequency tracking

## 13. HOW TO READ CODE ALOUD

**Code Symbols:**
- `this.stack` → "this dot stack"
- `this.minStack[this.minStack.length - 1]` → "the last element of min stack" or "the top of min stack"
- `Math.min(val, ...)` → "Math dot min of val and..."
- `push(val)` → "push val onto the stack"
- `pop()` → "pop from the stack"

**Complexity:**
- O(1) → "O of one" or "constant time"
- O(n) → "O of n" or "linear space"

**Example Explanation Script:**
"Let me walk through the example.
First, I push minus 2. Both stacks get minus 2.
Then I push 0. The main stack gets 0, but the min stack gets minus 2 again because minus 2 is still the minimum.
Next, I push minus 3. Both stacks get minus 3 since it's a new minimum.
Now getMin returns minus 3 — just the top of the min stack.
When I pop, both stacks pop minus 3.
Top returns 0, and getMin returns minus 2 — the previous minimum is right there on top of the min stack."
