# LeetCode 15. 3Sum

https://leetcode.com/problems/3sum/

## 1. PROBLEM UNDERSTANDING

- **What**: Find all unique triplets in the array that sum to zero
- **Input**: An integer array nums
- **Output**: All unique triplets [nums[i], nums[j], nums[k]] where nums[i] + nums[j] + nums[k] == 0
- **Constraints**:
  - 3 <= nums.length <= 3000
  - -10^5 <= nums[i] <= 10^5
- **Key insight**: Fix one element, then the remaining two become a Two Sum problem. Sorting enables two pointers.

## 2. APPROACH (面接で話す流れ)

"First, I'll sort the array. This allows me to use the two-pointer technique and also makes it easier to skip duplicates."

"Then, I'll iterate through the array. For each element nums[i], I need to find two numbers that sum to -nums[i]. This is essentially a Two Sum problem."

"For the Two Sum part, I'll use two pointers — one starting right after i, and one at the end of the array. If the sum is too small, I move the left pointer right. If too large, I move the right pointer left."

"To avoid duplicate triplets, I skip over consecutive equal elements — both for the outer loop and the inner pointers."

## 3. SOLUTION

```typescript
function threeSum(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);
    const result: number[][] = [];

    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicates for the fixed element
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        // Early termination: if nums[i] > 0, no valid triplet possible
        if (nums[i] > 0) break;

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                // Skip duplicates
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}
```

## 4. COMPLEXITY (必ず聞かれる)

**Time: O(n^2)**
- "Sorting takes O(n log n). The outer loop runs n times, and for each iteration, the two-pointer scan takes O(n). So overall it's O(n^2)."

**Space: O(1)**
- "We only use constant extra space for pointers. The output array doesn't count toward space complexity."

## 5. KEY PHRASES (面接で使える英語)

**Clarifying questions:**
- "Can the array contain duplicates?"
- "Should the result contain unique triplets only?"
- "Can I modify the input array by sorting it?"

**Explaining approach:**
- "I'll fix one element and use two pointers for the remaining two"
- "By sorting first, I can efficiently skip duplicates and use two pointers"
- "This reduces the problem from 3Sum to multiple Two Sum problems"

**Explaining complexity:**
- "The time complexity is O(n squared) — O(n log n) for sorting plus O(n squared) for the nested loop"
- "The space complexity is O(1) since we only use a few pointers"

## 6. VISUAL WALKTHROUGH

nums = [-1, 0, 1, 2, -1, -4]

**Step 0: Sort**
```
[-4, -1, -1, 0, 1, 2]
```

**i=0: nums[i] = -4, target = 4**
```
[-4, -1, -1,  0,  1,  2]
  i   L                R

sum = -4 + (-1) + 2 = -3 < 0 → L++

[-4, -1, -1,  0,  1,  2]
  i       L            R

sum = -4 + (-1) + 2 = -3 < 0 → L++

[-4, -1, -1,  0,  1,  2]
  i           L        R

sum = -4 + 0 + 2 = -2 < 0 → L++

[-4, -1, -1,  0,  1,  2]
  i               L    R

sum = -4 + 1 + 2 = -1 < 0 → L++
L >= R → done. No triplet with -4.
```

**i=1: nums[i] = -1, target = 1**
```
[-4, -1, -1,  0,  1,  2]
      i   L            R

sum = -1 + (-1) + 2 = 0 ✓ → add [-1, -1, 2]
skip duplicates, L++, R--

[-4, -1, -1,  0,  1,  2]
      i       L    R

sum = -1 + 0 + 1 = 0 ✓ → add [-1, 0, 1]
L++, R--
L >= R → done
```

**i=2: nums[i] = -1 → same as nums[1], skip**

**i=3: nums[i] = 0**
```
[-4, -1, -1,  0,  1,  2]
              i   L    R

sum = 0 + 1 + 2 = 3 > 0 → R--
L >= R → done
```

**Result: [[-1, -1, 2], [-1, 0, 1]]**

## 7. EDGE CASES

- All same numbers: [0, 0, 0] → [[0, 0, 0]]
- No solution: [1, 2, 3] → []
- Many duplicates: [-1, -1, -1, 0, 0, 1, 1, 1] → duplicate skipping is critical
- Minimum size: [a, b, c] → only one triplet to check

## 8. TEST CASES

```typescript
console.log("Test 1:", threeSum([-1, 0, 1, 2, -1, -4]));
// Expected: [[-1,-1,2],[-1,0,1]]

console.log("Test 2:", threeSum([0, 1, 1]));
// Expected: []

console.log("Test 3:", threeSum([0, 0, 0]));
// Expected: [[0,0,0]]

console.log("Test 4:", threeSum([-2, 0, 1, 1, 2]));
// Expected: [[-2,0,2],[-2,1,1]]

console.log("Test 5:", threeSum([1, 2, 3]));
// Expected: [] (all positive, no solution)
```

## 9. CORE IDEA

**3Sum = Fix one + Two Sum**

```
for each nums[i]:
    solve Two Sum with target = -nums[i]
```

Sorting gives three benefits:
1. Two pointers work (O(n) Two Sum)
2. Easy duplicate skipping (same values are adjacent)
3. Early termination (if nums[i] > 0, break)

## 10. DUPLICATE SKIP

Duplicate skipping is the trickiest part of this problem.

**Outer skip: `if (i > 0 && nums[i] === nums[i-1]) continue`**

```
[-1, -1, 0, 1, 2]
  i=0: fix -1 → find [-1, 0, 1]
  i=1: fix -1 again → would produce the same result, so skip
```

**Inner skip: `while (nums[left] === nums[left+1]) left++`**

```
[-2, 0, 0, 2, 2]
  i=0, L=1, R=4
  sum = -2 + 0 + 2 = 0 ✓
  → add [-2, 0, 2]
  left has duplicate 0 → skip
  right has duplicate 2 → skip
  → prevents adding [-2, 0, 2] twice
```

## 11. COMMON INTERVIEW QUESTIONS

**Q: Why do you sort the array?**
A: Sorting enables two pointers and makes duplicate skipping straightforward. With a sorted array, "sum too small → move left, sum too large → move right" works.

**Q: Can you use a hash map instead?**
A: Yes, but duplicate handling becomes more complex. Sort + two pointers is simpler and more interview-friendly.

**Q: Why can you break when nums[i] > 0?**
A: The array is sorted, so everything after nums[i] is also positive. Three positive numbers can never sum to zero.

## 12. RELATED PROBLEMS

- LeetCode 1. Two Sum (hash map approach)
- LeetCode 167. Two Sum II (sorted array, two pointers)
- LeetCode 16. 3Sum Closest
- LeetCode 18. 4Sum
