# LeetCode 167. Two Sum II - Input Array Is Sorted

https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/

## 1. PROBLEM UNDERSTANDING

- **What**: Find two numbers in a sorted array that add up to a target
- **Input**: A sorted integer array `numbers` and an integer `target`
- **Output**: 1-indexed positions of the two numbers as `[index1, index2]`
- **Constraints**:
  - 2 <= numbers.length <= 3 * 10^4
  - -1000 <= numbers[i] <= 1000
  - Array is sorted in non-decreasing order
  - Exactly one solution exists
  - Must use constant extra space
- **Key insight**: The array is already sorted, so two pointers from both ends can find the pair in one pass.

## 2. APPROACH (面接で話す流れ)

"Since the array is already sorted, I can use two pointers — one at the beginning and one at the end."

"If the sum of the two pointed values is less than the target, I move the left pointer right to increase the sum. If the sum is greater, I move the right pointer left to decrease it."

"Since exactly one solution is guaranteed, the pointers will always meet at the answer."

## 3. SOLUTION

```typescript
function twoSum(numbers: number[], target: number): number[] {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        const sum = numbers[left] + numbers[right];

        if (sum === target) {
            return [left + 1, right + 1]; // 1-indexed
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return []; // unreachable (exactly one solution guaranteed)
}
```

## 4. COMPLEXITY (必ず聞かれる)

**Time: O(n)**
- "Each pointer moves at most n times, and we do constant work per step, so it's O(n)."

**Space: O(1)**
- "We only use two pointer variables regardless of input size."

## 5. KEY PHRASES (面接で使える英語)

**Clarifying questions:**
- "The array is already sorted, correct?"
- "Is there guaranteed to be exactly one solution?"
- "Are the indices 1-based or 0-based?"

**Explaining approach:**
- "I'll use two pointers, one at each end of the array"
- "Since the array is sorted, I can adjust the sum by moving the appropriate pointer"
- "This is essentially a binary search-like elimination — each step rules out an entire row or column"

**Explaining complexity:**
- "The time complexity is O(n) since each pointer moves at most n positions"
- "The space complexity is O(1) — just two pointers"

## 6. VISUAL WALKTHROUGH

numbers = [2, 7, 11, 15], target = 9

```
[2,  7,  11,  15]
 L             R

sum = 2 + 15 = 17 > 9 → R left

[2,  7,  11,  15]
 L        R

sum = 2 + 11 = 13 > 9 → R left

[2,  7,  11,  15]
 L   R

sum = 2 + 7 = 9 ✓ → return [1, 2]
```

numbers = [1, 3, 4, 5, 7, 10, 11], target = 9

```
[1,  3,  4,  5,  7,  10,  11]
 L                         R

sum = 1 + 11 = 12 > 9 → R left

[1,  3,  4,  5,  7,  10,  11]
 L                   R

sum = 1 + 10 = 11 > 9 → R left

[1,  3,  4,  5,  7,  10,  11]
 L               R

sum = 1 + 7 = 8 < 9 → L right

[1,  3,  4,  5,  7,  10,  11]
     L           R

sum = 3 + 7 = 10 > 9 → R left

[1,  3,  4,  5,  7,  10,  11]
     L       R

sum = 3 + 5 = 8 < 9 → L right

[1,  3,  4,  5,  7,  10,  11]
         L   R

sum = 4 + 5 = 9 ✓ → return [3, 4]
```

## 7. EDGE CASES

- Two elements: [1, 2], target = 3 → [1, 2]
- Negative numbers: [-3, -1, 0, 1, 5], target = -4 → [1, 2]
- Target is zero: [-1, 0, 1], target = 0 → [1, 3]
- Same values: [1, 1, 3], target = 2 → [1, 2]

## 8. TEST CASES

```typescript
console.log("Test 1:", twoSum([2, 7, 11, 15], 9));
// Expected: [1, 2]

console.log("Test 2:", twoSum([2, 3, 4], 6));
// Expected: [1, 3]

console.log("Test 3:", twoSum([-1, 0], -1));
// Expected: [1, 2]

console.log("Test 4:", twoSum([1, 3, 4, 5, 7, 10, 11], 9));
// Expected: [3, 4]

console.log("Test 5:", twoSum([1, 2, 3, 4, 5], 9));
// Expected: [4, 5]
```

## 9. CORE IDEA

**Two Sum II is the building block of 3Sum.**

```
3Sum:     fix one → solve Two Sum on the rest
Two Sum:  two pointers from both ends of sorted array
```

The key principle is the same:
- Sorted array → you know which direction changes the sum
- Too small → move left pointer right
- Too large → move right pointer left

## 10. WHY TWO POINTERS WORK

Think of all possible pairs as a grid:

```
        numbers[R] →
         2    7   11   15
n  2   [ 4,   9,  13,  17]
u  7   [  ,  14,  18,  22]
m 11   [  ,    ,  22,  26]
s 15   [  ,    ,    ,  30]
[L]↓
```

The grid is sorted — values increase going right and going down.

- Start at top-right corner (L=0, R=last)
- Too big → move left (R--)
- Too small → move down (L++)

Each step eliminates an entire row or column. That's why it's O(n).

## 11. COMMON INTERVIEW QUESTIONS

**Q: Why not use a hash map like regular Two Sum?**
A: A hash map works but uses O(n) space. The problem requires O(1) space, and since the array is sorted, two pointers achieve this.

**Q: Why not use binary search?**
A: Binary search works (O(n log n)) but two pointers is simpler and faster (O(n)).

**Q: How is this related to 3Sum?**
A: 3Sum fixes one element and runs this exact algorithm on the remaining array. Two Sum II is the inner loop of 3Sum.

## 12. RELATED PROBLEMS

- LeetCode 1. Two Sum (unsorted, hash map approach)
- LeetCode 15. 3Sum (fix one + Two Sum II)
- LeetCode 16. 3Sum Closest
- LeetCode 170. Two Sum III - Data Structure Design
