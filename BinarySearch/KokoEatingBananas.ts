// LeetCode 875. Koko Eating Bananas
// https://leetcode.com/problems/koko-eating-bananas/

// Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas.
// The guards have gone and will come back in h hours.

// Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile
// of bananas and eats k bananas from that pile. If the pile has less than k bananas,
// she eats all of them instead and will not eat any more bananas during this hour.

// Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

// Return the minimum integer k such that she can eat all the bananas within h hours.

// Example 1:
// Input: piles = [3,6,7,11], h = 8
// Output: 4

// Example 2:
// Input: piles = [30,11,23,4,20], h = 5
// Output: 30

// Example 3:
// Input: piles = [30,11,23,4,20], h = 6
// Output: 23

// Constraints:
// 1 <= piles.length <= 10^4
// piles.length <= h <= 10^9
// 1 <= piles[i] <= 10^9

function minEatingSpeed(piles: number[], h: number): number {
    let left = 1; // the smallest speed;
    let right = Math.max(...piles); // the largest speed;

    while (left < right) {
        let mid = left + Math.floor((right - left) / 2);

        // 1,[2],3

        if (h < calculateTotalHour(mid, piles)) {
            // speed is too slow, so search right half.
            left = mid + 1;
        } else {
            // speed is fast enough, so search left half.
            right = mid;
        }   
    }
    return left;
}

const calculateTotalHour = (speed: number, piles: number[]): number => {
    let totalHour = 0;
    for (let pile of piles) {
        totalHour += Math.ceil(pile / speed);
    }
    return totalHour;
}