# Lecture 1

## Question(s)

Given an integer array nums of length n and an integer k, return the kth **smallest subarray sum**.

A subarray is defined as a non-empty contiguous sequence of elements in an array. A subarray sum is the sum of all elements in the subarray.

Example 1:

Input: nums = [2,1,3], k = 4  
Output: 3  
Explanation: The subarrays of [2,1,3] are:

- [2] with sum 2
- [1] with sum 1
- [3] with sum 3
- [2,1] with sum 3
- [1,3] with sum 4
- [2,1,3] with sum 6

Ordering the sums from smallest to largest gives 1, 2, 3, 3, 4, 6. The 4th smallest is 3.

Example 2:

Input: nums = [3,3,5,5], k = 7  
Output: 10  
Explanation: The subarrays of [3,3,5,5] are:

- [3] with sum 3
- [3] with sum 3
- [5] with sum 5
- [5] with sum 5
- [3,3] with sum 6
- [3,5] with sum 8
- [5,5] with sum 10
- [3,3,5], with sum 11
- [3,5,5] with sum 13
- [3,3,5,5] with sum 16

Ordering the sums from smallest to largest gives 3, 3, 5, 5, 6, 8, 10, 11, 13, 16. The 7th smallest is 10.

**Constraints**

n == nums.length  
1 <= n <= 2 _ 104  
1 <= nums[i] <= 5 _ 104  
1 <= k <= n \* (n + 1) / 2

## Solution

```javascript
function kthSmallestSubarraySum(nums, k) {
  let l = 1 << 30,
    r = 0;
  for (let x in nums) {
    l = Math.min(l, x);
    r += x;
  }

  while (l < r) {
    let mid = (l + r) >> 1;
    if (f(nums, mid) >= k) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
}

function f(nums, s) {
  let t = 0,
    j = 0;
  let cnt = 0;
  for (let i = 0; i < nums.length; ++i) {
    t += nums[i];
    while (t > s) {
      t -= nums[j++];
    }
    cnt += i - j + 1;
  }
  return cnt;
}

console.log(kthSmallestSubarraySum([2, 1, 3], 4));
console.log(kthSmallestSubarraySum([3, 3, 5, 5], 7));
```
