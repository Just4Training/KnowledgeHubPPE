import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<String> letterCombinations(String digits) {
        String[] map = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};

        List<String> res = new ArrayList<>();
        StringBuilder sb = new StringBuilder();

        helper(digits, 0, map, sb, res);
        
        return res;
    }

    private void helper(String digits, int index, String[] map, StringBuilder sb, List<String> res) {
        if(index == digits.length()) {
            res.add(sb.toString());
            return;
        }

        int digit = digits.charAt(index) - '0';
        for(char ch : map[digit].toCharArray()) {
            sb.append(ch);
            helper(digits, index + 1, map, sb, res);
            sb.deleteCharAt(sb.length() - 1);
        }
    }

    public static void main(String[] args) {
        Solution obj = new Solution();
        String digits = "567";
        for(String s : obj.letterCombinations(digits)) {
            System.out.println(s);
        }
    }
}