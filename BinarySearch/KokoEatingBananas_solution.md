# LeetCode 875. Koko Eating Bananas
https://leetcode.com/problems/koko-eating-bananas/

## 1. PROBLEM UNDERSTANDING
- What: Find the slowest eating speed to finish all bananas in time
- Input: piles (array of banana counts), h (hours we have)
- Output: smallest speed k (bananas per hour)
- Constraints:
  - Each hour, Koko picks one pile and eats k bananas from it
  - If a pile has less than k, she eats it all (still takes 1 hour)
  - 1 <= piles.length <= 10^4, 1 <= piles[i] <= 10^9
- Key insight: "find the smallest k" + big range = binary search on the answer

## 2. APPROACH (面接で話す流れ)
"I need to find the smallest speed k.
 k can be from 1 to max(piles).
 That's a big range, so I'll use binary search."

"For each speed k, I check: can Koko finish in h hours?
 For each pile, she needs ceil(pile / k) hours.
 If total hours <= h, the speed is fast enough."

"I use binary search to find the smallest k that works."

## 3. SOLUTION

```typescript
function minEatingSpeed(piles: number[], h: number): number {
    let left = 1;                       // slowest: 1 banana per hour
    let right = Math.max(...piles);     // fastest: biggest pile per hour

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const hours = totalHours(piles, mid);

        if (hours <= h) {
            right = mid;      // speed is enough, try slower
        } else {
            left = mid + 1;   // too slow, need faster
        }
    }

    return left;
}

// How many hours does Koko need at speed k?
function totalHours(piles: number[], k: number): number {
    let hours = 0;
    for (const pile of piles) {
        hours += Math.ceil(pile / k);  // round up: 7 bananas at speed 4 = 2 hours
    }
    return hours;
}
```

## 4. COMPLEXITY (必ず聞かれる)
- Time: O(n * log m)
  - n = number of piles, m = max pile size
  - "Binary search runs log m times. Each time, I check all n piles."
- Space: O(1) - "Just a few variables."

## 5. KEY PHRASES (面接で使える英語)

Clarifying:
- "So she eats from only one pile per hour, right?"
- "If a pile is smaller than k, she just eats it and waits?"

Explaining:
- "I'll binary search on the speed, not on the array."
- "The speed goes from 1 to the biggest pile."
- "For each speed, I check if she can finish in time."
- "I use ceil of pile divided by k to get hours for each pile."

Complexity:
- "Time is O of n log m. Log m for binary search, n to check each pile."
- "Space is O of one."

## 6. VISUAL WALKTHROUGH

piles = [3, 6, 7, 11], h = 8

```
Binary search: left=1, right=11

Step 1: mid=6
  pile 3  → ceil(3/6)  = 1 hour
  pile 6  → ceil(6/6)  = 1 hour
  pile 7  → ceil(7/6)  = 2 hours
  pile 11 → ceil(11/6) = 2 hours
  total = 6 hours <= 8 ✓ → try slower, right = 6

Step 2: mid=3
  pile 3  → ceil(3/3)  = 1 hour
  pile 6  → ceil(6/3)  = 2 hours
  pile 7  → ceil(7/3)  = 3 hours
  pile 11 → ceil(11/3) = 4 hours
  total = 10 hours > 8 ✗ → too slow, left = 4

Step 3: mid=5
  pile 3 → 1, pile 6 → 2, pile 7 → 2, pile 11 → 3
  total = 8 hours <= 8 ✓ → try slower, right = 5

Step 4: mid=4
  pile 3 → 1, pile 6 → 2, pile 7 → 2, pile 11 → 3
  total = 8 hours <= 8 ✓ → try slower, right = 4

left=4, right=4 → done! answer = 4
```

## 7. EDGE CASES
- One pile: [10], h=10 → 1 (eat 1 per hour)
- Piles == hours: [3,6,7,11], h=4 → 11 (must eat biggest pile in 1 hour)
- Very big pile: [1000000000], h=2 → 500000000

## 8. TEST CASES

```typescript
console.log(minEatingSpeed([3, 6, 7, 11], 8));           // Expected: 4
console.log(minEatingSpeed([30, 11, 23, 4, 20], 5));     // Expected: 30
console.log(minEatingSpeed([30, 11, 23, 4, 20], 6));     // Expected: 23
console.log(minEatingSpeed([10], 10));                    // Expected: 1
console.log(minEatingSpeed([3, 6, 7, 11], 4));           // Expected: 11
```

## 9. VARIATIONS (バリエーション)

この問題は「答えに対する二分探索 (Binary Search on Answer)」パターン。

同じパターンの問題:
- LeetCode 1011: Ship Packages in D Days → "find smallest ship size"
- LeetCode 410: Split Array Largest Sum → "find smallest max sum"
- LeetCode 69: Sqrt(x) → "find largest n where n*n <= x"

パターンの見分け方:
- "Find the minimum/maximum value that satisfies..."
- Big range of possible answers (1 to 10^9)
- Easy to check: "given this answer, does it work?"

## 10. WHEN TO USE WHICH (使い分け)

Q: "How do I know this is binary search?"
A: "Two clues:
    1. I need the smallest/biggest value that works.
    2. If speed k works, then k+1 also works.
    So I can binary search on k."

Q: "How is this different from normal binary search?"
A: "Normal: search in an array for a target.
    This: search in a range of numbers (1 to max) for the best answer.
    But the idea is the same - cut in half each time."

## 11. COMMON INTERVIEW QUESTIONS

Q: "Why use ceil(pile / k)?"
A: "If pile is 7 and speed is 4, she needs 2 hours.
    7 / 4 = 1.75, round up = 2. She can't eat half an hour."

Q: "Why is left=1, not left=0?"
A: "Speed 0 means she eats nothing. That doesn't make sense."

Q: "Why while (left < right), not left <= right?"
A: "I want to find a boundary, not an exact match.
    When left meets right, that's my answer."

## 12. RELATED PROBLEMS
- LeetCode 704: Binary Search (basic)
- LeetCode 1011: Capacity To Ship Packages (same pattern)
- LeetCode 410: Split Array Largest Sum (same pattern)
- LeetCode 69: Sqrt(x) (binary search on answer)

## 13. HOW TO READ CODE ALOUD (口頭での読み方)

### コードの読み方
| Code | Say This |
|------|----------|
| `Math.max(...piles)` | "math dot max of piles" / "the biggest pile" |
| `Math.ceil(pile / k)` | "math dot ceil of pile divided by k" / "round up pile over k" |
| `hours <= h` | "hours is less than or equal to h" |
| `left < right` | "left is less than right" |

### 計算量の読み方
| Symbol | Say This |
|--------|----------|
| O(n * log m) | "O of n times log m" |

n = number of piles, m = biggest pile

### 例を説明するスクリプト
"Let me walk through an example.
 piles is three, six, seven, eleven. h is eight.

 The speed can be one to eleven.
 I try the middle, six.
 At speed six, I need one plus one plus two plus two, that's six hours.
 Six is less than eight, so six works.
 But maybe I can go slower. So I try the left half.

 I try three. That needs ten hours. Too slow.
 I try four. That needs eight hours. Just enough.
 Answer is four."
