// ============================================
// LeetCode 104. Maximum Depth of Binary Tree
// https://leetcode.com/problems/maximum-depth-of-binary-tree/
// ============================================
//
// Given the root of a binary tree, return its maximum depth.
//
// A binary tree's maximum depth is the number of nodes
// along the longest path from the root node down to
// the farthest leaf node.
//
// Example 1:
//        3
//       / \
//      9   20
//         /  \
//        15   7
//   Input:  root = [3,9,20,null,null,15,7]
//   Output: 3
//
// Example 2:
//      1
//       \
//        2
//   Input:  root = [1,null,2]
//   Output: 2
//
// Constraints:
// - The number of nodes in the tree is in the range [0, 10^4]
// - -100 <= Node.val <= 100

class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

function maxDepth(root: TreeNode | null): number {
    if (root === null) return 0;

    const left = maxDepth(root.left);
    const right = maxDepth(root.right);

    return 1 + Math.max(left, right);
}

// Build a tree from LeetCode style array: [3,9,20,null,null,15,7]
function buildTree(values: (number | null)[]): TreeNode | null {
    if (values.length === 0 || values[0] === null) return null;
    const root = new TreeNode(values[0]);
    const queue: TreeNode[] = [root];
    let i = 1;
    while (queue.length > 0 && i < values.length) {
        const node = queue.shift()!;
        if (i < values.length && values[i] !== null) {
            node.left = new TreeNode(values[i]!);
            queue.push(node.left);
        }
        i++;
        if (i < values.length && values[i] !== null) {
            node.right = new TreeNode(values[i]!);
            queue.push(node.right);
        }
        i++;
    }
    return root;
}

console.log(maxDepth(buildTree([3, 9, 20, null, null, 15, 7])), "expected 3");
console.log(maxDepth(buildTree([1, null, 2])), "expected 2");
console.log(maxDepth(buildTree([])), "expected 0");
