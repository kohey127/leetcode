# LeetCode 1. Two Sum

https://leetcode.com/problems/two-sum/

## 1. PROBLEM UNDERSTANDING

- **What**: Find two numbers in an array that add up to a target, return their indices
- **Input**: An integer array `nums` and an integer `target`
- **Output**: Indices of the two numbers as `[index1, index2]` (0-indexed, any order)
- **Constraints**:
  - 2 <= nums.length <= 10^4
  - -10^9 <= nums[i] <= 10^9
  - Exactly one solution exists
  - Cannot use the same element twice
- **Key insight**: For each number, its complement (target - num) either exists in the array or it doesn't. A hash map lets us check this in O(1).

## 2. APPROACH (面接で話す流れ)

"The brute force approach would be to check every pair, which is O(n squared). But I can do better with a hash map."

"I'll iterate through the array once. For each number, I compute the complement — that's target minus the current number. If the complement is already in the map, I've found my pair. Otherwise, I store the current number and its index in the map."

"This way I only need one pass through the array, giving me O(n) time."

## 3. SOLUTION

```typescript
function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement)!, i];
        }
        map.set(nums[i], i);
    }
    return [];
}
```

## 4. COMPLEXITY (必ず聞かれる)

**Time: O(n)**
- "We iterate through the array once. Each hash map lookup and insertion is O(1), so overall it's O(n)."

**Space: O(n)**
- "In the worst case, we store all n elements in the hash map before finding the answer."

## 5. KEY PHRASES (面接で使える英語)

**Clarifying questions:**
- "Can I assume there is exactly one solution?"
- "Can the array contain negative numbers?"
- "Are the indices 0-based?"
- "Can I return the indices in any order?"

**Explaining approach:**
- "I'll use a hash map to store each number's index as I iterate"
- "For each element, I check if its complement is already in the map"
- "This trades space for time — O(n) space to get O(n) time"

**Explaining complexity:**
- "The time complexity is O(n) — one pass with O(1) lookups"
- "The space complexity is O(n) for the hash map"

## 6. VISUAL WALKTHROUGH

nums = [2, 7, 11, 15], target = 9

```
map = {}

i=0: nums[0]=2, complement=9-2=7
     map has 7? No → map = {2:0}

i=1: nums[1]=7, complement=9-7=2
     map has 2? Yes! → return [0, 1] ✓
```

nums = [3, 2, 4], target = 6

```
map = {}

i=0: nums[0]=3, complement=6-3=3
     map has 3? No → map = {3:0}

i=1: nums[1]=2, complement=6-2=4
     map has 4? No → map = {3:0, 2:1}

i=2: nums[2]=4, complement=6-4=2
     map has 2? Yes! → return [1, 2] ✓
```

## 7. EDGE CASES

- Two elements: [3, 3], target = 6 → [0, 1]
- Negative numbers: [-1, -2, -3, -4, -5], target = -8 → [2, 4]
- Target is zero: [-1, 1], target = 0 → [0, 1]
- Answer at the end: [1, 2, 3, 4], target = 7 → [2, 3]

## 8. TEST CASES

```typescript
console.log("Test 1:", twoSum([2, 7, 11, 15], 9));
// Expected: [0, 1]

console.log("Test 2:", twoSum([3, 2, 4], 6));
// Expected: [1, 2]

console.log("Test 3:", twoSum([3, 3], 6));
// Expected: [0, 1]

console.log("Test 4:", twoSum([-1, -2, -3, -4, -5], -8));
// Expected: [2, 4]

console.log("Test 5:", twoSum([1, 2, 3, 4], 7));
// Expected: [2, 3]
```

## 9. BRUTE FORCE vs HASH MAP

```
Brute Force:               Hash Map:
for i in 0..n:             for i in 0..n:
  for j in i+1..n:           complement = target - nums[i]
    if nums[i]+nums[j]==t     if map.has(complement) → found!
                              map.set(nums[i], i)

Time:  O(n²)               Time:  O(n)
Space: O(1)                 Space: O(n)
```

The hash map approach trades space for time. Instead of checking every pair, we remember what we've seen so we can find the complement in O(1).

## 10. TWO SUM vs TWO SUM II

| | Two Sum (LC 1) | Two Sum II (LC 167) |
|---|---|---|
| **Input** | Unsorted array | Sorted array |
| **Output** | 0-indexed | 1-indexed |
| **Approach** | Hash map | Two pointers |
| **Time** | O(n) | O(n) |
| **Space** | O(n) | O(1) |

- **Unsorted → Hash map**: Can't use pointer direction because values aren't ordered
- **Sorted → Two pointers**: Can eliminate candidates by direction, no extra space needed

"If the interviewer asks 'Can you solve this without extra space?', the answer is: only if you can sort the array first. But sorting loses the original indices, which this problem requires."

## 11. COMMON INTERVIEW QUESTIONS

**Q: Why not sort the array and use two pointers?**
A: Sorting changes the indices. This problem asks for the original indices, so we'd need to track them separately. A hash map is simpler and also O(n).

**Q: Why do you check the map before inserting?**
A: This ensures we don't use the same element twice. By checking first, we only match with previously seen elements.

**Q: What if there are duplicate values?**
A: The map stores the most recent index for each value. Since we check before inserting, duplicates like [3, 3] with target 6 work correctly — when we reach the second 3, the first 3 is already in the map.

## 12. RELATED PROBLEMS

- LeetCode 167. Two Sum II (sorted array, two pointers)
- LeetCode 15. 3Sum (fix one + Two Sum)
- LeetCode 170. Two Sum III - Data Structure Design
- LeetCode 560. Subarray Sum Equals K (hash map for prefix sums)
