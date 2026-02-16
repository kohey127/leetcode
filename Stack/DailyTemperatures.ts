// ============================================
// LeetCode 739. Daily Temperatures
// https://leetcode.com/problems/daily-temperatures/
// ============================================
//
// Given an array of integers temperatures represents the daily
// temperatures, return an array answer such that answer[i] is
// the number of days you have to wait after the ith day to get
// a warmer temperature. If there is no future day for which this
// is possible, keep answer[i] == 0.
//
// Example 1:
//   Input:  temperatures = [73,74,75,71,69,72,76,73]
//   Output: [1,1,4,2,1,1,0,0]
//
// Example 2:
//   Input:  temperatures = [30,40,50,60]
//   Output: [1,1,1,0]
//
// Example 3:
//   Input:  temperatures = [30,20,10]
//   Output: [0,0,0]
//
// Constraints:
// - 1 <= temperatures.length <= 10^5
// - 30 <= temperatures[i] <= 100

function dailyTemperatures(temperatures: number[]): number[] {
    const answer = new Array(temperatures.length).fill(0);
    // Stores each day's index to get how many days passed until a warmer day arrived.
    // Monotonic decreasing stack.
    const stack: number[] = [];

    for (let i = 0; i < temperatures.length; i++) {
        // While current temp is warmer than the latest temp added to the stack, 
        // pop the last temp and get how many days passed to register in the answer array.
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prevDayIndex = stack.pop()!;
            const howManyDayPassed = i - prevDayIndex;
            // Register the answer at the waiting day's index
            answer[prevDayIndex] = howManyDayPassed;
        }
        stack.push(i); // 0,1,2,3,4...
    }

    return answer;
}
