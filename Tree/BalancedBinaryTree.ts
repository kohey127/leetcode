// ============================================
// LeetCode 110. Balanced Binary Tree
// https://leetcode.com/problems/balanced-binary-tree/
// ============================================
//
// Given a binary tree, determine if it is height-balanced.
//
// A height-balanced binary tree is a binary tree in which
// the depth of the two subtrees of every node never differs
// by more than one.
//
// Example 1:
//        3
//       / \
//      9   20
//         /  \
//        15   7
//   Input:  root = [3,9,20,null,null,15,7]
//   Output: true
//
// Example 2:
//          1
//         / \
//        2   2
//       / \
//      3   3
//     / \
//    4   4
//   Input:  root = [1,2,2,3,3,null,null,4,4]
//   Output: false
//
// Example 3:
//   Input:  root = []
//   Output: true
//
// Constraints:
// - The number of nodes in the tree is in the range [0, 5000]
// - -10^4 <= Node.val <= 10^4

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

function isBalanced(root: TreeNode | null): boolean {
    return true;
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

console.log(isBalanced(buildTree([3, 9, 20, null, null, 15, 7])), "expected true");
console.log(isBalanced(buildTree([1, 2, 2, 3, 3, null, null, 4, 4])), "expected false");
console.log(isBalanced(buildTree([])), "expected true");
