# Lecture 1

## Question(s)

Given an integer array nums of length n and an integer k, return the kth **smallest subarray sum**.

A subarray is defined as a non-empty contiguous sequence of elements in an array. A subarray sum is the sum of all elements in the subarray.

Note: You should use binary search to solve this problem.

Note 2: For any sorting, use a sorting algorithm that you haven't use in the previous labs.

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
  let min = Infinity;
  let sum = 0;

  for (let each in nums) {
    min = Math.min(min, each);
    sum += each;
  }

  let low = min;
  let high = sum;

  while (low < high) {
    let mid = parseInt((high - low) / 2) + low;

    let count = countSubarrays(nums, mid);
    if (count < k) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}

function countSubarrays(nums, threshold) {
  let count = 0;
  let sum = 0;
  let length = nums.length;
  let left = 0;
  let right = 0;

  while (right < length) {
    sum += nums[right];
    while (sum > threshold) {
      sum -= nums[left];
      left++;
    }
    count += right - left + 1;
    right++;
  }

  return count;
}

console.log(kthSmallestSubarraySum([2, 1, 3], 4));
console.log(kthSmallestSubarraySum([3, 3, 5, 5], 7));
```
