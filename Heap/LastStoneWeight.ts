// ============================================
// LeetCode 1046. Last Stone Weight
// https://leetcode.com/problems/last-stone-weight/
// ============================================
//
// You are given an array of integers stones where stones[i]
// is the weight of the ith stone.
//
// We are playing a game with the stones. On each turn,
// we choose the heaviest two stones and smash them together.
// Suppose the heaviest two stones have weights x and y with x <= y.
// The result of this smash is:
// - If x == y, both stones are destroyed, and
// - If x != y, the stone of weight x is destroyed,
//   and the stone of weight y has new weight y - x.
//
// At the end of the game, there is at most one stone left.
//
// Return the weight of the last remaining stone.
// If there are no stones left, return 0.
//
// Example 1:
//   Input:  stones = [2,7,4,1,8,1]
//   Output: 1
//   Explanation:
//   We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
//   we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
//   we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
//   we combine 1 and 1 to get 0 so the array converts to [1]
//   then that's the value of the last stone.
//
// Example 2:
//   Input:  stones = [1]
//   Output: 1
//
// Constraints:
// - 1 <= stones.length <= 30
// - 1 <= stones[i] <= 1000

function lastStoneWeight(stones: number[]): number {
    return 0;
}

// ============================================
// 道具: 読まなくていい
// LeetCode の TypeScript には MaxPriorityQueue が最初からある。
// 手元にはないので、同じ使い方ができるものをここに置いている。
// LeetCode に貼るときは、この下はコピーしない。
//
//   heap.enqueue(x)  … x を入れる
//   heap.dequeue()   … 一番大きい値を取り出す
//   heap.front()     … 一番大きい値を見る（取り出さない）
//   heap.size()      … 入っている数
// ============================================
class MaxPriorityQueue<T = number> {
    private data: number[] = [];

    size(): number {
        return this.data.length;
    }

    front(): number | null {
        return this.data.length > 0 ? this.data[0] : null;
    }

    enqueue(value: number): this {
        this.data.push(value);
        let i = this.data.length - 1;
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (this.data[parent] >= this.data[i]) break;
            [this.data[parent], this.data[i]] = [this.data[i], this.data[parent]];
            i = parent;
        }
        return this;
    }

    dequeue(): number | null {
        if (this.data.length === 0) return null;
        const top = this.data[0];
        const last = this.data.pop()!;
        if (this.data.length > 0) {
            this.data[0] = last;
            let i = 0;
            while (true) {
                const l = 2 * i + 1;
                const r = 2 * i + 2;
                let big = i;
                if (l < this.data.length && this.data[l] > this.data[big]) big = l;
                if (r < this.data.length && this.data[r] > this.data[big]) big = r;
                if (big === i) break;
                [this.data[big], this.data[i]] = [this.data[i], this.data[big]];
                i = big;
            }
        }
        return top;
    }
}

console.log(lastStoneWeight([2, 7, 4, 1, 8, 1]), "expected 1");
console.log(lastStoneWeight([1]), "expected 1");
console.log(lastStoneWeight([2, 2]), "expected 0");
