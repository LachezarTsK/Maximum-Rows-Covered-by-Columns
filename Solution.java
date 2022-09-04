
public class Solution {

    public int maximumRows(int[][] matrix, int numberOfColumnsThatMustBeChosen) {
        final int rows = matrix.length;
        final int columns = matrix[0].length;

        int[] bitmaskForRow = new int[rows];
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < columns; ++c) {
                bitmaskForRow[r] = (bitmaskForRow[r] << 1) + matrix[r][c];
            }
        }

        final int upperLimitBitmaskForRow = (1 << columns);
        int maxRowsCovered = 0;

        for (int currentBitmask = 0; currentBitmask < upperLimitBitmaskForRow; ++currentBitmask) {
            if (Integer.bitCount(currentBitmask) != numberOfColumnsThatMustBeChosen) {
                continue;
            }

            int countRowsCovered = 0;
            for (int r = 0; r < rows; ++r) {
                countRowsCovered += (currentBitmask & bitmaskForRow[r]) == bitmaskForRow[r] ? 1 : 0;
            }
            maxRowsCovered = Math.max(maxRowsCovered, countRowsCovered);
        }

        return maxRowsCovered;
    }
}
