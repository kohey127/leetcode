# LeetCode 739. Daily Temperatures

https://leetcode.com/problems/daily-temperatures/

## 1. PROBLEM UNDERSTANDING

- **What**: For each day, find how many days until a warmer temperature
- **Input**: An array `temperatures` where `temperatures[i]` is the temperature on day `i`
- **Output**: An array where `answer[i]` is the number of days to wait for a warmer day. If no warmer day exists, `answer[i] = 0`
- **Constraints**:
  - 1 <= temperatures.length <= 10^5
  - 30 <= temperatures[i] <= 100
- **Key Insight**: Use a monotonic decreasing stack. The stack stores indices of days we haven't found a warmer day for yet. When we find a warmer day, we pop from the stack and calculate the difference in indices.

## 2. APPROACH (Interview Flow)

"Let me first clarify the problem. For each day, I need to look ahead and find how many days until the temperature is strictly higher. If there's no warmer day, the answer is 0.

A brute force approach would check every future day for each day — that's O(n²). But I can do better with a stack.

I'll use a monotonic decreasing stack that stores indices. I iterate through the temperatures. For each new temperature, I check if it's warmer than the temperature at the top of the stack. If yes, I pop the stack — the current day is the answer for that popped day. I calculate the difference in indices and store it. I keep popping while the current temperature is warmer. Then I push the current index onto the stack."

## 3. SOLUTION

```typescript
function dailyTemperatures(temperatures: number[]): number[] {
  const answer = new Array(temperatures.length).fill(0);
  const stack: number[] = []; // stores indices

  for (let i = 0; i < temperatures.length; i++) {
    // While current temp is warmer than the temp at top of stack
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prevDay = stack.pop()!;
      answer[prevDay] = i - prevDay;
    }

    stack.push(i);
  }

  return answer;
}
```

### Why is the stack monotonic decreasing?

We only push onto the stack when the current temperature is NOT warmer than the top. So temperatures on the stack always go from bottom (warmest) to top (coolest). When a warmer day comes, it pops off all cooler days.

## 4. COMPLEXITY (Always Asked!)

**Time: O(n)**
- "Each index is pushed onto the stack once and popped at most once. So the total operations are at most 2n, which is O(n)."

**Space: O(n)**
- "In the worst case, the stack holds all n indices — for example, when temperatures are strictly decreasing like [100, 99, 98, ...]."

## 5. KEY PHRASES (Interview English)

**Clarifying Questions:**
- "Should I count the current day itself?" (No — only future days)
- "Does it need to be strictly warmer, or the same temperature?" (Strictly warmer)
- "What if no warmer day exists?" (Return 0 for that day)

**Explaining Approach:**
- "I'll use a monotonic decreasing stack to track days that haven't found a warmer day yet."
- "When I encounter a warmer day, I pop from the stack and calculate the number of days."
- "The stack stores indices, not temperatures, so I can calculate the day difference."

**Explaining Complexity:**
- "Time is O of n because each element is pushed and popped at most once."
- "Space is O of n for the stack in the worst case."

## 6. VISUAL WALKTHROUGH

### Input: `temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`

```
日ごとの気温:

76|                          *
75|        *
74|     *
73|  *                             *
72|                    *
71|           *
70|
69|              *
  +--+--+--+--+--+--+--+--+
    0  1  2  3  4  5  6  7

Step-by-step (stack = [index] で表記):

i=0: temp=73  stack=[]        → push 0       stack=[0]
i=1: temp=74  74>73 → pop 0  → answer[0]=1-0=1
                              → push 1       stack=[1]
i=2: temp=75  75>74 → pop 1  → answer[1]=2-1=1
                              → push 2       stack=[2]
i=3: temp=71  71<75           → push 3       stack=[2,3]
i=4: temp=69  69<71           → push 4       stack=[2,3,4]
i=5: temp=72  72>69 → pop 4  → answer[4]=5-4=1
              72>71 → pop 3  → answer[3]=5-3=2
              72<75           → push 5       stack=[2,5]
i=6: temp=76  76>72 → pop 5  → answer[5]=6-5=1
              76>75 → pop 2  → answer[2]=6-2=4
                              → push 6       stack=[6]
i=7: temp=73  73<76           → push 7       stack=[6,7]

stackに残った 6,7 → 暖かい日が来なかった → answer[6]=0, answer[7]=0

answer = [1, 1, 4, 2, 1, 1, 0, 0] ✓
```

### Input: `temperatures = [30, 40, 50, 60]` (always increasing)

```
i=0: temp=30  push 0        stack=[0]
i=1: temp=40  40>30 pop 0 → answer[0]=1  push 1  stack=[1]
i=2: temp=50  50>40 pop 1 → answer[1]=1  push 2  stack=[2]
i=3: temp=60  60>50 pop 2 → answer[2]=1  push 3  stack=[3]

stack: [3] → answer[3]=0

answer = [1, 1, 1, 0] ✓
```

### Input: `temperatures = [30, 20, 10]` (always decreasing)

```
i=0: temp=30  push 0  stack=[0]
i=1: temp=20  push 1  stack=[0,1]
i=2: temp=10  push 2  stack=[0,1,2]

全部stackに残る → 全部 0

answer = [0, 0, 0] ✓
```

## 7. EDGE CASES

- Single day: `[50]` → `[0]`
- Always increasing: `[30, 40, 50]` → `[1, 1, 0]`
- Always decreasing: `[50, 40, 30]` → `[0, 0, 0]`
- All same temperature: `[50, 50, 50]` → `[0, 0, 0]` (same is not warmer)
- Warmer at the very end: `[50, 40, 30, 60]` → `[3, 2, 1, 0]`
- Two elements: `[30, 40]` → `[1, 0]`

## 8. TEST CASES

```typescript
console.log(JSON.stringify(dailyTemperatures([73,74,75,71,69,72,76,73])) === JSON.stringify([1,1,4,2,1,1,0,0]),  "Test 1: mixed");
console.log(JSON.stringify(dailyTemperatures([30,40,50,60])) === JSON.stringify([1,1,1,0]),                       "Test 2: increasing");
console.log(JSON.stringify(dailyTemperatures([30,20,10])) === JSON.stringify([0,0,0]),                             "Test 3: decreasing");
console.log(JSON.stringify(dailyTemperatures([50])) === JSON.stringify([0]),                                        "Test 4: single");
console.log(JSON.stringify(dailyTemperatures([50,50,50])) === JSON.stringify([0,0,0]),                             "Test 5: all same");
console.log(JSON.stringify(dailyTemperatures([50,40,30,60])) === JSON.stringify([3,2,1,0]),                        "Test 6: warm at end");
```

## 9. VARIATIONS

### A. Next Greater Element (LeetCode 496)

Same pattern but with two different arrays and a circular relationship.

### B. Monotonic Stack — Increasing vs Decreasing

```
Decreasing stack (this problem):
  Stack keeps indices where temp decreases from bottom to top.
  Use when finding "next greater element".

  stack: [76℃, 72℃, 69℃]  (bottom to top: big → small)
         When 73℃ comes, pop 69℃ → 73 is the answer for 69's day

Increasing stack:
  Stack keeps indices where values increase from bottom to top.
  Use when finding "next smaller element".
```

## 10. WHEN TO USE WHICH

**Q: When should I think "monotonic stack"?**
A: When the problem asks "for each element, find the next greater/smaller element". The keywords are "next", "greater", "smaller", "waiting for".

**Q: How is this different from a regular stack problem like Valid Parentheses?**
A: Valid Parentheses uses the stack for matching pairs. Monotonic stack uses the stack to maintain an order — elements are always sorted. The "pop" operation gives you the answer.

**Q: Brute force vs stack — when to upgrade?**
A: If you find yourself writing two nested loops where the inner loop searches forward for a condition, that's often a monotonic stack opportunity.

## 11. COMMON INTERVIEW QUESTIONS

**Q: Why store indices instead of temperatures?**
A: "I need to calculate the number of days between two events. If I stored temperatures, I'd lose track of when they occurred. Indices let me compute `i - prevDay` directly."

**Q: Why is this O(n) and not O(n²)?**
A: "Each index is pushed once and popped at most once. Even though there's a while loop inside the for loop, the total number of pops across all iterations is at most n. So it's 2n total operations — O(n)."

**Q: What if we need to find the next cooler day instead?**
A: "I'd use a monotonic increasing stack instead. Same logic, but I pop when the current temperature is lower than the stack top."

## 12. RELATED PROBLEMS

- LeetCode 496: Next Greater Element I (Easy) — Same monotonic stack pattern
- LeetCode 503: Next Greater Element II (Medium) — Circular array variant
- LeetCode 84: Largest Rectangle in Histogram (Hard) — Classic monotonic stack
- LeetCode 42: Trapping Rain Water (Hard) — Can be solved with monotonic stack
- LeetCode 901: Online Stock Span (Medium) — Monotonic stack for counting

## 13. HOW TO READ CODE ALOUD

**Code Symbols:**
- `stack[stack.length - 1]` → "the top of the stack" or "stack at stack dot length minus one"
- `stack.pop()!` → "pop from the stack" (the `!` is "non-null assertion")
- `temperatures[i] > temperatures[stack[stack.length - 1]]` → "the current temperature is greater than the temperature at the index on top of the stack"
- `new Array(n).fill(0)` → "a new array of size n filled with zeros"

**Complexity:**
- O(n) → "O of n" or "linear time"

**Example Explanation Script:**
"Let me walk through [73, 74, 75, 71, 69, 72, 76, 73].
I start with an empty stack. Day 0 is 73 degrees, I push index 0.
Day 1 is 74. That's warmer than 73, so I pop index 0. The wait is 1 minus 0 equals 1 day. I push index 1.
Day 2 is 75, warmer than 74, pop index 1, wait is 1 day. Push index 2.
Day 3 is 71, cooler than 75, so I just push. Stack is now [2, 3].
Day 4 is 69, cooler, push. Stack is [2, 3, 4].
Day 5 is 72. That's warmer than 69, pop index 4, wait is 1 day. Also warmer than 71, pop index 3, wait is 2 days. But 72 is cooler than 75, so I stop and push. Stack is [2, 5].
Day 6 is 76, warmer than everything on the stack. Pop 5, wait 1 day. Pop 2, wait 4 days. Push 6.
Day 7 is 73, cooler than 76. Push. Stack is [6, 7].
Remaining indices get 0. The answer is [1,1,4,2,1,1,0,0]."
