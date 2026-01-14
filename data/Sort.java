package data;

/* 
 * LeetCode 670
 * You are given an integer num. You can swap two digits at most once to get the maximum valued number.
 * Return the maximum valued number you can get.
 *
 * Example 1:
 * Input: num = 2736
 * Output: 7236
 * Explanation: Swap the number 2 and the number 7.
 * 
 * Example 2:
 * Input: num = 9973
 * Output: 9973
 * Explanation: No swap.
 */

class Solution {
    public int maximumSwap(int num) {
        char[] chArr = String.valueOf(num).toCharArray();

        int[] map = new int[10];
        for(int i = 0; i < chArr.length; i++) {
            map[chArr[i] - '0'] = i;
        }

        for(int i = 0; i < chArr.length; i++) {
            for(int d = 9; d > chArr[i] - '0'; d--) {
                if(map[d] > i) {
                    char temp = chArr[i];
                    chArr[i] = chArr[map[d]];
                    chArr[map[d]] = temp;
                    return Integer.valueOf(new String(chArr));
                }
            }
        }

        return num;
    }

    // follow up: swap k digit
    public int maximumSwap(int num, int k) {
        char[] chArr = String.valueOf(num).toCharArray();

        int[] map = new int[10];
        for(int i = 0; i < chArr.length; i++) {
            map[chArr[i] - '0'] = i;
        }

        for(int i = 0; i < chArr.length; i++) {
            for(int d = 9; d > chArr[i] - '0'; d--) {
                if(map[d] > i) {
                    char temp = chArr[i];
                    chArr[i] = chArr[map[d]];
                    chArr[map[d]] = temp;
                    map[d] = i;
                    k--;
                }
                if(k == 0) {
                    break;
                }
            }
        }

        int res = Integer.valueOf(new String(chArr));

        return res;
    }

    public static void main(String[] args) {
        Solution obj = new Solution();
        int num = 273652;
        // System.out.println(obj.maximumSwap(num));
        System.out.println(obj.maximumSwap(num, 6));
    }
}