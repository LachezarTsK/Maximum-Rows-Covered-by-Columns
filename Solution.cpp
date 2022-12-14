
#include <vector>
using namespace std;

class Solution {
    
public:
    int maximumRows(vector<vector<int>>& matrix, int numberOfColumnsThatMustBeChosen) {
        const int rows = matrix.size();
        const int columns = matrix[0].size();

        vector<int> bitmaskForRow(rows);
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < columns; ++c) {
                bitmaskForRow[r] = (bitmaskForRow[r] << 1) + matrix[r][c];
            }
        }

        const int upperLimitBitmaskForRow = (1 << columns);
        int maxRowsCovered = 0;

        //C++20: popcount(currentBitmask)
        for (uint32_t currentBitmask = 0; currentBitmask < upperLimitBitmaskForRow; ++currentBitmask) {
            if (__builtin_popcount(currentBitmask) != numberOfColumnsThatMustBeChosen) {
                continue;
            }

            int countRowsCovered = 0;
            for (int r = 0; r < rows; ++r) {
                countRowsCovered += (currentBitmask & bitmaskForRow[r]) == bitmaskForRow[r] ? 1 : 0;
            }
            maxRowsCovered = max(maxRowsCovered, countRowsCovered);
        }

        return maxRowsCovered;
    }
};
