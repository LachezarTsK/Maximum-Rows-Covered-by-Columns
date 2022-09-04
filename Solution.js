
/**
 * @param {number[][]} matrix
 * @param {number} numberOfColumnsThatMustBeChosen
 * @return {number}
 */
var maximumRows = function (matrix, numberOfColumnsThatMustBeChosen) {
    const rows = matrix.length;
    const columns = matrix[0].length;

    const bitmaskForRow = new Array(rows).fill(0);
    for (let r = 0; r < rows; ++r) {
        for (let c = 0; c < columns; ++c) {
            bitmaskForRow[r] = (bitmaskForRow[r] << 1) + matrix[r][c];
        }
    }

    const upperLimitBitmaskForRow = (1 << columns);
    let maxRowsCovered = 0;

    for (let currentBitmask = 0; currentBitmask < upperLimitBitmaskForRow; ++currentBitmask) {
        if (bitCount(currentBitmask) !== numberOfColumnsThatMustBeChosen) {
            continue;
        }

        let countRowsCovered = 0;
        for (let r = 0; r < rows; ++r) {
            countRowsCovered += (currentBitmask & bitmaskForRow[r]) === bitmaskForRow[r] ? 1 : 0;
        }
        maxRowsCovered = Math.max(maxRowsCovered, countRowsCovered);
    }

    return maxRowsCovered;
};

/**
 * @param {number} numberToCheck
 * @return {number}
 */
function bitCount(numberToCheck) {
    let countBits = 0;
    while (numberToCheck > 0) {
        countBits += (numberToCheck & 1);
        numberToCheck >>= 1;
    }
    return countBits;
}
