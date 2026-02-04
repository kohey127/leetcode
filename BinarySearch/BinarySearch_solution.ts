// ============================================
// LeetCode 704. Binary Search
// https://leetcode.com/problems/binary-search/
// ============================================

// ============================================
// 1. PROBLEM UNDERSTANDING
// ============================================
// - What: Find target value in a sorted array
// - Input: sorted array of integers (nums), target number
// - Output: index of target, or -1 if not found
// - Constraints:
//   - Array is sorted in ascending order
//   - All integers are unique
//   - Must achieve O(log n) runtime
// - Key insight: "sorted array" + "O(log n)" = Binary Search

// ============================================
// 2. APPROACH (面接で話す流れ)
// ============================================
// "Since the array is sorted and we need O(log n) complexity,
//  I'll use binary search."
//
// "I'll maintain two pointers, left and right, representing
//  the current search range."
//
// "In each iteration, I'll:
//  1. Calculate the middle index
//  2. Compare nums[mid] with target
//  3. If equal, return mid
//  4. If nums[mid] < target, search the right half
//  5. If nums[mid] > target, search the left half"
//
// "I'll continue until left > right, which means target is not found."

// ============================================
// 3. SOLUTION
// ============================================
function searchSolution(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        // Avoid integer overflow: use left + (right - left) / 2
        // In JavaScript this isn't necessary, but good practice
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            // Found the target
            return mid;
        } else if (nums[mid] < target) {
            // Target is in the right half
            left = mid + 1;
        } else {
            // Target is in the left half
            right = mid - 1;
        }
    }

    // Target not found
    return -1;
}

// ============================================
// 4. COMPLEXITY (必ず聞かれる)
// ============================================
// Time: O(log n)
//   - "We halve the search space in each iteration"
//   - "So we need at most log2(n) iterations"
//
// Space: O(1)
//   - "We only use a constant number of variables (left, right, mid)"
//   - "No additional data structures needed"

// ============================================
// 5. KEY PHRASES (面接で使える英語)
// ============================================
// Clarifying questions:
//   - "Let me clarify - the array is already sorted, correct?"
//   - "Are all elements unique, or could there be duplicates?"
//   - "Should I return any valid index if there are duplicates?"
//
// Explaining approach:
//   - "My approach is to use binary search"
//   - "I'll use two pointers to track the search range"
//   - "I'll compare the middle element with the target"
//
// Explaining complexity:
//   - "The time complexity is O(log n) because we halve the search space each time"
//   - "The space complexity is O(1) since we only use constant extra space"
//
// Common mistakes to mention:
//   - "I need to be careful with the boundary conditions"
//   - "The condition should be left <= right, not left < right"
//   - "When moving pointers, it's mid + 1 and mid - 1, not just mid"

// ============================================
// 6. VISUAL WALKTHROUGH
// ============================================
// nums = [-1, 0, 3, 5, 9, 12], target = 9
//
// Iteration 1:
//   left=0, right=5, mid=2
//   nums[2]=3 < 9, so search right half
//   left = 3
//
// Iteration 2:
//   left=3, right=5, mid=4
//   nums[4]=9 === 9, found!
//   return 4

// ============================================
// 7. EDGE CASES
// ============================================
// - Target at the beginning: [1,2,3], target=1 -> 0
// - Target at the end: [1,2,3], target=3 -> 2
// - Single element (found): [5], target=5 -> 0
// - Single element (not found): [5], target=3 -> -1
// - Target not in array: [1,2,3], target=4 -> -1

// ============================================
// 8. TEST CASES
// ============================================
console.log("Test 1:", searchSolution([-1, 0, 3, 5, 9, 12], 9));  // Expected: 4
console.log("Test 2:", searchSolution([-1, 0, 3, 5, 9, 12], 2));  // Expected: -1
console.log("Test 3:", searchSolution([5], 5));                   // Expected: 0 (single element, found)
console.log("Test 4:", searchSolution([5], 3));                   // Expected: -1 (single element, not found)
console.log("Test 5:", searchSolution([1, 2, 3, 4, 5], 1));       // Expected: 0 (target at beginning)
console.log("Test 6:", searchSolution([1, 2, 3, 4, 5], 5));       // Expected: 4 (target at end)
