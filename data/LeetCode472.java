
/* 
 * LeetCode 472
 * Given an array of strings words (without duplicates), return all the concatenated words in the given list of words.
 * A concatenated word is defined as a string that is comprised entirely of at least two shorter words (not necessarily distinct) in the given array
 *
 * Example 1:
 * Input: words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
 * Output: ["catsdogcats","dogcatsdog","ratcatdogcat"]
 * Explanation: "catsdogcats" can be concatenated by "cats", "dog" and "cats"; 
 *              "dogcatsdog" can be concatenated by "dog", "cats" and "dog"; 
 *              "ratcatdogcat" can be concatenated by "rat", "cat", "dog" and "cat".
 */

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Solution {
    public List<String> findAllConcatenatedWordsInADict(String[] words) {
        List<String> res = new ArrayList<>();
        Set<String> set = new HashSet<>(Arrays.asList(words));
        
        for(String s : words) {
            set.remove(s);

            if(canBreak(s, set)) {
                res.add(s);
            }

            set.add(s);
        }

        return res;
    }

    private boolean canBreak(String s, Set<String> set) {
        if(set.size() == 0) {
            return false;
        }

        int n = s.length();
        boolean[] dp = new boolean[n + 1];
        dp[0] = true;

        for(int i = 1; i <= n; i++) {
            for(int j = 0; j < i; j++) {
                if(!dp[j]) {
                    continue;
                }
                if(set.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }

        return dp[n];
    }

    public static void main(String[] args) {
        Solution obj = new Solution();
        String[] words = {"catsdogcats", "cat", "cats", "dog", "dogcatsdog", "hippopotamuses", "rat", "ratcatdogcat"};
        System.out.println(obj.findAllConcatenatedWordsInADict(words));
    }
}
